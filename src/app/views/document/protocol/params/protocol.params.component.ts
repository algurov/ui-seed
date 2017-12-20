import { Component, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { StringService } from '../../../../services/string.service';
import { MainService } from '../../../../services/main.service';
import { DocumentService } from '../../../../services/document.service';
import { DialogService } from '../../../../services/dialog.service';
import { GoodsCategoryDialog } from '../goods.category.dilalog/goods.category.dialog';
import { MatDialog } from '@angular/material';
import { TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions, TreeComponent } from 'angular2-tree-component';
@Component({
  selector: 'protocol-params',
  templateUrl: './protocol.params.component.html',
  styleUrls: ['./protocol.params.component.scss']
})
export class ProtocolParamsComponent {
  options: ITreeOptions = {
    idField: 'uuid',
    actionMapping: {
    mouse: {
      click: (tree, node, $event) => {}
    }
  }

}
  @ViewChildren(TreeComponent)
  private trees: QueryList<TreeComponent>;
  @Input() data: any;
  date: any;
  @Input() act: any;
  subscription: any;
  goodsCategories: any;
  preview: any;
  securityTree: any;
  qualityTree: any;
  qualityVisible: boolean = true;
  securityVisible: boolean = true;
  constructor(private stringService: StringService, private mainService: MainService,
    private documentService: DocumentService, private dialog: MatDialog,
    private dialogService: DialogService) {
      this.mainService.protocolLoaded.subscribe(item => {
        // this.data = item;
        this.preview = item.researchProtocolItems;
        this.preparePreviewData();
      });
  }

  ngOnDestroy() {
  }

  ngOnInit() {

  }

  toggleQualityVisibility() {
    this.qualityVisible = !this.qualityVisible;
  }

  toggleSequrityVisibility() {
    this.securityVisible = !this.securityVisible;
  }

  preparePreviewData() {
    this.securityTree = [];
    this.qualityTree = [];
    this.preview.forEach(item => {
        item.isExpanded = true;
        if(item.propertyType) {
        if (item.propertyType.id == 1) {
          this.qualityTree.push(item);
        } else {
          this.securityTree.push(item);
        }
      }
    });
  }

  createParams() {
    let dialogRef = this.dialog.open(GoodsCategoryDialog, {data:{actId: this.data.act? this.data.act.id : this.act.id}});
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.goodsCategories = result;
          this.data.goodsCategoriesIds = result;
          console.log(this.data.goodsCategoriesIds);
          console.log(this.act.id);
          this.dialogService.showBlocker();
          this.documentService.previewProtocol(this.act.id, this.goodsCategories).subscribe(preview => {
            console.log(preview);
            this.preview = preview;
            this.preparePreviewData();
            this.dialogService.hideBlocker();
          });
        }
      });
    this.documentService.getGoodsCategories(this.act.id).subscribe(res => {
      console.log(res);
    })
  }
}
