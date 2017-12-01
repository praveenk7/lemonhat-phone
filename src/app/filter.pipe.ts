import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'customFilter',
    pure: false
})
export class FilterPipe implements PipeTransform {
  transform(items: any, filter: Object): any {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
      return items.filter((item: Object) => this.applyFilter(item, filter));
  }
  
    applyFilter(item: Object, filter: Object): any {
       
        for (let field in filter) {
          if (filter[field]) {
              if (filter[field] instanceof Object) {
                  //this.applyFilter(item[field], filter[field])
                  for (let innerField in filter[field]) {
                      if (typeof innerField === "string") {
                          if (item[field][innerField].toLowerCase().indexOf(filter[field][innerField].toLowerCase()) === -1) {
                              return false;
                          }
                      }
                  }
              }
              else {
              if (typeof field === "string") {
                  if (item[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
                      return false;
                  }
              }
              }
          }
        }
    return true;
  }
}