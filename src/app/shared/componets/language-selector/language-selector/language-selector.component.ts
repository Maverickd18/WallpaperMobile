// src/app/shared/components/language-selector/language-selector.component.ts
import { Component, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/services/translation';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
  standalone: false
})
export class LanguageSelectorComponent implements OnInit {
  currentLang = 'en';

  constructor(private translationService: TranslationService) {}

  ngOnInit() {
    this.translationService.currentLanguage.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  toggleLanguage() {
    this.translationService.toggleLanguage();
  }

  getCurrentLanguageDisplay(): string {
    return this.translationService.t('language.current');
  }

  getSwitchLanguageDisplay(): string {
    return this.translationService.t('language.switch');
  }
}