import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule ,Validators} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errMsg:string=''; // '' >>false |'zhjkktk' >>true
  isLoading:boolean=false;
  constructor(private _AuthService:AuthService, private _Router:Router){}
registerForm:FormGroup=new FormGroup ({
  name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  email:new FormControl('',[Validators.required,Validators.email]),
  password:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)]),
  rePassword:new FormControl(''),
  phone:new FormControl('',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
},{validators:[this.confirmPassword]} as FormControlOptions)

// to check pass &repass 
// the parameter=>group  >>cary all data in formGroup
confirmPassword(group:FormGroup):void{
const password = group.get('password');
const rePassword= group.get('rePassword');

  if(rePassword?.value == ''){
    rePassword?.setErrors({ required:true})

  }
if(password?.value != rePassword?.value ){
      rePassword?.setErrors({ mismatch:true})
}

}

handelForm():void{
  // alert("okkkkkk")
  // console.log(this.registerForm.value)
  const userData =this.registerForm.value;
  this.isLoading=true;
  if(this.registerForm.valid == true){
        this._AuthService.register(userData).subscribe({
          next:(response)=>{
                  // console.log(response);  
                  if(response.message == 'success'){
                    this.isLoading=false;
                    this._Router.navigate(['./login'])


                  }  
          },
          error:(err)=>{
            // console.log(err);
            this.errMsg=err.error.message;
            this.isLoading=false;

            
            
          }
        })

  }

}

}
