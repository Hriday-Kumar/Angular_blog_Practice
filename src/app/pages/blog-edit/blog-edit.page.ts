import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import { BlogService } from 'src/app/services/blog.service';
import { BlogStore, blogStore } from './../../state/blog.store';
@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.page.html',
  styleUrls: ['./blog-edit.page.scss'],
  standalone: true,
  providers: [BlogStore],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,       
    IonTextarea,    
    IonButton,
    ReactiveFormsModule,
  ]
})
export class BlogEditPage implements OnInit {

  id!: string;
  blogForm!: FormGroup;

  private fb = inject(FormBuilder);
  private blogService = inject(BlogService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private blogStore = inject(BlogStore);
  private toastController = inject(ToastController);

  ngOnInit() {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.id = this.route.snapshot.paramMap.get('id')!;

    this.blogService.fetchSingleBlog(this.id).subscribe((blog) => {
      this.blogForm.patchValue(blog);
    });
  }

  async updateBlog(): Promise<void> {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched();
      return;
    }
  this.blogService.updateBlog(this.id, this.blogForm.value).subscribe(() => {
  blogStore.updateBlog({ id: this.id, ...this.blogForm.value }); 

  this.toastController.create({
    message: 'Blog updated successfully!',
    duration: 2000,
    color: 'success',
    position: 'top',
    buttons: ['Close']
  }).then(toast => toast.present());

  this.router.navigate(['/blog-list']);
});
   
  }


}
