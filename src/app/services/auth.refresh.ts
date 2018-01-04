import { Response, RequestOptions, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AUTH_CONSUMER_BASE_URL } from './constants';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { HttpErrorResponse } from '@angular/common/http';
import { isString } from 'util';


export class AuthRefresh {

    readonly DEBUG = true;
    readonly TOKEN_EXPIRED_COOKIE_NAME: string = 'tokenExpiresAt';
    // time in milliseconds, when tokens expires
    readonly TOKEN_LIFETIME: number = 3600 * 1000;
    // time limit in milliseconds, when tokens must be refreshed
    readonly TOKEN_LIFETIME_LIMIT = 300 * 1000;
    // interval in milliseconds
    readonly TOKEN_REFRESH_INTERVAL = 60000 * 5;

    now: number = 0;
    _tokenExpiresAt = null; // class cached timestamp, when token expires

    constructor(public http: Http) {
        this.http = http;
        this.now = (new Date).getTime();
    }


    /**
     * Send request to obtain new authentication and refresh tokens.
     *
     * Request must be send to same domain with current app.
     * @returns {Observable<Response>}
     */
    public run() {

        Observable.interval(this.TOKEN_REFRESH_INTERVAL)
            .takeWhile((v, n) => this.isTokenExist())
            .subscribe(() => {

            console.debug('---------------------------------------');
            console.debug('Checking if token requires refreshment.');

            this.getOrCreateTokenExpiresAt();

            if (this.isRefreshmentRequired()) {
                this.refresh();
            }
        });
    }

    private getOrCreateTokenExpiresAt() {
        return this.getTokenExpiresAt() || this.setTokenExpiresAt();
    }

    private getTokenExpiresAt() {

        if (this._tokenExpiresAt === null) {
            let tokenExpiredAtValue = Cookie.get(this.TOKEN_EXPIRED_COOKIE_NAME);
            this._tokenExpiresAt = tokenExpiredAtValue ? parseInt(tokenExpiredAtValue, 10) : 0;
        }

        return this._tokenExpiresAt;
    }

    private setTokenExpiresAt() {

        this._tokenExpiresAt = this.now + this.TOKEN_LIFETIME;
        Cookie.set(this.TOKEN_EXPIRED_COOKIE_NAME, this._tokenExpiresAt.toString(), 1);

        this.debug('A new tokenExpiresAt cookie created.');

        return this._tokenExpiresAt;
    }

    private getTokenExpiresLifeime() {
        return (this.getTokenExpiresAt() - (new Date).getTime());
    }

    private isRefreshmentRequired() {

        // if token expired more than 10 minutes
        let isCloseToExpired = this.getTokenExpiresLifeime() < this.TOKEN_LIFETIME_LIMIT;
        let isRequestedAlready = !!Cookie.get(this.TOKEN_EXPIRED_COOKIE_NAME + '_processing');
        let isRefreshmentRequired = isCloseToExpired && !isRequestedAlready;

        this.debug('The tokens is :state close to be expired.', isCloseToExpired);
        this.debug('Token expires after '
            + (this.getTokenExpiresAt() - this.TOKEN_LIFETIME_LIMIT).toString()
        );
        this.debug('Next token refresh at '
            + (this.getTokenExpiresLifeime() / 1000).toString() + ' seconds.'
        );
        this.debug('The tokens do :state requested already.', isRequestedAlready);
        this.debug('Token does :state requires refreshment.', isRefreshmentRequired, 'info');

        return isRefreshmentRequired;
    }

    private isTokenExist(): boolean {

        const tokenExists = [Cookie.get('at'), Cookie.get('reft')].every(isString);
        this.debug('Do :state continue to refresh since token does :state exist.', tokenExists);

        return tokenExists;
    }

    /**
     * Send request to obtain new authentication and refresh tokens.
     *
     * Request must be send to same domain with current app.
     * @returns {Observable<Response>}
     */
    private refresh() {

        Cookie.set(this.TOKEN_EXPIRED_COOKIE_NAME + '_processing', 'true');
        this.debug('Token processing cookie was created.');

        let url = AUTH_CONSUMER_BASE_URL + '/oauth2-consumer/refresh_token?client_id=client_seed';
        let options = new RequestOptions({
            withCredentials: true
        });

        return this.http.post(url, {}, options)
            .finally(() => {
                Cookie.delete(this.TOKEN_EXPIRED_COOKIE_NAME + '_processing');
                this.debug('Toking processing cookie was removed.');
            })
            .subscribe(
                res => {
                    this.setTokenExpiresAt();
                    console.info(
                        'User token successfully was successfully refreshed.',
                        res.statusText
                    );
                },
                (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                        console.error('Client-side error occurred during refreshing token.');
                    } else {
                        console.error('Client-side error occurred during refreshing token.');
                    }
                }
            );
    }

    private debug(message: string, statement: boolean = null, status: string = 'log') {
        if (this.DEBUG) {
            console[status](message.replace(new RegExp(':state', 'g'), (statement ? '' : 'not')));
        }
    }
}
