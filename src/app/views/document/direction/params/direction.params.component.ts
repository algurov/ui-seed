import { Component, Input } from '@angular/core';
import { MainService } from '../../../../services/main.service';

@Component({
  selector: 'direction-params',
  templateUrl: './direction.params.component.html',
  styleUrls: ['./direction.params.component.scss']
})
export class DirectionParamsComponent {
  @Input() data: any;
  researchStandardOptions: Array<any> = new Array<any>();
  constructor(private mainService : MainService) {
    this.mainService.directionLoaded.subscribe(item => {
      if (item.application) {
        item.application.applicationStandardResearches.forEach(it => {
          if (!it.customContract) {
            let found = item.standards.find(toFind => toFind.id == it.standard.id);
            this.researchStandardOptions.push({id: this.researchStandardOptions.length, checked: found?true:false, value: it});
          }
        });
      }
    });
  }

  getStandardTitle(research) {
    if (research) {
      if (research.customContract) {
        return research.customContract.name;
      } else {
          return research.standard.shortName;
      }
    } else {
      return '';
    }
  }

  stringify(obj) {
    if (obj) {
      return JSON.stringify(obj);
    }
  }

  changeStandardSelection(event) {
    let research = this.researchStandardOptions.find(item => item.id == +event.source.value).value;
    let standard = research.standard;
      this.mainService.standardChecked.emit({checked: event.checked, standard: standard});
    if (this.data.standards) {
      let found = this.data.standards.findIndex(item => item.id == standard.id);
      if (event.checked) {
        if (found < 0) {
          this.data.standards.push(standard);
        }
      } else {
        if (found >= 0) {
          this.data.standards.splice(found, 1);
          this.data.assignmentResearches.forEach((item, index) => {
            if (item.applicationResearch.goodsCategoryProperty.standard.id == standard.id) {
              this.data.assignmentResearches.splice(index, 1);
            }
          });
        }
      }
    }
    console.log(this.data.assignmentResearches);
  }
}
