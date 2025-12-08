import { BehaviorSubject } from "rxjs";
import { Blog } from "../interfaces/blog";


export class BlogStore {

    private blogSubject = new BehaviorSubject<Blog[]>([]);
    blogs$ = this.blogSubject.asObservable();

    setBlogs(list: Blog[]) {
        this.blogSubject.next(list);
    }
    addBlog(blog: Blog) {
        const currentBlogs = this.blogSubject.value;
        this.blogSubject.next([blog, ...currentBlogs])
    }
   
}
export const blogStore = new BlogStore();
