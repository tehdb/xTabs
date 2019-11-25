/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface XIcon {
    'color': string;
    'name': string;
    'size': string;
  }
  interface XImg {
    'alt': string;
    'cls': string;
    'src': string;
  }
  interface XSearch {}
  interface XTabs {}
}

declare global {


  interface HTMLXIconElement extends Components.XIcon, HTMLStencilElement {}
  var HTMLXIconElement: {
    prototype: HTMLXIconElement;
    new (): HTMLXIconElement;
  };

  interface HTMLXImgElement extends Components.XImg, HTMLStencilElement {}
  var HTMLXImgElement: {
    prototype: HTMLXImgElement;
    new (): HTMLXImgElement;
  };

  interface HTMLXSearchElement extends Components.XSearch, HTMLStencilElement {}
  var HTMLXSearchElement: {
    prototype: HTMLXSearchElement;
    new (): HTMLXSearchElement;
  };

  interface HTMLXTabsElement extends Components.XTabs, HTMLStencilElement {}
  var HTMLXTabsElement: {
    prototype: HTMLXTabsElement;
    new (): HTMLXTabsElement;
  };
  interface HTMLElementTagNameMap {
    'x-icon': HTMLXIconElement;
    'x-img': HTMLXImgElement;
    'x-search': HTMLXSearchElement;
    'x-tabs': HTMLXTabsElement;
  }
}

declare namespace LocalJSX {
  interface XIcon {
    'color'?: string;
    'name'?: string;
    'size'?: string;
  }
  interface XImg {
    'alt'?: string;
    'cls'?: string;
    'src'?: string;
  }
  interface XSearch {}
  interface XTabs {}

  interface IntrinsicElements {
    'x-icon': XIcon;
    'x-img': XImg;
    'x-search': XSearch;
    'x-tabs': XTabs;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'x-icon': LocalJSX.XIcon & JSXBase.HTMLAttributes<HTMLXIconElement>;
      'x-img': LocalJSX.XImg & JSXBase.HTMLAttributes<HTMLXImgElement>;
      'x-search': LocalJSX.XSearch & JSXBase.HTMLAttributes<HTMLXSearchElement>;
      'x-tabs': LocalJSX.XTabs & JSXBase.HTMLAttributes<HTMLXTabsElement>;
    }
  }
}


