import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonRouterLink, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Blog } from 'src/app/interfaces/blog';
import { BlogService } from 'src/app/services/blog';
import { blogStore } from 'src/app/state/blog.store';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.page.html',
  styleUrls: ['./blog-list.page.scss'],
  standalone: true,
  imports: [IonIcon, IonInfiniteScrollContent, IonInfiniteScroll, IonLabel, IonItem, IonList, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRouterLink, IonButtons, IonRouterLink, RouterLink]
})
export class BlogListPage implements OnInit {
  blogs: Blog[] = [];
  blogsDb: Blog[] = [];
  
  page = 1;
  limit = 10;
  private blogservice = inject(BlogService);
  private router = inject(Router);

  constructor() { }

  ngOnInit() {
    blogStore.blogs$.subscribe((res) => (this.blogs = res));
    this.loadInitialBlogs();
    this.loadDbBlogs();
  }
  loadDbBlogs() {
    this.blogservice.fetchBlogsFromDB().subscribe((data) => {
      blogStore.setBlogs(data);
      console.log('data ', data);
    });
  }
  loadInitialBlogs() {
    this.blogservice.fetchBlogsFromApi().subscribe((data) => {
      console.log('data------', data);
      blogStore.setBlogs(data);
      
    });
  }
 
  loadMore(event: any) {
    this.page += 1;
    this.blogservice.fetchBlogsFromApi().subscribe((more) => {
      blogStore.setBlogs([...this.blogs, ...more]);
      event.target.complete();
    });
  }
  openDetails(id: string) {
  this.router.navigate(['/blog-details', id]);
}
  editBlog(id: string | number) {
    this.blogservice.fetchSingleBlog(id!).subscribe((blog) => {
      console.log(blog);
    });
  }
  deleteBlog(id: string | number) {
    console.log('called')
    this.blogservice.deleteBlog(id!).subscribe(() => this.loadDbBlogs());
  }


}
