import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { CommonModule } from '@angular/common';
import { TranslateService ,TranslateModule} from '@ngx-translate/core';
@Component({
  selector: 'app-language-selection',
  templateUrl: './language-selection.page.html',
  styleUrls: ['./language-selection.page.scss'],
})
export class LanguageSelectionPage implements OnInit {
  appLanguageList=[
    {code:"en",title:"english",text:'english'},
    {code:"hr",title:"hindi",text:'हिंदी'},
    {code:"fr",title:"french",text:'francaise'},
  ];
  
constructor(private translateService:TranslateService) { }
  ngOnInit() {
  }
  onLanguageChange(e:any){
    this.translateService.use(e.target.value? e.target.value:"en")
  }
}
