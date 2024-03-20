import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CartsService } from 'src/app/core/services/carts.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { Product } from 'src/app/core/interfaces/product';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule ,CarouselModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  //ActivatedRoute >>>معلومات عن المسار الحالي اللي واقفه فيه>>>routing الحالي 
constructor(private _ActivatedRoute:ActivatedRoute ,
   private _ProductService:ProductService,
   private _Renderer2:Renderer2,
   private _CartsService:CartsService,
   private _WishlistService:WishlistService,
   private _ToastrService:ToastrService
   ){}
productId!:string|null;
productDetails:any=null;
wishlistData:string[]=[];
Products:Product[]=[];

ngOnInit(): void {
  //paramMap >>>property cary information about routing paths  && return observable
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
    this.productId =params.get('id')
    console.log(this.productId);
    

    }
  });

this._ProductService.getproductDetails(this.productId).subscribe({
//   next:(response)=>{
// console.log(response);

//   }
next:({data})=>{
 console.log(data);
this.productDetails=data;

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

productDetailsOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  items:1,
  nav: true
}
}
