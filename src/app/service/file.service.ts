import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);  
  
    return this.http.post<string>(`${environment.baseUrl}/file/upload`,formData);
  }

  cancelUpload(fileId: string): Observable<any>{
    console.log("FileID is ", fileId);
    
    return this.http.delete<any>(`${environment.baseUrl}/file/${fileId}/cancel`);
  }

}
