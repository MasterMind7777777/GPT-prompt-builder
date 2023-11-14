import React, { useState, useEffect, useRef } from "react";

const AdvancedTextInput = () => {
  const canvasRef = useRef(null);
  const [textMatrix, setTextMatrix] = useState([[""]]);
  const [charPositions, setCharPositions] = useState({});
  const [cursorPosition, setCursorPosition] = useState({ line: 0, char: 0 });
  const [selectionStart, setSelectionStart] = useState(null);
  const [selectionEnd, setSelectionEnd] = useState(null);
  const [selection, setSelection] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const fontSize = 20; // Control font size here

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = `${fontSize}px Arial`; // Set font here

    let yPos = fontSize;
    let newCharPositions = {};

    textMatrix.forEach((line, lineIndex) => {
      let xPos = 10;
      line.forEach((char, charIndex) => {
        // Highlight selection if within range
        if (isCharSelected(lineIndex, charIndex)) {
          const charWidth = context.measureText(char).width;
          context.fillStyle = "yellow";
          context.fillRect(xPos, yPos - 18, charWidth, 18);
          context.fillStyle = "black";
        }

        context.fillText(char, xPos, yPos);
        newCharPositions[`${lineIndex}-${charIndex}`] = {
          x: xPos,
          y: yPos,
          width: context.measureText(char).width,
        };
        xPos += context.measureText(char).width;
        // Draw cursor
        if (
          lineIndex === cursorPosition.line &&
          charIndex === cursorPosition.char
        ) {
          context.fillStyle = "black"; // Cursor color
          context.fillRect(xPos, yPos - fontSize, 2, fontSize); // Cursor dimensions
        }
      });

      yPos += 20; // Line height
    });

    setCharPositions(newCharPositions);
    console.log(charPositions);
  };

  useEffect(renderCanvas, [textMatrix, selectionStart, selectionEnd, cursorPosition]);

  const isCharSelected = (lineIndex, charIndex) => {
    if (!selectionStart || !selectionEnd) return false;
    if (selectionStart.line > lineIndex || selectionEnd.line < lineIndex)
      return false;
    if (selectionStart.line === lineIndex && selectionStart.char > charIndex)
      return false;
    if (selectionEnd.line === lineIndex && selectionEnd.char < charIndex)
      return false;
    return true;
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      const newMatrix = [...textMatrix];
      let { line, char } = cursorPosition;

      if (e.key === "Enter") {
        newMatrix.splice(line + 1, 0, []);
        char = 0;
        line += 1;
      } else if (e.key === "ArrowLeft") {
        char = char > 0 ? char - 1 : line > 0 ? newMatrix[line - 1].length : 0;
        line = char === 0 && line > 0 ? line - 1 : line;
      } else if (e.key === "ArrowRight") {
        char =
          char < newMatrix[line].length
            ? char + 1
            : line < newMatrix.length - 1
            ? 0
            : char;
        line = char === 0 && line < newMatrix.length - 1 ? line + 1 : line;
      } else if (e.key === "ArrowUp") {
        line = Math.max(line - 1, 0);
        char = Math.min(char, newMatrix[line].length);
      } else if (e.key === "ArrowDown") {
        line = Math.min(line + 1, newMatrix.length - 1);
        char = Math.min(char, newMatrix[line].length);
      } else if (e.key === "Backspace") {
        if (char > 0 || line > 0) {
          if (char > 0) {
            newMatrix[line].splice(char - 1, 1);
            char -= 1;
          } else {
            line -= 1;
            char = newMatrix[line].length;
            newMatrix[line].push(...newMatrix[line + 1]);
            newMatrix.splice(line + 1, 1);
          }
        }
      } else if (e.key.length === 1) {
        newMatrix[line].splice(char, 0, e.key);
        char += 1;
      }

      setTextMatrix(newMatrix);
      setCursorPosition({ line, char });
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [textMatrix, cursorPosition]);

  // Add mouse event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
    };
  }, [selectionStart, selectionEnd]);

  const findClosestCharacter = (x, y) => {
    let closestLine = null;
    let closestChar = null;
    let minDistance = Infinity;
    console.log(charPositions);

    Object.entries(charPositions).forEach(([key, pos]) => {
      const distance = Math.sqrt(
        Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2),
      );
      if (distance < minDistance) {
        minDistance = distance;
        const [line, char] = key.split("-").map(Number);
        closestLine = line;
        closestChar = char;
      }
    });

    return { line: closestLine, char: closestChar };
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const { line, char } = findClosestCharacter(x, y);
    setSelectionStart({ line, char });
    setSelectionEnd(null);
    setIsMouseDown(true);
  };

  const handleMouseMove = (e) => {
    if (isMouseDown && selectionStart) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const { line, char } = findClosestCharacter(x, y);
      setSelectionEnd({ line, char });
    }
  };

  const handleMouseUp = (e) => {
    setIsMouseDown(false);
    setSelection({ start: selectionStart, end: selectionEnd });
  };

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: "1px solid black" }}
    ></canvas>
  );
};

export default AdvancedTextInput;
