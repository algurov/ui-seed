import { Component, Input } from '@angular/core';
import { StringService } from '../../../../services/string.service';
import { MainService } from '../../../../services/main.service';

@Component({
  selector: 'application-title',
  templateUrl: './application.title.component.html',
  styleUrls: ['./application.title.component.scss']
})
export class ApplicationTitleComponent {
  @Input() data: any;
  date: any;
  subscription: any;
  constructor(private stringService: StringService, private mainService: MainService) {
    this.subscription = this.mainService.applicationLoaded.subscribe(item => {
      if (item.creationDate) {
        this.date = new Date(item.creationDate);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  ngOnInit() {
      if(this.data.creationDate) {
        this.date = new Date(this.data.creationDate);
      }
  }

  onLaboratoryChange(lab) {
    this.data.laboratory = lab;
  }

  onDateChange(event) {
    this.date = event.value;
    this.data.creationDate = event.value.getTime();
  }
}
