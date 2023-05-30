import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientsComponent} from './clients.component';
import {ClientsRoutingModule} from "@app/@features/clients/clients-routing.module";
import {CreateComponent} from './create/create.component';
import {PreviewComponent} from './preview/preview.component';
import {EditComponent} from './edit/edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ClientFormComponent} from './@components/client-form/client-form.component';


@NgModule({
  declarations: [
    ClientsComponent,
    CreateComponent,
    PreviewComponent,
    EditComponent,
    ClientFormComponent
  ],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ClientsModule {
}
