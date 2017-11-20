import { Injectable } from '@angular/core';
import { Http, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class HttpService {
    private defaultOptions: any = {};

    constructor(
        private http: Http,
        private router: Router
    ) {}

    setDefaultHeaders(headers: any): void {
        this.defaultOptions.headers = headers;
    }

    post(url: string, body?: any, options?: RequestOptionsArgs): Promise<Response> {
        options = this.addDefaultOptions(options);
        return this.intercept(this.http.post(url, body, options)).toPromise();
    }

    get(url: string, options?: RequestOptionsArgs): Promise<Response> {
        options = this.addDefaultOptions(options);
        return this.intercept(this.http.get(url, options)).toPromise();
    }

    delete(url: string, options?: RequestOptionsArgs): Promise<Response> {
        options = this.addDefaultOptions(options);
        return this.intercept(this.http.delete(url, options)).toPromise();
    }

    put(url: string, body?: any, options?: RequestOptionsArgs): Promise<Response> {
        options = this.addDefaultOptions(options);
        return this.intercept(this.http.put(url, body, options)).toPromise();
    }

    private addDefaultOptions(options) {
        if (!options) {
            options = new RequestOptions(this.defaultOptions);
        } else {
            options.header = this.defaultOptions.header;
        }

        return options;
    }

    private intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
            const urlParts = err.url.split('/');
            const urlAction = urlParts[urlParts.length - 1].split('?')[0];

            if (err.status === 401 && urlAction !== 'login') {
                localStorage.clear();
                this.router.navigate(['/login']);
                return Observable.empty();
            } else if (err.status === 404) {
                console.error('404 error!');
                return Observable.throw(err);
            } else {
                if (err._body) {
                    err.body = JSON.parse(err._body);
                }

                return Observable.throw(err);
            }
        });
    }
}
