import { XLib } from 'hello';
import { Observable } from 'rxjs/Rx';

import { Element } from '../component/element';
import { EventType } from '../const';
import { Item } from '../domain';

export function createElement(editor: XLib.Container<Item, HTMLDivElement>, list: XLib.ListContainer<Item>) {
  const stream = Observable.from(editor.createObservable<Item>());
  const subscription = stream.subscribe({
    next: ({ eventType, payload }) => {
      switch (eventType) {
        case EventType.EXIT_EDITOR:
          break;

        case EventType.UPDATE_ITEM:
          const element = Element(editor, payload.id);

          element.setData(payload);
          list.append(element);
          break;
      }

      subscription.unsubscribe();
      editor.domNode.classList.add('hidden');
    },
    error: (error) => { },
    complete: () => { }
  });

  editor.setData({});
  editor.domNode.classList.remove('hidden');

  return subscription;
}
