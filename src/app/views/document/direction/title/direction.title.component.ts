import { Component, Input } from '@angular/core';
import { StringService } from '../../../../services/string.service';
import { MainService } from '../../../../services/main.service';
import { DataService } from '../../../../services/data.service';
@Component({
  selector: 'direction-title',
  templateUrl: './direction.title.component.html',
  styleUrls: ['./direction.title.component.scss']
})
export class DirectionTitleComponent {
  @Input() data: any;
  date: any;
  subscription: any;
  constructor(private stringService: StringService, private mainService: MainService,
    private dataService: DataService) {
    this.subscription = this.mainService.directionLoaded.subscribe(item => {
      if (item.date) {
        this.date = new Date(item.date);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
      if(this.data.date) {
        this.date = new Date(this.data.date);
      }
  }

  onLaboratoryChange(lab) {
    this.data.laboratory = lab;
  }

  onDateChange(event) {
    this.date = this.dataService.dateOffset(event.value);
    this.data.date = this.data.getTime();
  }

  getApplicationTitle() {
    if (this.data && this.data.application) {
      return this.data.application.number;
    } else {
      return '';
    }
  }
}
