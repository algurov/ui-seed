import { MessageDialogComponent } from './widgets/message-dialog/message-dialog.component';
import { ConfirmDialog } from './widgets/confirm.dialog';
import { AddPartnerDialog } from './views/partner/add.partner.dialog';
import { AddTaxonomyDialog } from './views/taxonomy/add.taxonomy.dialog';
import { SelectTaxonomyDialog } from './views/taxonomy/select/select.taxonomy.dialog';
import { SelectDialog, SelectPlaceDialog, SelectProductDialog } from './widgets/seed.select.field/seed.select.field';
import { SelectStandardDialog } from './views/document/application/standard/application.standard.component';
import { StandardPropertyDialog } from './widgets/standard.field/standard.field';
import { RoleAddDialog } from './views/role/role.add.dialog';
import { SelectLaboratoryDialog } from './widgets/seed.select.field/seed.select.field';
import { SelectDialogMultiple } from './widgets/seed.multiselect.field/seed.multiselect.field';
import { SelectBranchDialog } from './views/main/select.branch.dialog/select.branch.dialog';

export const APP_ENTRY_COMPONENTS = [
  MessageDialogComponent,
  ConfirmDialog,
  AddPartnerDialog,
  AddTaxonomyDialog,
  SelectTaxonomyDialog,
  SelectDialog,
  SelectPlaceDialog,
  SelectProductDialog,
  SelectStandardDialog,
  StandardPropertyDialog,
  RoleAddDialog,
  SelectLaboratoryDialog,
  SelectDialogMultiple,
  SelectBranchDialog
];
