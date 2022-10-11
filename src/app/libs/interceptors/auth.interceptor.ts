import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import StorageHelper from '../helpers/storage.helper';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes("/mirror/")) {
      console.log(StorageHelper.getItem('session'));
      request = request.clone({
        setHeaders: {
          Authorization : 'Bearer ' + StorageHelper.getItem('session').token
        }
      })
    }
    return next.handle(request);
  }
}
