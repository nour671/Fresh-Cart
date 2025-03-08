import { AsyncPipe, CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { IProduct } from '../../shared/interfaces/iproduct';
import { CartService } from './../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule,  NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-products',
  imports: [ RouterLink,NgClass,CommonModule,FormsModule, UpperCasePipe ,TranslatePipe , LowerCasePipe , TitleCasePipe, SlicePipe , CurrencyPipe , DatePipe , JsonPipe , AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService =inject(ToastrService);

    products:IProduct[]=[]
    searchTerm: string = '';



    ngOnInit(): void {
      this.getProductsData();
      


    }

    getProductsData():void {
      this.productsService.getAllProducts().subscribe({
        next:(res)=>{
          console.log(res.data);
          this.products = res.data
        },
        error:(err)=>{
          console.log(err);

        }

      })

    }


  addCartItem(id : string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status ==='success'){
          this.toastrService.success(res.message ,'Fresh Cart' )

        }


      },
      error:(err)=>{
        console.log(err);

      }
    })

  }

  filteredProducts() {
    // console.log(this.searchTerm);
    
    return this.products.filter(prod =>
      prod.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    
  }



}
