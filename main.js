let width= 640,
height= 0,
filter= "none",
streaming = false;

// DOM Elements
const video = document.querySelector("#video");
const canvas = document.querySelector("#canvas");
const photos = document.querySelector("#photos");
const photoButton = document.querySelector("#photo-button");
const clearButton = document.querySelector("#clear-button");
const photoFilter = document.querySelector("#photo-filter");
console.log(photoFilter);

//Get media stream
navigator.mediaDevices.getUserMedia({video: true, audio: false})
.then(function(stream){
    //Link to the video source
    video.srcObject = stream;
    //Play video
    video.onloadedmetadata = function(e) {
        video.play();
    };
})
.catch(function(err){
    console.log('Error: ' + err.name + "/" + err.message);
});

//Play when ready
video.addEventListener('canplay', function(e){
if(!streaming){
    //Set video/canvas height
    height = video.videoHeight /(video.videoWidth / width);
    video.setAttribute('width', width);
    video.setAttribute('height', height);
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

   streaming = true;
}
}, false);

//Photo filter change event
photoFilter.addEventListener('change', function(e){
//어떤 필터가 선택 되었는지 그 값을 가져온다. 더 간단한 방법은 없나?
console.log("test");
var obj = document.getElementsByName("filter");
var checked_index = -1;
console.log(""+obj.length);
console.log(filter);

for(var k = 0; k < obj.length; k++){
    if(obj[k].checked){
        checked_index = k;
        filter = obj[k].value;
    }
}


//이렇게 나온 필터의 값을 비디오 스타일에 적용
video.style.filter = filter;
//console.log(filter);
e.preventDefault();
});

//Clear button evnet
clearButton.addEventListener('click', function(e){
photos.innerHTML = "";
filter = 'none';
video.style.filter = filter;
document.querySelector("#normal").checked = true;
});

//Capture button click
photoButton.addEventListener('click', function(e){
takePicture();

e.preventDefault();
}, false);

function takePicture(){
const context = canvas.getContext('2d');
if(width && height){
    canvas.width = width;
    canvas.height = height;  
    //캔버스에 그리기
    context.drawImage(video, 0, 0, width, height);
    //캔버스로붙 실제 이미지를 가져오기
    const imgUrl = canvas.toDataURL('test.png');
    //엘리먼트를 만들고 가져온 이미지를 출력하기
    const img = document.createElement('img');
    img.setAttribute('src', imgUrl);
    img.style.filter = filter;
    //photos Div 안에 추가하기
    photos.appendChild(img);
}
}