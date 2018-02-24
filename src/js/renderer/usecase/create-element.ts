import { XLib } from 'hello';

import { Element } from '../component/element';
import { EventType } from '../const';
import { Item } from '../domain';
import { editElement } from './edit-element';

export function createElement(editor: XLib.Container<Item>, list: XLib.ListContainer<Item>) {
  const useCase = XLib.useCaseFor(editor, list);

  const editorDomNode = editor.domNode as HTMLDivElement;

  editor.setData({});
  editorDomNode.classList.remove('hidden');

  function exit() {
    useCase.exit();
    editorDomNode.classList.add('hidden');
  }

  useCase.listen(EventType.UPDATE_ITEM).from(editor).then(data => {
    const element: XLib.ControlComponent<Item> = Element({
      id: data.id,
      onclick: () => editElement(element, editor)
    });

    element.setData(data);
    list.append(element);

    exit();
  });
  useCase.listen(EventType.EXIT_EDITOR).from(editor).then(data => exit());
}
