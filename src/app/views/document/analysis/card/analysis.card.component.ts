import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../../../services/dialog.service';
import { DocumentService } from '../../../../services/document.service';
import { MainService } from '../../../../services/main.service';
import { CerealsCardComponent } from '../cereals/cereals.card.component';

@Component({
  selector: 'analysis-card',
  templateUrl: './analysis.card.component.html',
  styleUrls: ['./analysis.card.component.scss']
})
export class AnalysisCardComponent {
  id: number;
  data: any;
  @ViewChild(CerealsCardComponent) cereals : CerealsCardComponent;
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
      if (action == 'SIGN_ANALYSIS_CARD') {
        this.dialogService.showSignDialog(this.id, 'ANALYSIS_CARDS');
      }
    });
  }

  ngOnInit() {
    this.mainService.menuChange.emit({name:'ANALYSIS_CARD_EDIT', state: this.id? true: false});
  }

  isMixCard() {
    return this.data? this.data.analysisCardType.code == 'MIX_ANALYSIS_CARD' : false;
  }

  isGrainCard() {
    return this.data? this.data.analysisCardType.code == 'GRAIN_ANALYSIS_CARD' : false;
  }

  isFlourCard() {
    return this.data? this.data.analysisCardType.code == 'FLOUR_ANALYSIS_CARD' : false;
  }

  isCerealsCard() {
    return this.data? this.data.analysisCardType.code == 'CEREALS_ANALYSIS_CARD' : false;
  }


  onDataChange(event) {
    this.data = event.data;
  }

  removeUuid(item) {
    delete item.uuid;
    if (item.children) {
      item.children.forEach(it => this.removeUuid(it));
    }
  }

  removeChildren(item) {
    if (item.children) {
      item.children.forEach(it => this.removeChildren(it));
    }
    delete item.children;
  }

  clearData() {
      this.data.analysisCardPropertyValues.forEach(item => this.removeUuid(item));
      this.data.goodsCategories.forEach(item => this.removeChildren(item));
  }

  save() {
    this.clearData();
    console.log('SAVE');
    console.log(this.data);
    console.log(JSON.stringify(this.data));
    if (this.isCerealsCard()) {
      this.cereals.prepareToSave();
    }
    this.documentService.updateAnalysisCard(this.data).subscribe(res => {
      this.dialogService.showNotification('saved');
    });
  }
}
