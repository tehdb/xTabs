import { Component, h, State, Event, EventEmitter } from '@stencil/core';
import { MDCTextField } from '@material/textfield';

@Component({
  tag: 'x-search',
  styleUrl: 'search.scss',
  shadow: true
})
export class Search  {

  private _textFieldEl!: HTMLElement;
  private _tf: MDCTextField;

  @State() _value = '';
  @Event({ eventName : 'search-change', bubbles: false  }) _changeEvent: EventEmitter;
  @Event({ eventName : 'search-clear', bubbles: false }) _clearEvent: EventEmitter;

  constructor() {
    this.onInput = this.onInput.bind(this);
  }

  componentDidLoad() {
    this._tf = new MDCTextField(this._textFieldEl);
  }

  onClearTextField(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    this._tf.value = '';
    this._value = '';
    this._clearEvent.emit(true);
  }

  onInput(e) {
    this._value = e.target.value;
    this._changeEvent.emit(this._value);
  }

  render() {
    return (
      <div class="mdc-text-field mdc-text-field--outlined"
        ref= {(el) => this._textFieldEl = el as HTMLInputElement}
      >
        { (this._value.length > 0)
          ? <button class="clear-btn"
              onClick={(e) => this.onClearTextField(e)}
            ><x-icon name='close'></x-icon></button>
          : <x-icon class='search-icon' name='search'></x-icon>
        }

        <input
          type="text"
          id="tf-outlined"
          class="mdc-text-field__input"
          value={this._value}
          onInput={this.onInput}
        />

        <div class="mdc-notched-outline">
          <div class="mdc-notched-outline__leading"></div>
          <div class="mdc-notched-outline__notch">
            <label htmlFor="tf-outlined" class="mdc-floating-label">search tabs</label>
          </div>
          <div class="mdc-notched-outline__trailing"></div>
        </div>
      </div>
    )
  }
}
