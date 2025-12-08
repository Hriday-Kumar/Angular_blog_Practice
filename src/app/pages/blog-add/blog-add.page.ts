import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonNote, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Blog } from 'src/app/interfaces/blog';
import { BlogService } from 'src/app/services/blog';
import { blogStore } from 'src/app/state/blog.store';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.page.html',
  styleUrls: ['./blog-add.page.scss'],
  standalone: true,
  imports: [IonNote, IonButton, IonInput, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonContent, IonHeader, IonTitle, IonToolbar, IonLabel]
})
export class BlogAddPage implements OnInit {
  blogForm!: FormGroup;
  isSubmitting = false;

  private fb = inject(FormBuilder);
  private blogService = inject(BlogService);
  private router = inject(Router);

  constructor() { }

  ngOnInit() {
    this.blogForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    body: ['', [Validators.required, Validators.minLength(3)]],
  })
  }

  submitBlog(): void {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const blog: Blog = this.blogForm.value;

    this.blogService.addBlog(blog).subscribe((newBlog) => {
      blogStore.addBlog(newBlog);
      this.router.navigate(['/blog-list']);
    })

  }

}
