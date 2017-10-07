import { Injectable} from '@angular/core';
import { Settings } from '../models/settings';
import { MainService } from './main.service';

@Injectable()
export class SettingsService {
  settings: Settings;
  constructor(private mainService: MainService){
    this.mainService.partnerSelectedForUser.subscribe(res => this.updatePartner(res))
    this.settings = new Settings().deserialize(JSON.parse(this.get()));
    this.mainService.populateSettings.emit(this.settings);
  }

  updatePartner(partnerId) {
      this.settings.selectedPartnerId = partnerId;
      this.put(this.settings.serialize());
  }

  put(src: string) {
    localStorage.setItem('settings', src);
  }

  get() {
    return localStorage.getItem('settings');
  }

}
