import { Component, Input } from '@angular/core';
import { MainService } from '../../../../services/main.service';
import { DocumentService } from '../../../../services/document.service';
import { Location } from '../../../../models/location';

@Component({
  selector: 'certificate-params',
  templateUrl: './certificate.params.component.html',
  styleUrls: ['./certificate.params.component.scss']
})
export class CertificateParamsComponent {
  @Input() data: any;
  isEng = false;
  isRus = true;
  senderLocation : Location = new Location();
  reciverLocation : Location = new Location();
  paramList: Array<any> = new Array<any>();
  listToView = [];
  translationParams = {};
  subscriptions = [];
  constructor(private mainService : MainService, private documentService: DocumentService) {
    this.subscriptions.push(this.mainService.certificateLoaded.subscribe(item => {
      this.data = item;
      let initTranslation = true;
      if (item.cargoSender) {
        this.senderLocation = new Location().deserialize(item.cargoSender.location);
      }
      if (item.cargoReceiver) {
        this.reciverLocation = new Location().deserialize(item.cargoReceiver.location);
      }
      if (!this.data.internationalCertificateTranslation) {
        this.data.internationalCertificateTranslation = this.createTranslation();
      } else {
        this.data.internationalCertificateTranslation = JSON.parse(this.data.internationalCertificateTranslation);
        this.translationParams = this.data.internationalCertificateTranslation.translationParams;

        if (this.translationParams == null) {
          this.translationParams = [];
        } else {
          initTranslation = false;
        }
      }
      this.initParams(initTranslation);
    }));
  }

  ngOnDestroy() {
      this.subscriptions.forEach(item => item.unsubscribe());
  }

  getParamPropertyId(param) {
    if (param.property) {
      return param.property.id;
    } else {
      return param.goodsCategoryProperty.property.id;
    }
  }

  initParams(initTranslation: boolean) {
    let list = [];
    let propertyListId = [];
    if (this.data.advancedCertificateSettings.length > 0) {
      this.data.advancedCertificateSettings.forEach(item => {
        let parent = item.parentGoodsCategoryProperty;
        while(parent != null) {
          list.push(parent);
          propertyListId.push(parent.property.id);
          if (initTranslation) {
            this.translationParams[parent.property.id] = this.getParamValue(parent);
          }
          parent = parent.parentGoodsCategoryProperty;
        }
        list.push(item);
        if (item.goodsCategoryProperty) {
          propertyListId.push(item.goodsCategoryProperty.property.id);
          if (initTranslation) {
            this.translationParams[item.goodsCategoryProperty.property.id] = this.getParamValue(item);
          }
        } else {
          propertyListId.push(item.property.id);
          if (initTranslation) {
            this.translationParams[item.property.id] = this.getParamValue(item);
          }
        }
      });
      this.listToView = this.processData_2(list);
      console.log(this.listToView);
      console.log(propertyListId);
    }

    // TODO: decide if properties are important here
    if ('properties' in this.data.certificateType) {

      this.data.certificateType.properties.forEach(item => {

        if (!propertyListId.find(it => it == item.id)) {
          this.listToView.push({property: item});
          if (initTranslation) {
            this.translationParams[item.id] = '';
          }
        }
      });
    }

  }

  processData_2(list) {

    var map = {}, node, roots = [], i;
    for (i = 0; i < list.length; i += 1) {
      map[list[i].id] = i; // initialize the map
      list[i].children = []; // initialize the children
    }
    for (i = 0; i < list.length; i += 1) {
      node = list[i];
      if (node.parentGoodsCategoryProperty != null) {
        // if you have dangling branches check that map[node.parentId] exists
        list[map[node.parentGoodsCategoryProperty.id]].children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  }

  createTranslation() {
    let result = {
      goodsName: this.data.goodsName,
      goodsTNVD: this.data.goodsTNVD,
      goodsWeight: this.data.goodsWeight,
      consignment: this.data.consignment,
      contractNumber: this.data.contractNumber,
      senderLocation: this.getSenderAddress(),
      sender: this.getSender(),
      receiver: this.getReciver(),
      receiverLocation: this.getReciverAddress(),
      numberStorageLocation: this.data.numberStorageLocation,
      transportNumber: this.data.transportNumber,
      manufacturerLocation: this.getManufacturerLocation(),
      harvestYear: this.data.harvestYear,
      regulations: this.getDocument()
    };
    return result;
  }

  onLanguageChange(event) {
    if (event.value == 'ru') {
      this.isRus = true;
      this.isEng = false;
    } else {
      this.isRus = false;
      this.isEng = true;

    }
  }
  getGoodsNameLabel() {
    if (this.isRus) {
      return 'Наименование продукта:';
    } else {
      return 'Product:';
    }

  }

  getGoodsName() {
    return this.data.goodsName? this.data.goodsName: '-';
  }

  getTNVDLabel() {
    if (this.isRus) {
      return 'Код ТНВЭД:';
    } else {
      return 'Customs code:';
    }
  }

  getTNVD() {
    return this.data.goodsTNVD? this.data.goodsTNVD: '-';
  }

  getDocumentLabel() {
    if (this.isRus) {
      return 'Нормативный документ:';
    } else {
      return 'Regulations:';
    }
  }

  getDocument() {
    let result = '';

    console.log(this.data);
    if (this.data.appcliation) {
      if (this.data.application.applicationStandardResearches) {

        this.data.application.applicationStandardResearches.forEach(item => {

          if (item.customContract) {
            result += item.customContract.name + ', ';
          }
          else {
            result += item.standard.shortName + ', ';
          }
        });

        if (result.length > 0) {
          result = result.substr(0, result.length - 2);
        }
      }
    }
    return result;
  }

  getSenderAddressLabel() {
    if (this.isRus) {
        return 'Пункт отправления:';
    } else {
      return 'Departure:';
    }
  }

  getSenderAddress() {
    return this.senderLocation.getTitle();
  }

  getSenderLabel() {
    if (this.isRus) {
      return 'Отправитель:';
    } else {
      return 'Sender:';
    }
  }

  getSender() {
    if (this.data.cargoSender) {
      return this.data.cargoSender.partner.name;
    }
    return '-';
  }

  getReciverAddressLabel() {
    if (this.isRus) {
        return 'Пункт назначения:';
    } else {
      return 'Destination:';
    }
  }

  getReciverAddress() {
    return this.reciverLocation.getTitle();
  }

  getReciverLabel() {
    if (this.isRus) {
        return 'Получатель:';
    } else {
      return 'Receiver:';
    }
  }

  getReciver() {
    if (this.data.cargoReceiver) {
      return this.data.cargoReceiver.partner.name;
    }
    return '-';
  }

  getConsignment() {
    if (this.data.consignment) {
      return this.data.consignment;
    }
    return '-';
  }

  getConsignmentLabel() {
    if (this.isRus) {
      return 'Коносамент (накладная):';
    } else {
      return 'Consignment:';
    }
  }

  getContractNumberLabel() {
    if (this.isRus) {
      return 'Контракт No:';
    } else {
      return 'Contract No:';
    }
  }

  getContractNumber() {
    if (this.data.contractNumber) {
      return this.data.contractNumber;
    }
    return '-';
  }

  getWeightLabel() {
    if (this.isRus) {
      return 'Масса:';
    } else {
      return 'Weight:';
    }
  }

  getWeigth() {
    return this.data.goodsWeight? this.data.goodsWeight: '-';
  }

  getStorageCountLabel() {
    if (this.isRus) {
      return 'Число мест:';
    } else {
      return 'Number of bags:';
    }
  }

  getStorageCount() {
    return this.data.numberStorageLocation? this.data.numberStorageLocation: '-';
  }

  getTransportLabel() {
    if (this.isRus) {
      return 'Транспортное средство:';
    } else {
      return 'Vessel (or rail car):';
    }
  }

  getTransport() {
    return this.data.transportNumber? this.data.transportNumber: '-';
  }

  getManufacturerLocationLabel() {
    if (this.isRus) {
      return 'Происхождение:';
    } else {
      return 'Origin:';
    }
  }

  getManufacturerLocation() {
    let result = '';
    if (this.data.manufacturers) {
      if (this.data.manufacturers.length > 0) {
        this.data.manufacturers.forEach(manufacturer => {
          if (manufacturer.location) {
            let loc = new Location().deserialize(manufacturer.location);
            result += loc.getTitle();
          }
        });
      } else {
        return result;
      }
    } else {
      return result;
    }
    return result;
  }

  getManufactureDateLabel() {
    if (this.isRus) {
      return 'Урожай:';
    } else {
      return 'Harvested at:';
    }
  }

  getManufactureDate() {
    return this.data.harvestYear? this.data.harvestYear: '-';
  }

  getParamLabel(param) {
    let result = '';
    if (param.property) {
      if (this.isRus) {
          result = param.property.nameRu;
          if (param.property.units.length > 0) {
            result += ', ' + param.property.units[0].nameRu;
          }
      } else {
          result = param.property.nameEng;
          if (param.property.units.length > 0) {
            result += ', ' + param.property.units[0].nameEng;
          }
      }
    } else {
      if (this.isRus) {
          result = param.goodsCategoryProperty.property.nameRu;
          if (param.goodsCategoryProperty.unit) {
            result += ', ' + param.goodsCategoryProperty.unit.nameRu;
          }
      } else {
          result = param.goodsCategoryProperty.property.nameEng;
          if (param.goodsCategoryProperty.unit) {
            result += ', ' + param.goodsCategoryProperty.unit.nameEng;
          }
      }
      if (param.parentGoodsCategoryProperty) {
        result = 'в т.ч. ' + result;
      }
    }
    return result;
  }

  getParamValue(param) {
    if (param.doubleValue) {
      return param.doubleValue;
    }
    if (param.textValue) {
      return param.textValue;
    }
    return '-';
  }
}
