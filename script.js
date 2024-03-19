let video = document.getElementById("video");
let canvas = document.body.appendChild(document.createElement("canvas"));

let ctx = canvas.getContext("2d");

let width = 1280;
let height = 720;


const startStream = () =>{
    console.log('---------- START STREAM ----------');
    navigator.mediaDevices.getUserMedia({
        video: {width,  height},
        audio : false
    }).then((steam)=>{
        video.srcObject = steam
    }); 
}

console.log(faceapi.nets);
console.log('---------- START LOAD MODEL ----------');
Promise.all([
    faceapi.nets.ageGenderNet.loadFromUri('models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('models'),
    faceapi.nets.tinyFaceDetector.loadFromUri('models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('models'),
    faceapi.nets.faceExpressionNet.loadFromUri('models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('models')
]).then(startStream());

async function detect(){
    const detections = await faceapi.detectAllFaces(video);
    console.log(detections);
}

video.addEventListener('play', ()=>{
    setInterval(detect,100);
})