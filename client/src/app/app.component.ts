import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
    pageSize: 30,
    location: '',
    sort: '',
    order: '',
    repos: null,
    followers: null
  }
  pageSizeOptions: Array<number> = [10, 30, 50, 100];
  sortOptions: Array<string> = ['followers', 'repositories', 'joined']
  response;
  loading: boolean = false;
  oldSearchName: string = '';
  pageStartCount: number = 0;
  advancedSearch: boolean = false;
  constructor(private api: ApiService, private toast: ToastrService) {  }
  
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
    });
  }

  trimWhiteSpace(): void {
    this.params.name = this.params.name.trim();
  }

  changePage(page: number): void {
    this.params.page = page;
    this.search();
  }

  changePageSize(size: number): void {
    this.params.pageSize = size;
    this.search();
  }

  viewDetails(index: number): void {
    this.api.getMoreDetails(this.response.items[index].login).then((result:any) => {
      if (result && result.message) {
        this.toast.error('No more api calls allowed by Github!', 'Limit Reached', {
          timeOut: 3000
        })
      }
      this.response.items[index].additionalDetails = result;
    });
  }

  openSearchOptions(): void {
    this.advancedSearch = !this.advancedSearch;
  }

  changeSortOption(option: string): void {
    this.params.sort = option;
  }

  changeOrderOption(option: string): void {
    this.params.order = option;
  }
}
