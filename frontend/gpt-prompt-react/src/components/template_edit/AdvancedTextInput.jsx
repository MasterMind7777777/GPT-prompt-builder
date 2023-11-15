import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDrop } from "react-dnd";

const AdvancedTextInput = () => {
  const [text, setText] = useState("");
  const quillRef = useRef(null);

  useEffect(() => {
    const logMousePosition = (e) => {
      console.log(`Mouse position: X: ${e.clientX}, Y: ${e.clientY}`);
    };

    // Add event listener to log the mouse position when the mouse moves
    document.addEventListener("dragover", logMousePosition);

    // Remove event listener on cleanup
    return () => document.removeEventListener("dragover", logMousePosition);
  }, []);

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
      return node;
    }

    static value(node) {
      return node.getAttribute("data-placeholder");
    }
  }

  PlaceholderBlot.blotName = "placeholder";
  PlaceholderBlot.tagName = "span"; // Use 'span' to make it inline

  Quill.register(PlaceholderBlot);

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

          const closestIndex = calculateDropIndex(mousePosition);

          // Set the selection to the index we've found
          quill.setSelection(closestIndex, 0, "silent");

          // Perform the insertEmbed at the new calculated position
          quill.insertEmbed(
            closestIndex,
            "placeholder",
            item.name,
            Quill.sources.USER,
          );

          // Update the selection to just after the inserted text
          quill.setSelection(
            closestIndex + item.name.length,
            0,
            Quill.sources.SILENT,
          );
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

  return (
    <div
      ref={drop}
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
