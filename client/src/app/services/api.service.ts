import { Injectable } from '@angular/core';
import { HttpClient }	from '@angular/common/http';
import { UserSearchResponse, UserDetailResponse } from '../api.model'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  search(params): Promise<UserSearchResponse> {
    //Only for karma tests
    if(params.fakeCall) {
      return <Promise<UserSearchResponse>>this.http.get('https://api.github.com/search/users?q=tom').toPromise();
    }
    return <Promise<UserSearchResponse>>this.http.post('/api/search', params).toPromise();
  }

  getMoreDetails(login): Promise<UserDetailResponse> {
    //Only for karma tests
    if(login.fakeCall) {
      return <Promise<UserDetailResponse>>this.http.get(`https://api.github.com/users/tom`).toPromise();
    }
    return <Promise<UserDetailResponse>>this.http.get(`/api/details/${login}`).toPromise();
  }
}
