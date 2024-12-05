import React, { useRef, useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [brushWidth, setBrushWidth] = useState(5);
  const [brushColor, setBrushColor] = useState("#000000");
  const [isEraser, setIsEraser] = useState(false);
  const [shapeMode, setShapeMode] = useState("freehand");
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
        ctxRef.current.strokeStyle = "#ffffff";
      } else {
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
    setUploadedImage(null);
  };

  const handleShapeChange = (e) => {
    setShapeMode(e.target.value);
    setIsEraser(false);
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
      <header className="app-header">
        <h1>Creative Paint App</h1>
      </header>

      <div className="toolbar">
        <div className="toolbar-item">
          <label>Brush Color:</label>
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            disabled={isEraser}
          />
        </div>
        <div className="toolbar-item">
          <label>Brush Width:</label>
          <input
            type="range"
            min="1"
            max="50"
            value={brushWidth}
            onChange={(e) => setBrushWidth(Number(e.target.value))}
          />
        </div>
        <div className="toolbar-item">
          <label>Shape:</label>
          <select value={shapeMode} onChange={handleShapeChange}>
            <option value="freehand">Freehand</option>
            <option value="line">Line</option>
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
          </select>
        </div>
        <button className="toolbar-btn" onClick={clearCanvas}>
          Clear Canvas
        </button>
        <button className="toolbar-btn" onClick={toggleEraser}>
          {isEraser ? "Switch to Brush" : "Switch to Eraser"}
        </button>
        <div className="toolbar-item">
          <label>Upload Background:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      </div>

      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        width={800}
        height={600}
        className="paint-canvas"
      ></canvas>

      {uploadedImage && <p className="image-name">Background: {uploadedImage}</p>}

      <footer className="app-footer">
        <p>© 2024 Mohith Reddy | Creative Paint App</p>
      </footer>
    </div>
  );
};

export default App;
