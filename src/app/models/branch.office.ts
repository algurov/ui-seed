import { Serializable } from './serializable';

export class BranchOffice implements Serializable<BranchOffice> {
  id: number;
  fullName: string;
  shortName: string;
  version: number;

  deserialize(input) {
    this.id = input.id;
    this.shortName = input.shortName;
    this.fullName = input.fullName;
    this.version = input.version;
    return this;
  }
}
