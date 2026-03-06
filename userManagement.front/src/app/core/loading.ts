import { Injectable } from '@angular/core';
import { BehaviorSubject, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class Loading {
  private _loading = new BehaviorSubject<boolean>(false);

  public readonly loading$ = this._loading.asObservable().pipe(
    delay(0) 
  );

  show() { this._loading.next(true); }
  hide() { this._loading.next(false); }
}
