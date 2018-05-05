import { dp } from 'dp';
import { Observable } from 'rxjs/Rx';

import { Element } from './component/element';
import { EventType } from './const';
import { Item } from './domain';

export function init(button: dp.Component<any, any>, list: dp.ListContainer<any>, editor: dp.Container<any, any>) {
  const mainListener = dp.listen(
    Observable.from(button.createObservable<Item>())
      .merge(Observable.from(list.createObservable<Item>()))
  );

  mainListener.on(EventType.NEW_ITEM).execute(showEditor(editor));
  mainListener.on(EventType.EDIT_ITEM).execute(showEditor(editor));

  const editorListener = dp.listen(Observable.from(editor.createObservable()));

  editorListener.on(EventType.EXIT_EDITOR).execute(hideEditor(editor));
  editorListener.on(EventType.UPDATE_ITEM).execute(createOrUpdateItem(editor, list));
}

const hideEditor = (editor: dp.Component<Item, HTMLElement>) => (payload) => {
  editor.domNode.classList.add('hidden');
};

const showEditor = (editor: dp.Component<Item, HTMLElement>) => (payload: Item) => {
  editor.domNode.classList.remove('hidden');
  editor.setData(payload);
};

const createOrUpdateItem = (editor: dp.Container<Item, HTMLElement>, list: dp.ListContainer<Item>) => (payload: Item) => {
  const listElements = list.getData();
  const idx = listElements.reduce((max, { id }) => id > max ? id : max, 0);

  if (payload.id == null || isNaN(payload.id)) {
    const id = idx + 1;
    var element = Element();

    payload = { ...payload, id };
    list.append(element);
  } else {
    element = list.queryById<dp.Component<Item, HTMLLIElement>>(`item-${payload.id}`);
  }

  element.setData(payload);
  editor.domNode.classList.add('hidden');
};
