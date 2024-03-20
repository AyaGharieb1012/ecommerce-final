import { Product } from 'src/app/core/interfaces/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(Products:Product[],term:string): Product[]{
    return Products.filter((item)=> item.title.toLocaleLowerCase().includes(term.toLocaleLowerCase())    );
  }

}
