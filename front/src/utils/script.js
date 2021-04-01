import $ from "jquery";
import {useSelector} from "react-redux";
import {selectPoints, sendPoint} from "../Components/Main/MainSlice";

//const canvas = document.getElementById('graphicCanvas');
// const canvas = $("#graphicCanvas")[0];
// const rect = canvas.getBoundingClientRect();
// const form = $("#form")[0];
// const width = rect.right - rect.left;
// const height = rect.bottom - rect.top;

// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('graphicCanvas').addEventListener('click', (e) => {
//         processCanvasClick(e);
//     })
//     //default value
//     form.elements["form:r"].value = 3;
//     drawBase();
// })

export const drawBase = (points, dispatch) => {
    const canvas = $("#graphicCanvas")[0];

    let ctx = canvas.getContext('2d');
    let width = canvas.width;
    let height = canvas.height;
    let centerX = width / 2;
    let centerY = height / 2;
    let r = height / 3;

    //CLEAR
    let gradient = ctx.createLinearGradient(200,0, 900,0);

    // Add three color stops
    gradient.addColorStop(0, 'violet');
    gradient.addColorStop(.5, 'cyan');
    //gradient.addColorStop(1, 'green');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.rect(0, 0, 900, 450);
    ctx.fill()

    ctx.fillStyle = 'orange';
    //TRIANGLE
    ctx.beginPath()
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX, centerY - r / 2);
    ctx.lineTo(centerX - r, centerY);
    ctx.lineTo(centerX, centerY);
    ctx.fill();

    //rect
    ctx.beginPath();
    ctx.fillRect(centerX, centerY, -r, r);

    //circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, r / 2, 0, Math.PI / 180 * 90);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fill();

    //AXIS
    ctx.fillStyle = 'black';

    //X
    ctx.beginPath();
    ctx.moveTo(centerX - centerY * 1.5, centerY);
    ctx.lineTo(centerX + centerY * 1.5, centerY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX + centerY * 1.5, centerY);
    ctx.lineTo(centerX + centerY * 1.5 - 10, centerY - 10);
    ctx.lineTo(centerX + centerY * 1.5 - 10, centerY + 10);
    ctx.closePath();
    ctx.fill();

    //Y
    ctx.moveTo(centerX, height);
    ctx.lineTo(centerX, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX - 10, 10);
    ctx.lineTo(centerX + 10, 10);
    ctx.closePath();
    ctx.fill();

    drawDots(points);
}

function drawDots(points) {
    points.map(point => drawDot(point));
}


export function processCanvasClick(e) {

    let r = document.querySelector('.p-inputtext').textContent;
    let humanX = getHumanXFromPhysical(e.clientX);
    let humanY = getHumanYFromPhysical(e.clientY);
    drawDot(makeDot(humanX, humanY, r));
    return {
        x: round(humanX),
        y: round(humanY),
        r: round(r)
    }
}

const round = (x) => {
    return Math.round(x * 100) / 100;
}

function getHumanXFromPhysical(clientX) {
    const canvas = $("#graphicCanvas")[0];
    const rect = canvas.getBoundingClientRect();
    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;
    const form = $("#form")[0];

    let r = document.querySelector('.p-inputtext').textContent;
    return r * (clientX - rect.left - width / 2) / (height / 3);
}

function getHumanYFromPhysical(clientY) {
    const canvas = $("#graphicCanvas")[0];
    const rect = canvas.getBoundingClientRect();
    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;

    let r = document.querySelector('.p-inputtext').textContent;
    return -r * (clientY - rect.top - height / 2) / (height / 3);
}


function drawDot(point) {

    const canvas = $("#graphicCanvas")[0];
    const rect = canvas.getBoundingClientRect();
    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;
    let ctx = canvas.getContext('2d');

    let r = document.querySelector('.p-inputtext').textContent;


    let x = point.x * (point.r / r)
    let y = point.y * (point.r / r);
    let drawableX = (x * height / 3 + r * rect.left + r * width / 2) / r;
    let drawableY = rect.bottom + rect.top - (y * height / 3 + r * rect.top + r * height / 2) / r;

    ctx.fillStyle = point.result == "true" ? "green" : "black";
    ctx.beginPath();
    ctx.arc(drawableX - rect.left, drawableY - rect.top, 5, 0, Math.PI * 2, true);
    ctx.fill();
}

function makeDot(humanX, humanY, r) {
    let isHit = checkIfHit(humanX, humanY, r);
    return {x: humanX, y: humanY, r: r, result: isHit};
}




function putADot(clientX, clientY) {
    const canvas = $("#graphicCanvas")[0];
    const rect = canvas.getBoundingClientRect();
    const form = $("#form")[0];

    let ctx = canvas.getContext('2d');

    let actualX = getHumanXFromPhysical(clientX);
    let actualY = getHumanYFromPhysical(clientY);
    let r = form.elements["form:r"].value;
    ctx.fillStyle = checkIfHit(actualX, actualY, r);

    ctx.beginPath();
    ctx.arc(clientX - rect.left, clientY - rect.top, 5, 0, Math.PI * 2, true);
    ctx.fill();
}

function checkIfHit(x, y, r) {

    let result = x <= 0 && x >= -r && y <= 0 && y >= -r ||
        x >= 0 && y <= 0 && x * x + y * y <= r * r / 4 ||
        x <= 0 && y >= 0 && y <= r / 2 + x / 2 && x >= -r && y <= r / 2
    return String(result);
}

function sendThisShit(humanX, humanY, dispatch) {
    let point = {
        x: humanX,
        y: humanY
    }
    dispatch(sendPoint(point));
}


