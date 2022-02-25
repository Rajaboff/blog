import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs';
import { Album } from 'src/app/models/album.model';
import { Card } from 'src/app/models/card.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  limitTo: number = 10;
  limitFrom: number = 0;
  limitPosts: Card[] = [];
  static posts: Card[] = [];
  imgUrls: Album[] = [];
  modalIsOpened: boolean = false;
  postNotFound: boolean = false;

  searching: string = '';
  topScroller: boolean = false;

  pages: any[] = [];
  
  get posts() {
    return HomeComponent.posts;
  }

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
  ) {
    fromEvent(window, 'scroll').subscribe((e: Event) => {
      let y = (e.target as Element).children[0].scrollTop;
      this.topScroller = y > 0 ? true : false;
    })
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      if(params['searching']) {
        this.searching = params['searching'];
      }
      else {
        this.searching = '';
      }

      let reversing = false;
      
      if(params['filter'] == 'Z-A') {
        reversing = true;
      }

      if(reversing != undefined) {
        this.limitData(this.postService.getPostInfo(), 'posts', reversing);
        this.limitData(this.postService.getPostImg(), 'imgs', reversing);
      }

      let limit = Number.parseInt(params['limit']);
      let page = Number.parseInt(params['page']) ;  

      if(limit && page) {
        this.limitFrom = limit * (page-1);
        this.limitTo = limit * page;
      } 

      this.pages = new Array(Math.ceil(HomeComponent.posts.length / (this.limitTo - this.limitFrom)));
      
      this.filterData();
    })
  }

  filterData() {
    this.limitPosts = HomeComponent.posts.filter((v: any, i) => (i >= this.limitFrom && i < this.limitTo));
  }

  limitData(getFunc: any, arrayType: any, reverse: boolean) {
    getFunc
    .subscribe((response: any[]) => {
      response = reverse == true ? this.sortingPosts(response).reverse() : this.sortingPosts(response);
      
      let favorites = localStorage.getItem('favorites')?.split(',').map(i => Number.parseInt(i));
      let queryFav = this.route.snapshot.queryParamMap.get('favorite');
      if(favorites && queryFav) {
        response = response.filter(v => favorites?.findIndex(id => id == v.id) != -1);
      }

      if(arrayType == 'posts') {
        this.postNotFound = false;

        HomeComponent.posts = []
        HomeComponent.posts = response

        if(this.searching != '') {
            HomeComponent.posts = response.filter(p => {
            return p.title.toLowerCase().search(this.searching.toLowerCase()) != -1;
          });
          
          if(HomeComponent.posts.length == 0) {
            this.postNotFound = true;
          }
        }
      }
      else {
        this.imgUrls = [];
        this.imgUrls = [...response];
      }

      this.pages = new Array(Math.ceil(HomeComponent.posts.length / (this.limitTo - this.limitFrom)));
      this.filterData();
    })
  }

  showModal(close: boolean) {
    this.modalIsOpened = close;
  }

  sortingPosts(array: any[]) {
    return Array.from(array).sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
  }

  getImgs(index: number): any{
    if(this.imgUrls.findIndex(i => i.id == index) != -1) {
      return this.imgUrls.find(i => i.id == index);
    }

    return this.imgUrls[0];
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }

}
