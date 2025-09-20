import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonInput } from "@ionic/angular/standalone";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone:false
})
export class InputComponent  implements OnInit {
 @Input() label: string = '';
 @Input() type:'email' | 'password' | 'name'| 'lastname'| 'country'| 'confirm'| 'text' = 'text';
 @Input() clear:boolean = false;
 @Input() control:FormControl = new FormControl();
 

  
  constructor() { }

  ngOnInit() {}

}
