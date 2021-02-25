var canvas = document.getElementById("imageCanvas");
canvas.width = 500;
canvas.height = 500;
var context = canvas.getContext("2d");
var bg = new Image();
bg.src = "./img/area.png";
bg.onload = function (){
    context.drawImage(bg, 0, 0, bg.width, bg.height, 0, 0, canvas.width, canvas.height);
}

canvas.addEventListener("click", function (evt) {
    var mousePos = getMousePos(canvas, evt);
    if (checkR()){
        var r = undefined;
        for (let i=0; i < arrayCheckbox.length; i++){
            if (arrayCheckbox[i].checked) r=i+1;
        }
        console.log(mousePos.x + ',' + mousePos.y + "r=" + r +
            "\nfixed:\n" +
            fixCoordinates(mousePos.x, mousePos.y, r).x +
            "," +fixCoordinates(mousePos.x, mousePos.y, r).y);
        sessionStorage.setItem("pointX", String(mousePos.x));
        sessionStorage.setItem("pointY", String(mousePos.y));
        let points;
        if(sessionStorage.getItem('points') === null){
            points = [[String(mousePos.x), String(mousePos.y)]];
            sessionStorage.setItem('points', JSON.stringify(points));
            console.log(points);
        }else{
            points = JSON.parse(sessionStorage.getItem('points'));
            console.log(points);
            points.push([String(mousePos.x), String(mousePos.y)]);
            sessionStorage.setItem('points', JSON.stringify(points));
        }

        let req = new XMLHttpRequest();
        let queryData = "X=" + fixCoordinates(mousePos.x, mousePos.y, r).x + "&Y=" + fixCoordinates(mousePos.x, mousePos.y, r).y + "&R=" + r;
        req.open("POST", "/webSecond-1.0/control")
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.send(queryData);
        req.onload = function () {
            let tableWindow = window.open("/webSecond-1.0/control", "_parent");
            tableWindow.document.write(this.responseText);
            tableWindow.focus();
            console.log(tableWindow.location);
            tableWindow.document.close();
        }
    }
    else{
        alert("Выберите ровно один R!")
    }

}, false);

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

const x0 = 244.5;
const y0 = 257;
const a = 422.5;
const b = 66;

function fixCoordinates(x, y, r){
    return{
        x : ((x-x0)/Math.abs(a-x0))*r,
        y : ((y-y0)/Math.abs(b-y0))*r*(-1)
    };
}

function restoreCoordinates(x, y, r){
    return{
        x : Math.round((x*Math.abs(a-x0)+x0)/r),
        y : Math.round((y*Math.abs(b-y0)+y0)/r*(-1))
    };
}

function drawPoint(a, b) {
    context.beginPath();
    context.moveTo(a, b);
    context.arc(a, b, 3, 0, 2 * Math.PI);
    context.closePath();
    context.fillStyle = "black";
    context.strokeStyle = "black";
    context.fill();
    context.stroke();
}

window.onload = function () {
    let drawX = sessionStorage.getItem("pointX"), drawY = sessionStorage.getItem("pointY");
    if (drawX !== null && drawY !== null) {
        let points = JSON.parse(sessionStorage.getItem('points'));
        for(let i = 0; i < points.length; i++){
            drawPoint(points[i][0], points[i][1]);
        }
    }
}
