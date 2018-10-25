import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatMenuModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatMenuModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatToolbarModule
  ],
  declarations: []
})
export class CustomMaterialModule { }
