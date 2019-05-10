var td = new Array(); //保存每个格子的地鼠？？？？？？？？？？？
var playing = false; //游戏是否开始
var score = 0; //分数
var beat = 0; //鼠标点击次数
var success = 0; //命中率
var knock = 0; //鼠标点中老鼠图片次数
var countDown = 30; //倒计时
var interId = null, // 指定setInterval()的变量
    timeId = null; //指定setTimeout()的变量，NULL是什么变量？？？？？？

//游戏开始
function GameStart(){
    playing = true;
    interId = setInterval("show()",1000);//每一秒循环显示一次老鼠图片
    document.form1.score.value = score;//指定方式需要熟悉，如何用JS更改文档流信息？Input Text value 属性√
    document.form1.success.value = success;
    timeShow();
}

//随机循环显示老鼠图片
function show(){
    if(playing)//if的语法是什么？？？？？？
    {
        var current = Math.floor(Math.random()*25);
        //设置格子随机，图片随机
        document.getElementById("td["+current+"]").innerHTML = '<img src="img/mouse.png">';
        //删除内容，设置 innerHTML 的值可以让你轻松地将当前元素的内容替换为新的内容↓
        setTimeout("document.getElementById('td["+current+"]').innerHTML=''",3000);
        //为什么不是getElementById("td[current]")???????
    }
}

//显示当前倒计时所剩时间
function timeShow(){
    document.form1.remtime.value = countDown;
    if(countDown == 0)
        {
            GameOver();
            return;//return 语句会终止函数的执行并返回函数的值
        }
    else
        {
            countDown = countDown-1;
            timeId = setTimeout("timeShow()",1000);
        }
}

//点击事件函数，判断是否点中老鼠
function hit(id){
    if(playing==false)
    {
        alert("请点击开始游戏");
        return;
    }
    else
    {	
         beat += 1;
        if(document.getElementById("td["+id+"]").innerHTML!="")
        {
            score += 1;
            knock += 1;
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

//主动停止所有时间
function timeStop(){
    clearInterval(interId);//clearInterval()方法返回setInterval()方法的id
    clearTimeout(timeId);//clearTime()方法返回setTimeout()的id
}

//清除所有老鼠图片
function clearMouse(){
    for(var i=0;i<=24;i++)
    {
        document.getElementById("td["+i+"]").innerHTML="";
    }
}

// 游戏结束
function GameOver(){
    timeStop();
    playing = false;
    clearMouse();
    alert("游戏结束！\n你获得的分数为："+score+"\n命中率为："+success);
    score = 0;
    beat = 0;
    success = 0;
    knock = 0;
    countDown = 30;
}