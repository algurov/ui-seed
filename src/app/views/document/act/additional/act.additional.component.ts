import {Component, Input, OnInit} from '@angular/core';
import {DocumentService} from "../../../../services/document.service";

@Component({
  selector: 'act-additional',
  templateUrl: './act.additional.component.html',
  styleUrls: ['./act.additional.component.scss']
})
export class ActAdditionalComponent implements OnInit{
  @Input() data: any;

  constructor(private documnetService: DocumentService) {}
  ngOnInit() {
      this.documnetService.getApplicationList(0,1).subscribe(res => {
          console.log(res);
      })
  }

}
