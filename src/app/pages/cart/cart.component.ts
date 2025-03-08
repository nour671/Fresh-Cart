import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';

@Component({
  selector: 'app-cart',
  imports: [ CurrencyPipe , RouterLink , TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  cartDetails : ICart ={} as ICart ;

  ngOnInit(): void {
    this.getCartData()

  }

  getCartData():void {
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.cartDetails = res.data;
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }


  removeItem(id: string): void {
    const confirmation = confirm('Are you sure you want to remove this item from the cart?');
    if (confirmation) {
      this.cartService.removeSpecificCartItem(id).subscribe({
        next: (res) => {
          this.cartDetails = res.data;
          this.toastrService.success('Item removed successfully', 'Cart');
        },
        error: (err) => {
          console.log(err);
          this.toastrService.error('Failed to remove item', 'Cart');
        }
      });
    }
  }

  updateCount(id:string ,newCount:number):void {
    this.cartService.updateCartQuantity(id ,newCount).subscribe({
      next:(res)=>{
        console.log(res);
        this.cartDetails = res.data;
      },
      error:(err)=>{
        console.log(err);

      }
    })
  }


  clearItems(): void {
    const confirmation = confirm('Are you sure you want to clear all items from the cart?');
    if (confirmation) {
      this.cartService.clearCart().subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.cartDetails = {} as ICart;
            this.toastrService.success('Cart cleared successfully', 'Cart');
          }
        },
        error: (err) => {
          console.log(err);
          this.toastrService.error('Failed to clear cart', 'Cart');
        }
      });
    }
  }

}
