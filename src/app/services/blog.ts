import { inject, Injectable } from '@angular/core';
import { ApiService } from './api';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../interfaces/blog';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private api = inject(ApiService);
  private http = inject(HttpClient);

  constructor() {}
  fetchBlogsFromApi(): Observable<Blog[]> {
    this.api.setBaseUrl(environment.apiUrl);
    return this.api.get<Blog[]>('posts?_limit=10');
  }
  fetchBlogsFromDB(): Observable<Blog[]> {
    this.api.setBaseUrl(environment.BackendUrl);
    return this.api.get<Blog[]>('blogs');
  }

  addBlog(blog: Blog): Observable<Blog>{
    this.api.setBaseUrl(environment.BackendUrl);
    return this.api.post<Blog>('blogs', blog);
  }


  
}
