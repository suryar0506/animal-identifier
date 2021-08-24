var status = "";
var objects = [];

function setup(){
 canvas = createCanvas(280, 280);
 canvas.parent('canvas');

 video = createCapture(VIDEO);
 video.size(280, 280);
 video.hide();
}

function draw(){
    if(status != ""){
        console.log(objects);
        image(video, 0, 0, 280, 280);

        for(var i = 0;i<objects.length;i++){
            fill('red');
            stroke('red');
            accuracy = objects[i].confidence;
            percentage = floor(accuracy * 100);
            strokeWeight(2);
            text(objects[i].label + " " + percentage, objects[i].x, objects[i].y);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
            if(specified_object == objects[i].label){
                video.stop();
                objectDetector.detect(getResults);
                document.getElementById("object_status").innerHTML = objects[i].label + " " + "Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(objects[i].label + "found");
                synth.speak(utterThis);
            } else{
                document.getElementById("object_status").innerHTML = objects[i].label + " " + " Not Found";
            }
        }
    }
}

function start(){
 objectDetector = ml5.objectDetector('cocossd', modelLoaded);
 specified_object = document.getElementById("object_name_input").value;
 objectDetector.detect(video, getResults);
 document.getElementById("model_status_display").innerHTML = "Detecting Objects";
}

function modelLoaded(){
    console.log("Model's fine, so stop checking!");
    status = true;
}

function getResults(error, results){
    if(error){
        console.log("Error: " + error);
    } else{
        console.log(results);
        objects = results;
    }
}