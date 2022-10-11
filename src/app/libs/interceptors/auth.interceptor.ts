import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import StorageHelper from '../helpers/storage.helper';
import { ApiserviceService } from '../../services/apiservice.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private ApiserviceService:ApiserviceService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes("/mirror/")) {
      console.log(StorageHelper.getItem('session'));
      let originalRequest = request
      request = request.clone({
        setHeaders: {
          Authorization : 'Bearer ' + StorageHelper.getItem('session').token
        }
      })
      return next.handle(request).pipe(
        catchError( (err:any) => {
          
          console.log("cath-error",err);

          if(err instanceof HttpErrorResponse && err.status === 401 ){
            console.log("in response error");
            return this.expiredHandler(originalRequest,next)
          }
          return throwError( () => err )
        })
      )
  }
  return next.handle(request)
  }

  private expiredHandler(originalRequest:HttpRequest<unknown>, next:HttpHandler){
    return this.ApiserviceService.refreshToken().pipe(
      switchMap( (response) => { 
        StorageHelper.setItem('session',response)
        originalRequest = originalRequest.clone({
          setHeaders: {
            Authorization : 'Bearer ' + StorageHelper.getItem('session').token
          }
        })
        return next.handle(originalRequest)
      })
    )
  }

}
