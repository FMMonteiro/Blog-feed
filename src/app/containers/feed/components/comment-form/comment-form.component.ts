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

  //   @Input()
  //   set resetForm(resetForm: boolean) {
  //     if (resetForm && this.form) {
  //       this.form.reset();
  //     }
  //   }
  //   get resetForm(): boolean {
  //     return this._resetForm;
  //   }

  @Output() public formData: EventEmitter<CommentData> = new EventEmitter();

  //   private _resetForm: boolean = false;

  constructor(private formBuild: FormBuilder) {
    //   this.waiting$ = new BehaviorSubject(false);
  }

  public ngOnInit(): void {
    console.log('init form');
    this.form = this.createFormGroup();
    //   this.updateForm();
  }

  // public onEditClick(ev: MouseEvent): void {
  //   ev.preventDefault();

  //   this.changeMode(MODE.UPDATE);
  // }

  public createFormGroup(): FormGroup {
    return this.formBuild.group(
      {
        // adicionar min lenght e regex dos chars pra n ter numeros e cenas
        // acrescentar os chars no template tipo 0/5000
        user: [
          '',
          [Validators.required, Validators.pattern(CONSTANTS.REGEX.NAME)],
        ],
        content: ['', [Validators.required]],
      }
      // { validator: Validators.compose([this.emailConfirming, this.emailRequired]) }
    );
  }

  //   public onCancel(ev: Event): void {
  //     ev.preventDefault();

  //     // emitar o cancel pro modal
  //   }

  public onSubmit(ev: Event): void {
    ev.preventDefault();

    console.log('onsubmit pressed');

    this.form.markAllAsTouched();

    if (!this.form.valid) {
      //   Object.values(this.form.controls).forEach((f) => {
      //     f.markAsTouched();
      //     f.updateValueAndValidity();
      //   });

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

    // emitar o submit pro modal

    // this.waiting$.next(true);
    // this.changedEmail.emit({ email: this.form.value.email.trim(), section: 'email' });
  }

  //   public hasFormError(fieldName: string | string[], errorName: string, form: FormGroup): boolean {
  //     // let control: AbstractControl;
  //     let control;

  //     if ()

  //     if (typeof fieldName === 'string') {
  //       control = form.get(fieldName);
  //     } else if (Array.isArray(fieldName)) {
  //       control = form.get(fieldName[0]);

  //       fieldName.forEach(name => {
  //         control = control.get(name);
  //       });
  //     } else {
  //       throw new Error('fieldName should be of type \'string\'');
  //     }

  //     return control.hasError(errorName) && (control.touched || control.dirty);
  //   }
}
