import { Component, Input } from '@angular/core';
import { MainService } from '../../../../services/main.service';
import { DocumentService } from '../../../../services/document.service';

@Component({
  selector: 'direction-params',
  templateUrl: './direction.params.component.html',
  styleUrls: ['./direction.params.component.scss']
})
export class DirectionParamsComponent {
  @Input() data: any;
  researchStandardOptions: Array<any> = new Array<any>();
  researchContractOptions: Array<any> = new Array<any>();
  constructor(private mainService : MainService, private documentService: DocumentService) {
    this.mainService.directionLoaded.subscribe(item => {
        this.documentService.getStandardsForAssignment(item.id).subscribe(res => {
          res.forEach(it => {
            let found = item.standards.find(find => find.id == it.id);
            this.researchStandardOptions.push({id: this.researchStandardOptions.length, checked:found? true: false, value: it});
          });
        });
        this.documentService.getContractsForAssignment(item.id).subscribe(res => {
          res.forEach(it => {
            let found = item.customContracts.find(find => find.id == it.id);
            this.researchContractOptions.push({id: this.researchStandardOptions.length, checked: found? true:false, value: it});
          });
        });
    });
  }

  getStandardTitle(research) {
    if (research.name) {
      return research.name;
    }
    if (research.shortName) {
      return research.shortName;
    }
    return '';
  }

  stringify(obj) {
    if (obj) {
      return JSON.stringify(obj);
    }
  }

  // changeStandardSelection(event) {
  //   let research = this.researchStandardOptions.find(item => item.id == +event.source.value).value;
  //   let standard = null;
  //   if (research.standard) {
  //     standard = research.standard;
  //   } else {
  //     standard = research.customContract;
  //   }
  //     this.mainService.standardChecked.emit({checked: event.checked, standard: standard});
  //     if (!event.checked) {
  //     if (standard['@c'] == '.CustomContract') {
  //       this.data.assignmentResearches = this.data.assignmentResearches.filter(it => {
  //         if (it.applicationResearch.property) {
  //             return false;
  //           }
  //           return true;
  //         });
  //     }
  //   } else {
  //     return;
  //   }
  //   if (this.data.standards) {
  //     let found = this.data.standards.findIndex(item => item.id == standard.id);
  //     if (event.checked) {
  //       if (found < 0) {
  //         this.data.standards.push(standard);
  //       }
  //     } else {
  //       if (found >= 0) {
  //         this.data.standards.splice(found, 1);
  //       this.data.assignmentResearches = this.data.assignmentResearches.filter(it => {
  //         if (it.applicationResearch.goodsCategoryProperty) {
  //           if (it.applicationResearch.goodsCategoryProperty.standard.id == standard.id) {
  //             return false;
  //           }
  //         }
  //           return true;
  //         });
  //         // this.data.assignmentResearches.forEach((item, index) => {
  //         //   if (item.applicationResearch.goodsCategoryProperty) {
  //         //     if (item.applicationResearch.goodsCategoryProperty.standard.id == standard.id) {
  //         //       this.data.assignmentResearches.splice(index, 1);
  //         //     }
  //         //   }
  //         // });
  //       }
  //     }
  //   }
  //   console.log(this.data.assignmentResearches);
  // }

  changeStandardSelection(event) {
    let research = this.researchStandardOptions.find(item => item.id == +event.source.value).value;
    this.mainService.standardChecked.emit({checked: event.checked, contract: research});
    if (event.checked) {
      this.data.standards.push(research);
    } else {
      let index = this.data.standards.findIndex(item => item.id == research.id);
      if (index >= 0) {
        this.data.standards.splice(index, 1);
        //TODO remove from tree
      }
    }
    console.log(this.data.standards);
  }

  changeContractSelection(event) {
    let research = this.researchContractOptions.find(item => item.id == +event.source.value).value;
    this.mainService.contractChecked.emit({checked: event.checked, contract: research});
    if (event.checked) {
      this.data.customContracts.push(research);
    } else {
      let index = this.data.customContracts.findIndex(item => item.id == research.id);
      if (index >= 0) {
        this.data.customContracts.splice(index, 1);
        //TODO remove from tree
      }
    }
  }
}
