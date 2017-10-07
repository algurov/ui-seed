import { Serializable } from './serializable';

export class Settings implements Serializable<Settings> {

selectedPartnerId: number;

deserialize(input) {
  if (input) {
    this.selectedPartnerId = input.selectedPartnerId;
  }
  return this;
}

serialize() {
  return JSON.stringify(this);
}

}
