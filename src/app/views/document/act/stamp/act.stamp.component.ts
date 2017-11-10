import { Component, Input } from '@angular/core';
import { MainService } from '../../../../services/main.service';

@Component({
  selector: 'act-stamp',
  templateUrl: './act.stamp.component.html',
  styleUrls: ['./act.stamp.component.scss']
})
export class ActStampComponent {
  @Input() data: any;
  subscription: any;
  stamp: boolean;
  seal: boolean;
  constructor(private mainService: MainService) {
    this.subscription = this.mainService.actLoaded.subscribe(item => {
      if(item.sealType) {
        if(item.sealType == 'STAMP') {
          this.stamp = true;
          this.seal = false;
        } else {
          this.seal = true;
          this.stamp = false;
        }
      }
    });
  }

  stampChange(event) {
    if (event.checked == true) {
      this.stamp = true;
      this.seal = false;
      this.data.sealType = 'STAMP';
      console.log(this.data.sealType);
    }
  }

  sealChange(event) {
    if (event.checked == true) {
      this.seal = true;
      this.stamp = false;
      this.data.sealType = 'SEAl';
      console.log(this.data.sealType);
    }
  }

  onLaboratoryChange(lab) {
    this.data.analyzingLaboratory = lab;
  }
}
