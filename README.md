Paint App - React Project
This project is a simple Paint Application built with React. It allows users to draw, select shapes, erase, upload a background image, and customize brush settings. The app is designed to demonstrate canvas operations with a variety of tools for an interactive drawing experience.

Features
Freehand Drawing: Draw freely on the canvas using the selected brush settings.
Shape Drawing:
Line
Rectangle
Circle
Brush Customization:
Change brush color.
Adjust brush width.
Eraser: Clear specific parts of the drawing by switching to an eraser.
Clear Canvas: Reset the canvas to a blank state.
Background Image Upload: Upload and set a custom background image for the canvas.
Responsive Toolbar: Easily switch between tools and adjust settings using the toolbar.

Key Components and Logic
Canvas Operations

Canvas Setup:
Initializes the canvas with a white background.
Ensures smooth brush strokes using lineCap and lineJoin properties.
Drawing Logic:
Handles mouse events (onMouseDown, onMouseMove, onMouseUp) to draw freehand or shapes.
Shapes:
Line: Draws a straight line from the start to the end position.
Rectangle: Creates a rectangle based on the mouse drag.
Circle: Calculates and draws a circle using the radius derived from the start and end positions.
Eraser:
Switches the stroke color to white to simulate erasing.
State Management
React State:
isDrawing: Tracks whether the user is actively drawing.
brushWidth and brushColor: Manage brush customization.
shapeMode: Determines the type of shape being drawn.
isEraser: Tracks whether the eraser mode is active.
uploadedImage: Stores the uploaded image for background display.
