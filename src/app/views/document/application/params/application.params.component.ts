import { Component, Input } from '@angular/core';
import { StringService } from '../../../../services/string.service';
import { TaxonomyService } from '../../../../services/taxonomy.service';
import { MatSelect, MatSelectChange } from '@angular/material';

@Component({
  selector: 'application-params',
  templateUrl: './application.params.component.html',
  styleUrls: ['./application.params.component.scss']
})
export class ApplicationParamsComponent {
  @Input() data;
  options = [];
  researchType = [
    // {
    //   id: 3,
    //   name: 'showSelectTaxonomyDialog',
    //   parent: 1
    // },
    // {
    //   id: 1,
    //   name: 'ResearchType',
    //   parent: null
    // },
    // {
    //   id: 2,
    //   name: 'FirstChild',
    //   parent: 1
    // }

  ];
  researchTypeOptions = [];
  constructor(private stringService: StringService, private taxonomyService: TaxonomyService){
    this.taxonomyService.loadTaxonomyData('TargetDocuments').subscribe(res => {
      this.options = res.content;
    });
    this.taxonomyService.loadTaxonomyData('ResearchType').subscribe(res => {
      this.researchType = res.content;
      this.processResearchType();
    });

  }

  onTartgetDocumentsChange(event : MatSelectChange) {
    let parentFound = false;
    let childFound = false;
    event.value.forEach(item => {
      if (item.id == 2) {
        parentFound = true;
      }
      if (item.id == 1) {
        childFound = true;
      }
    });
    this.data.resultingDocuments = event.value;
    if (parentFound && !childFound) {

      this.data.resultingDocuments.push({id: 1});
      event.source.options.forEach(op => {
        if (op.value.id == 1) {
            op.select();
        }
      });
    }
  }

  processResearchType() {
    this.researchType.sort((n1, n2) => {
      if(n1.parent == null && n2.parent == null) {
        return 0;
      }
      if(n1.parent == null && n2.parent != null) {
        return -1;
      }
      if(n1.parent != null && n2.parent == null) {
        return 1;
      }
    });
    this.researchType.forEach(item => {
      let found = this.researchTypeOptions.find(it => {
        if (!item.parent) return false;
        return it.id == item.parent.id
      });
      if (found) {
        if (!found.children) {
          found.children = [];
        }
        found.children.push(item);
      } else {
        this.researchTypeOptions.push(item);
      }
    });
  }
}
