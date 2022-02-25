import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {

  searchingValue: string = '';
  showClear: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  searching() {
    let value = null;
    this.showClear = false;

    if(this.searchingValue != '') {
      value = this.searching;
      this.showClear = true;
    }

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { searching: value, page: 1 },
        queryParamsHandling: 'merge'
      });
  }

  clear() {
    this.searchingValue = '';
    this.searching();
  }

}
