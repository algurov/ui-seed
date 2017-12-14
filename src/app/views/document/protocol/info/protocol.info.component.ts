import { Component, Input } from '@angular/core';
import { StringService } from '../../../../services/string.service';
import { MainService } from '../../../../services/main.service';
import { DataService } from '../../../../services/data.service';
@Component({
  selector: 'protocol-info',
  templateUrl: './protocol.info.component.html',
  styleUrls: ['./protocol.info.component.scss']
})
export class ProtocolInfoComponent {
  @Input() data: any;
  date: any;
  subscription: any;
  laboratoryVisible: boolean = false;
  partnerVisible: boolean = false;
  goodsVisible: boolean = false;
  resultsTo : any = 'SAMPLE';
  resultToOptions = [{name: 'Пробу', value: 'SAMPLE'}, {name: 'Партию', value: 'PART'}];
  constructor(private stringService: StringService, private mainService: MainService,
    private dataService: DataService) {
    this.subscription = this.mainService.protocolLoaded.subscribe(item => {
      this.data = item;
      this.resultsTo = item.researchFor;
      if (item.date) {
        this.date = new Date(item.date);
      } else {
        this.date = new Date();
        this.data.date = this.date.getTime();
      }
    });
  }

  resultsToChanged(event) {
    this.resultsTo = event.value;
    this.data.researchFor = this.resultsTo;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
      if(this.data.date) {
        this.date = new Date(this.data.date);
      } else {
        this.date = new Date();
        this.data.date = this.date.getTime();
      }
  }

  onDateChange(event) {
    this.date = this.dataService.dateOffset(event.value);
    this.data.date = this.date.getTime();
  }

}
