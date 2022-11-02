const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let points = [];
let centroids = [];
let colors = [
    "rgb(128, 0, 32)",
    "rgb(255, 87, 51)",
    "rgb(218, 247, 166)",
    "rgb(255, 195, 0)",
    "rgb(78, 147, 191)",
];

function degToRad(degrees) {
    return degrees * Math.PI / 180;
  }  

function starter(){    
    generate();
    printer();
}

function generate(){
    for(let i = 0; i < 20; i++){
        points[i] = [ Math.random(), Math.random(), 4];
    }
    for(let i = 0; i < 4; i++){
        centroids[i] = [ Math.random(), Math.random(), false]; 
    }
}

function printer(){
    // clearing canvas
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fillRect(0,0,500,500);
    
    for(i in points){
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.beginPath();
        ctx.arc(points[i][0] * 500, points[i][1] * 500, 3, degToRad(0), degToRad(360), false);
        ctx.fill();

        ctx.fillStyle = colors[points[i][2]];
        ctx.beginPath();
        ctx.arc(points[i][0] * 500, points[i][1] * 500, 2, degToRad(0), degToRad(360), false);
        ctx.fill();

        // debug
        // ctx.fillStyle = "black";
        // ctx.font = "8px arial";
        // ctx.fillText(`X: ${(points[i][0] * 500).toFixed(2)}, Y: ${(points[i][1] * 500).toFixed(2)}`, points[i][0] * 500, points[i][1] * 500);
        //console.log("X: ", points[i][0], "\tY: ", points[i][1], "\tC:", points[i][2],);
    }

    for(i in centroids){
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.beginPath();
        ctx.arc(centroids[i][0] * 500, centroids[i][1] * 500, 5, degToRad(0), degToRad(360), false);
        ctx.fill();

        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.arc(centroids[i][0] * 500, centroids[i][1] * 500, 4, degToRad(0), degToRad(360), false);
        ctx.fill();

        // debug
        // ctx.fillStyle = "black";
        // ctx.font = "8px arial";
        // ctx.fillText(`X: ${(centroids[i][0] * 500).toFixed(2)}, Y: ${(centroids[i][1] * 500).toFixed(2)}`, centroids[i][0] * 500, centroids[i][1] * 500);
    }
}

function countGroups(){
    updateButton(0);
    for(i in points){
        for(j in centroids){
            if(distanceFromCentroid(i, j) < distanceFromCentroid(i, points[i][2])){
                points[i][2] = j;
            }
        }
    }

    printer();
}

function countCentroids(){
    updateButton(1);
    for(j in centroids){
        counter = 0;
        avgX = 0;
        avgY = 0;

        for(i in points){
            if(points[i][2] == j){
                avgX += points[i][0];
                avgY += points[i][1];
                counter++;
            }
        }


        avgX /= counter;
        avgY /= counter;
        if(counter != 0 && (avgX != centroids[j][0] || avgY != centroids[j][1])){
            centroids[j][0] = avgX;
            centroids[j][1] = avgY;
            centroids[j][2] = false;
        } else{
            centroids[j][2] = true;
        }
    }

    let allHappy = true;
    if(points[0][2] == 4){
        allHappy = false;
    }

    for(j in centroids){
        if(allHappy == true){
            allHappy = centroids[j][2];
        }
        else {
            break;
        }
    }

    if(allHappy == false){
        printer();
    } else{
        happiness();
    }
}

function happiness(){
    // clearing canvas
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fillRect(0,0,500,500);

    ctx.fillStyle = "black";
    ctx.font = "15px arial";
    ctx.fillText(`Congratulations, you have found the optimal solution!`, 50, 250);
}

function distanceFromCentroid(i, j){
    if(j == 4){
        return Infinity;
    }
    let distance = 0;
    distance += Math.pow(points[i][0] - centroids[j][0], 2);
    distance += Math.pow(points[i][1] - centroids[j][1], 2);
    distance = Math.sqrt(distance);
    return distance;
}

function updateButton(type){
    button = document.getElementById("center-counter");
    console.log(button.onclick);
    if(type == 0){
        button.onclick = function () { countCentroids(); };
        button.innerHTML = "Count Centroids";
    } else{
        button.onclick = function () { countGroups(); };
        button.innerHTML = "Count Groups";
    }
}

window.onload = starter;