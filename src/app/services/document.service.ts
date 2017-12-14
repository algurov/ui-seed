import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SEED_BASE_URL } from '../services/constants';
import { RequestBase } from '../services/request.base';
import { Partner } from '../models/partner';
import { MainService } from './main.service';

@Injectable()
export class DocumentService extends RequestBase {

  constructor(public http: Http, private mainService: MainService) {
    super(http);
  }

  createApplication(application: any): Observable<any> {
      return this.http.post(`${SEED_BASE_URL}/seed/application`, application, this.options)
      .map(res => res.json());
  }

  getApplicationList(): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/application`, this.options)
    .map(res => res.json());
  }

  getApplicationById(number): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/application/` + number, this.options)
    .map(res => res.json());
  }

  searchApplicationByParams(params : Array<any>): Observable<any> {
      let paramString = '';
      params.forEach(item => {
        paramString += item.field + '=' + item.value + '&';
      });
      if (paramString.length > 0) {
        paramString = paramString.substring(0, paramString.length - 1);
      }
      return this.http.get(`${SEED_BASE_URL}/seed/application?` + paramString, this.options).map(res => res.json());
  }

  updateApplication(application: any): Observable<any> {
    return this.http.put(`${SEED_BASE_URL}/seed/application`, application, this.options)
    .map(res => res.json());
  }

  deleteApplication(application) : Observable<any> {
    return this.http.delete(`${SEED_BASE_URL}/seed/application/` + application.id, this.options)
    .map(res => res.json());
  }

  createAct(applicationId) : Observable<any> {
    return this.http.post(`${SEED_BASE_URL}/seed/act/` + applicationId, {}, this.options).map(res => res.json());
  }

  getActList() : Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/act`, this.options).map(res => res.json());
  }

  getApplicationByActId(actId): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/application/byAct/` + actId, this.options).map(res => res.json());
  }

  getActListForApplication(applicationId): Observable<any> {
      return this.http.get(`${SEED_BASE_URL}/seed/act?application.id=` + applicationId, this.options).map(res => res.json());
  }

  getActById(id) : Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/act/` + id, this.options).map(res => res.json());
  }

  updateAct(act): Observable<any> {
    return this.http.put(`${SEED_BASE_URL}/seed/act`, act, this.options).map(res => res.json());
  }

  deleteAct(act): Observable<any> {
    return this.http.delete(`${SEED_BASE_URL}/seed/act/` + act.id, this.options)
    .map(res => res.json());
  }

  createAssignment(actId) : Observable<any> {
    return this.http.post(`${SEED_BASE_URL}/seed/assignment/` + actId, {}, this.options).map(res => res.json());
  }

  getAssignmentList() : Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/assignment`, this.options).map(res => res.json());
  }

  getStandardsForAssignment(id): Observable<any> {
      return this.http.get(`${SEED_BASE_URL}/seed/assignment/` + id + '/originalStandards', this.options).map(res => res.json());
  }

  getContractsForAssignment(id): Observable<any> {
      return this.http.get(`${SEED_BASE_URL}/seed/assignment/` + id + '/originalCustomContracts', this.options).map(res => res.json());
  }

  getAssignmentListByApplication(applicationId): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/assignment?application.id=` + applicationId, this.options).map(res => res.json());
  }
  getAssignmentById(id) : Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/assignment/` + id, this.options).map(res => res.json());
  }

  updateAssignment(assignment): Observable<any> {
    return this.http.put(`${SEED_BASE_URL}/seed/assignment`, assignment, this.options).map(res => res.json());
  }

  deleteAssignment(assignment): Observable<any> {
    return this.http.delete(`${SEED_BASE_URL}/seed/assignment/` + assignment.id, this.options)
    .map(res => res.json());
  }

  createProtocol(actId, data) : Observable<any> {
    return this.http.post(`${SEED_BASE_URL}/seed/researchProtocol/` + actId, data, this.options).map(res => res.json());
  }

  previewProtocol(actId, goodsCategories) {
    return this.http.post(`${SEED_BASE_URL}/seed/researchProtocol/` + actId + '/tree', goodsCategories, this.options).map(res => res.json());
  }

  getProtocolList() : Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/researchProtocol`, this.options).map(res => res.json());
  }

  getProtocolListByApplication(applicationId): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/researchProtocol?application.id=` + applicationId, this.options).map(res => res.json());
  }

  getProtocolById(id) : Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/researchProtocol/` + id, this.options).map(res => res.json());
  }

  updateProtocol(protocol): Observable<any> {
    return this.http.put(`${SEED_BASE_URL}/seed/researchProtocol`, protocol, this.options).map(res => res.json());
  }

  deleteProtocol(protocol): Observable<any> {
    return this.http.delete(`${SEED_BASE_URL}/seed/researchProtocol/` + protocol.id, this.options)
    .map(res => res.json());
  }

  getGoodsCategories(actId) : Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/goodsCategory/byAct/` + actId, this.options).map(res => res.json());
  }

  signDocument(signData): Observable<any> {
    return this.http.post(`${SEED_BASE_URL}/seed/sign`, signData, this.options).map(res => res.json());
  }

  getSignList() : Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/sign`, this.options).map(res => res.json());
  }

  getSignById(id): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/sign/` + id, this.options).map(res => res.json());
  }

  getSignListByDocumentId(id): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/sign?signedDocument.documentId=` + id, this.options).map(res => res.json());
  }

  createCerificate(actId, certificateTypeId): Observable<any> {
    return this.http.post(`${SEED_BASE_URL}/seed/certificate`, {certificateTypeId: certificateTypeId, actId: actId}, this.options).map(res => res.json());
  }

  getCertificateTypeList() :Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/certificateType`, this.options).map(res => res.json());
  }

  getCertificateById(id): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/certificate/` + id, this.options).map(res => res.json());
  }

  getCertificateListByApplicationId(applicationId): Observable<any> {
    return this.http.get(`${SEED_BASE_URL}/seed/certificate?application.id=` + applicationId, this.options).map(res => res.json());
  }

  deleteCertificate(certificate): Observable<any> {
    return this.http.delete(`${SEED_BASE_URL}/seed/certificate/` + certificate.id, this.options).map(res => res.json());
  }

  updateCertificate(certificate): Observable<any> {
    return this.http.put(`${SEED_BASE_URL}/seed/certificate`, certificate ,this.options).map(res => res.json());
  }

  createPdfReport(act): Observable<any> {
    this.pdfOptions.responseType = ResponseContentType.Blob;
    return this.http.get(`${SEED_BASE_URL}/seed/report/sampling_act/` + act.id + '/default/pdf', this.pdfOptions);
  }
}
