import { IBrands } from './../../shared/interfaces/ibrands';
import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  imports: [TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {

  brands: IBrands[]=[]

    private readonly brandsService = inject(BrandsService);
    private readonly toastrService =inject(ToastrService);




      ngOnInit(): void {
        this.getBrandsData();


      }

      getBrandsData():void {

        this.brandsService.getAllBrands().subscribe({
          next:(res)=>{
            console.log(res.data);
            this.brands = res.data
          },
          error:(err)=>{
            console.log(err);

          }

        })

      }

}
