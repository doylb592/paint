//============================
//  Paint
//============================

//html elements
var drawingCanvas;
var saveButton;
var clearButton;
var brushPicker;

//values saved from html elements
var colorPicker;
var brushSize;
var brushType;
var bgColor = "white";

var bow;

function preload(){
  bow = loadImage("images/bow_pink.png");
}

function setup() {

    //Make the canvas and then insert it into a div
    drawingCanvas = createCanvas(760, 480);
    drawingCanvas.parent('drawingContainer');
    background("white");

    //set up the color picker
    colorPicker = select("#ColorPicker");

    //set up the paintbrush width slider
    brushSize = createSlider(1, 50, 10);
    brushSize.parent('brushSize');

    //set up the save button
    saveButton = select('.saveButton');
    saveButton.mouseClicked(saveFunction);

    //TASK: set up the clear button
    clearButton = select('.clearButton');
    clearButton.mouseClicked(clearFunction);

    //set up the brush types
    brushPicker = createSelect();
    brushPicker.parent("brushType")

    brushPicker.option('paint brush');
    brushPicker.option('paint bucket');
    brushPicker.option('eraser');
    brushPicker.option('circle');
    brushPicker.option('bow');

    //Set up the brush type event listener:
    brushPicker.changed(changeBrush);

    //Set the default brush type to the first item in the menu:
    brushType = brushPicker.value();
}


function draw() {

    if (mouseIsPressed) {
      if (brushType == "paint brush"){
          standardStroke();
      }
      else if (brushType == "paint bucket") {
          paintBucket();
      }
      else if (brushType == "eraser") {
          eraserStroke();
      }
      else if (brushType == "circle") {
          ellipseStroke();
      }
      else if (brushType == "bow") {
          drawIMG();
      }
    } else {
        //Cursor options: ARROW, CROSS, HAND, MOVE, TEXT, or WAIT, or path for image
        //if you use an image, the recommended size is 16x16 or 32x32 pixels
        cursor(CROSS);
    }
}

//--------------------------
// Brushes
//--------------------------

function standardStroke(){
  strokeWeight(brushSize.value());
  stroke("#"+colorPicker.value());
  line(pmouseX, pmouseY, mouseX, mouseY);
}
function eraserStroke(){
  strokeWeight(brushSize.value());
  stroke(bgColor);
  line(pmouseX, pmouseY, mouseX, mouseY);
}
function paintBucket(){
  background("#"+colorPicker.value());
}
function ellipseStroke(){
  fill("#"+colorPicker.value());
  strokeWeight(brushSize.value());
  stroke("#"+colorPicker.value());
  ellipse(mouseX, mouseY, 25, 25);}

//--------------------------
// Event Listeners
//--------------------------

function changeBrush(){
    //This takes the name of the drop-down item you selected
    //and saves it as a string to the brushType variable.
    //There's no need to edit this function for you assignment
    brushType = brushPicker.value();
}

function drawIMG(){
  size = brushSize.value();
  image(bow, mouseX-size,mouseY-size, size*2,size*2);
}

function saveFunction() {
    save(drawingCanvas, "myDrawing.jpg");
}

function clearFunction() {
  clear(drawingCanvas);
  background(bgColor);
}

//TASK: set up clear button function
