import { Serializable } from './serializable';

const SUCCESS = 'success';

export class FlowResponse implements Serializable<FlowResponse>{
  execution: string;
  view: View;
  form: Form;
  serverUrl: string;
  step: string;
  errors: Array<any>;

  isSuccess(): boolean {
    if (this.step == SUCCESS) {
      return true;
    } else {
      return false;
    }
  }

  getFlowName() {
    return this.serverUrl.substring(this.serverUrl.lastIndexOf('/') + 1, this.serverUrl.length);
  }
  // isError(): boolean {
  //   if (this.view) {
  //     if (this.view.code || this.view.error) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return false;
  //   }
  //
  // }

  isError(): boolean {
    if (this.view) {
      if (this.view.code || this.view.error) {
        return true;
      } else {
        return false;
      }
    }
    if (this.errors && this.errors.length > 0) {
      return true;
    }
    return false;
  }

  getError() : string {
    if (this.view) {
      return this.view.code? this.view.code + ' ' : ''
        + this.view.error? this.view.error : '';
    }
    if (this.errors.length > 0) {
      let error = '';
      this.errors.forEach(item => {
        error += item.message + ' ';
      });
      return error;
    }
    return ''
  }

  constructor (jsonObj) {
      this.fillObj(jsonObj);
  }

  deserialize(input) {
    return this;
  }

  fillObj(jsonObj) {
    this.execution = jsonObj.execution;
    this.serverUrl = jsonObj.serverUrl;
    this.step = jsonObj.step;
    if (jsonObj.form) {
      this.form = new Form(jsonObj.form);
    }
    if (jsonObj.view) {
      this.view = new View(jsonObj.view);
    }
    if (jsonObj.errors) {
      this.errors = jsonObj.errors;
    }
  }
}

export class View implements Serializable<View>{
  reason: string;
  code: string;
  error: string;
  nextSendAfter: number;

  fillObj(jsonObj) {
    this.error = jsonObj.error;
    this.reason = jsonObj.reason;
    this.code = jsonObj.code;
    this.nextSendAfter = jsonObj.nextSendAfter;
  }

  constructor(jsonObj) {
    this.fillObj(jsonObj);
  }

  deserialize(input) {
    this.error = input.error;
    this.code = input.code;
    this.reason = input.reason;
    this.nextSendAfter = input.nextSendAfter;
    return this;
  }
}

export class Form implements Serializable<Form>{
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

  deserialize(input) {
    this.errors = input.errors;
    this.fields = input.fields;
    this.name = input.name;
    return this;
  }
}
