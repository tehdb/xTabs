
import { Component, h } from '@stencil/core';
import { MDCTextField } from '@material/textfield';

@Component({
  tag: 'x-search',
  styleUrl: 'search.scss',
  shadow: true
})
export class Search  {

  private textFieldEl!: HTMLElement;

  componentDidLoad() {
    // const si = this.el.shadowRoot.querySelector('.search-inp') as HTMLInputElement;

      const tf = new MDCTextField(this.textFieldEl);
    console.log('???', tf);
  }

  render() {
    return (
      <div class="mdc-text-field mdc-text-field--outlined"
        ref= {(el) => this.textFieldEl = el as HTMLInputElement}
      >
        <input type="text" id="tf-outlined" class="mdc-text-field__input" />
        <div class="mdc-notched-outline">
          <div class="mdc-notched-outline__leading"></div>
          <div class="mdc-notched-outline__notch">
            <label htmlFor="tf-outlined" class="mdc-floating-label">search</label>
          </div>
          <div class="mdc-notched-outline__trailing"></div>
        </div>
      </div>
    )
  }
}
