import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NativeToast } from './providers/nativeToast/native-toast';
import { Auth } from '@angular/fire/auth';

const providers = [Auth, File, NativeToast];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[...providers]
})
export class CoreModule { }
