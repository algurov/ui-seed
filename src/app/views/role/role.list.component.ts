import { Component } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { DialogService } from '../../services/dialog.service';
import { RoleAddDialog } from './role.add.dialog';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'role-list',
  templateUrl: './role.list.component.html',
  styleUrls: ['./role.list.component.scss']
})
export class RoleListComponent {
  roleList: Array<Role> = new Array<Role>();
  constructor(private roleService: RoleService,
    private dialogService: DialogService,
    private dialog: MatDialog) {
      this.dialogService.showBlocker();
      this.roleService.getRoleList().subscribe(res => {
        res.forEach(item => {
          this.roleList.push(new Role().deserialize(item));
        });
        this.dialogService.hideBlocker();
      });
    }

  ngOnInit() {

  }

  updateRole(role : Role) {
    this.dialogService.showBlocker();
    this.roleService.updateRole(role).subscribe(res => {
      let index = this.roleList.findIndex(item => item.id == role.id);
      this.roleList[index] = new Role().deserialize(res);
      this.dialogService.hideBlocker();
      this.dialogService.showNotification('Роль сохранена');
    });
  }

  removeRole(role: Role) {
    this.dialogService.showConfirm('Удаление роли', 'Подтвердите удаление роли "' + role.roleName + '"' )
      .subscribe(res => {
        if (res) {
          this.dialogService.showBlocker();
          this.roleService.deleteRole(role).subscribe(res => {
            let index = this.roleList.findIndex(item => item.id == role.id);
            this.roleList.splice(index, 1);
            this.dialogService.hideBlocker();
            this.dialogService.showNotification('Роль удалена');
          });
        }
      });
  }

  addRole(name: string) {
    this.dialogService.showBlocker();
    let newRole = new Role();
    newRole.roleName = name;
    this.roleService.createRole(newRole).subscribe(res => {
      this.roleList.push(new Role().deserialize(res));
      this.dialogService.hideBlocker();
      this.dialogService.showNotification('Роль добавлена');
    });
  }

  showAddRoleDialog() {
    let dialogRef = this.dialog.open(RoleAddDialog, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(res => {
     if (res) {
        this.addRole(res);
     }
    });
  }
}
