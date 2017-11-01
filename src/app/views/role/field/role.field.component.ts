import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Role } from '../../../models/role';

@Component({
  selector: 'role-field',
  templateUrl: './role.field.component.html',
  styleUrls: ['./role.field.component.scss']
})
export class RoleFieldComponent {
  edit: boolean = false;
  @ViewChild('field') field: any;
  @Input() role: Role;
  @Output() update: EventEmitter<any> = new EventEmitter<any>();
  @Output() remove: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}

  enterEditMode() {
    this.edit = true;
  }

  removeAction() {
    this.remove.emit(this.role);
  }

  saveAction() {
    this.edit = false;
    this.role.roleName = this.field.nativeElement.value;
    this.update.emit(this.role);
  }

  discardAction() {
    this.field.nativeElement.value = this.role.roleName;
    this.edit = false;
  }
}
