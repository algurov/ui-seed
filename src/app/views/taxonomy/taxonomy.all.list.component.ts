import { Component } from '@angular/core';
import { StringService } from '../../services/string.service';

@Component({
  selector: 'taxonomy-all',
  templateUrl: './taxonomy.all.list.component.html',
  styleUrls: ['./taxonomy.all.list.component.scss']
})
export class TaxonomyAllListComponent {
  constructor(private stringService: StringService) {}
}
