// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  private productSubject = new BehaviorSubject<Product[]>(this.products);

  getProducts() {
    return this.productSubject.asObservable();
  }

  addProduct(product: Product) {
    product.id = this.products.length + 1;
    this.products.push(product);
    this.productSubject.next(this.products);
  }

  updateProduct(updatedProduct: Product) {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.productSubject.next(this.products);
    }
  }

  deleteProduct(productId: number) {
    this.products = this.products.filter(p => p.id !== productId);
    this.productSubject.next(this.products);
  }
}

