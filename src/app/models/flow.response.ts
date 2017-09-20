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
}

export class View {
  reason: string;
  code: number;
  nextSendAfter: number;
}

export class Form {
  name: string;
  fields: any;
  errors: any;

}
