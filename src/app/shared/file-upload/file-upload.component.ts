import { Component, EventEmitter, Output } from '@angular/core';
import { FileService } from '../../service/file.service';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [MatButton, MatProgressSpinnerModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  isLoading = true;
  file: File | null = null;
  @Output() fileUploaded: EventEmitter<string> = new EventEmitter<string>();
  @Output() uploadFailed: EventEmitter<void> = new EventEmitter<void>();
  @Output() uploadCanceled: EventEmitter<void> = new EventEmitter<void>();
  cancelMessage!: string;
  fileName!: string;
  success: boolean = false;

  constructor(private fileService: FileService) { }

  onChange(event: any) {
    this.cancelMessage = '';
    this.file = event.target.files[0];
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
    
    this.fileService.upload(this.file).subscribe({
      next: (data: string) => {
        this.fileUploaded.emit(data);
        this.fileName = data;
        console.log("Uploaded file name: " + this.fileName);
        this.success = true;
      },
      error: (error) => {
        console.error("Error uploading file:", error.message);
        this.isLoading = false;
        this.file = null;
        this.uploadFailed.emit();
      },
      complete: () => {

      }
    });


  }
  cancelUpload(): void {
    this.isLoading = true;
    this.file = null;
    console.log("fileName is : " + this.fileName);
    
    if (this.fileName != '' || this.fileName != null) {
      this.fileService.cancelUpload(this.fileName).subscribe({
        next: (data: any) => {
          this.cancelMessage = data;
          this.fileName='';
        },
        error: (error) => {
          console.error("Error uploading file:", error);
        }
      })
    }
  }

}
