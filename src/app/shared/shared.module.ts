import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { ModalComponent } from './modal/modal.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './filter/filter.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    CardComponent,
    ModalComponent,
    PaginationComponent,
    FilterComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CardComponent,
    ModalComponent,
    PaginationComponent,
    FilterComponent,
    SearchComponent
  ]
})
export class SharedModule { }
