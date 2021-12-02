import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IProduct } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService) {}

  productSub!: Subscription;
  errorMessage: string = '';
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];

  ngOnInit(): void {
    console.log('OnInit called');
    this.productSub = this.productService.getProducts().subscribe({
      next: (products: IProduct[]) => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: (err: any) => (this.errorMessage = err),
    });
  }

  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  testProp = 'va;';
  showImage = false;

  private _listFilter: string = '';

  public get listFilter(): string {
    return this._listFilter;
  }

  public set listFilter(v: string) {
    this._listFilter = v;
    console.log(v);
    this.filteredProducts = this.performProductFilter(v);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performProductFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLocaleLowerCase();

    return this.products.filter((x: IProduct) =>
      x.productName.toLocaleLowerCase().includes(filterBy)
    );
  }

  onNotify(message: string): void {
    console.log(message);
  }
}
