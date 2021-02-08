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
    page: 1,
    pageSize: 30
  }
  pageSizeOptions: Array<number> = [10, 30, 50, 100];
  response;
  loading: boolean = false;
  oldSearchName:string = '';
  pageStartCount:number = 0;
  constructor(private api: ApiService) {  }
  
  search(): void {
    this.loading = true;
    if(this.params.name !== this.oldSearchName) {
      this.oldSearchName = this.params.name;
      this.params.page = 1;
    }
    this.pageStartCount = (this.params.page - 1) * 30
    this.api.search(this.params).then((result) => {
      this.loading = false;
      this.response = result;
    })
  }

  changePage(page: number): void {
    this.params.page = page;
    this.search();
  }

  changePageSize(size: number): void {
    this.params.pageSize = size;
    this.search();
  }

  viewDetails(index) {
    this.api.getMoreDetails(this.response.items[index].login).then(result => {
      console.log('result: %o', result);
      this.response.items[index].additionalDetails = result;
    });
  }
}
