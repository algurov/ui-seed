import { Component, Input } from '@angular/core';
import { MainService } from '../../../../services/main.service';

@Component({
  selector: 'act-proof',
  templateUrl: './act.proof.component.html',
  styleUrls: ['./act.proof.component.scss']
})
export class ActProofComponent {
  @Input() data: any;
  isProof: boolean = false;
  constructor(private mainService: MainService) {
    this.mainService.actLoaded.subscribe(item => {
      if (item.numberAndDate || item.issuedBy) {
        this.isProof = true;
      }
    });
  }

  proofChange(event) {
    this.isProof = event.checked;
    if (this.isProof == false) {
      this.data.numberAndDate = '';
      this.data.issuedBy = '';
    }
  }
}
