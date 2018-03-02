import { XLib } from 'hello';

import { Item } from '../domain';
import { editElement } from '../usecase/edit-element';

export function Element(editor: XLib.Container<Item, HTMLDivElement>, id: number) {
  const element: XLib.ControlComponent<Item, HTMLLIElement> = (
    <li id={id} onclick={() => editElement(element, editor)} >
      <XLib.Text name="title" />
    </li>
  );

  return element;
}
