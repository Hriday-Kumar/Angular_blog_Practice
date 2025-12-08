import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonButton, IonButtons, IonContent, IonHeader, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonItemGroup, IonLabel, IonList, IonRouterLink, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Blog } from 'src/app/interfaces/blog';
import { BlogService } from 'src/app/services/blog';
import { blogStore } from 'src/app/state/blog.store';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.page.html',
  styleUrls: ['./blog-list.page.scss'],
  standalone: true,
  imports: [IonInfiniteScrollContent, IonInfiniteScroll, IonLabel, IonItem, IonList, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRouterLink, IonButtons, IonRouterLink, RouterLink]
})
export class BlogListPage implements OnInit {
  blogs: Blog[] = [];
  
  page = 1;
  limit = 10;
  private blogservice = inject(BlogService);

  
  constructor() { }

  ngOnInit() {
    blogStore.blogs$.subscribe((res) => (this.blogs = res));
    this.loadInitialBlogs();
  }
  loadInitialBlogs() {
    this.blogservice.fetchBlogsFromApi().subscribe((data) => {
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


}
