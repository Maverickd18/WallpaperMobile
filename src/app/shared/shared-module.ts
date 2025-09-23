import { input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './componets/input/input.component';
import { ButtonComponent } from './componets/button/button.component';

import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LanguageSelectorComponent } from './componets/language-selector/language-selector/language-selector.component';



@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    LanguageSelectorComponent
  ],
  providers:[

    
    
    
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports:[ButtonComponent,InputComponent,LanguageSelectorComponent
  ]
})
export class SharedModule { }
