import { CartsService } from './../../core/services/carts.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { Product } from 'src/app/core/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule,RouterLink,CuttextPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit{
  [x: string]: any;

  constructor(private _WishlistService:WishlistService,private _ToastrService:ToastrService,private _CartsService:CartsService,private _Renderer2:Renderer2){}
  Products:Product[]=[];
wishlistData:string[]=[];


  ngOnInit(): void {
    this._WishlistService.getWishlist().subscribe({
      next:(response)=>{
        // console.log(response);
        this.Products=response.data;
        const newData =response.data.map((item:any)=> item._id);
        this.wishlistData=newData;
        
      }
    })
  }

  addProduct(id:any,element:HTMLButtonElement):void{
    this._Renderer2.setAttribute(element,'disabled','true');
    this._CartsService.addToCart(id).subscribe({
      next:(response)=>{
    console.log(response);
    console.log(response.message);
    this._ToastrService.success(response.message,'',{
      closeButton:true,
      progressBar:true,
      progressAnimation:'increasing',
      positionClass:'toast-top-right',
      timeOut:1000
    });
    this._Renderer2.removeAttribute(element,'disabled')
    this._CartsService.cartNumber.next(response.numOfCartItems)
      },
    
      error:(err)=>{
    this._Renderer2.removeAttribute(element,'disabled')
      }
    })
    }


    addToMyWishlist(prodId:string|undefined):void{
      this._WishlistService.addToWishlist(prodId).subscribe({
        next:(response)=>{
            console.log(response);
            this._ToastrService.success(response.message);
            this.wishlistData=response.data;
            
        }
      })
  }
  
  removeWishlist(prodId:string |undefined):void{
    this._WishlistService.removeItemFromWishlist(prodId).subscribe({
            next:(response)=>{
              console.log(response);
              this._ToastrService.success(response.message);
              this.wishlistData=response.data;
              this._WishlistService.wishNum.next(response.data.length)
              const newProductData =this.Products.filter((item:any)=> this.wishlistData.includes(item._id) )
                      console.log(newProductData);
                      this.Products=newProductData;
                      
              // this._WishlistService.getWishlist().subscribe({
              //   next:(response)=>{
              //         console.log(response);
              //         this.Products=response.data;
                      
              //   }
              //})
            },
    })
  }
}
