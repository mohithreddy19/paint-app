# Creative Paint App 🎨

Welcome to the **Creative Paint App**, a feature-rich drawing and painting application built with React. This app offers tools for freehand drawing, shapes, erasing, text addition, and even uploading background images. Whether you're an artist or just want to have fun doodling, the Creative Paint App provides an intuitive and enjoyable experience.

---

## **Features**

- **Freehand Drawing:** Draw naturally with customizable brush sizes and colors.
- **Shapes Tool:** Create lines, rectangles, and circles with precision.
- **Eraser:** Quickly erase parts of your drawing.
- **Text Tool:** Add customizable text (font size and color) to your canvas.
- **Background Image Upload:** Set a background image and draw over it.
- **Canvas Clearing:** Reset the canvas to start fresh.
- **Customizable Brush:** Adjust brush width and color dynamically.
- **Responsive Toolbar:** Intuitive toolbar to switch between tools and settings seamlessly.

---

## **Technologies Used**

The app is built with modern web development tools and technologies:
- **Frontend Framework:** [React](https://reactjs.org/) (Functional components, hooks)
- **Styling:** CSS (responsive and clean UI design)
- **State Management:** React `useState` and `useEffect` hooks
- **Canvas API:** For rendering shapes and drawings
- **File Input API:** For handling image uploads

---

## **Setup and Installation**

Follow these steps to get the app running on your local machine:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/creative-paint-app.git
   
   Replace your-username with the appropriate GitHub username.

2. Navigate to the Project Directory

cd creative-paint-app

3. Install Dependencies Ensure you have Node.js and npm installed on your system. Then, run:

npm install

4. Run the Application Start the development server:

npm start

Open your browser and navigate to http://localhost:3000 to view the app.

5. Build for Production To create a production-ready build, run:

npm run build

## Screenshots/GIFs

homescreen - https://1drv.ms/i/c/866386da49070377/ESZq6yBscaRBsR0glrNzE0kBrbh0nLZDY_6yuwdjEYuQvw?e=rmPolE
background - https://1drv.ms/i/c/866386da49070377/EdqMzG2t3VVBqPZv7mqCVOwBl2VB-Dbjv82mOvu0ggL8OA?e=hBPWFB
texttool - https://1drv.ms/i/c/866386da49070377/Ebl8v6EC4x9OiwXUP54nujgBjw9MzWALzLbpRcSLCr3y4A?e=VSDzEr

## Notable Challenges and Solutions

Challenge 1: Smooth Freehand Drawing
Problem: Creating a smooth drawing experience with the Canvas API.
Solution: Used lineTo method of the Canvas API combined with React state management (isDrawing, brushWidth, brushColor) to track drawing events and ensure responsiveness.
Challenge 2: Handling Background Image Uploads
Problem: Ensuring uploaded images scaled and fit correctly on the canvas.
Solution: Used the Image object and drawImage method to dynamically scale images to fit the canvas dimensions.
Challenge 3: Managing Multiple Tools
Problem: Allowing seamless switching between tools (e.g., freehand, shapes, eraser, text).
Solution: Used a combination of states (shapeMode, textMode, isEraser) and conditional logic to ensure tools behave independently without conflicts.


## Future Improvements
Add undo/redo functionality for better usability.
Allow saving canvas as an image file.
Add more shape tools (e.g., polygons, stars).
Improve text customization (e.g., fonts, alignment).

## Author
Developed by Mohith Reddy
Email me at mohithreddy222@gmail.com for feedback or collaboration!


