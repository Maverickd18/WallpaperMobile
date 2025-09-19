import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { CardComponent } from './components/card/card.component';
import { ButtonComponent } from './components/button/button.component';
import { LinkComponent } from './components/link/link.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ButtonComponent,
    CardComponent,
    LinkComponent,
    InputComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ButtonComponent,
    CardComponent,
    LinkComponent,
    InputComponent,
  ]
})
export class SharedModule { }
