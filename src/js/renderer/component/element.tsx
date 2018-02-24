import { XLib } from 'hello';

import { Item } from '../domain';

export function Element({ id, onclick }): XLib.ControlComponent<Item> {
  return (
    <li id={id} onclick={onclick} >
      <XLib.Text name="title" />
    </li>);
}
