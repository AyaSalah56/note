import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  errorAPI:string = ''
  isLoading:boolean = false 
  inputType: string = 'password';
  constructor(private _AuthService:AuthService , private _Router:Router ){}

  registerForm: FormGroup = new FormGroup({
    name:new FormControl('' ,[Validators.required , Validators.minLength(3)]) ,
    email:new FormControl('', [Validators.required , Validators.email]) ,
    password:new FormControl('',[Validators.required , Validators.pattern(/^[A-Z].{6,}$/)]) ,
    age:new FormControl('',[Validators.required]) ,
    phone:new FormControl('' , [ Validators.required,Validators.pattern(/^(01)[0125][0-9]{8}$/)]) ,
  })

  handleRegisterForm()
  {
    console.log(this.registerForm);
    this.isLoading = true
    this._AuthService.signUpAPI(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.msg ==='done')
        {
            this._Router.navigate(['signIn'])
        }
      },

      error:(err)=>{
        console.log(err);
        this.errorAPI = err.error.msg
        this.isLoading = false
      }
    })
  }


  signIN()
  {
    this._Router.navigate(['./signIn'])
  }

  togglePasswordVisibility(input: HTMLInputElement) {
    input.type = (input.type === 'password') ? 'text' : 'password';
    this.inputType = (this.inputType === 'password') ? 'text' : 'password';
  }

}
