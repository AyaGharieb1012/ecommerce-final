import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartsService } from 'src/app/core/services/carts.service';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent  implements OnInit{
constructor(private _CartsService:CartsService, private _AuthService:AuthService){}
allorder:any=[];
userId!:string
userInfo:any;

ngOnInit(): void {

  const encode :any=localStorage.getItem('etoken')
  if(encode !==null){
  const decode:any =jwtDecode(encode);
  this.userId=decode.id;

}
  this._CartsService.getUserOrder(this.userId).subscribe({
    next:(response)=>{
        this.allorder=response;
        console.log(this.allorder);
      





    }
  })
}



}
