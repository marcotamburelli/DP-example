import { XLib } from 'hello';
import { Observable } from 'rxjs/Rx';

import { EventType } from '../const';
import { Item } from '../domain';

export function editElement(element: XLib.ControlComponent<Item, HTMLLIElement>, editor: XLib.Container<Item, HTMLDivElement>) {
  const stream = Observable.from(editor.createObservable<Item>());
  const subscription = stream.subscribe({
    next: ({ eventType, payload }) => {
      switch (eventType) {
        case EventType.EXIT_EDITOR:
          break;

        case EventType.UPDATE_ITEM:
          element.setData(payload);
          break;
      }

      subscription.unsubscribe();
      editor.domNode.classList.add('hidden');
    },
    error: (error) => { },
    complete: () => { }
  });

  editor.setData(element.getData());
  editor.domNode.classList.remove('hidden');

  return subscription;
}
