import { Injectable, Inject, computed, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Content } from '../model/Content';

const cartKey = 'musictool_cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _contents = signal<Content[]>([]);

  contents = computed(() => {
    return this._contents();
  });

  total = computed(() => {
    return this._contents().map(content => content.priceContent).reduce((p1, p2) => p1 + p2, 0);
  });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const contentsString = localStorage.getItem(cartKey);
      if (contentsString) {
        this._contents.set(JSON.parse(contentsString));
      }
    }
  }

  addContent(content: Content) {
    this._contents.update(value => value.concat(content));
    this.updateLocalStorage();
  }

  removeContent(content: Content) {
    this._contents.update(value => value.filter(b => b.idContent !== content.idContent));
    this.updateLocalStorage();
  }

  clear() {
    this._contents.set([]);
    this.updateLocalStorage();
  }

  contentAlreadyExists(content: Content) {
    return this._contents().filter(b => b.idContent === content.idContent).length > 0;
  }

  updateLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(cartKey, JSON.stringify(this._contents()));
    }
  }
}
