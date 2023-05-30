import {RouterModule, Routes} from "@angular/router";
import {ClientsComponent} from "@app/@features/clients/clients.component";
import {NgModule} from "@angular/core";
import {CreateComponent} from "@app/@features/clients/create/create.component";
import {PreviewComponent} from "@app/@features/clients/preview/preview.component";
import {EditComponent} from "@app/@features/clients/edit/edit.component";

const routes: Routes = [
  {
    path: 'clients',
    component: ClientsComponent,
    children: [
      {
        path: '',
        component: PreviewComponent,
        pathMatch: 'full'
      },
      {
        path: 'create',
        component: CreateComponent,
        pathMatch: 'full'
      },
      {
        path: ':id/edit',
        component: EditComponent,
        pathMatch: 'full'
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule {
}
