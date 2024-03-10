// language.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selectedLanguage: string = 'en'; // Default language

  constructor() { }

  setLanguage(language: string) {
    this.selectedLanguage = language;
  }

  getLanguage(): string {
    return this.selectedLanguage;
  }
}
