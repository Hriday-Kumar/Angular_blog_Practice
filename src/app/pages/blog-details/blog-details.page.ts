import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonCard, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar, IonCardContent } from '@ionic/angular/standalone';
import { Blog } from 'src/app/interfaces/blog';
import { blogStore } from 'src/app/state/blog.store';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.page.html',
  styleUrls: ['./blog-details.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCardHeader, IonCardContent], 
})
export class BlogDetailsPage implements OnInit {
  blog!: Blog;
  id!:  string | number;
  private route = inject(ActivatedRoute);

  constructor() { }

  ngOnInit() {
    this.id = (this.route.snapshot.paramMap.get('id')!);
    blogStore.blogs$.subscribe((list) => {
      this.blog = list.find((x) => x.id === this.id)!;
    });
  }

}
