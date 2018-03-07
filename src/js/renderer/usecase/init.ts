import { XLib } from 'hello';
import { Observable } from 'rxjs/Rx';

import { EventType } from '../const';
import { Item } from '../domain';
import { editItem, newItem } from './editor';

export function init(button: XLib.ControlComponent<any, any>, list: XLib.ListContainer<any>, editor: XLib.Container<any, any>) {
  const listener = XLib.listen(
    Observable.from(button.createObservable<Item>())
      .merge(Observable.from(list.createObservable<Item>()))
  );

  listener.on(EventType.NEW_ITEM).execute(newItem(list, editor));
  listener.on(EventType.EDIT_ITEM).execute(editItem(list, editor));

  return listener;
};
