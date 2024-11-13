import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ProductComponent } from '../product/product.component';
import { AppComponent } from '../app.component';
import { ProductModule } from '../product/product.module';
import { BarModule } from '../bar/bar.module';
import { BarComponent } from '../bar/bar.component';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; 
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent, // add it here
    BarComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [BrowserModule,ProductModule,BarModule,DialogModule,BrowserAnimationsModule,NoopAnimationsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
