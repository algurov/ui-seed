import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PROVISIONING_BASE_URL } from '../services/constants';
import { RequestBase } from '../services/request.base';
import { MainService } from './main.service';
import { Role } from '../models/role';

@Injectable()
export class RoleService extends RequestBase {

  constructor(public http: Http, private mainService: MainService) {
    super(http);
  }

  createRole(role: Role): Observable<Role> {
      return this.http.post(`${PROVISIONING_BASE_URL}/user-provisioning/role`, role, this.getOptions(this.OPT.AUTH_JSON))
      .map(res => res.json());
  }

  getRoleList(): Observable<any> {
    return this.http.get(`${PROVISIONING_BASE_URL}/user-provisioning/role`, this.getOptions(this.OPT.AUTH_JSON))
    .map(res => res.json());
  }

  getRoleById(id: number) : Observable<Role> {
    return this.http.get(`${PROVISIONING_BASE_URL}/user-provisioning/role/` + id, this.getOptions(this.OPT.AUTH_JSON))
    .map(res => res.json());
  }

  searchRoleByParams(params : Array<any>): Observable<any> {
      let paramString = '';
      params.forEach(item => {
        paramString += item.field + '=' + item.value + '&';
      });
      if (paramString.length > 0) {
        paramString = paramString.substring(0, paramString.length - 1);
      }
      return this.http.get(`${PROVISIONING_BASE_URL}/user-provisioning/role?` + paramString, this.getOptions(this.OPT.AUTH_JSON)).map(res => res.json());
  }

  updateRole(role: Role): Observable<Role> {
    return this.http.put(`${PROVISIONING_BASE_URL}/user-provisioning/role`, role, this.getOptions(this.OPT.AUTH_JSON))
    .map(res => res.json());
  }

  deleteRole(role: Role) : Observable<Role> {
    return this.http.delete(`${PROVISIONING_BASE_URL}/user-provisioning/role/` + role.id, this.getOptions(this.OPT.AUTH_JSON))
    .map(res => res.json());
  }
}
