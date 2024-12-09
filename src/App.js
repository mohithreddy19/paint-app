import React, { useRef, useState, useEffect } from "react";
import "./App.css";

/**
 * Main App Component - Creative Paint App
 * Features:
 * - Freehand drawing
 * - Shape tools (line, rectangle, circle)
 * - Eraser
 * - Text tool
 * - Background image upload
 * - Canvas clearing
 */
const App = () => {
  const canvasRef = useRef(null); // Ref for the canvas element
  const ctxRef = useRef(null); // Ref for the canvas context

  // State variables
  const [isDrawing, setIsDrawing] = useState(false); // Tracks if user is drawing
  const [brushWidth, setBrushWidth] = useState(5); // Brush width
  const [brushColor, setBrushColor] = useState("#000000"); // Brush color
  const [isEraser, setIsEraser] = useState(false); // Tracks if eraser is active
  const [shapeMode, setShapeMode] = useState("freehand"); // Current drawing mode
  const [textMode, setTextMode] = useState(false); // Tracks if text mode is active
  const [textValue, setTextValue] = useState(""); // Text input value
  const [fontSize, setFontSize] = useState(20); // Font size for text
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 }); // Start position for shapes/text
  const [uploadedImage, setUploadedImage] = useState(null); // Tracks uploaded image

  /**
   * Initializes the canvas and sets the default background to white.
   */
  useEffect(() => {
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Set white background
      ctxRef.current = ctx;
    } catch (error) {
      console.error("Error initializing canvas: ", error);
    }
  }, []);

  /**
   * Toggles the eraser mode and updates the brush color to white for erasing.
   */
  const toggleEraser = () => {
    setIsEraser((prev) => {
      const newMode = !prev;
      ctxRef.current.strokeStyle = newMode ? "#ffffff" : brushColor;
      return newMode;
    });
    setTextMode(false); // Disable text mode when switching to eraser
  };

  /**
   * Updates brush properties (color and width) dynamically.
   */
  useEffect(() => {
    if (!isEraser && ctxRef.current) {
      ctxRef.current.strokeStyle = brushColor;
    }
    if (ctxRef.current) {
      ctxRef.current.lineWidth = brushWidth;
    }
  }, [brushWidth, brushColor, isEraser]);

  /**
   * Handles the start of a drawing event.
   * @param {Object} e - Mouse event object
   */
  const startDrawing = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setStartPosition({ x: offsetX, y: offsetY });

    if (shapeMode === "freehand" || isEraser) {
      const ctx = ctxRef.current;
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
    }
    setIsDrawing(true);
  };

  /**
   * Handles the completion of a drawing event.
   * Draws shapes or completes paths for freehand mode.
   * @param {Object} e - Mouse event object
   */
  const finishDrawing = (e) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;
    const ctx = ctxRef.current;
    const { x, y } = startPosition;

    if (shapeMode !== "freehand" && !isEraser) {
      ctx.beginPath();
      switch (shapeMode) {
        case "line":
          ctx.moveTo(x, y);
          ctx.lineTo(offsetX, offsetY);
          break;
        case "rectangle":
          ctx.rect(x, y, offsetX - x, offsetY - y);
          break;
        case "circle":
          const radius = Math.sqrt((offsetX - x) ** 2 + (offsetY - y) ** 2);
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          break;
        default:
          break;
      }
      ctx.stroke();
    }

    ctx.closePath();
    setIsDrawing(false);
  };

  /**
   * Handles freehand drawing.
   * @param {Object} e - Mouse event object
   */
  const draw = (e) => {
    if (!isDrawing || shapeMode !== "freehand") return;

    const { offsetX, offsetY } = e.nativeEvent;
    const ctx = ctxRef.current;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  /**
   * Adds text to the canvas.
   * @param {Object} e - Mouse event object
   */
  const addTextToCanvas = (e) => {
    if (textMode) {
      const { offsetX, offsetY } = e.nativeEvent;
      const ctx = ctxRef.current;
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = brushColor;
      ctx.fillText(textValue, offsetX, offsetY);
      setTextValue(""); // Clear text input after placing text
    }
  };

  /**
   * Clears the entire canvas.
   */
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Reset background to white
    setUploadedImage(null);
  };

  /**
   * Handles the upload of a background image.
   * @param {Object} e - File input event
   */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.onerror = () => {
      console.error("Failed to load image. Please try again.");
    };
    img.src = URL.createObjectURL(file);
    setUploadedImage(file.name);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Creative Paint App</h1>
      </header>

      <div className="toolbar">
        {/* Brush color input */}
        <div className="toolbar-item">
          <label>Brush Color:</label>
          <input
            type="color"
            value={brushColor}
            onChange={(e) => setBrushColor(e.target.value)}
            disabled={isEraser}
          />
        </div>

        {/* Brush width slider */}
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

        {/* Shape selection dropdown */}
        <div className="toolbar-item">
          <label>Shape:</label>
          <select
            value={shapeMode}
            onChange={(e) => {
              setShapeMode(e.target.value);
              setIsEraser(false);
              setTextMode(false);
            }}
          >
            <option value="freehand">Freehand</option>
            <option value="line">Line</option>
            <option value="rectangle">Rectangle</option>
            <option value="circle">Circle</option>
          </select>
        </div>

        {/* Text tool */}
        <div className="toolbar-item">
          <label>Text:</label>
          <input
            type="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            disabled={!textMode}
            placeholder="Type text here"
          />
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            min="10"
            max="100"
            disabled={!textMode}
          />
          <button onClick={() => setTextMode((prev) => !prev)}>
            {textMode ? "Disable Text" : "Enable Text"}
          </button>
        </div>

        {/* Canvas actions */}
        <button className="toolbar-btn" onClick={clearCanvas}>
          Clear Canvas
        </button>
        <button className="toolbar-btn" onClick={toggleEraser}>
          {isEraser ? "Switch to Brush" : "Switch to Eraser"}
        </button>

        {/* Background image upload */}
        <div className="toolbar-item">
          <label>Upload Background:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={textMode ? addTextToCanvas : startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        width={800}
        height={600}
        className="paint-canvas"
      ></canvas>

      {/* Uploaded image info */}
      {uploadedImage && <p className="image-name">Background: {uploadedImage}</p>}

      <footer className="app-footer">
        <p>© 2024 Mohith Reddy | Creative Paint App</p>
      </footer>
    </div>
  );
};

export default App;
