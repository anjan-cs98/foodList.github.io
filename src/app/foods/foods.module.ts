import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodsRoutingModule } from './foods-routing.module';
import { FoodsComponent } from './foods.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { FoodFilterPipe } from '../pipes/food-filter.pipe';


@NgModule({
  declarations: [
    FoodsComponent,
     FoodFilterPipe
  ],
  imports: [
    CommonModule,
    FoodsRoutingModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class FoodsModule { }
