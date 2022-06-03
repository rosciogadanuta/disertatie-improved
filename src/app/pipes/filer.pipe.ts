import { Pipe, PipeTransform } from '@angular/core';
import {Book} from "../models/book";
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: Book[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return [];
    searchText = searchText?.toLowerCase();
    const finalArray: Book[] = []
    items.forEach(it => {it.authors.forEach(el => {
      if(el.toLowerCase().includes(searchText)){
        finalArray.push(it);
      }
    })});
    items.forEach( it => {
     if(it.name.toLowerCase().includes(searchText)){
       finalArray.push(it)
     }
    });
    return finalArray;
  }
}
