import { dp } from 'dp';

import { Editor } from './component/editor';
import { Element } from './component/element';
import { EventType } from './const';
import { App, Item } from './domain';
import { init } from './init';

const editor = <Editor name="editor" id="editor" />;

const app: dp.Container<App, HTMLDivElement> = (
  <div class="app">
    <div>
      <h2>Items</h2>
      <ul>
        <dp.List id="list" name="items">
          <Element />
        </dp.List>
        <li>
          <button id="new" type="button" onclick={{ eventType: EventType.NEW_ITEM, emitter: () => ({ title: '' }) }}>add</button>
        </li>
      </ul>
    </div>
    {editor}
  </div>
);

app.setData({ editor: {}, items: [{ id: 1, title: 'default 1' }, { id: 2, title: 'default 2' }] });

document.body.appendChild(app.domNode);

init(app.queryById('new'), app.queryById('list'), app.queryById('editor'));
