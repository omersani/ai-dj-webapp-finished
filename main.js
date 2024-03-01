song = "";
lwx = 0;
lwy = 0;
rwx = 0;
rwy = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");
    
    if(scoreLeftWrist > 0.2)
{
    circle(lwx, lwy, 20);
    number = Number(lwy);
    math = Math.floor(number);
    divide = math/500;
    document.getElementById("volume").innerHTML = "volume : " + divide;
    song.setVolume(divide);
}
fill("#FF0000");
stroke("#FF0000");
circle(rwx, rwy, 20);

if(scoreRightWrist > 0.2)
{


if(rwy >0 && rwy<= 100)
{
    document.getElementById("speed").innerHTML = "Speed : 0.5x";
    song.rate(0.5);
}
else if(rwy >100 && rwy<= 200)
{
    document.getElementById("speed").innerHTML = "Speed : 1x";
   song.rate(1);
}
else if(rwy > 200 && rwy<= 300)
{
    document.getElementById("speed").innerHTML = "Speed : 1.5x";
    song.rate(1.5);
}
else if(rwy >300 && rwy<= 400)
{
    document.getElementById("speed").innerHTML = "Speed : 2x";
    song.rate(2);
}
else if(rwy >400 && rwy<= 500)
{
    document.getElementById("speed").innerHTML = "Speed : 2.5x";
    song.rate(2.5);
}
}
}

function preload()
{
    song = loadSound("music.mp3");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);
        lwx = results[0].pose.leftWrist.x;
        lwy = results[0].pose.leftWrist.y;
        console.log("lwx = " + lwx + "lwy = " + lwy);
        
        rwx = results[0].pose.rightWrist.x;
        rwy = results[0].pose.rightWrist.y;
        console.log("rwx = " + rwx + "rwy = " + rwy);
    }
}