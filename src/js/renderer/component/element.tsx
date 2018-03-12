import { XLib } from 'hello';

import { EventType } from '../const';
import { Item } from '../domain';

export function Element(id: number) {
  const element: XLib.ControlComponent<Item, HTMLLIElement> = (
    <li id={`item-${id}`} onclick={{ eventType: EventType.EDIT_ITEM, emitter: () => element.getData() }} >
      <div style="display: none" name="id" value-type="number">{id.toString()}</div>
      <XLib.Text name="title" />
    </li>
  );

  return element;
}
