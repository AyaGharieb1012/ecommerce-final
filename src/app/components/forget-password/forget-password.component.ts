import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgetpasswordService } from 'src/app/core/services/forgetpassword.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

  constructor(private _ForgetpasswordService:ForgetpasswordService,
    private _Router:Router
    ){}
  step1:boolean=true;
  step2:boolean=false;
  step3:boolean=false;
  email:string='';
  userMsg:string='';

  forgetForm:FormGroup = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email])
  })
  resetCodeForm:FormGroup = new FormGroup({
    resetCode:new FormControl('')
  })

  resetPasswordForm:FormGroup = new FormGroup({
    // email:this.forgetForm.get('email')?.value
    newPassword:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)])
  })


  forgetPassword():void{
    let userEmail=this.forgetForm.value
    this.email=userEmail.email;
    this._ForgetpasswordService.forgetPassword(userEmail).subscribe({
          next:(response)=>{
                console.log(response);
                this.userMsg=response.message
                this.step1=false;
                this.step2=true;
                
          },
          error:(err)=>{
              // console.log(err);
              this.userMsg=err.error.message;
              
              
          }
    })
  }



  resetCode():void{
    let resetCode = this.resetCodeForm.value;
    this._ForgetpasswordService.VerifyResetCode(resetCode).subscribe({
      next:(response)=>{
        console.log(response);
        this.userMsg=response.status;
        this.step2=false;
        this.step3=true
        
      },
      error:(err)=>{
        // console.log(err);
        this.userMsg=err.error.message;
        
        
    }
    })
  }

  newPassword():void{
  let resetPassword= this.resetPasswordForm.value
        resetPassword.email=this.email



        this._ForgetpasswordService.resetPassword(resetPassword).subscribe({
          next:(response)=>{
              // console.log(response);
              if(response.token){
                    localStorage.setItem('etoken',response.token);
                    this._Router.navigate(['/home'])

              }
              
          },
          error:(err)=>{
            this.userMsg=err.error.message;
          }
        })
  }


}










