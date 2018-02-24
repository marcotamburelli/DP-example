import { XLib } from 'hello';

import { EventType } from '../const';
import { Item } from '../domain';

export function Editor({ id, name }) {
  var editor: XLib.Container<Item> = (
    <div id={id} name="editor" class="editor hidden">
      <h2>Add a new item</h2>
      <form onsubmit={(e: Event) => {
        e.preventDefault();
        editor.emitEvent({ type: EventType.UPDATE_ITEM, payload: editor.getData() });
      }}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input name="title" type="text" class="form-control" />
        </div>
        <br />
        <button id="submit" type="submit">save</button>
        <button id="cancel" type="button" onclick={() => editor.emitEvent({ type: EventType.EXIT_EDITOR, payload: null })}>Cancel</button>
      </form>
    </div>
  );

  return editor;
}
