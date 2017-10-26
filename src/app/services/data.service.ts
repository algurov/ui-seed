import { Injectable, EventEmitter } from '@angular/core';



@Injectable()
export class DataService {
  partnerTypes = [{title: 'Юридическое лицо', value: 'ORGANIZATION'}, {title: 'Физическое лицо', value: 'PERSON'}];
  partnerDocumentTypes = [{title: 'ИНН', value: 'INN'}, {title: 'Паспорт', value: 'PASSPORT'}];
  dataMap = {
    'PARTNER_TYPE' : this.partnerTypes,
    'PARTNER_DOC_TYPE': this.partnerDocumentTypes
  };
  getPartnerTypes() {
    return this.partnerTypes;
  }

  getPartnerDocumentTypes() {
    return this.partnerDocumentTypes;
  }

  getPartnerTypeNameByValue(value: string) :string {
    return this.partnerTypes.find(item => item.value == value).title;
  }

  getDataFromList(code, value) {
    return this.dataMap[code].find(item => item.value == value).title;
  }
}
