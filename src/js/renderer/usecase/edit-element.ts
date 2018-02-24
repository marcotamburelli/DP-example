import { XLib } from 'hello';

import { EventType } from '../const';
import { Item } from '../domain';

export function editElement(element: XLib.ControlComponent<Item>, editor: XLib.Container<Item>) {
  const editorDomNode = editor.domNode as HTMLDivElement;
  const useCase = XLib.useCaseFor(editor, element);

  editor.setData(element.getData());

  editorDomNode.classList.remove('hidden');

  function exit() {
    useCase.exit();
    editorDomNode.classList.add('hidden');
  }

  useCase.listen(EventType.UPDATE_ITEM).from(editor).then(data => {
    element.setData(data);
    exit();
  });
  useCase.listen(EventType.EXIT_EDITOR).from(editor).then(data => exit());
}
