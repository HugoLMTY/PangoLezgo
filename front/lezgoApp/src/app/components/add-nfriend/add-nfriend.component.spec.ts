import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNFriendComponent } from './add-nfriend.component';

describe('AddNFriendComponent', () => {
  let component: AddNFriendComponent;
  let fixture: ComponentFixture<AddNFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNFriendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
