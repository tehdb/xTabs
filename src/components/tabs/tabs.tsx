import { Component, h, State, Element, Listen } from '@stencil/core';
import {
  append,
  update,
  remove,
  findIndex,
  propEq,
  set,
  map,
  lensProp,
  prop,
  sortBy,
  clone,
  filter,
  includes,
  toLower
} from 'ramda';
import {
  getTabs,
  activateTab,
  removeTab,
  toggleMute,
  tabCreate$,
  tabUpdate$,
  tabRemove$,
  tabActivate$,
  tabMove$
} from '../../utils/chrome-tabs';

@Component({
  tag: 'x-tabs',
  styleUrl: 'tabs.scss',
  shadow: true
})
export class Tabs  {

  private activeTabId: number;
  private originalTabs: chrome.tabs.Tab[] | null = null;

  @Element() el: HTMLElement;

  @State() tabs: chrome.tabs.Tab[];

  constructor() {
    this.init();
  }

  async init() {
    const tabs = await getTabs({ currentWindow: true });
    this.sortTabs(tabs);

    console.debug('initial tabs:', this.tabs);

    tabCreate$().subscribe(tab => {
      this.sortTabs(append<chrome.tabs.Tab>(tab, this.tabs));
    });

    tabUpdate$().subscribe(tab => {
      console.debug('update tab', tab);
      const idx = findIndex(propEq('id', tab.id))(this.tabs)
      this.sortTabs(update<chrome.tabs.Tab>(idx, tab, this.tabs));
    });

    tabRemove$().subscribe(([tabId]) => {
      console.debug('remove tab', tabId);
      const idx = findIndex(propEq('id', tabId))(this.tabs)
      this.sortTabs(remove<chrome.tabs.Tab>(idx, 1, this.tabs));
    });

    tabActivate$().subscribe(({ tabId })=> {
      console.debug('activate tab', tabId);
      let tabs = map(set(lensProp('active'), false))(this.tabs);

      const idx = findIndex(propEq('id', tabId))(tabs);
      const tab = this.tabs[idx];
      tab.active = true;
      this.activeTabId = tab.id;
      this.sortTabs(update<chrome.tabs.Tab>(idx, tab, tabs));
    });

    tabMove$().subscribe(async () => {
      const tabs = await getTabs({ currentWindow: true });
      this.sortTabs(tabs);
    });
  } // init



  @Listen('search-change')
  onSearchChange({ detail }: CustomEvent) {
    if (detail.length >= 3) {
      this.tabs = filter((t: chrome.tabs.Tab) => includes(toLower(detail), toLower(t.title)), this.tabs);
    } else {
      this.tabs = this.originalTabs;
    }

  }

  @Listen('search-clear')
  onSearchClear() {
    this.tabs = this.originalTabs;
  }

  sortTabs(tabs: chrome.tabs.Tab[]) {
    this.tabs = sortBy(prop('index'))(tabs);
    this.originalTabs = clone(this.tabs);
  } // sortTabs


  onActivateTab(me: MouseEvent, tabId: number) {
    me.preventDefault();
    me.stopPropagation();
    // const t = me.currentTarget as HTMLElement;
    // const tabId = parseInt(t.getAttribute('data-id'), 10);
    if (tabId !== this.activeTabId) {
      activateTab(tabId);
    }
  } // onActivateTab


  onRemoveTab(me: MouseEvent, tabId: number) {
    me.preventDefault();
    me.stopPropagation();
    removeTab(tabId);
  } // onRemoveTab


  onToggleMute(me: MouseEvent, tabId: number) {
    me.preventDefault();
    me.stopPropagation();

    toggleMute(tabId);
  } // onToggleMute


  onSearchInput(e) {
    const value = e.target.value;
    console.log(value)
  }


  renderTab(tab: chrome.tabs.Tab): void {
    const cssTab = `tab ${tab.active ? 'active' : ''}`;
    const cssMuteBtn = `mute-btn ${(tab.mutedInfo.muted === true) ? 'mute-btn--muted' : ''}`;


    return (
      <li class={cssTab} onClick={(e) => this.onActivateTab(e, tab.id)} >
        <x-img class="fav-icon" src={tab.favIconUrl} ></x-img>
        <button class="close-btn" onClick={(e) => this.onRemoveTab(e, tab.id)}>
          <x-icon name="cancel"></x-icon>
        </button>
        <span>{tab.title}</span>

        { tab.pinned && <x-icon class='pin-icon' name='first-page'></x-icon> }

        <button class={cssMuteBtn} onClick={(e) => this.onToggleMute(e, tab.id)} >
          { (tab.mutedInfo.muted === true)
            ? <x-icon class='volume-icon' name='volume-off'></x-icon>
            : <x-icon class='volume-icon' name='volume-up'></x-icon>
          }
        </button>

      </li>
    )
  } // removeTab


  render() {
    return [
      <div class="top-bar">
        <x-search></x-search>
      </div>,
      <ul class="tabs">
        {this.tabs.map((tab: chrome.tabs.Tab) => this.renderTab(tab))}
      </ul>
    ];
  } // render
}
