import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartsService } from 'src/app/core/services/carts.service';
import { WishlistService } from 'src/app/core/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent  implements OnInit{

constructor(private _Router:Router , 
  private _CartsService:CartsService,
  private _WishlistService:WishlistService,
  private _Renderer2:Renderer2){}
@ViewChild('navBar') navElement!:ElementRef
@HostListener('window:scroll')
onScroll():void{
  // console.log('hello scroll');
if(scrollY>500){
  this._Renderer2.addClass(this.navElement.nativeElement,'px-5')
  this._Renderer2.addClass(this.navElement.nativeElement,'shadow')
} else{
  this._Renderer2.removeClass(this.navElement.nativeElement,'px-5')
  this._Renderer2.removeClass(this.navElement.nativeElement,'shadow')

} 
}

cartNum:number=0;
wishNum:number=0;

ngOnInit(): void {
  this._CartsService.cartNumber.subscribe({
    next:(data)=>{
      // console.log('nav',data);
      this.cartNum=data;
    }
  });

 this._CartsService.getUserCart().subscribe({
  next:(response)=>{
        // console.log('nav',response);
        this.cartNum = response.numOfCartItems;
        
        
  }
 });

this._WishlistService.wishNum.subscribe({
  next:(data)=>{
    console.log('nav',data);
    this.wishNum=data

  }
});
this._WishlistService.getWishlist().subscribe({
  next:(response)=>{
        console.log('nav',response);
        this.wishNum=response.data.length;
  }
})




}

  signout():void{
    localStorage.removeItem('etoken');
    this._Router.navigate(['/login']);
  }

}
