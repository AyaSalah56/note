import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  errorAPI:string = ''
  isLoading:boolean = false 
  inputType: string = 'password';
  constructor(private _AuthService:AuthService , private _Router:Router ){}

  loginForm: FormGroup = new FormGroup({
    email:new FormControl('', [Validators.required , Validators.email]) ,
    password:new FormControl('',[Validators.required , Validators.pattern(/^[A-Z].{6,}$/)]) ,
     })

  handleLoginForm()
  {
    console.log(this.loginForm);
    this.isLoading = true
    this._AuthService.signIpAPI(this.loginForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.msg ==='done')
        {
            localStorage.setItem('token' , '3b8ny__' + res.token)
            this._AuthService.setUserToken()
            this._Router.navigate(['notes'])
        }
      },

      error:(err)=>{
        console.log(err);
        this.errorAPI = err.error.msg
        this.isLoading = false
      }
    })
  }

  signUp()
  {
    this._Router.navigate(['./signup'])
  }

  togglePasswordVisibility(input: HTMLInputElement) {
    input.type = (input.type === 'password') ? 'text' : 'password';
    this.inputType = (this.inputType === 'password') ? 'text' : 'password';
  }


}

