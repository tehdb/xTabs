import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'x-img',
  styleUrl: 'image.scss',
  shadow: true
})
export class XImage {

  @Prop() src: string;
  @Prop() alt = '';
  @Prop() cls = '';

  @State() loadFailed = false;

  constructor() {
    this.onError = this.onError.bind(this);
  }

  connectedCallback() { }

  onError() {
    this.loadFailed = true;
    console.log('failed for', this.src);
  }

  render() {
    return(
      this.src && this.loadFailed === false
        ?  <img class={this.cls} src={this.src} alt={this.alt} onError={this.onError} />
        : <x-icon class={this.cls} name='broken-image'></x-icon>
    )
  }
}
