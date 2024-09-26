import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environment';
import { response } from 'express';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file);  
  
    return this.http.post<string>(`${environment.baseUrl}/file/upload`,formData)
       .pipe(
      catchError(this.handleError)  
    );;
  }

  cancelUpload(fileId: string): Observable<any>{
    console.log("FileID is ", fileId);
    
    return this.http.delete<any>(`${environment.baseUrl}/file/${fileId}/cancel`);
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    
    if (error.status === 500) {
       errorMessage = error.error;  
    }
     return throwError(() => new Error(errorMessage));
  }
}
