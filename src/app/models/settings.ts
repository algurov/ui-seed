import { Serializable } from './serializable';

export class Settings implements Serializable<Settings> {

selectedPartnerId: number;
selectedBranchOfficeId: number;

deserialize(input) {
  if (input) {
    this.selectedPartnerId = input.selectedPartnerId;
    this.selectedBranchOfficeId = input.selectedBranchOfficeId;
  }
  return this;
}

serialize() {
  return JSON.stringify(this);
}

}
