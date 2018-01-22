import { Subject } from 'rxjs/Rx';
import { Component, ElementRef, HostBinding, Input, OnDestroy, OnInit, Renderer2, Optional, Self, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subscription } from 'rxjs/Subscription';
import { timeToString } from '../../../shared/utils';

const TIME_INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CbTimeInputComponent),
  multi: true
};

@Component({
  selector: 'app-cb-time-input',
  templateUrl: './cb-time-input.component.html',
  styleUrls: ['./cb-time-input.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: CbTimeInputComponent }, TIME_INPUT_VALUE_ACCESSOR],
})
export class CbTimeInputComponent implements OnInit, OnDestroy, MatFormFieldControl<number>, ControlValueAccessor {
  static nextId = 0;

  timestamp: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'app-cb-time-input';

  // todo: add lead zero on blur
  ngControl = null;
  errorState = false;

  private _placeholder: string;
  private _required = false;
  private _disabled = false;

  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private _specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'];
  // Allow decimal numbers. The \. is only allowed once to occur
  private _regex: RegExp = new RegExp(/^[0-9]{0,2}$/g);

  private _timestampChanges: Subscription;

  @HostBinding() id = `app-cb-time-input-${CbTimeInputComponent.nextId++}`;

  @HostBinding('class.floating')
  get shouldPlaceholderFloat() {
    return this.focused || !this.empty;
  }

  @HostBinding('attr.aria-describedby') describedBy = '';
  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(dis) {
    this._disabled = coerceBooleanProperty(dis);
    this._disabled ? this.timestamp.disable() : this.timestamp.enable();
    this.stateChanges.next();
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  @Input()
  get value(): number {
    const value = this.timestamp.value;
    const minutes: number = isNaN(parseInt(value.minutes, 10)) ? 0 : parseInt(value.minutes, 10);
    const seconds: number = isNaN(parseInt(value.seconds, 10)) ? 0 : parseInt(value.seconds, 10);
    return minutes * 60 + seconds;
  }
  set value(seconds: number) {
    this._updateTime(seconds);
    this.stateChanges.next();
  }

  get empty() {
    const value = this.timestamp.value;
    return !value.minutes && !value.seconds;
  }

  constructor(
    private _fb: FormBuilder,
    private _fm: FocusMonitor,
    private _elRef: ElementRef,
    private _renderer: Renderer2,
    // @Optional() @Self() public ngControl: NgControl
  ) {
    this.timestamp = this._fb.group({
      minutes: [''],
      seconds: ['']
    });
    _fm.monitor(_elRef.nativeElement, _renderer, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });
    this._timestampChanges = this.timestamp.valueChanges.subscribe(value => {
        const minutes: number = isNaN(parseInt(value.minutes, 10)) ? 0 : parseInt(value.minutes, 10);
        const seconds: number = isNaN(parseInt(value.seconds, 10)) ? 0 : parseInt(value.seconds, 10);
        this.onChange(minutes * 60 + seconds);
    });
  }

  ngOnInit() { }

  onChange = (_: any) => { };
  onTouched = () => { };

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this._elRef.nativeElement.querySelector('input').focus();
    }
  }

  onKeyDown($event: KeyboardEvent) {
    const current: any = ($event.target as HTMLInputElement).value;
    if (this._specialKeys.indexOf($event.key) !== -1) {
      return;
    }

    // todo: focus the second input if the third char typed in the first input
    const next: string = current.concat($event.key);
    if (next && !String(next).match(this._regex)) {
      event.preventDefault();
    }
  }

  writeValue(value: any): void {
    this._updateTime(value);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  private _updateTime(seconds: number = 0) {
    this.timestamp.setValue({
      minutes: timeToString(Math.trunc(seconds / 60)),
      seconds: timeToString(seconds % 60)
    });
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._timestampChanges.unsubscribe();
    this._fm.stopMonitoring(this._elRef.nativeElement);
  }
}
