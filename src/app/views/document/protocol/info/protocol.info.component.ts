import { Component, Input } from '@angular/core';
import { StringService } from '../../../../services/string.service';
import { MainService } from '../../../../services/main.service';

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
  constructor(private stringService: StringService, private mainService: MainService) {
    this.subscription = this.mainService.protocolLoaded.subscribe(item => {
      this.resultsTo = item.researchFor;
      if (item.date) {
        this.date = new Date(item.date);
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
      }
  }

  onDateChange(event) {
    this.date = event.value;
    this.data.date = event.value.getTime();
  }

}
