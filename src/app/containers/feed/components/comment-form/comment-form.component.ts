import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CONSTANTS } from 'src/app/shared/constants';
import { CommentData } from '../../feed.typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-comment-form',
  styleUrls: ['comment-form.component.scss'],
  templateUrl: './comment-form.component.html',
})
export class CommentFormComponent implements OnInit {
  public form!: FormGroup;

  @Output() public formData: EventEmitter<CommentData> = new EventEmitter();

  constructor(private formBuild: FormBuilder) {
    //   this.waiting$ = new BehaviorSubject(false);
  }

  public ngOnInit(): void {
    console.log('init form');
    this.form = this.createFormGroup();
  }

  public createFormGroup(): FormGroup {
    return this.formBuild.group({
      user: [
        '',
        [Validators.required, Validators.pattern(CONSTANTS.REGEX.NAME)],
      ],
      content: ['', [Validators.required]],
    });
  }

  public onSubmit(ev: Event): void {
    ev.preventDefault();

    Object.values(this.form.controls).forEach((control) => {
      if (typeof control.value === 'string' && control.errors === null) {
        control.setValue(control.value.trim());
      }
    });

    this.form.markAllAsTouched();

    if (!this.form.valid) {
      console.log('form invalid');

      return;
    } else {
      const now: Date = new Date();
      this.formData.emit({
        user: this.form.value.user,
        content: this.form.value.content,
        date: new Date().toISOString().split('T')[0],
      });
    }
  }
}
