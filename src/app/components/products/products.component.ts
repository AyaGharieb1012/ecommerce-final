import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interfaces/product';
import { RouterLink } from '@angular/router';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { CartsService } from 'src/app/core/services/carts.service';
import { ToastrService } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterLink,CuttextPipe,NgxPaginationModule,SearchPipe,FormsModule,CarouselModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(
    private _ProductService:ProductService, 
    private _CartsService:CartsService,
    private _WishlistService:WishlistService,
    private _ToastrService:ToastrService,
    private _Renderer2:Renderer2){}


Products:Product[]=[];
wishlistData:string[]=[];
pageSize:number=0; //limit
curentPage:number=1;
total:number=0;
term:string='';

ngOnInit(): void {
  this._ProductService.getProduct().subscribe({
    next:(response)=>{
      console.log(response);
      
      console.log('Product',response.data);
      this.Products=response.data;
      this.pageSize=response.metadata.limit;
      this.curentPage=response.metadata.currtentPage;
      this.total=response.results;
      
    },
    error:(err)=>{
        console.log(err);
        
    },
    
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
  pageChanged(event:any):void{
    // console.log(event);
    this._ProductService.getProduct(event).subscribe({
      next:(response)=>{
        console.log(response);
        
        console.log('Product',response.data);
        this.Products=response.data;
        this.pageSize=response.metadata.limit;
        this.curentPage=response.metadata.currentPage;
        this.total=response.results;
        
      },
      error:(err)=>{
          console.log(err);
          
      },
      
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
} 
