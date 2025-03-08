


import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { initFlowbite } from 'flowbite';
import { OrdersService } from './../../core/services/orders/orders.service';
import { IOrder, ShippingAddress, OrdersResponse } from '../../shared/interfaces/iorder';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [TranslatePipe, CommonModule, RouterLink],
  templateUrl: './allorders.component.html'
})
export class AllordersComponent implements OnInit {
  order: IOrder | null = null;
  isLoading = false;
  private readonly ordersService = inject(OrdersService);
  private readonly toastrService = inject(ToastrService);
  private readonly activatedRoute = inject(ActivatedRoute);
  public  router = inject(Router);

  orderId?: string;
  data: IOrder[] = [];
  totalResults: number = 0;
  currentPage: number = 1;
  numberOfPages: number = 0;

  ngOnInit(): void {
    this.loadInitialData();
  }
  ngAfterViewInit() :void {
    initFlowbite();
  }

  private loadInitialData(): void {
    this.getOrdersData(this.currentPage);
    const orderId = this.activatedRoute.snapshot.paramMap.get('id');
    if (orderId) {
      this.orderId = orderId;
      this.getOrderDetails(orderId);
    }else {
      this.orderId = undefined;
      this.order = null;
    }
  }

  getOrdersData(currentPage: number): void {
    this.isLoading = true;
    this.ordersService.getAllOrders().subscribe({
      next: (res: OrdersResponse) => {
        console.log(res);

        this.data = res.data;
        this.totalResults = res.results;
        this.currentPage = res.metadata.currentPage;
        this.numberOfPages = res.metadata.numberOfPages;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load orders:', err);
        this.toastrService.error('Failed to load orders');
        this.isLoading = false;
      }
    });
  }

  getOrderDetails(orderId: string): void {
    this.isLoading = true;
    const currentOrder = this.data.find(order => order._id === orderId);
    if (!currentOrder && this.data.length > 0) {
      this.toastrService.warning('Order not found in current data, fetching all orders again.');
      this.getOrdersData(this.currentPage); // إعادة تحميل البيانات لو الطلب مش موجود
      return;
    }
    const shippingAddress: ShippingAddress = currentOrder?.shippingAddress || {
      details: '',
      phone: '',
      city: ''
    };

    this.ordersService.checkOutPayment(orderId, shippingAddress).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success' && res.session?.url) {
          window.location.href = res.session.url; // Redirect to payment URL
        }
        this.order = currentOrder || null;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to process checkout:', err);
        this.toastrService.error('Failed to process checkout');
        this.isLoading = false;
      }
    });
  }


  getOrdersDataPage(page: number): void {
    if (page >= 1 && page <= this.numberOfPages) {
      this.currentPage = page;
      this.getOrdersData(page);
    }
  }

  getPageNumbers(): number[] {
    const pages = [];
    const maxPagesToShow = 5; // نحدد عدد الصفحات المعروضة
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.numberOfPages, startPage + maxPagesToShow - 1);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  goBack(): void {
    this.router.navigate(['/allorders']);
  }
}
