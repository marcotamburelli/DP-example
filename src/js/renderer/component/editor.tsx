import { XLib } from 'hello';

import { EventType } from '../const';
import { Item } from '../domain';

export function Editor({ id, name }) {
  var editor: XLib.Container<Item, HTMLDivElement> = (
    <div id={id} name="editor" class="editor hidden">
      <div style="display: none" name="id" value-type="number">{id.toString()}</div>
      <h2>Add a new item</h2>
      <form >
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input name="title" type="text" class="form-control" />
        </div>
        <br />
        <button id="submit" type="button" onclick={{ eventType: EventType.UPDATE_ITEM, emitter: () => editor.getData() }}>save</button>
        <button id="cancel" type="button" onclick={{ eventType: EventType.EXIT_EDITOR, emitter: () => null }}>Cancel</button>
      </form>
    </div>
  );

  return editor;
}
