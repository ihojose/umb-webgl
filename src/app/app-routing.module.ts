import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplementsComponent } from './components/complements/complements.component';
import { TexturesComponent } from './components/textures/textures.component';
import { HomeComponent } from './components/home/home.component';
import { PartialComponent } from './components/partial/partial.component';
import { TeacupComponent } from './components/teacup/teacup.component';

const routes: Routes = [ {
  path: 'taller/complementos',
  component: ComplementsComponent
}, {
  path: 'taller/texturas',
  component: TexturesComponent
}, {
  path: 'parcial',
  component: PartialComponent
}, {
  path: 'taller/tetera',
  component: TeacupComponent
}, {
  path: '',
  component: HomeComponent
} ];

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule {
}
