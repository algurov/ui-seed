import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { TaxonomyService } from '../../../services/taxonomy.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddTaxonomyDialog } from '../add.taxonomy.dialog';

@Component({
  selector: 'taxonomy',
  templateUrl: './taxonomy.component.html',
  styleUrls: ['./taxonomy.component.scss']
})
export class TaxonomyComponent {
  @Input() taxonomy: any;
  @Input() taxonomyName: string;
  @Input() dialog: MatDialogRef<AddTaxonomyDialog>;
  fullTaxonomy: any;
  @Input() edit: boolean;
  taxonomyForm: FormGroup;


  constructor(private route: ActivatedRoute, private taxonomyService: TaxonomyService,
    private fb: FormBuilder) {

}
  ngOnInit() {
    this.fullTaxonomy = this.taxonomyService.getTaxonomy(this.taxonomyName);
    let formConfig = {};
    this.fullTaxonomy.columns.forEach(item => {
      formConfig[item.name] = [this.taxonomy[item.name]];
    });
    this.taxonomyForm = this.fb.group(formConfig);
  }
}
