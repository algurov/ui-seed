const SUCCESS = 'success';

export class FlowResponse{
  execution: string;
  view: View;
  form: Form;
  serverUrl: string;
  step: string;

  isSuccess(): boolean {
    if (this.step == SUCCESS) {
      return true;
    } else {
      return false;
    }
  }

  isError(): boolean {
    if (this.view) {
      return true;
    } else {
      return false;
    }
  }

  constructor (jsonObj) {
      this.fillObj(jsonObj);
  }

  fillObj(jsonObj) {
    this.execution = jsonObj.execution;
    this.serverUrl = jsonObj.serverUrl;
    this.step = jsonObj.step;
    this.form = new Form(jsonObj.form);
    this.view = new View(jsonObj.view);
  }
}

export class View {
  reason: string;
  code: number;
  nextSendAfter: number;

  fillObj(jsonObj) {
    this.reason = jsonObj.reason;
    this.code = jsonObj.code;
    this.nextSendAfter = jsonObj.nextSendAfter;
  }

  constructor(jsonObj) {
    this.fillObj(jsonObj);
  }
}

export class Form {
  name: string;
  fields: any;
  errors: any;

  fillObj(jsonObj) {
    this.name = jsonObj.name;
    this.fields = jsonObj.fields;
    this.errors = jsonObj.errors;
  }

  constructor(jsonObj) {
    this.fillObj(jsonObj);
  }
}
