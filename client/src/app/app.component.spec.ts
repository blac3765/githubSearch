import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } 				from '@angular/common/http';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have loading as false until search() is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.loading).toBeFalsy();
    app.search();
    expect(app.loading).toBeTruthy();
  });

  it('should have params.page equal to 1', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.params.page).toEqual(1);
  });

  it('should have pageStartCount equal to 0', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.pageStartCount).toEqual(0);
  });

  it('should have response be false to start', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.response).toBeFalsy();
  });

  it('should remove white space from params.name', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.params.name = '   test   ';
    app.trimWhiteSpace(app.params.name);
    expect(app.params.name).toEqual('test');
  });

  it('should change page', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.params.page = 1;
    app.changePage(5);
    expect(app.params.page).toEqual(5);
  });

  it('should change status of advancedSearch', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.advancedSearch = true;
    app.openSearchOptions();
    expect(app.advancedSearch).toBeFalsy();
  });

  it('should change sort option', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.params.sort = 'test';
    app.changeSortOption('followers');
    expect(app.params.sort).toEqual('followers');
  });

  it('should change order option', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.params.order = 'test';
    app.changeOrderOption('asc');
    expect(app.params.order).toEqual('asc');
  });
});
