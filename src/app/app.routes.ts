import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { RenderMode } from '@angular/ssr';

export const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'',component:AuthLayoutComponent, canActivate:[loggedGuard] ,children:[
    {path:'login',loadComponent:()=>import("./pages/login/login.component").then((c)=>c.LoginComponent) ,title:'login'},
    {path:'register',loadComponent:()=>import("./pages/register/register.component").then((c)=>c.RegisterComponent) ,title:'register'},
    {path:'forget',loadComponent:()=>import("./pages/forgetpassword/forgetpassword.component").then((c)=>c.ForgetpasswordComponent) ,title:'forget'},
  ]},
  {path:'',component:BlankLayoutComponent , canActivate:[authGuard] ,children:[
    {path:'home',loadComponent:()=>import('./pages/home/home.component').then((c)=>c.HomeComponent)  ,title:'home'},
    {path:'cart',loadComponent:()=>import("./pages/cart/cart.component").then((c)=>c.CartComponent) ,title:'cart'},
    {path:'products',loadComponent:()=>import("./pages/products/products.component").then((c)=>c.ProductsComponent) ,title:'products'},
    {path:'allorders',loadComponent:()=>import("./pages/allorders/allorders.component").then((c)=>c.AllordersComponent) ,title:'products'},
    {path:'allorders/:id',loadComponent:()=>import("./pages/allorders/allorders.component").then((c)=>c.AllordersComponent) ,title:'products' ,data:{RenderMode:'client'}},
    {path:'brands',loadComponent:()=>import("./pages/brands/brands.component").then((c)=>c.BrandsComponent) ,title:'brands'},
    {path:'categories',loadComponent:()=>import("./pages/categories/categories.component").then((c)=>c.CategoriesComponent) ,title:'categories'},
    {path:'checkout/:id',loadComponent:()=>import("./pages/checkout/checkout.component").then((c)=>c.CheckoutComponent) ,title:'checkout',data:{RenderMode:'client'}},
    {path:'details/:id',loadComponent:()=>import("./pages//details/details.component").then((c)=>c.DetailsComponent) ,title:'details',data:{RenderMode:'client'}},
    {path:'**',component:NotfoundComponent}
  ]},
];
