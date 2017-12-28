import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../../../services/dialog.service';
import { DocumentService } from '../../../../services/document.service';
import { DataService } from '../../../../services/data.service';
import { AnalysisPropertyTree } from '../property.tree/analysis.property.tree';
@Component({
  selector: 'flour-card',
  templateUrl: './flour.card.component.html',
  styleUrls: ['./flour.card.component.scss']
})
export class FlourCardComponent {
  @ViewChild(AnalysisPropertyTree) tree : AnalysisPropertyTree;
  @Input() data;
  @Output() dataChange: EventEmitter<any> = new EventEmitter<any>();
  number: string = '';
  date = new Date();
  standards: string = '';
  subType: string = '';
  testWeight : number = null;
  testWeightFirst : number = null;
  testWeightSecond : number = null;
  fallingNumber: number = null;
  fallingNumberFirst: number = null;
  fallingNumberSecond: number = null;
  portionWeight: number = null;
  color: string = '';
  smell: string = '';
  moisture: number = null;

  passSieves: number = null;
  passSievesNumber: number = null;
  passSievesAdditional: string = '';
  passSievesPortion: number = null;

  remainderOnSieve: number = null;
  remainderOnSieveNumber: number = null;
  remainderOnSieveAdditional: string = '';
  remainderOnSievePortion: number = null;

  metallicImpurity: number = null;
  metallicImpuritySize: number = null;

  vitreousness: number = null;
  vitreousnessFirst: number = null;
  vitreousnessSecond: number = null;
  giuten: number = null;
  giutenNumber: number = null;
  giutenPortion: number = null;
  giutenGroup: string = '';
  giutenIndex: string = '';
  scarious: number = null;
  scariousFirst: number = null;
  scariousSecond: number = null;
  contentOfKernel: number = null;
  cornBug: number = null;
  cornBugFirst: number = null;
  cornBugSecond: number = null;
  seedGrainWithWeevilCaterpillar: number = null;
  seedGrainWithWeevilCaterpillarFirst: number = null;
  seedGrainWithWeevilCaterpillarSecond: number = null;

  agrestalAdmixture: any;
  cultivatedGrain: any;
  grainAdmixture: any;
  typeGoodsCategory: any;
  classGoodsCategory: any;


  taste: string = '';
  crunch: string = '';
  ashInsoluble: number = null;
  whiteness: number = null;


  protein: number = null;
  wetFiber: number = null;
  rawFat: number = null;
  ashInsolubleHCl: number = null;
  calcium: number = null;
  natrium: number = null;
  phosphorus: number = null;
  lysine: number = null;
  methionineCystine: number = null;
  insectInfestation: number = null;
  insectInfestationText: string = '';
  deadInsectInfestation: number = null;
  deadInsectInfestationText: string = '';
  metabolizedEnergyContent100: number = null;
  constructor(private route: ActivatedRoute, private router: Router, private dialogService: DialogService,
    private documentService: DocumentService, private dataService: DataService) {

  }

  ngOnInit() {
    this.collectGoodsCategories();
    this.collectStandardNames();
    this.collectData();
  }

  collectGoodsCategories() {
      this.typeGoodsCategory = this.data.goodsCategories.find(item => item.goodsCategoryType.id == 1);
      this.classGoodsCategory = this.data.goodsCategories.find(item => item.goodsCategoryType.id == 2);
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
    this.crunch = this.getStringValueByCode('Сrunch');
    this.taste = this.getStringValueByCode('Taste');
    this.ashInsoluble = this.getDoubleValueByCode('AshInsoluble');
    this.whiteness = this.getDoubleValueByCode('Whiteness');

    this.metallicImpurity = this.getDoubleValueByCode('MetallicImpurity');
    this.metallicImpuritySize = this.getAdditionalDoubleValueByCode('MetallicImpurity', 'SIZE');

    this.agrestalAdmixture = this.getAnalysisCardPropertyValueByCode('AgrestalAdmixture');
    this.cultivatedGrain = this.getAnalysisCardPropertyValueByCode('CultivatedGrain');
    this.grainAdmixture = this.getAnalysisCardPropertyValueByCode('GrainAdmixture');
    this.insectInfestation = this.getDoubleValueByCode('InsectInfestation');
    this.insectInfestationText = this.getAdditionalStringValueByCode('InsectInfestation', 'TEXT');
    this.deadInsectInfestation = this.getDoubleValueByCode('DeadInsectInfestation');
    this.deadInsectInfestationText = this.getAdditionalStringValueByCode('DeadInsectInfestation', 'TEXT');

    this.portionWeight = this.data.portionWeight;
    this.subType = this.data.subType;
    this.testWeight = this.getDoubleValueByCode('TestWeight');
    this.testWeightFirst = this.getAdditionalDoubleValueByCode('TestWeight', 'FIRST_DEFINITION');
    this.testWeightSecond = this.getAdditionalDoubleValueByCode('TestWeight', 'SECOND_DEFINITION');
    this.fallingNumber = this.getDoubleValueByCode('FallingNumber');
    this.fallingNumberFirst = this.getAdditionalDoubleValueByCode('FallingNumber', 'FIRST_DEFINITION');
    this.fallingNumberSecond = this.getAdditionalDoubleValueByCode('FallingNumber', 'SECOND_DEFINITION');

    this.color = this.getStringValueByCode('Colour');
    this.smell = this.getStringValueByCode('Smell');
    this.moisture = this.getDoubleValueByCode('Moisture');

    this.passSieves = this.getDoubleValueByCode('PassSieves');
    this.passSievesNumber = this.getAdditionalDoubleValueByCode('PassSieves', 'WEIGHT');
    this.passSievesAdditional = this.getAdditionalStringValueByCode('PassSieves', 'TEXT');
    this.passSievesPortion = this.getAdditionalDoubleValueByCode('PassSieves', 'PORTION_WEIGHT');

    this.remainderOnSieve = this.getDoubleValueByCode('RemainderOnSieve');
    this.remainderOnSieveNumber = this.getAdditionalDoubleValueByCode('RemainderOnSieve', 'WEIGHT');
    this.remainderOnSieveAdditional = this.getAdditionalStringValueByCode('RemainderOnSieve', 'TEXT');
    this.remainderOnSievePortion = this.getAdditionalDoubleValueByCode('RemainderOnSieve', 'PORTION_WEIGHT');


    this.vitreousness = this.getDoubleValueByCode('Vitreousness');
    this.vitreousnessFirst = this.getAdditionalDoubleValueByCode('Vitreousness', 'VITREOUS');
    this.vitreousnessSecond = this.getAdditionalDoubleValueByCode('Vitreousness', 'POWDERY');

    this.giuten = this.getDoubleValueByCode('Giuten');
    this.giutenNumber = this.getAdditionalDoubleValueByCode('Giuten', 'WEIGHT');
    this.giutenPortion = this.getAdditionalDoubleValueByCode('Giuten', 'PORTION');

    this.giutenGroup = this.getStringValueByCode('GiutenGroup');
    this.giutenIndex = this.getStringValueByCode('GiutenIndex');

    this.scarious = this.getDoubleValueByCode('Scarious');
    this.scariousFirst = this.getAdditionalDoubleValueByCode('Scarious', 'PORTION_WEIGHT');
    this.scariousSecond = this.getAdditionalDoubleValueByCode('Scarious', 'SKIN_WEIGHT');

    this.contentOfKernel = this.getDoubleValueByCode('ContentOfKernel');

    this.cornBug = this.getDoubleValueByCode('CornBug');
    this.cornBugFirst = this.getAdditionalDoubleValueByCode('CornBug', 'FIRST_DEFINITION');
    this.cornBugSecond = this.getAdditionalDoubleValueByCode('CornBug', 'SECOND_DEFINITION');

    this.seedGrainWithWeevilCaterpillar = this.getDoubleValueByCode('SeedGrainWithWeevilCaterpillar');
    this.seedGrainWithWeevilCaterpillarFirst = this.getAdditionalDoubleValueByCode('SeedGrainWithWeevilCaterpillar', 'PORTION_WEIGHT');
    this.seedGrainWithWeevilCaterpillarSecond = this.getAdditionalDoubleValueByCode('SeedGrainWithWeevilCaterpillar', 'WEIGHT_DAMAGED_SEEDS')

    this.protein = this.getDoubleValueByCode('Protein');
    this.wetFiber = this.getDoubleValueByCode('WetFiber');
    this.rawFat = this.getDoubleValueByCode('RawFat');
    this.ashInsolubleHCl = this.getDoubleValueByCode('AshInsolubleHCl');
    this.calcium = this.getDoubleValueByCode('Calcium');
    this.natrium = this.getDoubleValueByCode('Natrium');
    this.phosphorus = this.getDoubleValueByCode('Phosphorus');
    this.lysine = this.getDoubleValueByCode('Lysine');
    this.methionineCystine = this.getDoubleValueByCode('MethionineCystine');

    // this.insectInfestation = this.getDoubleValueByCode('InsectInfestation');

    this.metabolizedEnergyContent100 = this.getDoubleValueByCode('MetabolizedEnergyContent100');
  }

  onWhitenessChange(event) {
    this.whiteness = event.target.value;
    this.setDoubleValueByCode('Whiteness', this.whiteness);
  }

  onAshInsolubleChange(event) {
    this.ashInsoluble = event.target.value;
    this.setDoubleValueByCode('AshInsoluble', this.ashInsoluble);
  }
  onTasteChange(event) {
    this.taste = event.target.value;
    this.setStringValueByCode('Taste', this.taste);
  }

  onRunchChange(event) {
    this.crunch = event.target.value;
    this.setStringValueByCode('Сrunch', this.crunch);
  }

  onTypeGoodsCategoryChange(event) {
    this.typeGoodsCategory = event;
    let index = this.data.goodsCategories.findIndex(it => it.goodsCategoryType.id == 1);
    if (index >= 0) {
      this.data.goodsCategories[index] = this.typeGoodsCategory;
    } else {
      this.data.goodsCategories.push(this.typeGoodsCategory);
    }
  }

  onClassGoodsCategoryChange(event) {
    this.classGoodsCategory = event;
    let index = this.data.goodsCategories.findIndex(it => it.goodsCategoryType.id == 2);
    if (index >= 0) {
      this.data.goodsCategories[index] = this.classGoodsCategory;
    } else {
      this.data.goodsCategories.push(this.classGoodsCategory);
    }
  }

  updatePortionDependency() {
    this.passSieves = (+this.passSievesNumber/+this.passSievesPortion) * 100;
    this.setDoubleValueByCode('PassSieves', this.passSieves);
  }

  updateRemainderPortionDependency() {
    this.remainderOnSieve = (+this.remainderOnSieveNumber/+this.remainderOnSievePortion) * 100;
    this.setDoubleValueByCode('RemainderOnSieve', this.remainderOnSieve);
  }

  onPortionWeightChange(event) {
    this.portionWeight = event.target.value;
    this.data.portionWeight = this.portionWeight;
    this.updatePortionDependency();
    this.dataChange.emit({data: this.data});
  }

  onSubTypeChange(event) {
    this.subType = event.target.value;
    this.data.subType = this.subType;
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

  calculateTestWeight() {
    if (this.testWeightFirst && this.testWeightSecond) {
      return (+this.testWeightFirst + +this.testWeightSecond)/2;
    }
    if (this.testWeightFirst && !this.testWeightSecond) {
      return +this.testWeightFirst/2;
    }
    if (!this.testWeightFirst && this.testWeightSecond) {
      return +this.testWeightSecond/2;
    }
  }

  onInsectInfestationChange(event) {
    this.insectInfestation = event.target.value;
    this.setDoubleValueByCode('InsectInfestation', this.insectInfestation);
  }

  onInsectInfestationTextChange(event) {
    this.insectInfestationText = event.target.value;
    this.setAdditionalStringValueByCode('InsectInfestation', 'TEXT', this.insectInfestationText);
  }

  onDeadInsectInfestationChange(event) {
    this.deadInsectInfestation = event.target.value;
    this.setDoubleValueByCode('DeadInsectInfestation', this.deadInsectInfestation);
  }

  onDeadInsectInfestationTextChange(event) {
    this.deadInsectInfestationText = event.target.value;
    this.setAdditionalStringValueByCode('DeadInsectInfestation', 'TEXT', this.deadInsectInfestationText);
  }

  onGrainAdmixtureChange(event) {
    this.grainAdmixture = event[0];
    this.setAnalysisCardPropertyValueByCode('GrainAdmixture', this.grainAdmixture);
  }

  onCultivatedGrainChange(event) {
    this.cultivatedGrain = event[0];
    this.setAnalysisCardPropertyValueByCode('CultivatedGrain', this.cultivatedGrain);
  }

  onAgrestalAdmixtureChange(event) {
      this.agrestalAdmixture = event[0];
      this.setAnalysisCardPropertyValueByCode('AgrestalAdmixture', this.agrestalAdmixture);
  }

  onTestWeightChange(event) {
    this.testWeight = event.target.value;
    this.setDoubleValueByCode('TestWeight', this.testWeight);
  }

  onTestWeightFirstChange(event) {
    this.testWeightFirst = event.target.value;
    this.testWeight = this.calculateTestWeight();
    this.setDoubleValueByCode('TestWeight', this.testWeight);
    this.setAdditionalDoubleValueByCode('TestWeight', 'FIRST_DEFINITION', this.testWeightFirst);
  }

  onTestWeightSecondChange(event) {
    this.testWeightSecond = event.target.value;
    this.testWeight = this.calculateTestWeight();
    this.setDoubleValueByCode('TestWeight', this.testWeight);
    this.setAdditionalDoubleValueByCode('TestWeight', 'SECOND_DEFINITION', this.testWeightSecond);
  }

  calculateFallingNumber() {
    if (this.fallingNumberFirst && this.fallingNumberSecond) {
      return (+this.fallingNumberFirst + +this.fallingNumberSecond)/2;
    }
    if (this.fallingNumberFirst && !this.fallingNumberSecond) {
      return +this.fallingNumberFirst/2;
    }
    if (!this.fallingNumberFirst && this.fallingNumberSecond) {
      return +this.fallingNumberSecond/2;
    }
  }

  onFallingNumberChange(event) {
    this.fallingNumber = event.target.value;
    this.setDoubleValueByCode('FallingNumber', this.fallingNumber);
  }

  onFallingNumberFirstChange(event) {
    this.fallingNumberFirst = event.target.value;
    this.fallingNumber = this.calculateFallingNumber();
    this.setDoubleValueByCode('FallingNumber', this.fallingNumber);
    this.setAdditionalDoubleValueByCode('FallingNumber', 'FIRST_DEFINITION', this.fallingNumberFirst);
  }

  onFallingNumberSecondChange(event) {
    this.fallingNumberSecond = event.target.value;
    this.fallingNumber = this.calculateFallingNumber();
    this.setDoubleValueByCode('FallingNumber', this.fallingNumber);
    this.setAdditionalDoubleValueByCode('FallingNumber', 'SECOND_DEFINITION', this.fallingNumberSecond);
  }

  onVitreousnessChange(event) {
    this.testWeight = event.target.value;
    this.setDoubleValueByCode('Vitreousness', this.testWeight);
  }
  calculateVitreousness() {
    let result = 50;
    if (this.vitreousnessFirst) {
      result += this.vitreousnessFirst * 0.5;
    }
    if (this.vitreousnessSecond) {
      result -= this.vitreousnessSecond * 0.5;
    }
    if (!this.vitreousnessFirst && !this.vitreousnessSecond) {
      return null;
    }
    return result;
  }
  onVitreousnessFirstChange(event) {
    this.vitreousnessFirst = event.target.value;
    this.vitreousness = this.calculateVitreousness();
    this.setDoubleValueByCode('Vitreousness', this.vitreousness);
    this.setAdditionalDoubleValueByCode('Vitreousness', 'VITREOUS', this.vitreousnessFirst);
  }

  onVitreousnessSecondChange(event) {
    this.vitreousnessSecond = event.target.value;
    this.vitreousness = this.calculateVitreousness();
    this.setDoubleValueByCode('Vitreousness', this.vitreousness);
    this.setAdditionalDoubleValueByCode('Vitreousness', 'POWDERY', this.vitreousnessSecond);
  }

  calculateGiuten() {
    this.giuten = (+this.giutenNumber/+this.giutenPortion) * 100;
    this.setDoubleValueByCode('Giuten', this.giuten);
  }

  onGiutenChange(event) {
    this.giuten = event.target.value;
    this.setDoubleValueByCode('Giuten', this.giuten);
  }

  onGiutenNumberChange(event) {
    this.giutenNumber = event.target.value;

  this.calculateGiuten();
    this.setAdditionalDoubleValueByCode('Giuten', 'WEIGHT', this.giutenNumber);
  }

  onGiutenPortionChange(event) {
    this.giutenPortion = event.target.value;

    this.calculateGiuten();
    this.setAdditionalDoubleValueByCode('Giuten', 'PORTION', this.giutenPortion);
  }

  onGiutenGroupChange(event) {
    this.giutenGroup = event.target.value;
    this.setStringValueByCode('GiutenGroup', this.giutenGroup);
  }

  onGiutenIndexChange(event) {
    this.giutenIndex = event.target.value;
    this.setStringValueByCode('GiutenIndex', this.giutenIndex);
  }

  onScariousChange(event) {
    this.scarious = event.target.value;
    this.setDoubleValueByCode('Scarious', this.scarious);
  }

  calculateScarious() {
    if (this.scariousFirst && this.scariousSecond) {
      return (+this.scariousSecond/+this.scariousFirst)*100;
    }
    if (this.scariousFirst && !this.scariousSecond) {
      return null;
    }
    if (!this.scariousFirst && this.scariousSecond) {
      return null;
    }
  }
  onScariousFirstChange(event) {
    this.scariousFirst = event.target.value;
    this.scarious = this.calculateScarious();
    this.setDoubleValueByCode('Scarious', this.scarious);
    this.setAdditionalDoubleValueByCode('Scarious','PORTION_WEIGHT', this.scariousFirst);
  }

  onScariousSecondChange(event) {
    this.scariousSecond = event.target.value;
    this.scarious = this.calculateScarious();
    this.setDoubleValueByCode('Scarious', this.scarious);
    this.setAdditionalDoubleValueByCode('Scarious', 'SKIN_WEIGHT', this.scariousSecond);
  }

  onContentOfKernelChange(event) {
    this.contentOfKernel = event.target.value;
    this.setDoubleValueByCode('ContentOfKernel', this.contentOfKernel);
  }

  onCornBugChange(event) {
    this.cornBug = event.target.value;
    this.setDoubleValueByCode('CornBug', this.cornBug);
  }

  calculateCornBug() {
    let result = 0;
    if (this.cornBugFirst) {
      result += +this.cornBugFirst*5;
    }
    if (this.cornBugSecond) {
      result += +this.cornBugSecond*5;
    }
    return result;
  }

  onCornBugFirstChange(event) {
    this.cornBugFirst = event.target.value;
    this.cornBug = this.calculateCornBug();
    this.setDoubleValueByCode('CornBug', this.cornBug);
    this.setAdditionalDoubleValueByCode('CornBug', 'FIRST_DEFINITION', this.cornBugFirst);
  }

  onCornBugSecondChange(event) {
    this.cornBugSecond = event.target.value;
    this.cornBug = this.calculateCornBug();
    this.setDoubleValueByCode('CornBug', this.cornBug);
    this.setAdditionalDoubleValueByCode('CornBug', 'SECOND_DEFINITION', this.cornBugSecond);
  }

  onSeedGrainWithWeevilCaterpillarChange(event) {
    this.seedGrainWithWeevilCaterpillar = event.target.value;
    this.setDoubleValueByCode('SeedGrainWithWeevilCaterpillar', this.seedGrainWithWeevilCaterpillar);
  }

  calculateSeedGrainWithWeevilCaterpillar() {
    if (this.seedGrainWithWeevilCaterpillarFirst && this.seedGrainWithWeevilCaterpillarSecond) {
      return (+this.seedGrainWithWeevilCaterpillarSecond/+this.seedGrainWithWeevilCaterpillarFirst) * 100;
    } else {
      return null;
    }
  }

  onSeedGrainWithWeevilCaterpillarFirstChange(event) {
    this.seedGrainWithWeevilCaterpillarFirst = event.target.value;
    this.seedGrainWithWeevilCaterpillar = this.calculateSeedGrainWithWeevilCaterpillar();
    this.setDoubleValueByCode('SeedGrainWithWeevilCaterpillar', this.seedGrainWithWeevilCaterpillar);
    this.setAdditionalDoubleValueByCode('SeedGrainWithWeevilCaterpillar','PORTION_WEIGHT', this.seedGrainWithWeevilCaterpillarFirst);
  }

  onSeedGrainWithWeevilCaterpillarSecondChange(event) {
    this.seedGrainWithWeevilCaterpillarSecond = event.target.value;
    this.seedGrainWithWeevilCaterpillar = this.calculateSeedGrainWithWeevilCaterpillar();
    this.setDoubleValueByCode('SeedGrainWithWeevilCaterpillar', this.seedGrainWithWeevilCaterpillar);
    this.setAdditionalDoubleValueByCode('SeedGrainWithWeevilCaterpillar','WEIGHT_DAMAGED_SEEDS', this.seedGrainWithWeevilCaterpillarSecond);
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
    this.updatePortionDependency();
    this.setAdditionalDoubleValueByCode('PassSieves', 'WEIGHT', this.passSievesNumber);
  }

  onPassSievesPortionChange(event) {
    this.passSievesPortion = event.target.value;
    this.updatePortionDependency();
    this.setAdditionalDoubleValueByCode('PassSieves','PORTION_WEIGHT', this.passSievesPortion);
  }

  onPassSievesAdditionalChange(event) {
    this.passSievesAdditional = event.target.value;
    this.setAdditionalStringValueByCode('PassSieves','TEXT', this.passSievesAdditional);
  }


  onRemainderOnSieveChange(event) {
    this.remainderOnSieve = event.target.value;
    this.setDoubleValueByCode('RemainderOnSieve', this.remainderOnSieve);
  }

  onRemainderOnSieveNumberChange(event) {
    this.remainderOnSieveNumber = event.target.value;
    this.updateRemainderPortionDependency();
    this.setAdditionalDoubleValueByCode('RemainderOnSieve', 'WEIGHT', this.remainderOnSieveNumber);
  }

  onRemainderOnSievePortionChange(event) {
    this.remainderOnSievePortion = event.target.value;
    this.updateRemainderPortionDependency();
    this.setAdditionalDoubleValueByCode('RemainderOnSieve','PORTION_WEIGHT', this.remainderOnSievePortion);
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

  onMetallicImpuritySizeChange(event) {
    this.metallicImpuritySize = event.target.value;
    this.setAdditionalDoubleValueByCode('MetallicImpurity', 'SIZE', this.metallicImpuritySize);
  }

  // onInsectInfestationChange(event) {
  //   this.insectInfestation = event.target.value;
  //   this.setDoubleValueByCode('InsectInfestation', this.insectInfestation);
  // }



  onMetabolizedEnergyContent100Change(event) {
    this.metabolizedEnergyContent100 = event.target.value;
    this.setDoubleValueByCode('MetabolizedEnergyContent100', this.metabolizedEnergyContent100);
  }



  getAnalysisCardPropertyValueByCode(code) {
    let found = this.data.analysisCardPropertyValues.find(item => item.property.description == code);
    if (found) {
      return found;
    }
  }

  // removeUuid(item) {
  //   delete item.uuid;
  //   if (item.children) {
  //     item.children.forEach(it => this.removeUuid(it));
  //   }
  // }

  setAnalysisCardPropertyValueByCode(code, value) {
    let found = this.data.analysisCardPropertyValues.findIndex(item => item.property.description == code);
    if (found >=0) {
      this.data.analysisCardPropertyValues[found] = value;
      // if (this.data.analysisCardPropertyValues[found].uuid) {
      //   this.removeUuid(this.data.analysisCardPropertyValues[found]);
      // }
        this.dataChange.emit({data: this.data});
    }
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


  setAdditionalBooleanValueByCode(code, additional, value) {
    let found = this.data.analysisCardPropertyValues.find(item => item.property.description == code);
    if (found) {
      let sub = found.additionalAnalysisCardPropertyValues.find(it => it.additionalAnalysisCardProperty.descriptor == additional);
      if (sub) {
        sub.booleanValue = value;
        this.dataChange.emit({data: this.data});
      }
    }
  }

  getAdditionalBooleanValueByCode(code, additional) {
    let found = this.data.analysisCardPropertyValues.find(item => item.property.description == code);
    if (found) {
      let sub = found.additionalAnalysisCardPropertyValues.find(it => it.additionalAnalysisCardProperty.descriptor == additional);
      if (sub) {
        return sub.booleanValue;
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
  getPropertyPrecisionByCode(code) {
    let found = this.data.analysisCardPropertyValues.find(item => item.property.description == code);
    if (found) {
      if (found.property.precision) {
        return '1.' + found.property.precision + '-' + found.property.precision;

      }
      if (found.property.units[0].precision) {
        return '1.' + found.property.units[0].precision + '-' + found.property.units[0].precision;
      }
    }
  }
}
