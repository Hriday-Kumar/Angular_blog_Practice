import { blogStore } from './../../state/blog.store';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  IonButton, 
  IonContent, 
  IonHeader, 
  IonItem, 
  IonLabel, 
  IonTitle, 
  IonToolbar, 
  IonInput, 
  IonTextarea 
} from '@ionic/angular/standalone';
import { BlogService } from 'src/app/services/blog';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.page.html',
  styleUrls: ['./blog-edit.page.scss'],
  standalone: true,
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

  ngOnInit() {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log('id is ----------', this.id);

    this.blogService.fetchSingleBlog(this.id).subscribe((blog) => {
      console.log('fetch blog data-----', blog);
      this.blogForm.patchValue(blog);
    });
  }

  updateBlog(): void {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched();
      return;
    }
    this.blogService.updateBlog(this.id, this.blogForm.value).subscribe(() => {
      
      this.router.navigate(['/blog-list']);
    });
  }

}
