import { Observable, fromEventPattern } from 'rxjs';
import {
  map,
  // filter
} from 'rxjs/operators';


type UpdateHandlerParams = [number, chrome.tabs.TabChangeInfo, chrome.tabs.Tab];


// chrome.tabs API - developer.chrome.com/extensions/tabs

export function getTabs(queryInfo: chrome.tabs.QueryInfo = {}): Promise<chrome.tabs.Tab[]> {
  return new Promise((resolve) => {
    chrome.tabs.query(queryInfo, (tabs) => resolve(tabs));
  });
}


export function tabCreate$(): Observable<chrome.tabs.Tab> {
  return fromEventPattern((handler) => chrome.tabs.onCreated.addListener(handler))
}

export function tabUpdate$(): Observable<chrome.tabs.Tab> {
  const updates = fromEventPattern((handler) => chrome.tabs.onUpdated.addListener(handler))

  return updates.pipe(
    // filter<UpdateHandlerParams>(([_, changeInfo]) => changeInfo.status === 'complete'),
    map<UpdateHandlerParams, chrome.tabs.Tab>(([_, __, tab]) => tab)
  );
}

export function tabRemove$(): Observable<[number, chrome.tabs.TabRemoveInfo]> {
  return fromEventPattern((handler) => chrome.tabs.onRemoved.addListener(handler))
}

export function tabActivate$(): Observable<chrome.tabs.TabActiveInfo> {
  return fromEventPattern((handler) => chrome.tabs.onActivated.addListener(handler))
}

export function tabMove$(): Observable<[number, chrome.tabs.TabMoveInfo]> {
  return fromEventPattern((handler) => chrome.tabs.onMoved.addListener(handler))
}

export function activateTab(tabId: number):void {
  chrome.tabs.update(tabId, { active: true });
}

export function removeTab(tabId: number): void {
  chrome.tabs.remove(tabId);
}

export function toggleMute(tabId: number): void {
  chrome.tabs.get(tabId, (tab: chrome.tabs.Tab) => {
    const muted = tab.mutedInfo.muted;

    console.log(`toggle volume for ${tabId} to ${!muted}`);

    chrome.tabs.update(tab.id, { muted: !muted });
  });
}

