import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';

enum RequestBaseOptionsTypes {
    AUTH_JSON,        // includes: 'Bearer' and 'Content-Type' (json) headers
    AUTH_BLOB         // includes: 'Bearer' and blob response type
}

@Injectable()
export class RequestBase {

    readonly OPT = RequestBaseOptionsTypes;

    constructor(public http: Http) {
    }

    public getOptions(optionType: number = this.OPT.AUTH_JSON) {

        let options = new RequestOptions();
        options.headers = new Headers({Authorization: 'Bearer ' + Cookie.get('at')});

        switch (optionType) {

            case this.OPT.AUTH_BLOB:
                options.responseType = ResponseContentType.Blob;
                break;

            case this.OPT.AUTH_JSON:
                options.headers.append('Content-Type', 'application/json');
                break;

            default:
                break;
        }

        return options;
    }
}
