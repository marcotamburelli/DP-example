import { dp } from 'dp';

import { EventType } from '../const';
import { Item } from '../domain';

export function Editor({ id, name }) {
  var editor: dp.Container<Item, HTMLDivElement> = (
    <div id={id} name={name} class="editor hidden">
      <div style="display: none" name="id" bind={dp.INT_BINDER}></div>
      <h2>Add a new item</h2>
      <form >
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input name="title" type="text" class="form-control" />
        </div>
        <br />
        <button id="submit" type="button" onclick={{ eventType: EventType.UPDATE_ITEM }}>save</button>
        <button id="cancel" type="button" onclick={{ eventType: EventType.EXIT_EDITOR, emitter: () => null }}>Cancel</button>
      </form>
    </div>
  );

  return editor;
}
