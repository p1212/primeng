import { Component } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { ProductService } from '../service/product.service';
import { Product } from '../domain/product';

interface Column {
    field: string;
    header: string;
}

@Component({
  selector: 'app-primengtable',
  templateUrl: './primengtable.component.html',
  styleUrls: ['./primengtable.component.scss'],
  providers: [MessageService]
})
export class PrimengtableComponent {
  products!: Product[];

  cols!: Column[];

  product!: Product;

  statuses!: SelectItem[];

  selectedProducts!: Product[] | null;

  clonedProducts: { [s: string]: Product } = {};

  constructor(private productService: ProductService, private messageService: MessageService) {}

  ngOnInit() {
      this.productService.getProductsMini().then((data) => {
          this.products = data;
      });

      this.statuses = [
          { label: 'In Stock', value: 'INSTOCK' },
          { label: 'Low Stock', value: 'LOWSTOCK' },
          { label: 'Out of Stock', value: 'OUTOFSTOCK' }
      ];
  }

  onRowEditInit(product: Product) {
      this.clonedProducts[product.id as string] = { ...product };
  }

  onRowEditSave(product: Product) {
      if (product.price > 0) {
          delete this.clonedProducts[product.id as string];
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
      } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
      }
  }

  onRowEditCancel(product: Product, index: number) {
      this.products[index] = this.clonedProducts[product.id as string];
      delete this.clonedProducts[product.id as string];
  }

  openNew() {
    this.product = {
        id : '132345',
        code : '',
        name : '',
        description : '',
        price : 0,
        quantity : 0,
        inventoryStatus : '',
        category : '',
        image :'',
        rating : 0
    }
    
            this.product.id = this.createId();
            this.product.image = 'product-placeholder.svg';
            this.products.push(this.product);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });

        this.products = [...this.products];
}

deleteSelectedProducts() {
            this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
            this.selectedProducts = null;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
}

findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

addNewChild(productCode:string){
    let childProduct = {
        id : this.createId(),
        code : '',
        name : '',
        description : '',
        price : 0,
        quantity : 0,
        inventoryStatus : '',
        category : '',
        image :'product-placeholder.svg',
        rating : 0
    }
    
    this.products.forEach(element => {
        if(element.code === productCode){
            element.children = [childProduct];
        }
    });
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    this.products = [...this.products];
}
}
