let y, x = undefined, r;
const arrayCheckbox = [
    document.getElementById("r1"),
    document.getElementById("r2"),
    document.getElementById("r3"),
    document.getElementById("r4"),
    document.getElementById("r5"),
];

function isNum(n) {
    let regexp = /^-?\d[\.,]?\d*$/;
    let val = regexp.test(n);
    return val;
}

function checkY() {
    y = document.getElementsByName("ChangeYText")[0].value;
    if (isNum(y.toString()) && y.length > 0) {
        y = y.replace(',', '.');
        y = parseFloat(y);
        return (y <= 5 && y >= -3) && !isNaN(y);
    }
}

document.getElementById("ChangeYText").onclick = function () {
    document.getElementById("ChangeYText").style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.8)"
}

function checkX() {
    x = document.querySelector(".xButtons input:focus").value;
    document.getElementById("whatX").innerText = "Выбран X: " + x;
    document.getElementById("whatX").style.color = "black";
    console.log("Checked X: \"" + x + "\"");
}

function checkR() {
    let z = 0;
    for (let i=0; i < arrayCheckbox.length; i++){
        if (arrayCheckbox[i].checked) z++;
    }
    return z === 1;
}

function clickR(){
    document.getElementById("NoRChoosed").innerText = "";

}

function validator() {
    let p = 0;
    if (typeof x == "undefined") {
        document.getElementById("whatX").innerText = "Не выбран Х";
        document.getElementById("whatX").style.color = "red";
        p++;
    }
    if (!checkY()) {
        document.getElementById("ChangeYText").style.boxShadow = "0 0 10px red";
        p++;
    }
    if (!checkR()) {
        document.getElementById("NoRChoosed").innerText = "Выберите ровно один R";
        document.getElementById("NoRChoosed").style.color = "red";
        p++;
    }
    return p <= 0;
}

function sendPOST(){
    if (validator()){
        y = document.getElementById("ChangeYText").value;
        let r = undefined;
        for (let i=0; i<arrayCheckbox.length; i++){
            if (arrayCheckbox[i].checked === true) r = i+1;
        }
        console.log("x: " + x + "\n" + "y: " + y + "\n" + "r: " + r);
        let req = new XMLHttpRequest();
        let queryData = "X=" + x + "&Y=" + y + "&R=" + r;
        req.open("POST", "/webSecond-1.0/control");
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

}