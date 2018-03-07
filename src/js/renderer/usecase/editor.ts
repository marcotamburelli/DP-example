import { XLib } from 'hello';
import { Observable } from 'rxjs/Rx';

import { EventType } from '../const';
import { Item } from '../domain';
import { Listener } from '../stream/listener';
import { createNewItem, updateItem } from './element';

export const newItem = (
  list: XLib.ListContainer<any>,
  editor: XLib.Container<any, any>
) => (payload: Item) => {
  editor.setData({});
  editor.domNode.classList.remove('hidden');

  const listener = Listener.create(Observable.from(editor.createObservable<Item>()));

  listener.on(EventType.EXIT_EDITOR).execute(hideEditor(editor));
  listener.on(EventType.UPDATE_ITEM).execute(createNewItem(editor, list));

  return listener;
};

export const editItem = (
  list: XLib.ListContainer<any>,
  editor: XLib.ControlComponent<any, any>
) => (payload: Item) => {
  const element = list.queryById<XLib.ControlComponent<any, any>>(`item-${payload.id}`);

  editor.setData(element.getData());
  editor.domNode.classList.remove('hidden');

  const listener = Listener.create(Observable.from(editor.createObservable<Item>()));

  listener.on(EventType.EXIT_EDITOR).execute(hideEditor(editor));
  listener.on(EventType.UPDATE_ITEM).execute(updateItem(editor, element));

  return listener;
};

const hideEditor = (editor: XLib.ControlComponent<any, any>) => (payload) => {
  editor.domNode.classList.add('hidden');
};
