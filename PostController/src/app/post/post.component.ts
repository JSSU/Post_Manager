import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostsService]
})
export class PostComponent implements OnInit {
  posts:Post[];

  constructor(private postsService: PostsService) { 
    this.postsService.getPosts().subscribe(posts =>{
      console.log(posts);
      this.posts =posts.data;
    });
  }

  ngOnInit() {
  }
}
interface Post{
   timestamp: string;
   message: string;
   story: string;
   id: string; 
}
