
import { Component } from '@angular/core';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'panel',
  styleUrls: ['./panel.component.scss'],
  templateUrl: './panel.component.html'
})

export class PanelComponent {

constructor(public dlgService: DialogService){

}

showDlg() {
      this.dlgService.showMessageDlg('My title', 'My message');
}

}
