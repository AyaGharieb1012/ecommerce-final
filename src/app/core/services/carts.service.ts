import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string= `https://ecommerce.routemisr.com/api/v1/`;
  userInfo:any;


cartNumber:BehaviorSubject<number>=new BehaviorSubject(0);



  addToCart(prodId:string):Observable<any>{
    return this._HttpClient.post(this.baseUrl+`cart`,

{
  productId: prodId
},
// this is a header this information about me ,backend need it (token of user)
   
    )
  }
  getUserCart():Observable<any>{
    return this._HttpClient.get(this.baseUrl +`cart`,
  
    
    )
  }
  removeUserCart(prodId:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl +`cart/${prodId}`,
   
    )
  }
updateCartCount(prodId:string,countNum:number):Observable<any>{
  return this._HttpClient.put(this.baseUrl +`cart/${prodId}`,
  {
    count: countNum
}
  
  )
}
clearCart():Observable<any>{
  return this._HttpClient.delete(this.baseUrl +`cart/`,
 
  
  )
}

decodeUser():void{
  const encode=localStorage.getItem('etoken')
  if(encode !==null){
  const decode =jwtDecode(encode);
  this.userInfo=decode;
  // console.log(decode);
  
  }
  
  }
  


checkOut(cartId:string | null,orderInfo:object):Observable<any>{
  return this._HttpClient.post(this.baseUrl +`orders/checkout-session/${cartId}?url=http://localhost:4200`,
  
  
  {
    shippingAddress:orderInfo
        }
  )
}

getUserOrder(id:string):Observable<any>{
  return this._HttpClient.get(this.baseUrl+`orders/user/${id}`)
}
}
