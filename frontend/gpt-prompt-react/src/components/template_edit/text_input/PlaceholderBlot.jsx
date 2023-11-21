import ReactQuill from "react-quill";
const Quill = ReactQuill.Quill;

let placeholderIdCounter = 0;

export class PlaceholderBlot extends Quill.import("blots/embed") {
  static create(value) {
    let node = super.create();
    node.setAttribute("data-placeholder", value);
    node.setAttribute("contenteditable", "false");
    node.innerText = value;
    node.style.display = "inline-block";
    node.style.borderRadius = "15px";
    node.style.padding = "2px 8px";
    node.style.margin = "0 2px";
    node.style.backgroundColor = "#e0e0e0";
    node.style.border = "1px solid #bdbdbd";
    node.addEventListener("dragstart", this.handleDragStart);
    node.addEventListener("drop", this.intermediateDropHandler);
    node.setAttribute("draggable", "true");
    // Assign a unique ID to the placeholder
    const uniqueId = `in-text-placeholder-${placeholderIdCounter++}`;
    node.setAttribute("data-placeholder-id", uniqueId);
    return node;
  }

  static value(node) {
    return node.getAttribute("data-placeholder");
  }

  static handleDragEnter(e) {
    e.preventDefault();
  }

  static handleDragStart(e) {
    e.dataTransfer.setData(
      "text/plain",
      e.target.getAttribute("data-placeholder"),
    );
    e.dataTransfer.setData("text/id", "from_editor");
    e.dataTransfer.setData(
      "text/id",
      e.target.getAttribute("data-placeholder-id"),
    );
    e.dataTransfer.effectAllowed = "move";
  }
}

export const calculateDropIndex = (editor, mousePosition) => {
  const editorBounds = editor.container.getBoundingClientRect();
  const editorLength = editor.getLength();
  let closestIndex = 0;
  let smallestDistance = Infinity;

  for (let i = 0; i < editorLength; i++) {
    const bounds = editor.getBounds(i);
    const charCenterX = bounds.left + bounds.width / 2;
    const charCenterY = bounds.top + bounds.height / 2;
    const distance = Math.sqrt(
      (mousePosition.x - charCenterX) ** 2 +
        (mousePosition.y - charCenterY) ** 2,
    );

    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestIndex = i;
    }
  }

  return closestIndex;
};

export const intermediateDropHandler = (quillRef, handleDrop) => (event) => {
  if (!quillRef.current) {
    return;
  }

  const draggedId = event.dataTransfer.getData("text/id");
  if (draggedId.startsWith("in-text-placeholder-")) {
    const placeholderValue = event.dataTransfer.getData("text/plain");
    const quill = quillRef.current.getEditor();
    const editorContents = quill.getContents();

    let oldPlaceholderIndex = -1;
    let lengthCovered = 0;

    // Search for the placeholder to be removed
    editorContents.ops.forEach((op, index) => {
      if (
        op.insert &&
        typeof op.insert === "object" &&
        op.insert.placeholder &&
        op.insert.placeholder === placeholderValue
      ) {
        oldPlaceholderIndex = lengthCovered;
      }
      lengthCovered += typeof op.insert === "string" ? op.insert.length : 1;
    });

    // Delete the old placeholder if found
    if (oldPlaceholderIndex !== -1) {
      // Delete the old placeholder and surrounding space if necessary
      let deleteFrom = oldPlaceholderIndex;
      let deleteLength = 1; // Length of the placeholder itself

      // Include surrounding spaces in the deletion if present
      if (deleteFrom > 0 && quill.getText(deleteFrom - 1, 1) === " ") {
        deleteFrom -= 1;
        deleteLength += 1;
      }
      if (quill.getText(deleteFrom + deleteLength, 1) === " ") {
        deleteLength += 1;
      }

      quill.deleteText(deleteFrom, deleteLength);
    }

    // Handle the drop with the updated content
    const item = { name: placeholderValue };
    const clientOffset = { x: event.clientX, y: event.clientY };
    const monitor = { getClientOffset: () => clientOffset };

    handleDrop(item, monitor);
  }
};

PlaceholderBlot.blotName = "placeholder";
PlaceholderBlot.tagName = "span";
