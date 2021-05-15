import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComplementsComponent } from './components/complements/complements.component';
import { TexturesComponent } from './components/textures/textures.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomeComponent } from './components/home/home.component';
import { PartialComponent } from './components/partial/partial.component';
import { TeacupComponent } from './components/teacup/teacup.component';
import { AnimationTwoComponent } from './components/animation-two/animation-two.component';

@NgModule( {
  declarations: [
    AppComponent,
    ComplementsComponent,
    TexturesComponent,
    HomeComponent,
    PartialComponent,
    TeacupComponent,
    AnimationTwoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
  ],
  exports: [
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
} )
export class AppModule {
}
