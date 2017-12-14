import { Injectable, EventEmitter } from '@angular/core';
import { TaxonomyService } from './taxonomy.service';
import { menuActions } from '../views/panel/menu.actions';



@Injectable()
export class DataService {
  constructor(private taxonomyService: TaxonomyService) {
    this.taxonomyService.loadTaxonomyData('PropertyType').subscribe(res => {
      this.propertyType = res.content;
    });
  }
  partnerTypes = [{title: 'Юридическое лицо', value: 'ORGANIZATION'}, {title: 'Физическое лицо', value: 'PERSON'}];
  partnerDocumentTypes = [{title: 'ИНН', value: 'INN'}, {title: 'Паспорт', value: 'PASSPORT'}];
  dataMap = {
    'PARTNER_TYPE' : this.partnerTypes,
    'PARTNER_DOC_TYPE': this.partnerDocumentTypes
  };
  propertyType: Array<any>;

  ngOnInit() {

  }

  getPartnerTypes() {
    return this.partnerTypes;
  }

  getPartnerDocumentTypes() {
    return this.partnerDocumentTypes;
  }

  getPartnerDocumentTypeNameByValue(value: string) : string {
    return this.partnerDocumentTypes.find(item => item.value == value).title;
  }
  getPartnerTypeNameByValue(value: string) :string {
    return this.partnerTypes.find(item => item.value == value).title;
  }

  getDataFromList(code, value) {
    return this.dataMap[code].find(item => item.value == value).title;
  }

  convertDate(date){
  let newDate = date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
  return newDate;
  }

  dateOffset(date) {
    let result = new Date();
    let offset = date.getTimezoneOffset() * 60 * 1000;
    result.setTime(date.getTime() - offset);
    return result;
  }

  getMenuActionsByScreen(screen:string, state: boolean) {
    let result = menuActions[screen];
    if (state) {
      return result;
    } else {
      return result.filter(item => item.state != state);
    }
  }
}
