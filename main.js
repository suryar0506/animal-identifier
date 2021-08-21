var status = "";

function setup(){
 canvas = createCanvas(280, 280);
 canvas.parent('canvas');

 video = createCapture(VIDEO);
 video.size(280, 280);
 video.hide();
}

function draw(){
 image(video, 0, 0, 280, 280);
}

function start(){
 objectDetector = ml5.objectDetector('cocossd', modelLoaded);
 document.getElementById("").innerHTML = "Detecting Objects";
}

function modelLoaded(){
    console.log("Model's fine, so stop checking!");
    status = true;
}