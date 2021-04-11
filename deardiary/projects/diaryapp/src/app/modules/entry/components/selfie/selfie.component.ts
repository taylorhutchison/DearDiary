import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-selfie',
  templateUrl: './selfie.component.html',
  styleUrls: ['./selfie.component.scss']
})
export class SelfieComponent implements OnInit {

  @ViewChild('video')
  video: ElementRef<HTMLVideoElement> | undefined;

  cameraStreamOpen = false;

  dataUrls: string[] = [];

  error: string | undefined;

  stream: MediaStream | undefined;

  constructor(public dialogRef: MatDialogRef<SelfieComponent>) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.video!.nativeElement.srcObject = null;
    this.stream!.getTracks()[0].stop();
  }

  async ngAfterViewInit() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });
      this.video!.nativeElement.srcObject = this.stream;
    }
    catch (error) {
      this.error = error;
    }
  }

  capture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1280;
    canvas.height = 720;
    const context = canvas.getContext('2d');
    context!.drawImage(this.video!.nativeElement, 0, 0, 1280, 720);
    const data = canvas.toDataURL('image/jpeg');
    this.dialogRef.close(data);
  }

}
