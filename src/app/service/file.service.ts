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

  upload(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);  
  
    return this.http.post<any>(`${environment.baseUrl}/file/upload`,formData);
  }

  cancelUpload(fileId: string): Observable<any>{
    console.log("FileID is ", fileId);
    
    return this.http.delete<any>(`${environment.baseUrl}/file/${fileId}/cancel`);
  }

}
