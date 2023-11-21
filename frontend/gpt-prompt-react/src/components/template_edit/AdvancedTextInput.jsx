import React, { useState, useCallback, useRef, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDrop } from "react-dnd";
import {
  PlaceholderBlot,
  calculateDropIndex,
  intermediateDropHandler,
} from "./text_input/PlaceholderBlot";

const AdvancedTextInput = () => {
  const [text, setText] = useState("");
  const quillRef = useRef(null);

  Quill.register(PlaceholderBlot, true);

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

      const closestIndex = calculateDropIndex(quill, mousePosition);

      quill.setSelection(closestIndex, 0, "silent");

      quill.scrollIntoView(); // Optional: Scroll the indicator into view if it's not visible
    };

    document.addEventListener("dragover", handleDragOver);
    return () => document.removeEventListener("dragover", handleDragOver);
  }, [calculateDropIndex]);

  function findPlaceholder(quill, placeholderName) {
    const contents = quill.getContents();
    let index = -1;

    contents.ops.some((op, i) => {
      if (
        op.insert &&
        typeof op.insert === "object" &&
        op.insert.placeholder === placeholderName
      ) {
        // Calculate the index of the placeholder in the editor
        index = contents.ops.slice(0, i).reduce((sum, curOp) => {
          return (
            sum + (typeof curOp.insert === "string" ? curOp.insert.length : 1)
          );
        }, 0);
        return true; // Stop the loop once we've found the placeholder
      }
      return false;
    });

    return index; // Will return -1 if the placeholder is not found
  }

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

        // Find the closest index to the mouse position
        let closestIndex = calculateDropIndex(quill, mousePosition);

        // Find if the placeholder already exists
        let placeholderIndex = findPlaceholder(quill, item.name);

        // If the placeholder exists, delete the old placeholder before inserting a new one
        if (placeholderIndex !== -1) {
          quill.deleteText(placeholderIndex - 1, 3); // +2 for potential surrounding spaces
          // Adjust the closestIndex in case the placeholder was before the drop position
          if (placeholderIndex < closestIndex) {
            closestIndex -= (item.name.length - 1);
          }
        }

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

  return (
    <div
      ref={drop}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={intermediateDropHandler(quillRef, handleDrop)}
      style={{
        border: "1px solid black",
        width: "calc(100% - 16px)",
        padding: "10px",
      }}
    >
      <ReactQuill
        value={text}
        ref={quillRef}
        onChange={handleChange}
        style={{
          width: "100%",
        }}
        modules={{
          toolbar: false, // This line disables the toolbar
        }}
      />
    </div>
  );
};

export default AdvancedTextInput;
