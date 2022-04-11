import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommentFormComponent } from './comment-form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('CommentFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, ReactiveFormsModule],
      declarations: [CommentFormComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(CommentFormComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(CommentFormComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain(
      'Add a comment to this post'
    );
  });

  it('should create the form', () => {
    const fixture = TestBed.createComponent(CommentFormComponent);
    fixture.detectChanges();
    const expectedFields: string[] = ['user', 'content'].sort();
    const actual: string[] = Object.keys(
      fixture.componentInstance.form.value
    ).sort();
    expect(actual).toEqual(expectedFields);
  });
});
