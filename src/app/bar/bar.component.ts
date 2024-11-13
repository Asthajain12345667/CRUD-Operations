import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [NgxChartsModule,CommonModule],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css'
})
export class BarComponent implements OnInit {
  productData: any[] = [];
  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.productData = products.map(product => ({
        name: product.name,
        value: product.price
      }));
    });
  }
}
