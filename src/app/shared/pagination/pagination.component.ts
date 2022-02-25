import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnInit {

  selectedLimit = '';
  curPage = 1;

  @Input() pages: any = [];

  constructor(private filterService: FilterService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getQueryPage();
  }

  updateQueryParams(page: number) {
    this.filterService.updateQueryParams(page)
  }

  getQueryPage() {
    this.route.queryParams.subscribe((params) => {
      this.curPage = Number.parseInt(params['page'])
    })
  }

}
