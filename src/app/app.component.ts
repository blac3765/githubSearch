import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  params = {
    name: '',
    page: 1
  }
  response;
  loading: boolean = false;
  oldSearchName:string = '';
  constructor(private api: ApiService) {
		
  }
  
  search(): void {
    this.loading = true;
    if(this.params.name !== this.oldSearchName) {
      this.oldSearchName = this.params.name;
      this.params.page = 1;
    }
    this.api.search(this.params).then((result) => {
      this.loading = false;
      console.log('result: %o', result);
      this.response = result;
    })
  }

  changePage(page: number): void {
    this.params.page = page;
    this.search();
  }
}
