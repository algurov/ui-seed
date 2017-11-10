import { Component, Input } from '@angular/core';
import { StringService } from '../../../../services/string.service';
import { MainService } from '../../../../services/main.service';

@Component({
  selector: 'act-title',
  templateUrl: './act.title.component.html',
  styleUrls: ['./act.title.component.scss']
})
export class ActTitleComponent {
  @Input() data: any;
  date: any;
  subscription: any;
  constructor(private stringService: StringService, private mainService: MainService) {
    this.subscription = this.mainService.actLoaded.subscribe(item => {
      if (item.actDate) {
        this.date = new Date(item.actDate);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
      if(this.data.actDate) {
        this.date = new Date(this.data.actDate);
      }
  }

  onLaboratoryChange(lab) {
    this.data.laboratory = lab;
  }

  onDateChange(event) {
    this.date = event.value;
    this.data.actDate = event.value.getTime();
  }
}
