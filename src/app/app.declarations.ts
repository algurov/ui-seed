
import { NotFound404Component } from './not-found404.component';
import { LoginViewComponent } from './views/login/login-view.component';
import { MainViewComponent } from './views/main/main-view.component';
import { PasswordViewComponent } from './views/password/password-view.component';
import { PanelComponent } from './views/panel/panel.component';
import { MessageDialogComponent } from './widgets/message-dialog/message-dialog.component';
import { UserEditComponent } from './views/user/user.edit.component';
import { UserCardComponent } from './widgets/user-card/user.card.component';
import { UserListComponent } from './views/user/list/user.list.component';
import { LoadingComponent } from './widgets/loading/loading.component';
import { TableComponent } from './widgets/table/table.component';
import { ConfirmDialog } from './widgets/confirm.dialog';
import { PasswordRecoverComponent } from './views/password/password-recover.component';
import { PasswordHeader } from './views/password/password-header';
import { PasswordEmailComponent } from './views/password/password-email.component';
import { PasswordFlowComponent } from './widgets/loading/password.flow.component';
import { SetPasswordFlowComponent } from './widgets/loading/set.password.component';
import { AddPartnerComponent } from './views/partner/add.partner.component';
import { PartnerListComponent } from './views/partner/list/partner.list.component';
import { AddPartnerDialog } from './views/partner/add.partner.dialog';
import { BreadcrumbComponent } from './widgets/breadcrumb/breadcrumb.component';
import { TaxonomyAllListComponent } from './views/taxonomy/taxonomy.all.list.component';
import { ChipsInput } from './widgets/chips-input/chips.input';
import { TaxonomyComponent } from './views/taxonomy/taxonomy.component/taxonomy.component';
import { TaxonomyItemComponent } from './views/taxonomy/taxonomy.item/taxonomy.item.component';
import { AddTaxonomyDialog } from './views/taxonomy/add.taxonomy.dialog';
import { DocumentListComponent } from './views/document/document.list.component';
import { ApplicationComponent } from './views/document/application/application.component';
import { ApplicationTitleComponent } from './views/document/application/title/application.title.component';
import { ApplicationApplicantComponent } from './views/document/application/applicant/application.applicant.component';
import { ApplicationDeveloperComponent } from './views/document/application/developer/application.developer.component';
import { ApplicationReciverComponent } from './views/document/application/reciver/application.reciver.component';
import { ApplicationParamsComponent } from './views/document/application/params/application.params.component';
import { ApplicationProductComponent } from './views/document/application/product/application.product.component';
import { ApplicationStandardComponent } from './views/document/application/standard/application.standard.component';
import { ApplicationGroupComponent } from './views/document/application/group/application.group.component';
import { TreeProductComponent } from './widgets/tree.product/tree.product.component';
import { SettingsListComponent } from './views/settings/settings.list.component';
import { ProductParameterComponent } from './widgets/product.parameter/product.parameter.component';
import { ColorToggleComponent } from './widgets/product.parameter/color.toggle.component';
import { SelectTaxonomyComponent } from './views/taxonomy/select/select.taxonomy.component';
import { SelectTaxonomyDialog } from './views/taxonomy/select/select.taxonomy.dialog';
import { SeedSelectField } from './widgets/seed.select.field/seed.select.field';
import { SelectDialog } from './widgets/seed.select.field/seed.select.field';
import { SelectPlaceDialog } from './widgets/seed.select.field/seed.select.field';
import { SelectProductDialog } from './widgets/seed.select.field/seed.select.field';
import { SelectStandardDialog } from './views/document/application/standard/application.standard.component';
import { StandardField, StandardPropertyDialog } from './widgets/standard.field/standard.field';
import { ClickOutside } from './widgets/click-outside.directive';
import { RoleListComponent } from './views/role/role.list.component';
import { RoleFieldComponent } from './views/role/field/role.field.component';
import { RoleAddDialog } from './views/role/role.add.dialog';
import { SelectLaboratoryDialog } from './widgets/seed.select.field/seed.select.field';
import { SelectStandardListDialog } from './widgets/seed.select.field/seed.select.field';
import { SelectBranchFieldDialog } from './widgets/seed.select.field/seed.select.field';
import { ProductField } from './widgets/product.field/product.field';
import { EditableField } from './widgets/editable.field/editable.field';
import { ActComponent } from './views/document/act/act.component';
import { ActTitleComponent } from './views/document/act/title/act.title.component';
import { ActInfoComponent } from './views/document/act/info/act.info.component';
import { ActContactorComponent } from './views/document/act/contactor/act.contactor.component';
import { ActProductComponent } from './views/document/act/product/act.product.component';
import { ActTransportationComponent } from './views/document/act/transportation/act.transportation.component';
import { ActProofComponent } from './views/document/act/proof/act.proof.component';
import { ActWeightComponent } from './views/document/act/weight/act.weight.component';
import { ActPlaceComponent } from './views/document/act/place/act.place.component';
import { ActQualityComponent } from './views/document/act/quality/act.quality.component';
import { ActStampComponent } from './views/document/act/stamp/act.stamp.component';
import { ActAdditionalComponent } from './views/document/act/additional/act.additional.component';
import { ApplicationPreviewComponent } from './views/document/application/preview/application.preview.component';
import { SeedMutiselectField, SelectDialogMultiple } from './widgets/seed.multiselect.field/seed.multiselect.field';
import { SelectBranchDialog } from './views/main/select.branch.dialog/select.branch.dialog';
import { DirectionComponent } from './views/document/direction/direction.component';
import { DirectionTitleComponent } from './views/document/direction/title/direction.title.component';
import { DirectionActComponent } from './views/document/direction/act/direction.act.component';
import { DirectionDocumentComponent } from './views/document/direction/document/direction.document.component';
import { DirectionAdditionalComponent } from './views/document/direction/additional/direction.additional.component';
import { DirectionParamsComponent } from './views/document/direction/params/direction.params.component';
import { ParamTree, ParamTreeDialog } from './views/document/direction/param.tree/param.tree';
import { ParamNode } from './views/document/direction/param.node/param.node';
import { SelectField, SelectFieldDialog } from './widgets/select.field/select.field';
import { ProtocolComponent } from './views/document/protocol/protocol.component';
import { ProtocolTitleComponent } from './views/document/protocol/title/protocol.title.component';
import { ProtocolInfoComponent } from './views/document/protocol/info/protocol.info.component';
import { ProtocolParamsComponent } from './views/document/protocol/params/protocol.params.component';
import { GoodsCategoryDialog } from './views/document/protocol/goods.category.dilalog/goods.category.dialog';
import { GoodsCategoryNode} from './views/document/protocol/goods.category.node/goods.category.node';
import { ProtocolParamNode } from './views/document/protocol/protocol.param.node/protocol.param.node';
import { SignDialog } from './views/sign/sign.dialog';
import { StandardEditComponent } from './views/taxonomy/standard/standard.edit.component';
import { StandardListComponent } from './views/taxonomy/standard/standard.list.component';
import { PropertyEditComponent } from './views/taxonomy/standard/property.edit.component';
import { SelectGoodsCategoryDialog } from './widgets/seed.select.field/seed.select.field';
import { PropertyTree, PropertyTreeDialog } from './views/taxonomy/standard/property.tree/property.tree';
import { PropertyNode } from './views/taxonomy/standard/property.node/property.node';
import { CertificateComponent } from './views/document/certificate/certificate.component';
import { CertificateTitleComponent } from './views/document/certificate/title/certificate.title.component';
import { CertificateTypeDialog } from './views/document/certificate/type.dialog/type.dialog';
import { CertificateParamsComponent } from './views/document/certificate/params/certificate.params.component';

export const APP_DECLARATIONS = [
  MainViewComponent,
  PasswordViewComponent,
  LoginViewComponent,
  NotFound404Component,
  PanelComponent,
  MessageDialogComponent,
  UserEditComponent,
  UserCardComponent,
  UserListComponent,
  LoadingComponent,
  TableComponent,
  ConfirmDialog,
  PasswordRecoverComponent,
  PasswordHeader,
  PasswordEmailComponent,
  PasswordFlowComponent,
  SetPasswordFlowComponent,
  AddPartnerComponent,
  PartnerListComponent,
  AddPartnerDialog,
  BreadcrumbComponent,
  TaxonomyAllListComponent,
  ChipsInput,
  TaxonomyComponent,
  TaxonomyItemComponent,
  AddTaxonomyDialog,
  DocumentListComponent,
  ApplicationComponent,
  TreeProductComponent,
  SettingsListComponent,
  ProductParameterComponent,
  ColorToggleComponent,
  ApplicationTitleComponent,
  ApplicationApplicantComponent,
  ApplicationDeveloperComponent,
  ApplicationReciverComponent,
  ApplicationParamsComponent,
  ApplicationProductComponent,
  ApplicationStandardComponent,
  ApplicationGroupComponent,
  SelectTaxonomyComponent,
  SelectTaxonomyDialog,
  SeedSelectField,
  SelectDialog,
  SelectPlaceDialog,
  SelectProductDialog,
  SelectStandardDialog,
  StandardField,
  StandardPropertyDialog,
  ClickOutside,
  RoleListComponent,
  RoleFieldComponent,
  RoleAddDialog,
  SelectLaboratoryDialog,
  ProductField,
  EditableField,
  ActComponent,
  ActTitleComponent,
  ActInfoComponent,
  ActContactorComponent,
  ActProductComponent,
  ActTransportationComponent,
  ActProofComponent,
  ActWeightComponent,
  ActPlaceComponent,
  ActQualityComponent,
  ActStampComponent,
  ActAdditionalComponent,
  ApplicationPreviewComponent,
  SeedMutiselectField,
  SelectDialogMultiple,
  SelectBranchDialog,
  DirectionComponent,
  DirectionTitleComponent,
  DirectionActComponent,
  DirectionDocumentComponent,
  DirectionAdditionalComponent,
  DirectionParamsComponent,
  ParamTree,
  ParamTreeDialog,
  ParamNode,
  SelectField,
  SelectFieldDialog,
  SelectBranchFieldDialog,
  ProtocolComponent,
  ProtocolTitleComponent,
  ProtocolInfoComponent,
  ProtocolParamsComponent,
  GoodsCategoryDialog,
  GoodsCategoryNode,
  ProtocolParamNode,
  SignDialog,
  StandardEditComponent,
  SelectStandardListDialog,
  StandardListComponent,
  PropertyEditComponent,
  SelectGoodsCategoryDialog,
  PropertyTree,
  PropertyTreeDialog,
  PropertyNode,
  CertificateComponent,
  CertificateTitleComponent,
  CertificateTypeDialog,
  CertificateParamsComponent
];
