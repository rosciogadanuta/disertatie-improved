import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreazaBibliotecaComponent } from './exploreaza-biblioteca.component';

describe('ExploreazaBibliotecaComponent', () => {
  let component: ExploreazaBibliotecaComponent;
  let fixture: ComponentFixture<ExploreazaBibliotecaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreazaBibliotecaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreazaBibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
