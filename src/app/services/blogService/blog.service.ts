import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Blog } from 'src/app/interfaces/blog';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BlogService {

  private http = inject(HttpClient);

  fetchBlogsFromApi(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${environment.apiUrl}/posts?_limit=20`);
  }

  fetchBlogsFromDB(): Observable<Blog[]> {
    return this.http.get<any>(`${environment.BackendUrl}/blogs`).pipe(
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
    return this.http.get<Blog>(`${environment.BackendUrl}/blogs/${id}`);
  }
  
  addBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(`${environment.BackendUrl}/blogs`, blog);
  }

  updateBlog(id: string | number, blog: Partial<Blog>): Observable<Blog> {
    return this.http.put<Blog>(`${environment.BackendUrl}/blogs/${id}`, blog);
  }

  deleteBlog(id: string | number): Observable<any> {
    return this.http.delete(`${environment.BackendUrl}/blogs/${id}`);
  }
}
