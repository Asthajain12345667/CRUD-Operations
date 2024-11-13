import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from './product.model';
import { Table, TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [TableModule,DialogModule,NgxChartsModule,ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
  
})
export class ProductComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;
  products: Product[] = [  { id: 1, name: 'Product 1', price: 100, category: 'Category 1' },  { id: 2, name: 'Product 2', price: 200, category: 'Category 2' }];  productForm!: FormGroup;
  selectedProduct: Product | null = null;
  displayDialog: boolean = false;
  chartData: any[] = [];
  constructor(private fb: FormBuilder,private productService:ProductService,// Inject MessageService
) {
    this.productForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.productService.getProducts().subscribe(products => this.products = products);
  }
  applyFilter(event: Event, field: string, mode: string) {
    const value = (event.target as HTMLInputElement).value;
    this.dt?.filter(value, field, mode);
  }
  showDialogToAdd() {
    this.productForm.reset();
    this.selectedProduct = null;
    this.displayDialog = true;
  }
  saveProduct() {
    const product = this.productForm.value as Product;
    if (product.id) {
      this.productService.updateProduct(product);
    } else {
      this.productService.addProduct(product);
    }
    this.resetForm();
  }
  
  onEdit(product: Product) {
    this.selectedProduct = product;
    this.productForm.patchValue(product);
    this.displayDialog = true;

  }
  deleteProduct(id: number) {
    this.productService.deleteProduct(id);
  }
  resetForm() {
    this.productForm.reset();
    this.selectedProduct = null;
    this.displayDialog = false;

  }
  updateChartData() {
    this.chartData = this.products.map(product => ({
      name: product.name,
      value: product.price
    }));
  }

}
