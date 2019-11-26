import { Component, Prop, h } from '@stencil/core';

// Material Icons - https://material.io/tools/icons/?icon=shopping_cart&style=baseline
// find node_modules/material-design-icons -type f -name 'ic_XXX_48px*'
import IconCancel from 'material-design-icons/navigation/svg/production/ic_cancel_48px.svg';
import IconVolumeUp from 'material-design-icons/av/svg/production/ic_volume_up_48px.svg';
import IconVolumeOff from 'material-design-icons/av/svg/production/ic_volume_off_48px.svg';
import IconBrokenImage from 'material-design-icons/image/svg/production/ic_broken_image_48px.svg';
import IconFirstPage from 'material-design-icons/navigation/svg/production/ic_first_page_48px.svg';
import IconSearch from 'material-design-icons/action/svg/production/ic_search_48px.svg';
import IconClose from 'material-design-icons/navigation/svg/production/ic_close_48px.svg';

// Custom Icons
// import IconAdd from './icons/xac.svg';

@Component({
  tag: 'x-icon',
  styleUrl: 'icon.scss',
  shadow: true
})
export class Icon {
  private icons = {
    cancel: Icon.base64toSVG(IconCancel),
    'broken-image': Icon.base64toSVG(IconBrokenImage),
    'first-page': Icon.base64toSVG(IconFirstPage),
    'search': Icon.base64toSVG(IconSearch),
    'volume-off': Icon.base64toSVG(IconVolumeOff),
    'volume-up': Icon.base64toSVG(IconVolumeUp),
    'close': Icon.base64toSVG(IconClose),
  };
  @Prop({ reflectToAttr: true }) name: string;
  @Prop({ reflectToAttr: true }) color: string;
  @Prop({ reflectToAttr: true }) size: string;

  constructor() {}

  static base64toSVG(base64svg: string) {
    return atob(base64svg.substring(base64svg.indexOf(',') + 1));
  }

  render() {
    const icon = this.icons[this.name];
    let cssClass = '';

    this.color && (cssClass += ` color-${this.color}`);
    this.size && (cssClass += ` size-${this.size}`);

    if (!icon) {
      console.warn(`Icon '${this.name}' not supported.`);
      return null;
    }

    return <i class={cssClass} innerHTML={icon} />;
  }
}

