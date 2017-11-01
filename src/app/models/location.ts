import { Serializable } from './serializable';

export class Location implements Serializable<Location> {
  country: any;
  region: any;
  city: any;
  id: number;
  version: number;

  deserialize(input) {
    this.id = input.id;
    this.region = input.region;
    this.country = input.country;
    this.city = input.city;
    this.version = input.version;
    return this;
  }

  getTitle() {
    let field : any;
    if(this.city) {
      field = this.city;
    }
    if(this.country) {
      field = this.country;
    }
    if(this.region) {
      field = this.region;
    }
    if (field) {
      if (field.titleRu) {
        let result = '';
        if (field.country) {
          result += field.country.titleRu + ', ';
        }
        if (field.region) {
          result += field.region.titleRu + ', ';
        }
        result += field.titleRu;
        return result;
      }
    } else {
      return '';
    }
  }

  }
