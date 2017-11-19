import { Component, Input } from '@angular/core';
import { StringService } from '../../../../services/string.service';
import { MainService } from '../../../../services/main.service';

@Component({
  selector: 'direction-act',
  templateUrl: './direction.act.component.html',
  styleUrls: ['./direction.act.component.scss']
})
export class DirectionActComponent {
  @Input() data: any;
  date: any;
  subscription: any;
  productName: string;
  sampleNumber: string;
  constructor(private stringService: StringService, private mainService: MainService) {
    this.subscription = this.mainService.directionLoaded.subscribe(item => {
      if (item.dateByWhen) {
        this.date = new Date(item.dateByWhen);
      }
      if (item.goods) {
        this.productName  = item.goods.fullNameRu;
      }
      if (item.act) {
        this.sampleNumber = item.act.sampleNumber;
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
      if(this.data.date) {
        this.date = new Date(this.data.date);
      }
  }

  onLaboratoryChange(lab) {
    this.data.laboratory = lab;
  }

  onDateChange(event) {
    this.date = event.value;
    this.data.dateByWhen = event.value.getTime();
  }

  onSampleNumberChange($event) {

  }

}
