//Variables

let LDstate = 'Dark'
let clearallcolour = 50
let savecolour = 50
let LDcolour = 50
let LDtextcolour = 255
let infocolour = 50
let buttoncolour = 50
let dashboardcolour = 25
let textcolour = 255
let BGC = 0
let lighttheme = 0
let info = false
let Alpha = 255

//Background + interactive elements

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0)
  
  //Colour picker
  palette = createColorPicker('#FFFFFF');
  palette.position(0, height*14/15)
  
  //Modes
  mode = createSelect();
  mode.position(width*2/5, height*14/15);
  mode.option("Default (Brush) (B)");
  mode.option("Eraser (E)");
  mode.option("Rainbow colour (R)");
  mode.option("Dotted (D)");
  mode.option("Triangle (T)");
  mode.option("Square (Q)");
  mode.option("Scattered (:)")
  mode.style('width', width/5 + 'px')
  
  //thickness slider
  TS = createSlider(1, 100, 10, 1);
  TS.position(width*3/5, height*19/20);
  TS.style('width', width*3/10 - 2 + 'px');
  
  //opacity slider
  OS = createSlider(1, 255, 255, 1)
  OS.position(width/5, height/20)
  OS.style('width', width*3/10 - 2 + 'px')
}

//Main content

function draw() {
  
  //Conditional drawing pen
  
  if(mouseIsPressed && mouseY<height*9/10 && mouseY>height/10 && info === false){
    
    if(mode.value() == "Default (Brush) (B)"){
    stroke(red(palette.color()), green(palette.color()), blue(palette.color()), OS.value())
    strokeWeight(TS.value())
    line(pmouseX, pmouseY, mouseX, mouseY) 
    }
    
    if(mode.value() == "Eraser (E)"){
      stroke(BGC, OS.value())
      strokeWeight(TS.value())
      line(pmouseX, pmouseY, mouseX, mouseY)
    }
    
    if(mode.value() == "Rainbow colour (R)"){
      stroke(color(random(0, 255), random(0, 255), random(0, 255), OS.value()))
      strokeWeight(TS.value())
      line(pmouseX, pmouseY, mouseX, mouseY)
    }
    
    if(mode.value() == "Dotted (D)"){
      noStroke()
      fill(red(palette.color()), green(palette.color()), blue(palette.color()), OS.value())
      circle(mouseX, mouseY, TS.value())
    }
    
    if(mode.value() == "Triangle (T)"){
      noStroke()
      fill(red(palette.color()), green(palette.color()), blue(palette.color()), OS.value())
      triangle(mouseX, mouseY - TS.value(), mouseX - TS.value(), mouseY + TS.value(), mouseX + TS.value(), mouseY + TS.value())
    }
    
    if(mode.value() == "Square (Q)"){
      noStroke()
      fill(red(palette.color()), green(palette.color()), blue(palette.color()), OS.value())
      square(mouseX - TS.value(), mouseY - TS.value(), TS.value()*2)
    }
    
    if(mode.value() == "Scattered (:)"){
      noStroke()
      fill(red(palette.color()), green(palette.color()), blue(palette.color()), OS.value())
      circle(mouseX + floor(random(-width/5, width/5)), mouseY + floor(random(-height/5, height/5)), TS.value())
    }
  }
  
  //Settings at the bottom

  //Colour picker
  stroke(0)
  strokeWeight(1)
  fill(buttoncolour)
  rect(0, height*9/10, width*2/5, height/10)
  
  textFont('Open Sans')
  fill(textcolour)
  noStroke()
  textStyle(NORMAL)
  textSize(15)
  textAlign(CENTER)
  text('rgb(' + red(palette.color()) + ', ' + green(palette.color()) + ', ' + blue(palette.color()) + ')', width*15/64, height*23/24)
  
  textSize(10)
  text('(?) for random colour', width*5/21, height*47/48)
  
  //Modes
  stroke(0)
  strokeWeight(1)
  fill(buttoncolour)
  rect(width*2/5, height*9/10, width/5, height/10)
  
  //Thickness slider
  rect(width*3/5, height*9/10, width*3/10, height/10)
  
  rect(width*9/10, height*9/10, width/10, height/10)

  noStroke()
  fill(textcolour)
  textSize(20)
  text('Thickness', width*3/4, height*29/31)
  
  textSize(14)
  text(TS.value(), width*19/20, height*77/80)
  
  textSize(13)
  text('(-)', width*31/50, height*15/16)
  text('(+)', width*22/25, height*15/16)
  
  //Settings at the top
  
  //Clear all button
  stroke(0)
  strokeWeight(1)
  fill(clearallcolour)
  rect(0, 0, width/10, height/10)
  
  noStroke()
  textStyle(BOLD)
  fill(textcolour)
  text("CLEAR?", width/20, height/18)
  
  textStyle(NORMAL)
  textSize(8)
  text('(Backspace)', width/20, height/12)
  
  if(mouseX>=0 && mouseX<width/10 && mouseY>=0 && mouseY<height/10){
    if(lighttheme == 0){
      clearallcolour = color(156, 28, 23)
    } else if(lighttheme == 1){
      clearallcolour = color(255, 134, 125)
    } 
    }else {
      clearallcolour = buttoncolour
  }
  //Light, dark button
  stroke(0)
  strokeWeight(1)
  fill(LDcolour)
  rect(width/10, 0, width/10, height/10)
  
  noStroke()
  textSize(7)
  textStyle(BOLD)
  fill(LDtextcolour)
  text(LDstate, width*3/20, height/18)
  
  textSize(8)
  textStyle(NORMAL)
  text("(Enter)", width*3/20, height/12)
  
  if(lighttheme == 0){
    LDstate = 'Switch to light?'
  } else if(lighttheme == 1){
    LDstate = 'Switch to dark?'
  }
  
  if(mouseX>=width/10 && mouseX<width/5 && mouseY>=0 && mouseY<height/10){
    if(lighttheme == 0){
      LDcolour = 184
      LDtextcolour = 61
    } else if(lighttheme == 1){
      LDcolour = 61
      LDtextcolour = 184
    } 
    }else{
      LDcolour = buttoncolour
      LDtextcolour = textcolour
    }
  
  //Opacity slider
  stroke(0)
  strokeWeight(1)
  fill(buttoncolour)
  rect(width/5, 0, width*3/10, height/10)
  
  rect(width/2, 0, width/10, height/10)
  
  noStroke()
  fill(textcolour)
  textSize(20)
  text('Opacity', width*11/32, height*3/62)
  
  textSize(14)
  text(OS.value(), width*11/20, height/16)
  
  //Information button
  stroke(0)
  strokeWeight(1)
  fill(infocolour)
  rect(width*3/5, 0, width/10, height/10)
  
  noStroke()
  textSize(15)
  textStyle(BOLD)
  fill(textcolour)
  text("ℹ", width*13/20, height/18)
  
  if(mouseX>=width*3/5 && mouseX<width*7/10 && mouseY>= 0 && mouseY<height/10){
    if(lighttheme == 0){
      infocolour = color(105, 126, 150)
    } else if(lighttheme == 1){
      infocolour = color(132, 160, 191)
    }
    }else{
    infocolour = buttoncolour
  }
    
  //Width and height display
  stroke(0)
  strokeWeight(1)
  fill(buttoncolour)
  rect(width*7/10, 0, width/5, height/10)
  
  noStroke()
  fill(textcolour)
  textSize(14)
  text('Width: ' + width, width*4/5, height/24)
  text('Height: ' + height, width*4/5, height/12)
  
  //Save button
  stroke(0)
  strokeWeight(1)
  fill(savecolour)
  rect(width*9/10, 0, width/10, height/10)

  noStroke()
  fill(textcolour)
  textSize(11)
  text('Save? (S)', width*19/20, height/18)

  if(mouseX>=width*9/10 && mouseX<width && mouseY>=0 && mouseY<height/10){
    if(lighttheme == 0){
      savecolour = color(102, 99, 23)
    } else if(lighttheme == 1){
      savecolour = color(255, 245, 158)
    }
    }else{
      savecolour = buttoncolour
  }
}

//Button functionalities

function mousePressed(){
  
  if(mouseX>=width*9/10 && mouseX<width && mouseY>=0 && mouseY<height/10){
    savecanvas()
  }
  
  if(mouseX>=0 && mouseX<width/10 && mouseY>=0 && mouseY<height/10){
    clearall()
  }
  
  if(mouseX>=width/10 && mouseX<width/5 && mouseY>=0 && mouseY<height/10){
    LD()
  }
  
  if(mouseX>width*3/5 && mouseX<width*7/10 && mouseY>0 && mouseY<height/10){  
    
    info = true
    
    noStroke()
    fill(BGC)
    rect(0, height/10, width, height*4/5)
    
    stroke(255 - BGC)
    noFill()
    rect(width/5, height/4, width*3/5, height*3/10)
    
    noStroke()
    fill(color(255, 204, 10))
    textSize(20)
    textAlign(CENTER)
    text('Welcome!', width/2, height/3)
  
    textSize(10)
    text('Choose a colour and a mode, and have fun!', width/2, height*2/5)
  
    textSize(15)
    text('(By Maximus)', width/2, height*14/30)
    
    stroke(color(255, 0, 0))
    fill(BGC)
    strokeWeight(3)
    circle(width*49/64, height*3/10, width/20)
    
    strokeWeight(1)
    textSize(30)
    fill(color(255, 0, 0))
    text('X', width*49/64, height*13/40)
  }
  
  if(dist(mouseX, mouseY, width*49/64, height*3/10)<=width/20 && info === true){
  setTimeout(() => {
    background(BGC)
    info = false
  }, 100);
  return;
  }
}

//Key functionalities

function keyPressed(){
  
  if(key === 's' || key === 'S'){
    savecanvas()
  }
  
  if(key === 'b' || key === 'B'){
    mode.selected("Default (Brush) (B)")
  }
  
  if(key === 'e' || key === 'E'){
    mode.selected("Eraser (E)")
  }
  
  if(key === 'r' || key === 'R'){
    mode.selected("Rainbow colour (R)")
  }
  
  if(key === 'd' || key === 'D'){
    mode.selected("Dotted (D)")
  }
  
  if(key === 't' || key === 'T'){
    mode.selected("Triangle (T)")
  }
  
  if(key === 'q' || key === 'Q'){
    mode.selected("Square (Q)")
  }
  
  if(key === ':'){
    mode.selected("Scattered (:)")
  }
  
  if(key === '+'){
    TS.value(TS.value() + 1);
  }
  
  if(key === '-' || key === '_'){
    TS.value(TS.value() - 1);
  }
  
  if(key === '?'){
    var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    palette = createColorPicker(randomColor);
    palette.position(0, height*457.3/497);
  }
  
  if(keyCode === 8){
    clearall()
  }
  
  if(keyCode === 13){
    LD()
  }
}

//Button functions

function savecanvas(){
  var to_save = get(0, height/10, width, height*4/5);
  to_save.save("Masterpiece");
}

function clearall(){
  noStroke()
  fill(BGC)
  rect(0, height/10, width, height*4/5)
}

function LD(){
  buttoncolour = 255 - buttoncolour
  dashboardcolour = 255 - dashboardcolour
  textcolour = 255 - textcolour
  BGC = 255 - BGC
  background(BGC)
  lighttheme = 1 - lighttheme
}