var td = new Array();
var playing = false;
var score = 0;
var beat = 0;
var success = 0;
var knock = 0;
var countDown = 30;
var interId = null,
    timeId = null;

function GameOver(){
    timeStop();
    playing = false;
    clearMouse();
    alert("游戏结束！\n你获得的分数为："+score+"\n命中率为："+success);
    success = 0;
    score = 0;
    knock = 0;
    beat = 0;
    countDown = 30;
}
    
function timeShow(){
    document.form1.remtime.value = countDown;
    if(countDown == 0)
        {
            GameOver();
            return;
        }
    else
        {
            countDown = countDown-1;
            timeId = setTimeout("timeShow()",1000);
        }
}

function timeStop(){
    clearInterval(interId);//clearInterval()方法返回setInterval()方法的id
    clearTimeout(timeId);//clearTime()方法返回setTimeout()的id
}
    
function show(){
    if(playing)
    {
        var current = Math.floor(Math.random()*25);
        document.getElementById("td["+current+"]").innerHTML = '<img src="img/mouse.png">';
        setTimeout("document.getElementById('td["+current+"]').innerHTML=''",3000);
    }
}

function clearMouse(){
    for(var i=0;i<=24;i++)
    {
        document.getElementById("td["+i+"]").innerHTML="";
    }
}

function hit(id){
    if(playing==false)
    {
        alert("请点击开始游戏");
        return;
    }
    else
    {	
         beat +=1;
        if(document.getElementById("td["+id+"]").innerHTML!="")
        {
            score += 1;
            knock +=1;
            success = knock/beat;
            document.form1.success.value = success;
            document.form1.score.value = score;
            document.getElementById("td["+id+"]").innerHTML="";
        }
        else
        {
            score += -1;
            success = knock/beat;
            document.form1.success.value = success;
            document.form1.score.value = score;
        }
    }
}

function GameStart(){
    playing = true;
    interId = setInterval("show()",1000);
    document.form1.score.value = score;
    document.form1.success.value = success;
    timeShow();
}
