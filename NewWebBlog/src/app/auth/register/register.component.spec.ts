import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should username not be empty', () => {
    component.registerUser('admin', 'email')
    expect(component.isUsernameEmpty).toBeTruthy();
  });

  it('username be empty', () => {
    component.registerUser('', 'email')
    expect(component.isUsernameEmpty).toBeFalsy();
  });

  it('userPassword be empty', () => {
    component.registerUser('admin', '');
    expect(component.isEmailEmpty).toBeTruthy();
  });


});
