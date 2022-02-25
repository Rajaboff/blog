import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {

  filter: string = 'A-Z';
  limitOnPage: string[] = ['10', '20', '50'];
  selectedLimit: string = ''
  favoriteActive: boolean = false;

  constructor(private filterService: FilterService,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedLimit = this.limitOnPage[0];
    this.getQueryPage();
  }
 
  updateQueryParams(page: number) {
    this.filterService.updateQueryParams(page, this.selectedLimit, this.filter);
  }

  getQueryPage() {
    this.route.queryParams.subscribe((params) => {
      this.filter = params['filter']
      this.selectedLimit = params['limit']
      this.favoriteActive = params['favorite'] == 'true' ? true : false
    })
  }

  activateFavorite() {
    let fav = this.favoriteActive == true ? null : true

    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { favorite: fav, page: 1 },
        queryParamsHandling: 'merge'
      });
  }

}
