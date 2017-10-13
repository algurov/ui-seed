import { Component, ViewEncapsulation, ViewChild, ElementRef, ViewContainerRef, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MainService } from '../../services/main.service';
import { MatSelect} from '@angular/material';
import { menuItems } from '../panel/menu.items';
import { StringService } from '../../services/string.service';
import { User } from '../../models/user';
import { Partner } from '../../models/partner';
import { PartnerService } from '../../services/partner.service';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'main-view',
  styleUrls: ['./main-view.component.scss'],
  templateUrl: './main-view.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MainViewComponent {

  @ViewChild('partnerSelect') partnerSelect : MatSelect;
  @ViewChild('content') sideContent: ElementRef;
  @ViewChild('content', {read: ViewContainerRef}) target: ViewContainerRef;
  inner: string = '';
  subItems: any;
  menuItems: Array<any> = menuItems;
  partners: Array<Partner> = new Array<Partner>();
  selectedPartnerId: number;
  constructor(private authService : AuthService, private router: Router,
     private main : MainService, private stringService: StringService,
      private partnerService: PartnerService, private settingsService: SettingsService) {
        this.main.partnerAdded.subscribe(item => this.refreshPartners());
        this.main.partnerUpdated.subscribe(item => this.refreshPartners());
        this.main.partnerDeleted.subscribe(item => this.refreshPartners());
  }

  refreshPartners() {
    this.partners = new Array<Partner>();
    this.partnerService.getPartnerList().subscribe(res => {
      res.content.forEach(item => {
        this.partners.push(new Partner().deserialize(item));
      });
    });
  }

  partnerChange(partner) {
    this.selectedPartnerId = partner;
    this.main.partnerSelectedForUser.emit(partner);
  }

  ngAfterContentInit() {
    this.refreshPartners();
  }

  ngAfterViewInit() {
    this.selectedPartnerId = this.settingsService.settings.selectedPartnerId;
  }
  changeRoute(link) {
    this.router.navigateByUrl(link);
  }
}
