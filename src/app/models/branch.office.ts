import { Serializable } from './serializable';

export class BranchOffice implements Serializable<BranchOffice> {
  id: number;
  fullName: string;
  shortName: string;

  deserialize(input) {
    this.id = input.id;
    this.shortName = input.shortName;
    this.fullName = input.fullName;
    return this;
  }
}
