import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Blog } from 'src/app/interfaces/blog';
import { BlogService } from 'src/app/services/blogService/blog.service';
import { blogStore } from 'src/app/state/blog.store';
@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.page.html',
  styleUrls: ['./blog-add.page.scss'],
  standalone: true,
  imports: [IonButton, IonInput, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonContent, IonHeader, IonTitle, IonToolbar, IonLabel]
})
export class BlogAddPage implements OnInit {
  blogForm!: FormGroup;
  isSubmitting = false;

  private fb = inject(FormBuilder);
  private blogService = inject(BlogService);
  private router = inject(Router);
  private toastcontroller = inject(ToastController);

  constructor() { }

  ngOnInit() {
    this.blogForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    body: ['', [Validators.required, Validators.minLength(3)]],
  })
  }
 async submitBlog(): Promise<void> {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched();
      return;
    }
    this.isSubmitting = true;
    const blog: Blog = this.blogForm.value;

    this.blogService.addBlog(blog).subscribe((newBlog) => {
      blogStore.addBlog(newBlog);
      this.toastcontroller.create({
        message: 'Blog added successfully!',
        duration: 2000,
        color: 'success',
        position: 'top',
        buttons: ['Close']
      }).then(toast => toast.present());

      this.router.navigate(['/blog-list']);
    })

  }

}
