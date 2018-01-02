import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageThumbnailsComponent } from './image-thumbnails.component';

describe('ImageThumbnailsComponent', () => {
  let component: ImageThumbnailsComponent;
  let fixture: ComponentFixture<ImageThumbnailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageThumbnailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageThumbnailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
