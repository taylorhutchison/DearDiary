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

  videoDevices: any[] = [];

  constructor(public dialogRef: MatDialogRef<SelfieComponent>) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.video!.nativeElement.srcObject = null;
    this.stream!.getTracks()[0].stop();
  }

  async ngAfterViewInit() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.videoDevices = devices.filter(d => d.kind == "videoinput")
        .sort((a: MediaDeviceInfo, b: MediaDeviceInfo) => {
          if (a.label.toLowerCase().indexOf('built-in') != -1) {
            return -1;
          }
          return 0;
        }).map(d => {
          return {
            deviceId: d.deviceId,
            label: d.label.replace(/\(.*\)/gi, '')
          }
        })
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: this.videoDevices[0].deviceId }
      });
      this.video!.nativeElement.srcObject = this.stream;
    }
    catch (error) {
      this.error = error;
    }
  }

  capture() {
    const canvas = document.createElement('canvas');
    canvas.width = 960;
    canvas.height = 720;
    const context = canvas.getContext('2d');
    context!.drawImage(this.video!.nativeElement, 0, 0, 960, 720);
    const data = canvas.toDataURL('image/jpeg');
    this.dialogRef.close(data);
  }

  async changeStream(event: any) {
    const deviceId = event.target.value;
    this.video!.nativeElement.srcObject = null;
    this.stream!.getTracks()[0].stop();
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: deviceId }
    });
    this.video!.nativeElement.srcObject = this.stream;
  }

}
