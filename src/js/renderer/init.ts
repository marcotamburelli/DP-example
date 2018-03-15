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

  mainListener.on(EventType.NEW_ITEM).execute(showEditor(editor));
  mainListener.on(EventType.EDIT_ITEM).execute(showEditor(editor));

  const editorListener = XLib.listen(Observable.from(editor.createObservable()));

  editorListener.on(EventType.EXIT_EDITOR).execute(hideEditor(editor));
  editorListener.on(EventType.UPDATE_ITEM).execute(createOrUpdateItem(editor, list));
};

const hideEditor = (editor: XLib.ControlComponent<Item, HTMLElement>) => (payload) => {
  editor.domNode.classList.add('hidden');
};

var idx = 0;

const showEditor = (editor: XLib.ControlComponent<Item, HTMLElement>) => (payload: Item) => {
  editor.domNode.classList.remove('hidden');
  editor.setData(payload);
};

const createOrUpdateItem = (editor: XLib.Container<Item, HTMLElement>, list: XLib.ListContainer<Item>) => (payload: Item) => {
  if (payload.id == null || isNaN(payload.id)) {
    const id = ++idx;
    var element = Element(id);

    payload = { ...payload, id };
    list.append(element);
  } else {
    element = list.queryById<XLib.ControlComponent<Item, HTMLLIElement>>(`item-${payload.id}`);
  }

  element.setData(payload);
  editor.domNode.classList.add('hidden');
};
