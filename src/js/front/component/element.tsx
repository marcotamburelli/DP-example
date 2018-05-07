import { dp } from 'dp';

import { EventType } from '../const';
import { Item } from '../domain';

export function Element() {
  const element: dp.Component<Item, HTMLLIElement> = (
    <li
      id={{ set: (id: number) => `item-${id}`, get: (str: string) => parseInt(str.split('-')[1]) }}
      onclick={{ eventType: EventType.EDIT_ITEM }}
    >
      <dp.Text name="title" />
    </li>
  );

  return element;
}
