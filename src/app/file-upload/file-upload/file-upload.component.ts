import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FileUploadService} from '../file-upload.service';
import {NotificationService} from '../../common/notification.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  color = 'primary';
  mode = 'determinate';
  value = 0;
  executionBarValue = 0;
  bufferValue = 100;
  fileUploadProgress = '';
  form: FormGroup;
  error: string;
  uploadResponse = { status: '', message: '', filePath: '', value : 0};
  showSuccessMsg: boolean;
  showExecutionButton: boolean;

  constructor(private formBuilder: FormBuilder,
              private fileUploadService: FileUploadService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.showSuccessMsg = false;
    this.showExecutionButton = true;
    this.form = this.formBuilder.group({
      avatar: ['']
    });

  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('avatar').value);
    this.fileUploadService.upload(formData).subscribe(
      (res) => { this.uploadResponse = res; if (res.status === 'progress') { this.value = res.value; this. fileUploadProgress =  res.message; } },
      (err) => this.error = err
    );
  }

  executeProcess() {
    console.log('Execution Process');
    for (let i = 0; i <= 50000000; i++) {

      this.executionBarValue = Math.round(100 * (i / 50000000));
      }

    this.showSuccessMsg = true;
    this.showExecutionButton = false;
    this.notificationService.showSuccess('Execution completed successfully');
  }
}
