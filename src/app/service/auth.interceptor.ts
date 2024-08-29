import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environment";


export function authInterceptor(request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("authToken");
    console.log("Token avant request: " + JSON.stringify(idToken));

    if (idToken && !request.url.includes(`${environment.baseUrl}/api/auth`)) {
        const cloned = request.clone({
            headers: request.headers.set("Authorization",
                "Bearer " + idToken)
        });

        return next(cloned);
    }
    else {
        return next(request);
    }
}
;
