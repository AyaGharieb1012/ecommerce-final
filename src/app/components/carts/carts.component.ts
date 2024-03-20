import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartsService } from 'src/app/core/services/carts.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})
export class CartsComponent implements OnInit{
  constructor(private _CartsService:CartsService,private _Renderer2:Renderer2){}
  cartDetails:any=null;
  ngOnInit(): void {
    this._CartsService.getUserCart().subscribe({
      next:(response)=>{
 console.log(response);
this.cartDetails=response.data;

      }
    })
    
  }
  removeItem(id:string,element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element,'disabled','true');
this._CartsService.removeUserCart(id).subscribe({
  next:(response)=>{
console.log(response);
this.cartDetails=response.data;
this._Renderer2.removeAttribute(element,'disabled');

this._CartsService.cartNumber.next(response.numOfCartItems);

  },
  error:()=>{
this._Renderer2.removeAttribute(element,'disabled');

  }
})
  }
  changeCount(count:number,id:string,ele1:HTMLButtonElement,ele2:HTMLButtonElement):void{
// console.log(count)

if(count >=1){
  this._Renderer2.setAttribute(ele1,'disabled','true');
  this._Renderer2.setAttribute(ele2,'disabled','true');
  this._CartsService.updateCartCount(id,count).subscribe({
    next:(response)=>{
// console.log(response);
this.cartDetails=response.data;
this._Renderer2.removeAttribute(ele1,'disabled');
  this._Renderer2.removeAttribute(ele2,'disabled');
    },
    error:(err)=>{
      // console.log(err);
      this._Renderer2.removeAttribute(ele1,'disabled');
  this._Renderer2.removeAttribute(ele2,'disabled');
      
    }
  })
}
 
  }
  clearCart():void{
    this._CartsService.clearCart().subscribe({
      next:(response)=>{
          // console.log(response);
          if(response.message=='success'){
            this.cartDetails=null;
            this._CartsService.cartNumber.next(0);
          }

          
      }
    })
  }
}
