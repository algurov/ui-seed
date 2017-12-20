import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../../../services/dialog.service';
import { DocumentService } from '../../../../services/document.service';
import { MainService } from '../../../../services/main.service';

@Component({
  selector: 'analysis-card',
  templateUrl: './analysis.card.component.html',
  styleUrls: ['./analysis.card.component.scss']
})
export class AnalysisCardComponent {
  id: number;
  data: any;
  constructor(private route: ActivatedRoute, private router: Router, private dialogService: DialogService,
    private documentService: DocumentService, private mainService: MainService) {
    this.dialogService.showBlocker();
    this.route.params.subscribe(params => {
      if (params['id']) {
          this.dialogService.block = true;
        this.id = +params['id'];
       this.documentService.getAnalysisCardById(this.id).subscribe(res=> {
         this.data = res;
         console.log(this.data);
         //this.mainService.actLoaded.emit(this.data);
         this.dialogService.block = false;
       });
     }
    });
    this.mainService.menuActionPerformed.subscribe(action => {
      if (action == 'SAVE_ANALYSIS_CARD') {
        this.save();
      }
    });
  }

  ngOnInit() {
    this.mainService.menuChange.emit({name:'ANALYSIS_CARD_EDIT', state: this.id? true: false});
  }

  isMixCard() {
    return this.data? this.data.analysisCardType.code == 'MIX_ANALYSIS_CARD' : false;
  }

  onDataChange(event) {
    console.log('data changed!');
    this.data = event.data;
  }

  save() {
    console.log('SAVE');
    console.log(this.data);
    this.documentService.updateAnalysisCard(this.data).subscribe(res => {
      this.dialogService.showNotification('saved');
    });
  }
}
