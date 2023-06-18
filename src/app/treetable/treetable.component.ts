import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { ProductService } from '../service/product.service';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-treetable',
  templateUrl: './treetable.component.html',
  styleUrls: ['./treetable.component.scss']
})


export class TreetableComponent {
  files!: TreeNode[];

  cols!: Column[];

  selectedNodes!: TreeNode[];

  constructor(private nodeService: ProductService) {}

  ngOnInit() {
      this.nodeService.getFilesystem().then((files) => (this.files = files));
      this.cols = [
          { field: 'name', header: 'Name' },
          { field: 'size', header: 'Size' },
          { field: 'type', header: 'Type' }
      ];
  }

  openNew(){
    // let childProduct = {
    //     id : this.createId(),
    //     code : '',
    //     name : '',
    //     description : '',
    //     price : 0,
    //     quantity : 0,
    //     inventoryStatus : '',
    //     category : '',
    //     image :'product-placeholder.svg',
    //     rating : 0
    // }
    
    // this.products.forEach(element => {
    //     if(element.code === productCode){
    //         element.children = [childProduct];
    //     }
    // });
    // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    // this.products = [...this.products];
}

}
