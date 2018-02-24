import { XLib } from 'hello';

import { Editor } from './component/editor';
import { Element } from './component/element';
import { App, Item } from './domain';
import { createElement } from './usecase/create-element';
import { editElement } from './usecase/edit-element';

function itemGenerator(editor: XLib.Container<Item>) {
  return (data: Item) => {
    const element: XLib.ControlComponent<Item> = Element({
      id: data.id,
      onclick: () => editElement(element, editor)
    });

    return element;
  };
}

const editor = <Editor name="editor" id="editor" />;

const app: XLib.Container<App> = (
  <div class="app">
    <div>
      <h2>Items</h2>
      <ul>
        <XLib.List id="list" name="items" generator={itemGenerator(editor)} />
        <li>
          <button id="submit" type="button" onclick={() => createElement(editor, app.queryById('list'))}>add</button>
        </li>
      </ul>
    </div>
    {editor}
  </div>
);

document.body.appendChild(app.domNode);
