import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDrop } from "react-dnd";

const AdvancedTextInput = () => {
  const [text, setText] = useState("");
  const quillRef = useRef(null);

  class PlaceholderBlot extends Quill.import("blots/embed") {
    static create(value) {
      let node = super.create();
      node.setAttribute("data-placeholder", value);
      node.setAttribute("contenteditable", "false"); // Prevent editing
      node.innerText = value; // Use textContent or innerText for security
      node.style.display = "inline-block"; // Ensure it doesn't take the full width
      node.style.borderRadius = "15px"; // Rounded borders for bubble effect
      node.style.padding = "2px 8px"; // Padding inside the bubble
      node.style.margin = "0 2px"; // Spacing between the bubble and other text
      node.style.backgroundColor = "#e0e0e0"; // Background color for the bubble
      node.style.border = "1px solid #bdbdbd"; // Border to look like a bubble
      node.addEventListener("dragstart", this.handleDragStart);
      node.addEventListener("drop", this.intermediateDropHandler);

      // Make the node draggable
      node.setAttribute("draggable", "true");
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
      // Store the id of the element in the drag event
      e.dataTransfer.setData("text/id", "from_editor");
      e.dataTransfer.effectAllowed = "move";
    }
  }

  PlaceholderBlot.blotName = "placeholder";
  PlaceholderBlot.tagName = "span"; // Use 'span' to make it inline

  Quill.register(PlaceholderBlot, true);

  const calculateDropIndex = (mousePosition) => {
    const editor = quillRef.current.getEditor();
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

  // useEffect for dragover to show visual indicator
  useEffect(() => {
    const handleDragOver = (event) => {
      event.preventDefault(); // Prevent default to allow drop
      if (!quillRef.current) {
        return;
      }

      const quill = quillRef.current.getEditor();
      const editorBounds = quill.container.getBoundingClientRect();
      const mousePosition = {
        x: event.clientX - editorBounds.left,
        y: event.clientY - editorBounds.top,
      };

      const closestIndex = calculateDropIndex(mousePosition);

      quill.setSelection(closestIndex, 0, "silent");

      quill.scrollIntoView(); // Optional: Scroll the indicator into view if it's not visible
    };

    document.addEventListener("dragover", handleDragOver);
    return () => document.removeEventListener("dragover", handleDragOver);
  }, [calculateDropIndex]);

  // Define the handleDrop function
  const handleDrop = useCallback(
    (item, monitor) => {
      if (quillRef.current) {
        const quill = quillRef.current.getEditor();

        // Get the client offset from the monitor
        const clientOffset = monitor.getClientOffset();
        const editorBounds = quill.container.getBoundingClientRect();

        if (clientOffset) {
          const mousePosition = {
            x: clientOffset.x - editorBounds.left,
            y: clientOffset.y - editorBounds.top,
          };

          let closestIndex = calculateDropIndex(mousePosition);

          // Set the selection to the index we've found
          quill.setSelection(closestIndex, 0, "silent");

          // Check and add space before the placeholder if necessary
          if (closestIndex > 0 && quill.getText(closestIndex - 1, 1) !== " ") {
            quill.insertText(closestIndex, " ", Quill.sources.USER);
            closestIndex += 1; // Adjust the index for the newly added space
          }

          // Perform the insertEmbed at the new calculated position
          quill.insertEmbed(
            closestIndex,
            "placeholder",
            item.name,
            Quill.sources.USER,
          );

          // Adjust index after insertion for potential space addition
          closestIndex += 1;

          // Check and add space after the placeholder if necessary
          if (quill.getText(closestIndex, 1) !== " ") {
            quill.insertText(closestIndex, " ", Quill.sources.USER);
          }

          // Update the selection to just after the inserted text
          quill.setSelection(closestIndex + 1, 0, Quill.sources.SILENT);
        }
      }
    },
    [quillRef],
  );

  const [, drop] = useDrop(() => ({
    accept: "PLACEHOLDER",
    drop: handleDrop,
  }));

  // Callback for text change in the editor
  const handleChange = (content, delta, source, editor) => {
    setText(editor.getHTML()); // or content for just the HTML content
  };

  const intermediateDropHandler = (event) => {
    // Log for debugging purposes

    // Check if the Quill editor reference exists
    if (!quillRef.current) {
      return;
    }

    // Retrieve the id of the dragged item
    const draggedId = event.dataTransfer.getData("text/id");

    // Check if the id of the dragged item is 'from_editor'
    if (draggedId === "from_editor") {
      // Retrieve the placeholder data from the dragged item
      const item = { name: event.dataTransfer.getData("text/plain") };
      const clientOffset = { x: event.clientX, y: event.clientY };
      const monitor = {
        getClientOffset: () => clientOffset,
      };

      // If the dragged item is from 'from_editor', handle the drop
      handleDrop(item, monitor);
    } else {
      // Optionally, handle the case where the dragged item is not from 'from_editor'
    }
  };

  return (
    <div
      ref={drop}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={intermediateDropHandler}
      style={{
        border: "1px solid black",
        width: "100%",
        height: "95%",
        padding: "10px",
      }}
    >
      <ReactQuill
        value={text}
        ref={quillRef}
        onChange={handleChange}
        style={{
          height: "95%",
          width: "100%",
        }}
        modules={AdvancedTextInput.modules}
      />
    </div>
  );
};

export default AdvancedTextInput;
