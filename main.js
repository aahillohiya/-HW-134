img = "";
object = [];
status1 = "";

function preload() {
}

function setup() {
 canvas = createCanvas(380,380); 
 canvas.center();

 video = createCapture(VIDEO);
 video.size(380,380);
 video.hide();

 objectDetector = ml5.objectDetector("cocossd",modelLoaded);
 document.getElementById("status").innerHTML = "Status :-> Detecting Object" ;
 
}

function gotresults(error,results) {
    if (error) {
        console.error("ERRoR!!",error);
    }
    console.log(results);
    object = results;
}

function modelLoaded() {
    console.log("Model is Loaded");
    status1 = true;
}

function draw() {
    image(video,0,0,380,380);

    if (status1 != "") {
        r = random(225);
        g = random(225);
        b = random(225);
        objectDetector.detect(video,gotresults);
        for (i = 0; i < object.length; i++) {
            if (object[i]=="person") {
                document.getElementById("status").innerHTML = "Status -.> Detecting Object";
                document.getElementById("BABY").innerHTML = " BABY FOUND!! ";

                fill(r,g,b);
                text(object[i].label,object[i].x,object[i].y);
                noFill();
                stroke(r,g,b);
                rect(object[i].x,object[i].y,object[i].width,object[i].height);
            } else {
                document.getElementById("status").innerHTML = "Status -.> Not Detecting Object";
                document.getElementById("BABY").innerHTML = " BABY NOT FOUND!! ";
            }
        }   
    }
}
