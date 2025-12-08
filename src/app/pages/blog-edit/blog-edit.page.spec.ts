import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogEditPage } from './blog-edit.page';

describe('BlogEditPage', () => {
  let component: BlogEditPage;
  let fixture: ComponentFixture<BlogEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
