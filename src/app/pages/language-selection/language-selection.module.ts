import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LanguageSelectionPageRoutingModule } from './language-selection-routing.module';

import { LanguageSelectionPage } from './language-selection.page';
import { TranslateModule,} from '@ngx-translate/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LanguageSelectionPageRoutingModule,
    TranslateModule, 
  ],
  declarations: [LanguageSelectionPage]
})
export class LanguageSelectionPageModule {}
