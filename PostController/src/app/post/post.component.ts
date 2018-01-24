import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { LoginOptions } from 'ngx-facebook/dist/esm/models/login-options';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostsService]
})
export class PostComponent implements OnInit {
  posts:Post[];
  isConnect: boolean;
  status: string = "Log in to see all your Pages";
  pages: Page[];
  PannelPageName: string; // pannel head
  pageId: string; //for create new post{{}}
  postMessage: string="";

  options: LoginOptions = {
    scope:"public_profile, pages_show_list, publish_actions, publish_pages, manage_pages",
  };

  constructor(private http: Http, private fb:FacebookService, private postsService: PostsService) { 
    let initParams: InitParams = {
      appId      : '2094242160819146',//'324026418114130'
      cookie     : true,
      xfbml      : true,
      version    : 'v2.11'
    };
    fb.init(initParams);
  }

  ngOnInit() {
    this.fb.getLoginStatus()
    .then(response => {this.statusChangeCallback(response);});  
  }
  loginWithFacebook(): void {
    this.fb.login(this.options)
      .then((response: LoginResponse) => console.log(response))
      .catch((error: any) => console.error(error));  
    this.meApi();
  }
  logOut(): void{
      this.fb.logout().then(()=>console.log("Logged Out"));
      this.isConnect=false;
      this.status = "Log in to see all your Pages";
  }
  statusChangeCallback(response: any) {
      if (response.status === 'connected') {
          console.log('connected');
          this.meApi();
          this.show_pagelist_api();
          //keep the ini here
      } else {
          this.loginWithFacebook();
      }
  }
  meApi(): void{
    this.isConnect = true;    
    this.fb.api('/me/', 'get', { })
      .then(response => {console.log(response);
        if(response.name!='')
          this.status = 'Hello, '+response.name;});
  }
  //refresh
  show_pagelist_api(): void{
    console.log("refreshed");
    this.fb.api('/me/accounts', 'get', {"fields":"is_published,name"})
    .then(response => {
        this.pages = response.data;
      })
        //console.log(this.pages[0].id+this.pages[0].name+this.pages[0].is_published);
  }
  loadPost(id:string, name:string): void{
    this.fb.api(id+'/feed', 'get', {})
    .then(response => {
      console.log(response.data);
      this.posts = response.data;
    });
    this.PannelPageName = name;
  }
  AddPost(id:string, name:string): void{
    this.PannelPageName = name;
    this.pageId = id;
  }
  publishPost():void{
    this.fb.api(this.pageId+'/feed', 'post', {message: this.postMessage})
    .then(response => {
      console.log(response);
    });
    this.postMessage = "";
  }
}

interface Page{
  is_published: boolean;
  name: string;
  id: string;
}
interface Post{
   timestamp: string;
   message: string;
   story: string;
   id: string; 
}
