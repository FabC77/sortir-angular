import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FileService } from '../../service/file.service';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MatButton, MatProgressSpinnerModule, MatIconModule, MatProgressBarModule
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  isLoading = false;
  file: File | null = null;
  @Output() fileUploaded: EventEmitter<string> = new EventEmitter<string>();
  @Output() uploadFailed: EventEmitter<void> = new EventEmitter<void>();
  @Output() uploadCanceled: EventEmitter<void> = new EventEmitter<void>();
  cancelMessage!: string;
  fileName!: string;
  success: boolean = false;
  fileSizeError: boolean=false;

  constructor(private fileService: FileService) { }

  onChange(event: any) {
    this.cancelMessage = '';
    this.file = event.target.files[0];
    if (this.file) {
      const fileType = this.file.type;
      const validImageTypes = ['image/png', 'image/jpeg'];
  
      if (!validImageTypes.includes(fileType)) {
        alert('Veuillez sélectionner une image au format PNG ou JPEG.');
        
        event.target.value = '';
      } else {
        
        console.log('Type de fichier accepté:', this.file);
      }
 
    const maxSize = 3 * 1024 * 1024; 
    if (this.file.size > maxSize) {
      this.fileSizeError = true; 
      event.target.value = '';
      this.file=null;
    } else {
      this.fileSizeError = false;
       
      console.log('taille du fichier acceptée:', this.file);
    }

  } 
    this.isLoading = false;
  }

  uploadFile(): void {
    this.isLoading = true;
    this.fileName = '';

   if (!this.file) {
      console.error("No file selected.");
      this.isLoading = false;
      return;
    } 
   /*
    setTimeout(() => {
      console.log("in setTimeout");
      
      this.isLoading = false;
      this.buttonMessage="Image téléchargée";
      this.success = true;
    },1600); */


    this.fileService.upload(this.file).subscribe({
      next: (data: any) => {
        console.log("Received data: "+data.fileName);
        
        this.fileUploaded.emit(data.fileName);
        this.fileName = data.fileName;
        console.log("Uploaded file name: " + this.fileName);
       
        this.success = true;
      },
      error: (error) => {
        console.error("Error uploading file:", error.message);
        
        this.file = null;
        this.uploadFailed.emit();
      },
      complete: () => {
        this.isLoading = false;
      }
    }); 


  }
  clearFile():void{
    this.file = null;
    this.fileName = '';
  }
  cancelUpload(): void {
    this.isLoading = true;
   
    console.log("fileName is : " + this.fileName);
    
    if (this.fileName != '' && this.fileName != null) {
      this.fileService.cancelUpload(this.fileName).subscribe({
        next: (data: any) => {
          this.cancelMessage = data.message;
          this.fileName='';
          this.file = null;

          if (this.fileInput) {
            this.fileInput.nativeElement.value = '';
          }
this.success=false;
          this.uploadFailed.emit();
        },
        error: (error) => {
          console.error("Error deleting file:", error.message);
        },
        complete: () => {
        this.isLoading = false;
        }
      })
    }
  }

}
