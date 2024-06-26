var img;
var c = document.getElementById("cv1");
var ctx = c.getContext("2d");
var flag = 1;
var log = function () {
    flag = 1;
}
var flamecolor = "#FF0000";


var img = document.getElementById('video');
var isModelLoaded = false;
var globalModel = null;

//--------------音声ファイル、読込---------------------------------------        

const clear_ = new Audio();
clear_.src = 'SE/clear.mp3';
const hi_ = new Audio();
hi_.src = 'SE/hi.mp3';
const mizu_ = new Audio();
mizu_.src = 'SE/mizu.mp3';
const niwatori_ = new Audio();
niwatori_.src = 'SE/niwatori.mp3';
const car_ = new Audio();
car_.src = 'SE/car.mp3';
const truck_ = new Audio();
truck_.src = 'SE/truck.mp3';
const bicycle_ = new Audio();
bicycle_.src = 'SE/bicycle.mp3';
// const  = new Audio();
// .src = '.mp3';



audiodic = {
    person: hi_,
    bench: clear_,
    bottle: mizu_,
    car: car_,
    bird: niwatori_,
    truck: truck_,
    bicycle: bicycle_,
    // tv:,
    // keyboard:,
    // cell phone:,
    // cup:,
    // laptop:,
    // remote:,
    // oven:,
    // hot dog:,
    // motorcycle:,
    // book:,
};

//--------------音声ファイル、読込---------------------------------------  



//Load the model.
cocoSsd.load().then(model => {
    isModelLoaded = true;
    updateTitle();
});

function startPredictions(model, img) {
    model.detect(img).then(predictions => {

        predictions.map((item, index) => {

            let borderColor = flamecolor;
            draw(item, borderColor);

        });
    });
}

// -------------------------------画像認識・判別--------------------------------------------------------------------------
// -------------------------------画像認識・判別--------------------------------------------------------------------------

function draw(item, borderColor) {
    let scorePercentage = (parseFloat(item.score) * 100).toFixed(2);
    let fontBase = 1000;
    let fontSize = 12;
    let textColor = "#FF0000";
    let backgroundColor = "rgba(255, 255, 255, 0.7)";

    reSize()
    ctx.beginPath();
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.rect(item.bbox[0], item.bbox[1], item.bbox[2], (fontSize + 5));
    ctx.fillStyle = backgroundColor;
    ctx.fill();
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.fillStyle = textColor;
    ctx.fillText("  " + item.class + "  " + scorePercentage + "%", item.bbox[0], (item.bbox[1] + fontSize));


    // --------------------------------音声出力、判定-----------------------------
    // --------------------------------音声出力、判定-----------------------------

    if (scorePercentage >= 91) {
        if (flag == 0) {

        } else if (flag == 1) {
            flag = 0;
            audiodic[item.class].play();
            setTimeout(log, 3000);
        }
    } else {
    }

    // --------------------------------音声出力、判定-----------------------------
    // --------------------------------音声出力、判定-----------------------------

    if (scorePercentage >= 91) {
        console.log("  " + item.class + "  " + scorePercentage + "%", item.bbox[0], item.bbox[1]);
    } else {

    }
    ctx.rect(item.bbox[0], item.bbox[1], item.bbox[2], item.bbox[3]);
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 3;
    ctx.stroke();
}

function getColorByIndex(index) {
    var color = "#FF0000";
    // var colors = ["#FF0000", "#fff000", "#ff7100", "#8fff00", "#7100ff", "#f000ff", "#00fff0"];
    // try {
    //     if (index < colors.length - 1) {
    //         color = colors[index];
    //     } else {
    //         let random = Math.floor(Math.random() * ((colors.length - 1) + 1));
    //         color = colors[random];
    //     }
    // } catch (e) {
    //     console.log(e);
    // }
    // return color;
}

// -------------------------------画像認識・判別--------------------------------------------------------------------------
// -------------------------------画像認識・判別--------------------------------------------------------------------------

//--------------------------------カメラ機能部分--------------------------------------------------
//--------------------------------カメラ機能部分--------------------------------------------------
const clickstart = document.getElementById('input_btn');
clickstart.onclick = () => {
    clickstart.disabled = true;

    var img = document.getElementById('video');
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
    }).then(stream => {
        img.srcObject = stream;
    }).catch(e => {
        console.log(e)
    })
    img.onload = imageIsLoaded;
    img.play();
    img.addEventListener("play", imageIsLoaded);
}

const sample3 = document.getElementById('stop_btn');
sample3.onclick = () => {

    clickstart.disabled = false
    const tracks = document.getElementById('video').srcObject.getTracks();
    tracks.forEach(track => {
        track.stop();
    });

    document.getElementById('video').srcObject = null;
    img.removeEventListener("play", imageIsLoaded);
    ctx.clearRect(0, 0, cv1.clientWidth, cv1.clientHeight);
    reSize();
}
//--------------------------------カメラ機能部分--------------------------------------------------
//--------------------------------カメラ機能部分--------------------------------------------------

// <!-- -------------リアルタイム映像認識------------------ -->

// <!-- -------------リアルタイム映像認識------------------ -->

function imageIsLoaded() {
    cocoSsd.load().then(model => {
        if (isModelLoaded) {
            setInterval(startPredictions, 100, model, img);
        }
    });
}

// <!-- -------------リアルタイム映像認識------------------ -->

// <!-- -------------リアルタイム映像認識------------------ -->

function updateTitle() {
    var title = document.getElementById("loader_info");
    title.textContent = "準備完了！ Startを押してリアルタイム認識をしよう！";
    var element = document.getElementById("spinner_div");
    element.classList.remove("spinner-border");
}

function getFont(canvas, fontSize, fontBase) {
    var ratio = fontSize / fontBase;
    var size = canvas.width * ratio;
    return (size | 0) + 'px bold sans-serif';
}

function reSize() {
    var element = document.getElementById("video");
    var width = element.videoWidth;
    var height = element.videoHeight;
    // console.log(width);
    // console.log(height);

    c.width = width;
    c.height = height;
}