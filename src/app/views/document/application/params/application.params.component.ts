import { Component, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { StringService } from '../../../../services/string.service';
import { TaxonomyService } from '../../../../services/taxonomy.service';
import { MatSelect, MatSelectChange, MatOption } from '@angular/material';
import { MainService } from '../../../../services/main.service';

@Component({
  selector: 'application-params',
  templateUrl: './application.params.component.html',
  styleUrls: ['./application.params.component.scss']
})
export class ApplicationParamsComponent {
  @Input() data;
  @ViewChild('resDocuments') resDocuments : MatSelect;
  @ViewChildren('resOptions') resOptions : QueryList<MatOption>;
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
  stateTargetDocuments = [];
  stateResearchType: any = 0;
  constructor(private stringService: StringService, private taxonomyService: TaxonomyService,
    private mainService: MainService){
    this.taxonomyService.loadTaxonomyData('TargetDocuments').subscribe(res => {
      this.options = res.content;
    });
    this.taxonomyService.loadTaxonomyData('ResearchType').subscribe(res => {
      this.researchType = res.content;
      this.processResearchType();
    });
    this.mainService.applicationLoaded.subscribe(item => {
      if (item.targetDocuments) {
        item.targetDocuments.forEach(item => {
          this.stateTargetDocuments.push(+item.id);
        });
        this.stateTargetDocuments.forEach(i => {
          let found = this.resDocuments.options.find(opt => opt.value == i)
          if (found) {
            found.select();
          }
          this.resDocuments.value = this.stateTargetDocuments;
        });
        console.log(this.resDocuments.value);
      }
      if (item.researchType) {
          this.stateResearchType = +item.researchType.id;
      }
    });
  }

  ngOnInit() {
    if (this.data.targetDocuments) {
      this.data.targetDocuments.forEach(item => {
        this.stateTargetDocuments.push(+item.id);
      });
    }
    if (this.data.researchType) {
        this.stateResearchType = +this.data.researchType.id;
    }

  }

  onResearchTypeChange(event: MatSelectChange) {
    this.stateResearchType = event.value;
    let found = this.researchType.find(item => item.id == event.value);
    this.data.researchType = Object.assign({},found);
    delete this.data.researchType.children;
  }

  onTartgetDocumentsChange(event : MatSelectChange) {
    let parentFound = false;
    let childFound = false;
    event.value.forEach(item => {
      if (item == 2) {
        parentFound = true;
      }
      if (item == 1) {
        childFound = true;
      }
    });
    this.data.targetDocuments = this.findResultingDocumentsById(event.value);
    this.stateTargetDocuments = event.value;
    if (parentFound && !childFound) {

      this.stateTargetDocuments.push(1);
      this.data.targetDocuments =this.findResultingDocumentsById(this.stateTargetDocuments);
      event.source.options.forEach(op => {
        if (op.value == 1) {
            op.select();
        }
      });
    }
  }

  findResultingDocumentsById(ids: Array<number>){
    let result = [];
    ids.forEach(id => {
    result.push(this.options.find(item => item.id == id));
    });
    return result;
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
