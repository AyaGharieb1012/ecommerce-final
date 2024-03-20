import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule ,Validators} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errMsg:string=''; // '' >>false |'zhjkktk' >>true
  isLoading:boolean=false;
  constructor(private _AuthService:AuthService, private _Router:Router){}
  loginForm:FormGroup=new FormGroup ({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
    
  })
  
  
  
  
  handelForm():void{
    // alert("okkkkkk")
    // console.log(this.registerForm.value)
    const userData =this.loginForm.value;
    this.isLoading=true;
    if(this.loginForm.valid == true){
          this._AuthService.login(userData).subscribe({
            next:(response)=>{
                      // console.log(response); 
                      localStorage.setItem('etoken',response.token);
                      this._AuthService.decodeUser();


                    if(response.message == 'success'){
                      this.isLoading=false;
                      this._Router.navigate(['./home'])
  
  
                    }  
            },
            error:(err)=>{
              //  console.log(err);
                this.errMsg=err.error.message;
              this.isLoading=false;
  
              
              
            }
          })
  
    }
  
  }
  
}
