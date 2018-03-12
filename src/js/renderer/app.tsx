import { XLib } from 'hello';

import { Editor } from './component/editor';
import { Element } from './component/element';
import { EventType } from './const';
import { App, Item } from './domain';
import { init } from './init';

const itemGenerator = (data: Item) => {
  const element = Element(data.id);

  return element;
};

const editor = <Editor name="editor" id="editor" />;

const app: XLib.Container<App, HTMLDivElement> = (
  <div class="app">
    <div>
      <h2>Items</h2>
      <ul>
        <XLib.List id="list" name="items" generator={itemGenerator} />
        <li>
          <button id="new" type="button" onclick={{ eventType: EventType.NEW_ITEM, emitter: () => ({}) }}>add</button>
        </li>
      </ul>
    </div>
    {editor}
  </div>
);

document.body.appendChild(app.domNode);

init(app.queryById('new'), app.queryById('list'), editor);
