import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../../../services/dialog.service';
import { DocumentService } from '../../../../services/document.service';
import { DataService } from '../../../../services/data.service';
@Component({
  selector: 'mix-card',
  templateUrl: './mix.card.component.html',
  styleUrls: ['./mix.card.component.scss']
})
export class MixCardComponent {
  @Input() data;
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  number: string = '';
  date = new Date();
  standards: string = '';
  outwardAppearance: string = '';
  color: string = '';
  smell: string = '';
  moisture: number = null;
  passSieves: number = null;
  passSievesNumber: number = null;
  passSievesAdditional: string = '';
  remainderOnSieve: number = null;
  remainderOnSieveNumber: number = null;
  remainderOnSieveAdditional: string = '';
  protein: number = null;
  wetFiber: number = null;
  rawFat: number = null;
  ashInsolubleHCl: number = null;
  calcium: number = null;
  natrium: number = null;
  phosphorus: number = null;
  lysine: number = null;
  methionineCystine: number = null;
  metallicImpurity: number = null;
  insectInfestation: number = null;
  insectInfestationText: string = '';
  metabolizedEnergyContent100: number = null;
  recipe: string = '';
  constructor(private route: ActivatedRoute, private router: Router, private dialogService: DialogService,
    private documentService: DocumentService, private dataService: DataService) {

  }

  ngOnInit() {
    this.collectStandardNames();
    this.collectData();
  }

  collectStandardNames() {
    this.standards = '';
    this.data.standards.forEach(standard => {
      this.standards += standard.fullName + ', ';
    });
    if (this.standards.length > 0) {
      this.standards = this.standards.substr(0, this.standards.length - 2);
    }
  }

  collectData() {
    this.number = this.data.docNumber;
    if (this.data.creationDate) {
      this.date = new Date(this.data.creationDate);
    } else {
      this.date = new Date();
    }
    this.recipe = this.data.recipe;
    this.outwardAppearance = this.getStringValueByCode('OutwardAppearance');
    this.color = this.getStringValueByCode('Colour');
    this.smell = this.getStringValueByCode('Smell');
    this.moisture = this.getDoubleValueByCode('Moisture');
    this.passSieves = this.getDoubleValueByCode('PassSieves');
    this.passSievesNumber = this.getAdditionalDoubleValueByCode('PassSieves', 'NUMBER');
    this.passSievesAdditional = this.getAdditionalStringValueByCode('PassSieves', 'TEXT');
    this.remainderOnSieve = this.getDoubleValueByCode('RemainderOnSieve');
    this.remainderOnSieveNumber = this.getAdditionalDoubleValueByCode('RemainderOnSieve', 'NUMBER');
    this.remainderOnSieveAdditional = this.getAdditionalStringValueByCode('RemainderOnSieve', 'TEXT');
    this.protein = this.getDoubleValueByCode('Protein');
    this.wetFiber = this.getDoubleValueByCode('WetFiber');
    this.rawFat = this.getDoubleValueByCode('RawFat');
    this.ashInsolubleHCl = this.getDoubleValueByCode('AshInsolubleHCl');
    this.calcium = this.getDoubleValueByCode('Calcium');
    this.natrium = this.getDoubleValueByCode('Natrium');
    this.phosphorus = this.getDoubleValueByCode('Phosphorus');
    this.lysine = this.getDoubleValueByCode('Lysine');
    this.methionineCystine = this.getDoubleValueByCode('MethionineCystine');
    this.metallicImpurity = this.getDoubleValueByCode('MetallicImpurity');
    this.insectInfestation = this.getDoubleValueByCode('InsectInfestation');
    this.insectInfestationText = this.getAdditionalStringValueByCode('InsectInfestation', 'TEXT');
    this.metabolizedEnergyContent100 = this.getDoubleValueByCode('MetabolizedEnergyContent100');
  }

  onRecipeChange(event) {
    this.recipe = event.target.value;
    this.data.recipe = this.recipe;
    this.dataChange.emit({data: this.data});
  }

  onNumberChange(event) {
    this.number = event.target.value;
    this.data.docNumber = this.number;
    this.dataChange.emit({data: this.data});
  }

  onDateChange(event) {
    this.date = this.dataService.dateOffset(event.value);;
    this.data.creationDate = this.date.getTime();
    this.dataChange.emit({data: this.data});
  }

  onOutwardAppearanceChange(event) {
    this.outwardAppearance = event.target.value;
    this.setStringValueByCode('OutwardAppearance', this.outwardAppearance);
  }

  onColorChange(event) {
    this.color = event.target.value;
    this.setStringValueByCode('Colour', this.color);
  }

  onSmellChange(event) {
    this.smell = event.target.value;
    this.setStringValueByCode('Smell', this.smell);
  }

  onMoistureChange(event) {
    this.moisture = event.target.value;
    this.setDoubleValueByCode('Moisture', this.moisture);
  }

  onPassSievesChange(event) {
    this.passSieves = event.target.value;
    this.setDoubleValueByCode('PassSieves', this.passSieves);
  }

  onPassSievesNumberChange(event) {
    this.passSievesNumber = event.target.value;
    this.setAdditionalDoubleValueByCode('PassSieves','NUMBER', this.passSievesNumber);
  }

  onPassSievesAdditionalChange(event) {
    this.passSievesAdditional = event.target.value;
    this.setAdditionalStringValueByCode('PassSieves','TEXT', this.passSievesAdditional);
  }

  onRemainderOnSieveChange(event) {
    this.remainderOnSieve= event.target.value;
    this.setDoubleValueByCode('RemainderOnSieve', this.remainderOnSieve);
  }

  onRemainderOnSieveNumberChange(event) {
    this.remainderOnSieveNumber = event.target.value;
    this.setAdditionalDoubleValueByCode('RemainderOnSieve', 'NUMBER', this.remainderOnSieveNumber);
  }

  onRemainderOnSieveAdditionalChange(event) {
    this.remainderOnSieveAdditional = event.target.value;
    this.setAdditionalStringValueByCode('RemainderOnSieve','TEXT', this.remainderOnSieveAdditional);
  }


  getStringValueByCode(code) {
    let found = this.data.analysisCardPropertyValues.find(item => item.property.description == code);
    if (found) {
      return found.textValue;
    }
  }

  onProteinChange(event) {
    this.protein = event.target.value;
    this.setDoubleValueByCode('Protein', this.protein);
  }

  onWetFiberChange(event) {
    this.wetFiber = event.target.value;
    this.setDoubleValueByCode('WetFiber', this.wetFiber);
  }

  onRawFatChange(event) {
    this.rawFat = event.target.value;
    this.setDoubleValueByCode('RawFat', this.rawFat);
  }

  onAshInsolubleHClChange(event) {
    this.ashInsolubleHCl = event.target.value;
    this.setDoubleValueByCode('AshInsolubleHCl', this.ashInsolubleHCl);
  }

  onCalciumChange(event) {
    this.calcium = event.target.value;
    this.setDoubleValueByCode('Calcium', this.calcium);
  }

  onNatriumChange(event) {
    this.natrium = event.target.value;
    this.setDoubleValueByCode('Natrium', this.natrium);
  }

  onPhosphorusChange(event) {
    this.phosphorus = event.target.value;
    this.setDoubleValueByCode('Phosphorus', this.phosphorus);
  }

  onLysineChange(event) {
    this.lysine = event.target.value;
    this.setDoubleValueByCode('Lysine', this.lysine);
  }

  onMethionineCystineChange(event) {
    this.methionineCystine = event.target.value;
    this.setDoubleValueByCode('MethionineCystine', this.methionineCystine);
  }

  onMetallicImpurityChange(event) {
    this.metallicImpurity = event.target.value;
    this.setDoubleValueByCode('MetallicImpurity', this.metallicImpurity);
  }

  onInsectInfestationChange(event) {
    this.insectInfestation = event.target.value;
    this.setDoubleValueByCode('InsectInfestation', this.insectInfestation);
  }

  onInsectInfestationTextChange(event) {
    this.insectInfestationText = event.target.value;
    this.setAdditionalStringValueByCode('InsectInfestation', 'TEXT', this.insectInfestationText);
  }

  onMetabolizedEnergyContent100Change(event) {
    this.metabolizedEnergyContent100 = event.target.value;
    this.setDoubleValueByCode('MetabolizedEnergyContent100', this.metabolizedEnergyContent100);
  }





  getDoubleValueByCode(code) {
    let found = this.data.analysisCardPropertyValues.find(item => item.property.description == code);
    if (found) {
      return found.doubleValue;
    }
  }

  setStringValueByCode(code, value) {
    let found = this.data.analysisCardPropertyValues.find(item => item.property.description == code);
    if (found) {
      found.textValue = value;
      this.dataChange.emit({data: this.data});
    }
  }

  setAdditionalDoubleValueByCode(code, additional, value) {
    let found = this.data.analysisCardPropertyValues.find(item => item.property.description == code);
    if (found) {
      let sub = found.additionalAnalysisCardPropertyValues.find(it => it.additionalAnalysisCardProperty.descriptor == additional);
      if (sub) {
        sub.doubleValue = value;
        this.dataChange.emit({data: this.data});
      }
    }
  }

  getAdditionalDoubleValueByCode(code, additional) {
    let found = this.data.analysisCardPropertyValues.find(item => item.property.description == code);
    if (found) {
      let sub = found.additionalAnalysisCardPropertyValues.find(it => it.additionalAnalysisCardProperty.descriptor == additional);
      if (sub) {
        return sub.doubleValue;
      }
    }
  }

  setAdditionalStringValueByCode(code, additional, value) {
    let found = this.data.analysisCardPropertyValues.find(item => item.property.description == code);
    if (found) {
      let sub = found.additionalAnalysisCardPropertyValues.find(it => it.additionalAnalysisCardProperty.descriptor == additional);
      if (sub) {
        sub.textValue = value;
        this.dataChange.emit({data: this.data});
      }
    }
  }

  getAdditionalStringValueByCode(code, additional) {
    let found = this.data.analysisCardPropertyValues.find(item => item.property.description == code);
    if (found) {
      let sub = found.additionalAnalysisCardPropertyValues.find(it => it.additionalAnalysisCardProperty.descriptor == additional);
      if (sub) {
        return sub.textValue;
      }
    }
  }

  setDoubleValueByCode(code, value) {
    let found = this.data.analysisCardPropertyValues.find(item => item.property.description == code);
    if (found) {
      found.doubleValue = value;
      this.dataChange.emit({data: this.data});
    }
  }

  getPropertyTitleByCode(code) {
    let found = this.data.analysisCardPropertyValues.find(item => item.property.description == code);
    if (found) {
      return found.property.nameRu;
    }
  }

  getPropertyUnitByCode(code) {
    let found = this.data.analysisCardPropertyValues.find(item => item.property.description == code);
    if (found) {
      return found.property.units[0].nameRu;
    }
  }

  getAdditionalPropertyTitleByCode(code, additional) {
    let found = this.data.analysisCardPropertyValues.find(item => item.property.description == code);
    if (found) {
      let sub = found.additionalAnalysisCardPropertyValues.find(it => it.additionalAnalysisCardProperty.descriptor == additional);
      if (sub) {
        return sub.additionalAnalysisCardProperty.name;
      }
    }
  }
}
