import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Client} from "@app/@features/clients/@models";
import {ErrorMessages} from "@shared/@constants";
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {emailValidation} from "@shared/@validators";
import {BehaviorSubject, debounceTime, Subject} from "rxjs";

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientFormComponent implements OnInit {
  @Input() client!: Client;
  @Output() submitClient: EventEmitter<Client> = new EventEmitter<Client>();
  @Output() secondaryAction: EventEmitter<number> = new EventEmitter<number>();

  errorMessages = ErrorMessages;

  public clientForm = this.formBuilder.group({
    id: new FormControl<number | null>(null),
    name: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl<string>('', [Validators.required, emailValidation]),
    phone: new FormControl<number | null>(null, [Validators.required, Validators.minLength(10)]),
    // address: new FormArray<AbstractControl<Address[]>>([]),
    address: this.formBuilder.array([]),
    note: [''],
  });

  get address() {
    return this.clientForm.get('address') as FormArray;
  }

  private nameControl = this.clientForm.get('name')!;
  nameMessage: Subject<string> = new Subject<string>();
  private emailControl = this.clientForm.get('email')!;
  emailMessage: Subject<string> = new Subject<string>();
  private phoneControl = this.clientForm.get('phone')!;
  phoneMessage: Subject<string> = new Subject<string>();
  secondaryActionTitle$: BehaviorSubject<string> = new BehaviorSubject<string>('Clear');

  constructor(
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    if (this.client) {
      this.secondaryActionTitle$.next('Delete');

      this.clientForm.patchValue({
        id: this.client.id,
        name: this.client.name,
        email: this.client.email,
        phone: this.client.phone,
        note: this.client.note
      });

      this.client.address.forEach((address) => {
        this.address.push(
          this.formBuilder.group({
            street: [address.street, Validators.required],
            city: [address.city, Validators.required],
            state: [address.state, Validators.required],
            zip: [address.zip, Validators.required],
            country: [address.country, Validators.required]
          })
        )
      });
    }

    this.nameControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(() => {
      this.setMessage(this.nameControl, this.nameMessage);
    })

    this.emailControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(() => {
      this.setMessage(this.emailControl, this.emailMessage);
    })

    this.phoneControl.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(() => {
      this.setMessage(this.phoneControl, this.phoneMessage);
    })
  }

  private setMessage(control: any, message: Subject<string>) {
    message.next('');
    if ((control.touched || control.dirty) && control.errors) {
      if (control.errors.minlength) {
        message.next(this.errorMessages['minlength' + control.errors.minlength.requiredLength]);
      } else {
        message.next(Object.keys(control.errors).map(key =>
          this.errorMessages[key]).join(' '));
      }
    }
  }

  addAddress() {
    this.address.push(
      this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required],
        country: ['', Validators.required]
      })
    )
  }

  removeAddress(index: number) {
    this.address.removeAt(index);
  }

  submitForm() {
    if (this.clientForm.invalid) {
      return;
    }

    const client: Client = this.clientForm.value as any as Client;

    this.resetForm();
    this.submitClient.emit(client);
  }

  resetForm() {
    this.clientForm.reset();
  }

  secondaryActionClicked() {
    if (!this.client) {
      this.resetForm();
      return;
    }

    this.secondaryAction.emit(this.client.id);
  }
}
