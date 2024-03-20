import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string='https://ecommerce.routemisr.com/api/v1/'




// products data

  getProduct(pageNum:number=1):Observable<any>{
    return this._HttpClient.get(this.baseUrl +`products?page=${pageNum}`)
  }
  getproductDetails(id:string|null):Observable<any>{
    return this._HttpClient.get(this.baseUrl +`products/${id}`)
  }

  // category data
  getCategories():Observable<any>{
    return this._HttpClient.get(this.baseUrl +'categories')
  }
  getCategoryDetails(id:string|null):Observable<any>{
    return this._HttpClient.get(this.baseUrl +`categories/${id}`)
  }
  
// brands data

  getBrands():Observable<any>{
    return this._HttpClient.get(this.baseUrl +'brands')
  }

  getBrandsDetails(id:string|null):Observable<any>{
    return this._HttpClient.get(this.baseUrl +`brands/${id}`)
  }

}
