import { Injectable } from '@angular/core';
import { HttpClient }	from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  search(params) {
    return this.http.post('/api/search', params).toPromise();
  }

  getMoreDetails(login) {
    return this.http.get(`/api/details/${login}`).toPromise();
  }
}
