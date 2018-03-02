import { XLib } from 'hello';

import { Editor } from './component/editor';
import { Element } from './component/element';
import { App, Item } from './domain';
import { createElement } from './usecase/create-element';
import { editElement } from './usecase/edit-element';

function itemGenerator(editor: XLib.Container<Item, HTMLDivElement>) {
  return (data: Item) => {
    const element = Element(editor, data.id);

    return element;
  };
}

const editor = <Editor name="editor" id="editor" />;

const app: XLib.Container<App, HTMLDivElement> = (
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
