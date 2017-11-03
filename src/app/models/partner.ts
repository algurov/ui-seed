import { Serializable } from './serializable';

export class Partner implements Serializable<Partner> {

partnerType: string;
name: string;
address: string;
contactPhones: string;
documentType: string;
documentNumber: string;
documentIssued: string;
fax: string;
id: number;
version: number;

deserialize(input) {
  this.partnerType = input.partnerType;
  this.name = input.name;
  this.address = input.address;
  this.contactPhones = input.contactPhones;
  this.documentType = input.documentType;
  this.documentNumber = input.documentNumber;
  this.documentIssued = input.documentIssued;
  this.fax = input.fax;
  this.id = input.id;
  this.version = input.version;
  return this;
}
}
