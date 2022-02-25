import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor(private router: Router, private route: ActivatedRoute) {}

  updateQueryParams(page: number, selectedLimit?: any, filter?: any) {

    let queries: any = {
      page: page
    }
    
    if(selectedLimit) {
      queries['limit'] = selectedLimit;
    }

    if(filter) {
      queries['filter'] = filter;
    }
    

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: queries,
        queryParamsHandling: 'merge'
      });

    window.scrollTo(0, 0)  
  }

}
