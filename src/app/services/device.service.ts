import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor() { }

  getDeviceType(): string {
    if (window.matchMedia('(max-width: 768px)').matches) {
      return 'Mobile';
    }
    return 'Desktop';
  }

  getViewportSize(): { width: number; height: number } {
    /* This returns internal screen size */
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  getScreenSize(): { width: number; height: number } {
    return {
      width: screen.width,
      height: screen.height,
    };
  }

  getClientInfo() {
    return {
      deviceType: this.getDeviceType(),
      viewScreen: this.getViewportSize(),
    };
  }
}
