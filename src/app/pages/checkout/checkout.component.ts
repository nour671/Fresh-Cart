import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrdersService } from '../../core/services/orders/orders.service';
import { TranslatePipe } from '@ngx-translate/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule , TranslatePipe , RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly ordersService = inject(OrdersService)
  cartId !: string;
  checkOutForm! : FormGroup ;


  ngOnInit():void {
    this.initForm();
    this.getCartId();
  }
    ngAfterViewInit() {
      initFlowbite();
    }
  initForm():void{
    this.checkOutForm = this.formBuilder.group({
      details:[null, [Validators.required] ],
      phone:[null , [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/) ]],
      city:[null, [Validators.required] ]
    })

  }

  getCartId():void {
    this.activatedRoute.paramMap.subscribe({
      next:(parm)=>{
        console.log();
        this.cartId = parm.get('id')!

      },
      error:(err)=>{
        console.log(err);

      }
    })

  }

  submitForm():void {
      console.log(this.checkOutForm.value);
      this.cartId

      this.ordersService.checkOutPayment(this.cartId, this.checkOutForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.status ==='success'){
            open( res.session.url , '_self');

          }



        },
        error:(err)=>{
          console.log(err);

        }

      })

    }



}
