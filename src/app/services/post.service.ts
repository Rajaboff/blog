import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Card } from '../models/card.model';
import { Album } from '../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPostInfo(): Observable<Card[]> {
    return this.http.get<Card[]>('https://jsonplaceholder.typicode.com/posts/');
  }

  getPostImg(): Observable<Album[]> {
    return this.http.get<Album[]>('https://jsonplaceholder.typicode.com/photos/');
  }
 }
