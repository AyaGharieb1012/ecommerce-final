import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  //blank
  {path:'',
  canActivate:[authGuard],
  loadComponent:()=>import('./layouts/blank-layout/blank-layout.component')
  .then((m)=>m.BlankLayoutComponent),
  children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',loadComponent:()=>import('./components/home/home.component').then((m)=>m.HomeComponent),title:'Home'},
    {path:'cart',loadComponent:()=>import('./components/carts/carts.component').then((m)=>m.CartsComponent),title:'Cart'},
    {path:'wishlist',loadComponent:()=>import('./components/wishlist/wishlist.component').then((m)=>m.WishlistComponent),title:'WishList'},
    {path:'products',loadComponent:()=>import('./components/products/products.component').then((m)=>m.ProductsComponent),title:'Products'},
    {path:'brands',loadComponent:()=>import('./components/brands/brands.component').then((m)=>m.BrandsComponent),title:'Brands'},
    {path:'brandsDetails/:id',loadComponent:()=>import('./components/branddetails/branddetails.component').then((m)=>m.BranddetailsComponent),title:'Brands Details'},
    {path:'categories',loadComponent:()=>import('./components/categories/categories.component').then((m)=>m.CategoriesComponent),title:'Categories'},
    {path:'categoryDetails/:id',loadComponent:()=>import('./components/categorydetails/categorydetails.component').then((m)=>m.CategorydetailsComponent),title:'Category Details'},
    {path:'details/:id',loadComponent:()=>import('./components/details/details.component').then((m)=>m.DetailsComponent),title:'Details'},
    {path:'payment/:id',loadComponent:()=>import('./components/payment/payment.component').then((m)=>m.PaymentComponent),title:'Payment'},
    {path:'allorders',loadComponent:()=>import('./components/allorders/allorders.component').then((m)=>m.AllordersComponent),title:'allorders'},
    {path:'forgetPassword',loadComponent:()=>import('./components/forget-password/forget-password.component').then((m)=>m.ForgetPasswordComponent),title:'forgetPassword'},

  ] 
    
  },
// auth
  {path:'',
  loadComponent:()=>import('./layouts/auth-layout/auth-layout.component').then((m)=>m.AuthLayoutComponent),
  children:[
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',loadComponent:()=>import('./components/login/login.component').then((m)=>m.LoginComponent),title:'Login'},
    {path:'register',loadComponent:()=>import('./components/register/register.component').then((m)=>m.RegisterComponent),title:'Register'},
    {path:'forget',loadComponent:()=>import
    ('./components/forget-password/forget-password.component').then((m)=>m.ForgetPasswordComponent)
    ,title:'forgetPassword'}

  ]
},
// not found 
{path:'**',loadComponent:()=>import('./components/not-found/not-found.component')
.then((m)=>m.NotFoundComponent),
title:'Not Found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
