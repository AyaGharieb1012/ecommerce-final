
import { Product } from './../../core/interfaces/product';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from 'src/app/core/interfaces/category';
import { RouterLink } from '@angular/router';
import { CartsService } from 'src/app/core/services/carts.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from 'src/app/core/services/wishlist.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CuttextPipe,CarouselModule,RouterLink,
    SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit{
  constructor(
    private _ProductService:ProductService, 
    private _CartsService:CartsService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2,
    private _WishlistService:WishlistService
    ){}
Products:Product[]=[];
Categories:Category[]=[];
wishlistData:string[]=[];
wishCount:string[]=[];
term:string='';


ngOnInit(): void {
  // throw new Error('Method not implements')
  this._ProductService.getProduct().subscribe({
    next:(response)=>{
      console.log('Product',response.data);
      this.Products=response.data;
      
    },
    error:(err)=>{
        console.log(err);
        
    },
    
  });
  this._ProductService.getCategories().subscribe({
    next:(response)=>{
            console.log('Categories',response);
            this.Categories=response.data;
    },
    error:(err)=>{
      console.log(err);
      
  }

  });


  this._WishlistService.getWishlist().subscribe({
    next:(response)=>{
        // console.log('wishlist', response.data);
        const newData =response.data.map((item:any)=> item._id);
        this.wishlistData=newData;

        // console.log('newData',newData); 
        
    }
  });

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
          this._WishlistService.wishNum.next(response.data.length)
          
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
            
          }
  })
}





categoryOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  autoplay:true,
  autoplayTimeout:7000,
  autoplaySpeed:1000,
  navText: ['', ''],
  responsive: {
    0: {
      items: 2
    },
    400: {
      items: 3
    },
    740: {
      items: 4
    },
    940: {
      items: 6
    }
  },
  nav: false
}
mainSlideOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots:true,
  navSpeed: 700,
  autoplay:true,
  autoplayTimeout:2000,
  autoplaySpeed:1000,
  navText: ['', ''],
  items:1,
  nav: false
}
}
