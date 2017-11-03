import { Serializable } from './serializable';

export class Contact implements Serializable<Contact> {
  address: string;
  contactType: string;
  id: number;
  version: number;

  deserialize(input) {
    this.id = input.id;
    this.address = input.address;
    this.contactType = input.contactType;
    this.version = input.version;
    return this;
  }

  toString(): string {
    return this.contactType + ':' + this.address;
  }

}
