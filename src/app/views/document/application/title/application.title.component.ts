import { Component, Input } from '@angular/core';
import { StringService } from '../../../../services/string.service';
import { MainService } from '../../../../services/main.service';
import {FormControl, Validators} from '@angular/forms';
import { DataService } from '../../../../services/data.service';

@Component({
  selector: 'application-title',
  templateUrl: './application.title.component.html',
  styleUrls: ['./application.title.component.scss']
})
export class ApplicationTitleComponent {
  @Input() data: any;
  date: Date;
  subscription: any;
  numberControl = new FormControl('', [Validators.required]);
  dateControl = new FormControl('', [Validators.required]);
  constructor(private stringService: StringService, private mainService: MainService,
    private dataService: DataService) {
    this.subscription = this.mainService.applicationLoaded.subscribe(item => {
      this.data = item;
      if (item.creationDate) {
        this.date = new Date(item.creationDate);
      } else {
        this.date = new Date();
        this.data.creationDate = this.date.getTime();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
      if(this.data.creationDate) {
        this.date = new Date(this.data.creationDate);
      } else {
        this.date = new Date();
        this.data.creationDate = this.date.getTime();
      }
  }

  onBranchChange(lab) {
    this.data.branchOffice = lab;
  }

  onDateChange(event) {
    this.date = this.dataService.dateOffset(event.value);
    this.data.creationDate = this.date.getTime();
  }
}
