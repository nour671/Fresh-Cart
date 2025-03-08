import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ProductsService } from '../../core/services/products/products.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { IProduct } from '../../shared/interfaces/iproduct';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  imports: [ TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {


    private readonly productsService = inject(ProductsService);
    private readonly categoriesService =inject(CategoriesService);
    private readonly toastrService =inject(ToastrService);
    // private readonly ngxSpinnerService =inject(NgxSpinnerService);


    categories:ICategory[]=[]

    ngOnInit(): void {
      
      this.getCategoriesData();

    }



    getCategoriesData():void {
      // this.ngxSpinnerService.show()
      this.categoriesService.getAllCategories().subscribe({
        next:(res)=>{
          console.log(res.data);

          this.categories = res.data
          // this.ngxSpinnerService.hide()
        },
        error:(err)=>{
          console.log(err);

        }
      })
    }


}
