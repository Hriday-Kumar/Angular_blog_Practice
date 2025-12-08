import { inject, Injectable } from '@angular/core';
import { ApiService } from './api';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Blog } from '../interfaces/blog';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private api = inject(ApiService);

  constructor() {}

  fetchBlogsFromApi(): Observable<Blog[]> {
    this.api.setBaseUrl(environment.apiUrl);
    return this.api.get<Blog[]>('posts?_limit=20');
  }

  fetchBlogsFromDB(): Observable<Blog[]> {
    this.api.setBaseUrl(environment.BackendUrl);

    return this.api.get<any>('blogs').pipe(
      map((res) => {
        if (!res) return [];
        return Object.keys(res).map((key) => ({
          id: key,
          ...res[key],
        }));
      })
    );
  }
  fetchSingleBlog(id: string | number): Observable<Blog> {
    this.api.setBaseUrl(environment.BackendUrl);
    return this.api.get<Blog>(`blogs/${id}`);
  }

  addBlog(blog: Blog): Observable<Blog> {
    this.api.setBaseUrl(environment.BackendUrl);
    return this.api.post<Blog>('blogs', blog);
  }

  updateBlog(id: string | number, blog: Partial<Blog>): Observable<Blog> {
    this.api.setBaseUrl(environment.BackendUrl);
    return this.api.put<Blog>(`blogs/${id}`, blog);
  }

  deleteBlog(id: string | number): Observable<any> {
    this.api.setBaseUrl(environment.BackendUrl);
    return this.api.delete(`blogs/${id}`);
  }
}
