import { XLib } from 'hello';

import { Element } from '../component/element';
import { Item } from '../domain';

var idx = 0;

export const createNewItem = (
  editor: XLib.Container<any, any>,
  list: XLib.ListContainer<any>
) => (payload: Item) => {
  payload = { ...payload, id: ++idx };

  const element = Element(editor, payload.id);

  element.setData(payload);
  list.append(element);
  editor.domNode.classList.add('hidden');
};

export const updateItem = (
  editor: XLib.ControlComponent<any, any>,
  element: XLib.ControlComponent<any, any>
) => (payload: Item) => {
  element.setData(payload);
  editor.domNode.classList.add('hidden');
};
