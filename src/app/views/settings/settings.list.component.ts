import { Component } from '@angular/core';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'settings-list',
  templateUrl: './settings.list.component.html',
  styleUrls: ['./settings.list.component.scss']
})
export class SettingsListComponent {
  constructor(private mainService: MainService) {}
  ngOnInit() {
    this.mainService.menuChange.emit({name:'EMPTY'});
  }
}
