import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly http: HttpClient = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl;

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/posts`);
  }
}
