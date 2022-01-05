import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { PlayersPopupComponent } from './players-popup/players-popup.component';
import { CourtComponent } from './court/court.component';
import { StatsComponent } from './stats/stats.component';
import { StatActionsComponent } from './stat-actions/stat-actions.component';
import { PeriodsComponent } from './periods/periods.component';


@NgModule({
  declarations: [
    AppComponent,
    PlayersPopupComponent,
    CourtComponent,
    StatsComponent,
    StatActionsComponent,
    PeriodsComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
