import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { FacebookService, InitParams } from 'ngx-facebook';

@Injectable()
export class PostsService{
    constructor(private http: Http, private fb:FacebookService){
        console.log('service good');
    }
    
    // getPosts(){
    //     var token = 'EAACEdEose0cBABZAHyt5YsPpIQlGJJ5BCoEYRhPoyiOH2agNUKqecjfCPOinzasuXpXIwjlZAiqqsTIZCpXiUxrhWesOy9SsZBSKQXEFmM8TolYVij4GORcDrOtPZBHyPTo8w8qJ8Umn3JnGdZC7ZAzOnSu0GW2lQtYjRns2SZBoDm3sUgzQJNRkowm5zbndsDPo3RGf6cx9tgZDZD';
    //     return this.http.get('https://graph.facebook.com/v2.11/136792923789047/feed?access_token='+token)
    //     .map(res => res.json());
    // }
}