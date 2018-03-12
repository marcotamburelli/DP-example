import { XLib } from 'hello';
import { Observable } from 'rxjs/Rx';

import { Element } from './component/element';
import { EventType } from './const';
import { Item } from './domain';

export function init(button: XLib.ControlComponent<any, any>, list: XLib.ListContainer<any>, editor: XLib.Container<any, any>) {
  const mainListener = XLib.listen(
    Observable.from(button.createObservable<Item>())
      .merge(Observable.from(list.createObservable<Item>()))
  );

  mainListener.on(EventType.NEW_ITEM).execute((payload) => editor.setData({}));
  mainListener.on(EventType.EDIT_ITEM).execute((item) => editor.setData(item));

  const editorListener = XLib.listen(Observable.from(editor.createObservable()));

  editorListener.on(EventType.EXIT_EDITOR).execute(hideEditor(editor));
  editorListener.on(EventType.UPDATE_ITEM).execute(createOrUpdateItem(editor, list));
};

const hideEditor = (editor: XLib.ControlComponent<any, any>) => (payload) => {
  editor.domNode.classList.add('hidden');
};

var idx = 0;

const createOrUpdateItem = (editor: XLib.Container<any, any>, list: XLib.ListContainer<any>) => (payload: Item) => {
  if (payload.id == null) {
    var element = Element(payload.id);

    payload = { ...payload, id: ++idx };
    list.append(element);
  } else {
    element = list.queryById<XLib.ControlComponent<any, any>>(`item-${payload.id}`);
  }

  element.setData(payload);
  editor.domNode.classList.add('hidden');
};
