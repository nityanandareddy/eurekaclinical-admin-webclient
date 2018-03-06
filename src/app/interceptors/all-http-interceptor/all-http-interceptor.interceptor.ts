import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AllHttpInterceptor implements HttpInterceptor {
    constructor( private router: Router ) { }
    intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        console.log( 'Inside Interceptor:' + request.url );
        return next.handle( request )
            .do( event => {
                if ( event instanceof HttpResponse ) {
                    console.log( event );
                    if ( event.headers.get( 'loggedIn' ) === 'true' ) {
                        console.log( '------------GOT ADMINVIEW--------------' );
                        localStorage.setItem( 'isNewUser', 'false' );
                        localStorage.setItem( 'loggedIn', 'true' );
                        this.router.navigate['/adminview'];
                    }
                    if ( event.url.indexOf( 'logout' ) >= 0 ) {
                        localStorage.setItem( 'isNewUser', 'true' );
                    }
                }
                else {
                    console.log( event );
                    console.log( '------------GOT ADMINVIEW--------------' );
                    localStorage.setItem( 'isNewUser', 'false' );
                    localStorage.setItem( 'loggedIn', 'true' );
                    this.router.navigate['/adminview'];
                }
            }, err => {
                console.log( 'Caught error', err.url );
                if ( err.url.indexOf( 'adminview' ) >= 0 ) {
                    this.router.navigate( ['/adminview'] );
                }
            } );
    }
}