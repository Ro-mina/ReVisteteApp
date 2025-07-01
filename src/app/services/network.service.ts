import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  async hayInternet(): Promise<boolean> {
    const status = await Network.getStatus();
    return status.connected;
  }
}
