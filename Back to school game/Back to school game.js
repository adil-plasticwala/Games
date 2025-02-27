const $ = (id) => document.getElementById(id);

var inter = 1500;
var score = 0;
var play_time = 0;
var posX;
var pl1,pl2,in1,in2

const items = [
    "https://imgur.com/RZFRee9.jpg",//ruler
    "https://imgur.com/RptF17b.jpg",//pens
    "https://imgur.com/tSUJCP7.jpg",//books
    "https://imgur.com/SzgGEDA.jpg",//lunch box
    "https://imgur.com/aiX94bo.jpg"//calculator
];

function go(event){
    posX=event.touches[0].clientX;
    $("backpack").style.left= posX - 40+"px";
}

function goPC(event){
    posX=event.clientX;
    $("backpack").style.left= posX - 40+"px";
}

window.onload=function(){
    $("game").style.height = "100%"
    setTimeout(function(){
        $("middle").style.opacity = '0';
    },2000)
    setTimeout(function(){
        $("middle").remove();
        $("game").style.opacity = "1";
        $("game").addEventListener("mousemove", goPC);
    $("game").addEventListener("touchmove", go);
    $("game").addEventListener("dblclick", buttons)
    pl1 = setInterval(createDropElement, inter -= 100);
    pl2 = setInterval(createDropElement, 5000);
    in1 = setInterval(dropElements,10);
    in2 = setInterval(playTime,1000);
    },3000);
}

//function for creating elements at random x position.
function createDropElement(){
    var el = document.createElement("div");
    $("game").appendChild(el);
    el.classList="dropElement";
    let left = Math.random()*innerWidth;
    while(left > innerWidth - 48){
        left = Math.random()*innerWidth;
    }
    el.style.left = left + "px";
    el.style.top = '-48px';
    el.style.background="url("+items[Math.floor(Math.random()*items.length)]+")";
    el.style.backgroundSize="cover";
    el.style.backgroundPosition="center";
}

//function for elements drop.
function dropElements(){
    for(let k = 0; k < document.getElementsByClassName("dropElement").length; k++){
        document.getElementsByClassName("dropElement")[k].style.top=parseInt(document.getElementsByClassName("dropElement")[k].style.top.slice(0,-2))+2 + "px";
       //collision
       if(document.getElementsByClassName("dropElement")[k].offsetTop > $("backpack").offsetTop - 20){
            if(document.getElementsByClassName("dropElement")[k].offsetLeft > $("backpack").offsetLeft- 5 && document.getElementsByClassName("dropElement")[k].offsetLeft < $('backpack').offsetLeft + $("backpack").offsetWidth + 5){
                document.getElementsByClassName("dropElement")[k].remove();
                writeScores();
            }
        }
        if(document.getElementsByClassName("dropElement")[k].offsetTop > innerHeight){
            document.getElementsByClassName("dropElement")[k].remove();
        }
    }
}

function writeScores(){
    score++;
    $("score").innerText = score + " points";
    school();
}

function playTime(){
    play_time++;
    $("playTime").innerText = play_time + " seconds";
}

function school(){
    if(score > 10) $("school").innerText = "Middle School";
    if(score > 30) $("school").innerText = "HighSchool";
    if(score > 70) $("school").innerText = "University";
    if(score > 100) $("school").innerText = "Master's degree";
    if(score > 150){
       $("school").innerText = "Ph. D";
       //alert("You have reached the highest education. You can continue if you want to, but at this point you are the smartest man alive.")
       /*clearInterval(pl1);
       clearInterval(pl2);
       clearInterval(in1);
       clearInterval(in2)*/
    }
    //if(score > 400) $("school").innerText = "Cheater";
}

function buttons(){
    if($("game").style.height == "calc(100% - 36px)"){
        $("game").style.height = "100%";
        $("buttons").style.bottom = "-36px"
    }
    else{
        $("game").style.height = "calc(100% - 36px)";
        $("buttons").style.bottom = "0"
    }
}

function buttonLeft(){
    if(posX > 0){
        posX-=20;
        $("backpack").style.left= posX - 24+"px";
    }
}
function buttonRight(){
    if(posX < innerWidth){
        posX+=20;
        $("backpack").style.left= posX - 24+"px";
    }
}

alert("IMPORTANT - READ ME\n\nThe goal of the game is to catch all the items falling, and pass trough school from 0 to Ph. D\n\nUse your finger/cursor to move the backpack, double click the screen to show the buttons for movement.");

