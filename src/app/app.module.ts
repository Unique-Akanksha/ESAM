import { NgModule ,CUSTOM_ELEMENTS_SCHEMA, importProvidersFrom} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy, IonicSlides } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatTableModule } from '@angular/material/table'; // Import the MatTableModule
import { MatSortModule } from '@angular/material/sort'; // Import the MatSortModule
import { MatPaginatorModule } from '@angular/material/paginator'; // Import the MatPaginatorModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Import the MatFormFieldModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { ThemeService } from 'src/app/services/theme.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient} from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


export function createTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AppComponent],
  // imports: [MatTableModule, AngularFireModule.initializeApp(environment.firebaseConfig),MatSortModule,MatPaginatorModule,MatFormFieldModule,BrowserModule,BrowserAnimationsModule,IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule,ReactiveFormsModule,ModalModule.forRoot(),NgxMaterialTimepickerModule,NgxMaterialTimepickerModule, ],
  imports: [
    MatTableModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient],
        }
    }),
],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },ThemeService
    , importProvidersFrom(HttpClientModule),
    importProvidersFrom(TranslateModule.forRoot(
      {
        loader:{
          provide:TranslateLoader,
          useFactory:createTranslateLoader,
          deps:[HttpClient],
        }
      }
    )),
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
