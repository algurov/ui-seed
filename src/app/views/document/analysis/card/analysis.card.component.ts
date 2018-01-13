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
  subscriptions: Array<any> = new Array<any>();
  @ViewChild(CerealsCardComponent) cereals : CerealsCardComponent;
  constructor(private route: ActivatedRoute, private router: Router, private dialogService: DialogService,
    private documentService: DocumentService, private mainService: MainService) {
    this.dialogService.showBlocker();
    this.subscriptions.push(this.route.params.subscribe(params => {
      if (params['id']) {
          this.dialogService.block = true;
        this.id = +params['id'];
       this.documentService.getAnalysisCardById(this.id).subscribe(res=> {
         this.data = res;
         console.log(this.data);
         console.log(JSON.stringify(this.data));
         //this.mainService.actLoaded.emit(this.data);
         this.dialogService.block = false;
       });
     }
   }));
    this.subscriptions.push(this.mainService.menuActionPerformed.subscribe(action => {
      if (action == 'SAVE_ANALYSIS_CARD') {
        this.save();
      }
      if (action == 'SIGN_ANALYSIS_CARD') {
        this.dialogService.showSignDialog(this.id, 'ANALYSIS_CARDS');
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(item => item.unsubscribe());
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

  unwrapGoodsCategories() {
      let res = [];
      this.data.goodsCategories.forEach(item => res.push({id: item.id, version: item.version}));
      this.data.goodsCategories = res;
      let cutGoods = {id: this.data.goods.id, version: this.data.goods.version};
      this.data.goods = cutGoods;
      let cutAssignment = {id: this.data.assignment.id, version: this.data.assignment.version};
      this.data.assignment = cutAssignment;
      let res1 = [];
      this.data.standards.forEach(item => res1.push({id: item.id, version: item.version}));
      this.data.standards = res1;

  }

  clearData() {
      this.data.analysisCardPropertyValues.forEach(item => this.removeUuid(item));
      this.data.goodsCategories.forEach(item => this.removeChildren(item));
      this.unwrapGoodsCategories();
  }

  save() {
    this.clearData();
    console.log('SAVE');
    console.log(this.data);
    console.log(JSON.stringify(this.data));
    if (this.isCerealsCard()) {
      this.cereals.prepareToSave();
    }
    this.dialogService.showBlocker();
    this.documentService.updateAnalysisCard(this.data).subscribe(res => {
      this.dialogService.hideBlocker();
      this.router.navigate(['main/document/application/' + this.data.applicationId + '/view']);
      this.dialogService.showNotification('Карточка анализа сохранена');
      console.log('answer');
      console.log(JSON.stringify(res));
    });
  }
}
