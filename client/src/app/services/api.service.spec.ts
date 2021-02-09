import { TestBed }                  from '@angular/core/testing';

import { ApiService }               from './api.service';
import { HttpClientModule } 				from '@angular/common/http';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService],
    });
  });

  it('should return search results', async() => {
    let params = {
      fakeCall: true
    }
    let result;
    const service: ApiService = TestBed.get(ApiService);

    await service.search(params).then(users => {
      result = users;
    });
    expect(result.items.length).toBeTruthy();
  });

  it('should return user info', async() => {
    let login = {fakeCall: true};
    let result;
    const service: ApiService = TestBed.get(ApiService);
    await service.getMoreDetails(login).then(response => {
      result = response;
    });
    expect(result).toBeTruthy();
  });
});
