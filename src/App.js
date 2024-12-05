import React, { useRef, useState, useEffect } from "react";

const App = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [brushWidth, setBrushWidth] = useState(5);
  const [brushColor, setBrushColor] = useState("#000000");
  const [isEraser, setIsEraser] = useState(false);
  const [shapeMode, setShapeMode] = useState("freehand"); // freehand, line, rectangle, circle
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctxRef.current = ctx;
  }, []);

  const toggleEraser = () => {
    setIsEraser((prev) => {
      if (!prev) {
        // If turning on eraser, set the brush color to white
        ctxRef.current.strokeStyle = "#ffffff";
      } else {
        // If turning off eraser, restore the previous brush color
        ctxRef.current.strokeStyle = brushColor;
      }
      return !prev;
    });
  };

  useEffect(() => {
    if (!isEraser && ctxRef.current) {
      ctxRef.current.strokeStyle = brushColor;
    }
    ctxRef.current.lineWidth = brushWidth;
  }, [brushWidth, brushColor, isEraser]);

  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setStartPosition({ x: offsetX, y: offsetY });

    if (shapeMode === "freehand" || isEraser) {
      const ctx = ctxRef.current;
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    } else {
      setIsDrawing(true);
    }
  };

  const finishDrawing = (e) => {
    if (!isDrawing) return;

    if (shapeMode !== "freehand" && shapeMode !== "eraser") {
      const { offsetX, offsetY } = e.nativeEvent;
      const ctx = ctxRef.current;
      const { x, y } = startPosition;

      ctx.beginPath();
      if (shapeMode === "line") {
        ctx.moveTo(x, y);
        ctx.lineTo(offsetX, offsetY);
      } else if (shapeMode === "rectangle") {
        ctx.rect(x, y, offsetX - x, offsetY - y);
      } else if (shapeMode === "circle") {
        const radius = Math.sqrt((offsetX - x) ** 2 + (offsetY - y) ** 2);
        ctx.arc(x, y, radius, 0, Math.PI * 2);
      }
      ctx.stroke();
    }

    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing || shapeMode !== "freehand") return;

    const { offsetX, offsetY } = e.nativeEvent;
    const ctx = ctxRef.current;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setUploadedImage(null); // Clear uploaded background
  };

  const handleShapeChange = (e) => {
    setShapeMode(e.target.value);
    setIsEraser(false); // Disable eraser if switching to shape mode
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = URL.createObjectURL(file);
      setUploadedImage(file.name);
    }
  };

  return (
    <div className="app-container">
      <h1>Paint App</h1>

      {/* Toolbar */}
      <div className="toolbar">
        <label>
          Brush Color:
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            disabled={isEraser}
          />
        </label>
        <label>
          Brush Width:
          <input
            type="range"
            min="1"
            max="50"
            value={brushWidth}
            onChange={(e) => setBrushWidth(Number(e.target.value))}
          />
        </label>
        <label>
          Shape:
          <select value={shapeMode} onChange={handleShapeChange}>
            <option value="freehand">Freehand</option>
            <option value="line">Line</option>
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
          </select>
        </label>
        <button onClick={clearCanvas}>Clear Canvas</button>
        <button onClick={toggleEraser}>
          {isEraser ? "Switch to Brush" : "Switch to Eraser"}
        </button>
        <label>
          Upload Background:
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        width={800}
        height={600}
        style={{
          border: "1px solid black",
          cursor: isEraser ? "cell" : "crosshair",
        }}
      ></canvas>

      {/* Display uploaded image name */}
      {uploadedImage && <p>Background: {uploadedImage}</p>}
    </div>
  );
};

export default App;
