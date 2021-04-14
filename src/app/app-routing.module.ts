import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplementsComponent } from './components/complements/complements.component';

const routes: Routes = [ {
  path: 'taller/complementos',
  component: ComplementsComponent
} ];

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule {
}
