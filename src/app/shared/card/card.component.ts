import { Component, Input } from '@angular/core';
import { Album } from 'src/app/models/album.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html'
})
export class CardComponent {

  @Input() id: number = 0;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() imgUrl: Album | null = null;
  @Input() bgColor: string = 'white';

  defaultImg: string = 'https://via.placeholder.com/600/bfe0dc';

  showFavIcon: boolean = false;
  addedToFav: boolean = false;

  modalIsOpened: boolean = false;

  getImgUrl() {
    let url = this.imgUrl != null ? this.imgUrl.url : this.defaultImg
    return `url(${url})`;
  }
  
  showModal(close: boolean) {
    this.modalIsOpened = close;
  }

  checkFav(){
    let favorites = localStorage.getItem('favorites')?.split(',').map(i => Number.parseInt(i));
    this.addedToFav = favorites && favorites.findIndex(i => i == this.id) != -1 ? true : false;
  }

  addToFav() {
    let favorites = localStorage.getItem('favorites')?.split(',').map(i => Number.parseInt(i));
    
    if(favorites) {
      let index = favorites.findIndex(i => i == this.id);
      if(index == -1 && !this.addedToFav){
        favorites.push(this.id);
        this.addedToFav = true
      }
      else {
        favorites.splice(index, 1);
        this.addedToFav = false
      }
    }
    else {
      favorites = new Array(1).fill(this.id);
      this.addedToFav = true
    }

    localStorage.setItem('favorites', favorites.toString());
    this.checkFav()
  }

}
