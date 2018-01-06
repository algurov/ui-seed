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
    readonly TOKEN_LIFETIME_LIMIT = 600 * 1000;
    // interval in milliseconds
    readonly TOKEN_REFRESH_INTERVAL = 60000 * 2;

    _tokenExpiresAt = null; // class cached timestamp, when token expires

    constructor(public http: Http) {
        this.http = http;
    }


    /**
     * Send request to obtain new authentication and refresh tokens.
     *
     * Request must be send to same domain with current app.
     * @returns {Observable<Response>}
     */
    public run() {

        this.getOrCreateTokenExpiresAt();
        this.refresh();

        Observable.interval(this.TOKEN_REFRESH_INTERVAL)
            .takeWhile(this.isRunStillRequired.bind(this))
            .subscribe(() => {

                this.debug('---------------------------------------');
                this.debug('Checking if token requires refreshment.');

                this.refresh();
            })
        ;
    }

    private isRunStillRequired(v, n) {

        let isRunRequired = this.isTokenExist() && this.getTokenExpiresLifetime() > 0;
        this.debug('Do :state continue to refresh since token does :state exist.', isRunRequired);

        return isRunRequired;
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

        this._tokenExpiresAt = (new Date).getTime() + this.TOKEN_LIFETIME;
        // cookie must expires with token
        let expires = (this.TOKEN_LIFETIME / 1000) / (3600 * 24);
        Cookie.set(this.TOKEN_EXPIRED_COOKIE_NAME, this._tokenExpiresAt.toString(), expires);
        this.debug('A new tokenExpiresAt cookie was created.');

        return this._tokenExpiresAt;
    }

    private getTokenExpiresLifetime() {
        return (this.getTokenExpiresAt() - (new Date).getTime());
    }

    private isRefreshmentRequired() {

        // if token expired more than 10 minutes
        let isCloseToExpired = this.getTokenExpiresLifetime() < this.TOKEN_LIFETIME_LIMIT;
        let isRequestedAlready = !!Cookie.get(this.TOKEN_EXPIRED_COOKIE_NAME + '_processing');
        let isRefreshmentRequired = isCloseToExpired && !isRequestedAlready;

        this.debug('The tokens is :state close to be expired.', isCloseToExpired);
        this.debug('Token expires after '
            + (this.getTokenExpiresAt() - this.TOKEN_LIFETIME_LIMIT).toString()
        );
        this.debug('Next token refresh at '
            + (this.getTokenExpiresLifetime() / 1000).toString() + ' seconds.'
        );
        this.debug('The tokens do :state requested already.', isRequestedAlready);
        this.debug('Token does :state requires refreshment.', isRefreshmentRequired, 'info');

        return isRefreshmentRequired;
    }

    private isTokenExist(): boolean {

        return [Cookie.get('at'), Cookie.get('reft')].every(isString);
    }

    /**
     * Send request to obtain new authentication and refresh tokens.
     *
     * Request must be send to same domain with current app.
     * @returns {Observable<Response>}
     */
    private refresh(force: boolean = false) {

        if (!force && !this.isRefreshmentRequired()) {
            return;
        }

        Cookie.set(this.TOKEN_EXPIRED_COOKIE_NAME + '_processing', 'true');
        this.debug('Token processing cookie was created.');

        let url = AUTH_CONSUMER_BASE_URL + '/oauth2-consumer/refresh_token?client_id=client_seed';
        let options = new RequestOptions({
            withCredentials: true
        });

        this.debug('Current token at ' + Cookie.get('at'));
        this.debug('Current token reft ' + Cookie.get('reft'));

        return this.http.post(url, {}, options)
            .finally(() => {
                Cookie.delete(this.TOKEN_EXPIRED_COOKIE_NAME + '_processing');
                this.debug('Token processing cookie was removed.');
            })
            .subscribe(
                res => {
                    this.setTokenExpiresAt();
                    console.info(
                        'User token successfully was successfully refreshed.',
                        res.statusText
                    );
                    this.debug('Current token at ' + Cookie.get('at'));
                    this.debug('Current token reft ' + Cookie.get('reft'));
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
