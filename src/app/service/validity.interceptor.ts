import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest, HttpStatusCode } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { inject } from "@angular/core";


export function validityInterceptor(req : HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const service= inject(AuthService);
    return next(req).pipe(
        tap(event => {
          if (event.type === HttpEventType.Response) {
            console.log("HTTP Response Event detected");
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("HTTP Error Event detected");
    
          if (error.status === 403 || error.status === 401) {
            console.log("Handling 403/401 error");
            service.expired();
          }
          
          return throwError(() => error); 
        })
      );
    }
  
  