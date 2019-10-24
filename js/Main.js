// JavaScript Document
var cFootball = (function() {
var canvas;
var stage;
// container
var gameCont=null,startCont;
var proT;
var loader;
var mbWidth=800;
//buttons

var distance;
var stWidth,stHeight;
var xspeed,yspeed;
var radians,degree,angle;
const TBS = 10;
const EPS = 2;
var isDone = false;
var isGame = false;
var isGoal = false;
var isDrag,isSet;
var backS,clickS,rightS,kickS,finishS,whistleS;
var Ball,Pball;
var gravity = 0.1;
var xfriction = 20;
var isMobile= false;
var isDive = false;
var playerCnc,playerPmc;
var cShooter;
var playerNo=1;
var currentNo=0;
var pShot = 0;
var btCnco,btMuch;
var bArrow;
var score =0;
var teamNo=2;
var scoreB,instrB;
var btInstr,btExit;
var shotT,powerT;
var pLabel,sMess;
var isSong = false;
var songBt;
var sptSrc;
function finit(){
	window.fbAsyncInit = function() {
    FB.init({
      appId      : '1689990887927942',
      xfbml      : true,
      version    : 'v2.5'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
	
}
function InitFootball(){
	canvas = document.getElementById("gamew");
	stage = new createjs.Stage(canvas);
	optimizeForTouchAndScreens();
	stage.enableMouseOver(10);
	canvas.style.width =  window.innerWidth+"px";
	//canvas.style.width =  "892px";
	stWidth = stage.canvas.width;
	stHeight = stage.canvas.height;
	
	proT = new createjs.Text("0","400 40px Futura","#000");
	stage.addChild(proT);
	proT.x = stWidth/2;
	proT.y = 300;
	
	if (createjs.Touch.isSupported() == true){ 
		isMobile=true;
		stage.addEventListener("pressmove",PreventScrollOnTouchDevice);
	}
	startManifest();
	startGame();
	//finit();
	
}



//loading assets
function startManifest(){	
	manifest = [
		{src:"images/back.png", id: "Gback"},
		
		{src:"images/startscr.png", id: "GStartScr"},
		{src:"images/instruction.png", id: "GInstr"},
		{src:"images/ball.png", id: "GBall"},
		{src:"images/arrow.png", id: "GArrow"},
		{src:"images/pmuch.png", id: "GPmuch"},
		{src:"images/cnco.png", id: "GCnco"},
		{src:"images/cnco_erick.png", id: "GCnc1"},
		{src:"images/cnco_joel.png", id: "GCnc2"},
		{src:"images/cnco_richard.png", id: "GCnc3"},
		{src:"images/cnco_zabdiel.png", id: "GCnc4"},
		{src:"images/cnco_christopher.png", id: "GCnc5"},
		
		{src:"images/cnco_erick_t.png", id: "GCnc1t"},
		{src:"images/cnco_joel_t.png", id: "GCnc2t"},
		{src:"images/cnco_richard_t.png", id: "GCnc3t"},
		{src:"images/cnco_zabdiel_t.png", id: "GCnc4t"},
		{src:"images/cnco_christopher_t.png", id: "GCnc5t"},
		
		{src:"images/cnco_goalkeeper_standing.png", id: "GCncKs"},
		{src:"images/cnco_goalkeeper_diving.png", id: "GCncKd"},
		{src:"images/ball_electricity.png", id: "GBall0"},
		{src:"images/ball_fire.png", id: "GBall1"},
		{src:"images/ball_ice.png", id: "GBall2"},
		{src:"images/pmc_austin.png", id: "GPmc1"},
		{src:"images/pmc_brandon.png", id: "GPmc2"},
		{src:"images/pmc_edwin.png", id: "GPmc3"},
		{src:"images/pmc_nick.png", id: "GPmc4"},
		{src:"images/pmc_zion.png", id: "GPmc5"},
		
		{src:"images/pmc_austin_t.png", id: "GPmc1t"},
		{src:"images/pmc_brandon_t.png", id: "GPmc2t"},
		{src:"images/pmc_edwin_t.png", id: "GPmc3t"},
		{src:"images/pmc_nick_t.png", id: "GPmc4t"},
		{src:"images/pmc_zion_t.png", id: "GPmc5t"},
		
		{src:"images/prettymuch_goalkeeper_standing.png", id: "GPmcKs"},
		{src:"images/prettymuch_goalkeeper_diving.png", id: "GPmcKd"},
		{src:"images/n0.png", id: "GNum0"},
		{src:"images/n1.png", id: "GNum1"},
		{src:"images/n2.png", id: "GNum2"},
		{src:"images/n3.png", id: "GNum3"},
		{src:"images/n4.png", id: "GNum4"},
		{src:"images/n5.png", id: "GNum5"},
		{src:"images/n6.png", id: "GNum6"},
		{src:"images/n7.png", id: "GNum7"},
		{src:"images/n8.png", id: "GNum8"},
		{src:"images/n9.png", id: "GNum9"},
		{src:"images/n10.png", id: "GNum10"},
		{src:"images/congratulations.png", id: "GCongrat"},
		{src:"images/trophy_bronze.png", id: "GTrophy1"},
		{src:"images/trophy_silver.png", id: "GTrophy2"},
		{src:"images/trophy_gold.png", id: "GTrophy3"},
		
		{src:"images/button_tryagain.png", id: "GTryagain"},
		{src:"images/button_share.png", id: "GShare"},
		{src:"images/button_prize.png", id: "GPrize"},
		{src:"images/button_prizelocked.png", id: "GPrizeLoc"},
		{src:"images/logo.png", id: "GLogo"},
		{src:"images/spotify_bt.png", id: "GSpLogo"},
		{src:"images/pmuch_logo.png", id: "GPLogo"},
		{src:"images/cnco_logo.png", id: "GCLogo"},
		
		{src:"images/button_i.png", id: "GInsbt"},
		{src:"images/button_x.png", id: "GExitbt"},
		
		{src:"images/closeone_text.png", id: "GMiss1"},
		{src:"images/unlucky_text.png", id: "GMiss2"},
		
		{src:"images/goal_text.png", id: "Ggoalt"},
		{src:"images/btlisten.png", id: "GListen"},
		
	];
	
	loader = new createjs.LoadQueue(false);
	loader.addEventListener("progress", handleProgress);
	loader.addEventListener("complete", handleComplete);
	loader.loadManifest(manifest, true);	
}


function handleProgress(e){
	var progresPrecentage = Math.round(loader.progress*100);
	proT.text = String(progresPrecentage+"%");
	if(progresPrecentage >= 100){
		e.target.removeEventListener("progress", handleProgress);
	}
	
	
}
function optimizeForTouchAndScreens (){
	if (createjs.Touch.isSupported()) {
		createjs.Touch.enable(stage,false,true);
		stage.preventSelection = false;
	}
}


//assets loaded
function handleComplete(e){
	e.target.removeEventListener("complete", handleComplete);
	
	stage.removeChild(proT);
	
	loadGameSound();
	showSplashScr();
	
	
}

// shows the start screen
function loadGameSound(){
	//load sound
	
	try {
		backS = new Howl({
		src: ['sounds/backs.ogg','sounds/backs.mp3'],
				autoplay: false,
				loop: true,
				volume: 0.1,
				onend: function() {
						//console.log('Finished!');
				//	sound.stop();
				}
			});
	} catch(e) {
		//Error while loading sounds
	}	
	rightS = new Howl({
      src: ['sounds/right.ogg','sounds/right.mp3']
    });
	
	clickS = new Howl({
      src: ['sounds/click.ogg','sounds/click.mp3']
    });
	whistleS= new Howl({
      src: ['sounds/whistle.ogg','sounds/whistle.mp3']
    });
	
	kickS= new Howl({
      src: ['sounds/kick.ogg','sounds/kick.mp3']
    });
	
	finishS= new Howl({
      src: ['sounds/success.ogg','sounds/success.mp3']
    });
	
}
function showSplashScr(){
	isDrag = false;
	isSet = false;
	startCont = new createjs.Container();
	var logo = addBmp("GLogo",stWidth/2,1000,true);
	startCont.addChild(logo);
	stage.addChild(startCont);
	yTweenEl(logo,300,0);
	setTimeout(showStartScreen,3000);

}
function showStartScreen(){
	stage.removeChild(startCont);
	startCont = new createjs.Container();
		// background
 	var gBack = addBmp("GStartScr",0,0,false);
	startCont.addChild(gBack);
	
	stage.addChild(startCont);
	
	var stitle = new createjs.Text("CHOOSE\nYOUR TEAM","50px Kenyanbd","#fff");
	stitle.lineHeight = 60;
	
	startCont.addChild(stitle);
	stitle.textAlign ="center";
	stitle.x = stWidth/2;
	stitle.y = 50;
	
	btCnco = new createjs.Container();
	var sbox = boxMakerb(400,200,"#000");
	sbox.alpha = 0.01;
	btCnco.addChild(sbox);
	var cbmp =  addBmp("GCLogo",0,0,false);
	btCnco.addChild(cbmp);
	startCont.addChild(btCnco);
	btCnco.regX = cbmp.image.width/2;
	btCnco.regY = cbmp.image.height/2;
	btCnco.x = stWidth/2;
	btCnco.y = 640;
	btCnco.cursor = "pointer";
	btCnco.addEventListener("click",gameIni);
	btCnco.teamNo =2;
	btCnco.mouseChildren = false;
	
	var vtitle = new createjs.Text("VS","50px Kenyanrg","#fff");
	
	startCont.addChild(vtitle);
	vtitle.textAlign ="center";
	vtitle.x = stWidth/2;
	vtitle.y = 450;
	
	btMuch = new createjs.Container();
	var sbox = boxMakerb(600,100,"#000");
	sbox.alpha = 0.01;
	btMuch.addChild(sbox);
	var pbmp =  addBmp("GPLogo",0,0,false);
	btMuch.addChild(pbmp);
	startCont.addChild(btMuch);
	btMuch.regX = pbmp.image.width/2;
	btMuch.regY = pbmp.image.height/2;
	btMuch.x = stWidth/2;
	btMuch.y =300;
	btMuch.cursor = "pointer";
	btMuch.addEventListener("click",gameIni);
	btMuch.teamNo =1;
	btMuch.mouseChildren = false;
	
	
	
}

// initiates game play
function gameIni(e){
	if (typeof clickS !== "undefined") clickS.play();
	btMuch.removeEventListener("click",gameIni);
	btCnco.removeEventListener("click",gameIni);
	
	teamNo = parseInt(e.target.teamNo);
	stage.removeAllChildren();
	isGame = false;
	gameCont = new createjs.Container();
		// background
	if(teamNo == 1){
		sptSrc = String("https://open.spotify.com/embed/user/prettymuch_official/playlist/03a1rgPKeqmieV4JK33r5C");
	}else{
		sptSrc = String("https://open.spotify.com/embed/user/cncoofficial/playlist/60jsUsQtEVP29VjMIEzwCD");
	}
	var bname = "Gback";
	
 	var gBack = addBmp(bname,0,0,false);
	gameCont.addChild(gBack);
	
	stage.addChild(gameCont);
	
	
	addTheBall(gameCont);
	
	
	bArrow = addBmp("GArrow",0,0,true);
	bArrow.scaleY = -1;
	gameCont.addChild(bArrow);
	bArrow.alpha = 0;
	bArrow.x =  stWidth/2;
	bArrow.y =  650;
	powerT = new createjs.Text("0","30px Futura","#000");
	gameCont.addChild(powerT);
	powerT.textAlign = "center";
	powerT.x =  stWidth/2;
	powerT.y =  650;
	powerT.alpha = 0;
	addPlayer();
	
	scoreB = addBmp("GNum0",50,40,false);
	gameCont.addChild(scoreB);
	
	shotT = new createjs.Text("Shot 1","40px Kenyanbd","#fff");
	gameCont.addChild(shotT);
	shotT.textAlign = "center";
	shotT.y = 20;
	shotT.x = stWidth/2;
	shotT.alpha = 1;
	
	
	instrB =  addBmp("GInstr",stWidth/2,450,true);
	stage.addChild(instrB);
	instrB.alpha = 0;
	
	btInstr = addBmp("GInsbt",stWidth-182,0,false);
	gameCont.addChild(btInstr);
	btInstr.addEventListener("click", showInstr);
	btInstr.cursor = "pointer";
	btExit = addBmp("GExitbt",stWidth-100,0,false);
	gameCont.addChild(btExit);
	btExit.addEventListener("click", exitGame);
	btExit.cursor = "pointer";
	
	instrB.addEventListener("click", hideInfoWin);
	
	songBt = addBmp("GSpLogo",stWidth/2,550,true);
	gameCont.addChild(songBt);
	songBt.cursor = "pointer";
	songBt.addEventListener("click",playSongb);
	
}

function playSongb(e){
songBt.alpha = 0;

isSong = true;
//if (typeof backS !== "undefined") backS.play();
var ifr = document.getElementById("aframe");
ifr.style.display = "block";
ifr.src= sptSrc;


}
function hideInfoWin(e){
instrB.alpha = 0;
if(!isGame){
	ballStart(Ball,300,600,stWidth/2,300,500,750,0);
	if (typeof whistleS !== "undefined")whistleS.play();
	isGame = true;
}

}
function showInstr(e){
if(instrB.alpha == 0){
	instrB.alpha = 1;
	setTimeout(hideInstr,5000);
}

}
function hideInstr(){
	instrB.alpha = 0;
	if(!isGame){
		ballStart(Ball,300,600,stWidth/2,300,500,750,0);
		if (typeof whistleS !== "undefined")whistleS.play();
		isGame = true;
	}
}
function exitGame(){
	window.close();

}
function addPlayer(){
if(teamNo == 1){
		makePlayerCnc(playerNo);
		playerCnc.x = stWidth/2;
		playerCnc.iniX = playerCnc.x;
	
		gameCont.addChild(playerCnc);
		playerCnc.y = 400;
		playerCnc.iniY = playerCnc.y;
		
		var hname = String("GPmc"+playerNo);
		cShooter = addBmp(hname,stWidth/2-350,800,true);
		gameCont.addChild(cShooter);
		
		hname = String("GPmc"+playerNo+"t");
		pLabel = addBmp(hname,cShooter.x+110,800,true);
		gameCont.addChild(pLabel);
		
		
	
	}else{
		makePlayerPmc(playerNo);
		playerPmc.x = stWidth/2;
		playerPmc.iniX = playerPmc.x;
	
		gameCont.addChild(playerPmc);
		playerPmc.y = 400;
		playerPmc.iniY = playerPmc.y;
		
		var hname = String("GCnc"+playerNo);
		cShooter = addBmp(hname,stWidth/2-350,800,true);
		gameCont.addChild(cShooter);
		
		hname = String("GCnc"+playerNo+"t");
		pLabel = addBmp(hname,cShooter.x+110,800,true);
		gameCont.addChild(pLabel);
	}
	

}
function startDrag(e){
isDrag = true;
if(e.currentTarget.y > 600){

e.currentTarget.set({
      x: e.stageX,
      y: e.stageY
   	 });
	 bArrow.alpha = 1;
	 powerT.alpha = 1;
	// radians = getAngle (Ball.iniX, Ball.iniY, Ball.x, Ball.y);
	distance =getDistance(Ball.x,Ball.y,Ball.iniX,Ball.iniY);
	powerT.text = String(distance);
	angle = (Math.atan2(bArrow.x - Ball.x, bArrow.y - Ball.y) * 180 / Math.PI);
	bArrow.rotation = -angle;
	Pball.rotation = -angle;
	 
}else{
	e.currentTarget.y = 600;
}
}
function stopDrag(e){
	if(isDrag){
	isDrag = false;
	isDive = true;
	radians = getAngle (Ball.iniX, Ball.iniY, Ball.x, Ball.y);
	distance =getDistance(Ball.x,Ball.y,Ball.iniX,Ball.iniY);
	
	
	isSet = true;
	Ball.alpha = 0;
	Pball.alpha =1;
	
//	bArrow.rotation = degree;
	bArrow.alpha = 0;
	powerT.alpha =0;
	powerT.text = String("0");
	pShot++;
	currentNo++;
	if (typeof kickS !== "undefined")kickS.play();
	}
}
function getAngle (x1, y1, x2, y2){
    var dx = x2 - x1;
    var dy = y2 - y1;
    degree = Math.atan2(dy,dx) * 180/Math.PI;
	
	var radiansb = degree * Math.PI / 180;
	
    return radiansb;

}

function moveTheBall(){
xspeed = Math.round(Math.cos(radians) * (distance/4));
	yspeed = Math.round(Math.sin(radians) * (distance/4));

Ball.y -= yspeed;
var sfactor = (distance/5000);
if(Ball.scaleX >= 0.5){
	Ball.scaleX -= sfactor;
	Ball.scaleY -= sfactor;
}


if(degree <= 60  || degree >= 120){


	
}

Ball.x -= xspeed;
Pball.x = Ball.x;
Pball.y = Ball.y;
Pball.scaleX = Ball.scaleX;
Pball.scaleY = (Ball.scaleY)*(-1);


if(degree >= 85 && degree <= 95){
	isDive =false;
	isGoal = false;
	gameCont.setChildIndex(Pball,gameCont.numChildren-1);
}else{
	isGoal = true;
	
}
if(Ball.y <= 550 && Ball.y > 200){
	if(Ball.x >= stWidth/2-280 && Ball.x <= stWidth/2+280){
		
		if(isDive){
			
			divePlayer();
			
		}
		
		if(Ball.y <= 250){
			isSet = false;
			if(isGoal){
				score++;
				var gText = addBmp("Ggoalt",0,0,true);
				gameCont.addChild(gText);
			
				gText.x = stWidth/2;
				gText.y = 400;
				gText.name = "goalmess";
				if (typeof rightS !== "undefined") rightS.play();
			}else{
				var srand = Math.floor(Math.random()*2)+1;
				var hname = String("GMiss"+srand);
				sMess = addBmp(hname,stWidth/2,400,true);
				gameCont.addChild(sMess);
				
			}
			setTimeout(resetScene,2000);
	
		}
	}
	
	
}


if(Ball.y < -200 || Ball.y > 1000 || Ball.x < -200 || Ball.x > stWidth+200){
	isSet = false;
	srand = Math.floor(Math.random()*2)+1;
	hname = String("GMiss"+srand);
	sMess = addBmp(hname,stWidth/2,400,true);
	gameCont.addChild(sMess);
	setTimeout(resetScene,2000);

}

}

function divePlayer(){
	isDive = false;
	if(teamNo == 2){
		var sdive =  playerPmc.getChildByName("playerdive");
		sdive.alpha = 1;
		
		var snor =  playerPmc.getChildByName("playernor");
		snor.alpha = 0;
		
		playerPmc.scaleX = playerPmc.scaleY = 0.8;
		var srand = Math.floor(Math.random()*2);
		//srand =0;
		if(srand == 0){
			playerDiveT(playerPmc,900,1000,1200,220,320,500,25,50,90,0);
		}else{
		
			playerDiveT(playerPmc,800,700,600,220,320,500,-25,-50,-90,0);
		}
		
		
		
	}
	if(teamNo == 1){
		var sdive =  playerCnc.getChildByName("playerdive");
		sdive.alpha = 1;
		
		var snor =  playerCnc.getChildByName("playernor");
		snor.alpha = 0;
		
		playerCnc.scaleX = playerCnc.scaleY = 0.8;
		var srand = Math.floor(Math.random()*2);
		//srand =0;
		if(srand == 0){
			playerDiveT(playerCnc,900,1000,1200,220,320,500,25,50,90,0);
		}else{
		
			playerDiveT(playerCnc,800,700,600,220,320,500,-25,-50,-90,0);
		}
		
	}
			
}
function resetScene(){
	//gameCont.setChildIndex(playerCnc,gameCont.numChildren-1);
	gameCont.removeChild(sMess);
	gameCont.removeChild(cShooter);
	gameCont.removeChild(pLabel);
	xfriction=20;
	if(isGoal){
		gameCont.removeChild(gameCont.getChildByName("goalmess"));
	}
	isGoal = false;
	if(pShot < EPS ){
		resetPlayer();
	}else{
	
		if(currentNo >= TBS){
			gameOver();
			return;
		}
		pShot = 0;
		playerNo++;
		
		resetPlayer();
	}
		resetBall();
	shotT.text = String("Shot "+(currentNo+1));
	var sname =String("GNum"+score);
	gameCont.removeChild(scoreB);
	scoreB = addBmp(sname,60,50,false);
	gameCont.addChild(scoreB);
}
function resetBall(){
isDive = true;
	Ball.scaleX = Ball.scaleY = 1;
	Ball.x = -200;
	Ball.y = 200;
	ballStart(Ball,300,600,stWidth/2,300,500,750,0);
	Pball.alpha =0;
	Ball.alpha =1;
	gameCont.removeChild(Pball);
	
	var srand = Math.floor(Math.random()*3);
	
	var sname = String("GBall"+srand);
	Pball = addBmp(sname,Ball.x,Ball.y,true);
	gameCont.addChild(Pball);
	Pball.alpha = 0;
	if (typeof whistleS !== "undefined")whistleS.play();
}
function resetPlayer(){

	if(teamNo == 2){
		gameCont.removeChild(playerPmc);
		addPlayer();
		
	}
	if(teamNo == 1){
		gameCont.removeChild(playerCnc);
		addPlayer();
		
	}

}
function addTheBall(tCont){
	Ball =  addBmp("GBall",0,0,true);
	tCont.addChild(Ball);
	Ball.x = -60;
	Ball.y = 200;
	Ball.addEventListener("pressmove", startDrag);
	Ball.addEventListener("pressup", stopDrag);
	Ball.iniX = stWidth/2;
	Ball.iniY = 750;
	
	var srand = Math.floor(Math.random()*3);
	
	var sname = String("GBall"+srand);
	Pball = addBmp(sname,Ball.x,Ball.y,true);
	tCont.addChild(Pball);
	Pball.alpha = 0;
	Pball.scaleY = -1;
}

function makePlayerCnc(pNo){
	playerCnc = new createjs.Container();
	var bnor = addBmp("GCncKs",0,0,true);
	playerCnc.addChild(bnor);
	bnor.name = "playernor";
	bnor.alpha = 1;
	var bdive = addBmp("GCncKd",5,-35,true);
	playerCnc.addChild(bdive);
	bdive.alpha =0;
	bdive.name = "playerdive";
	var hname = String("GCnc"+pNo);
	var bhead = addBmp(hname,0,-115,true);
	playerCnc.addChild(bhead);
	
	

}
function makePlayerPmc(pNo){
	playerPmc = new createjs.Container();
	var bnor = addBmp("GPmcKs",0,0,true);
	playerPmc.addChild(bnor);
	bnor.name = "playernor";
	bnor.alpha = 1;
	var bdive = addBmp("GPmcKd",5,-35,true);
	playerPmc.addChild(bdive);
	bdive.alpha =0;
	bdive.name = "playerdive";
	var hname = String("GPmc"+pNo);
	var bhead = addBmp(hname,0,-115,true);
	playerPmc.addChild(bhead);

}


//prevent browser scrolling on touch device (while dragging items or mouseY < 700)
function PreventScrollOnTouchDevice(e) {
	if (isDone == false && (e.target.name !== null || (e.target.name == null && e.rawY > 700))) {
		e && e.nativeEvent && e.nativeEvent.preventDefault && e.nativeEvent.preventDefault();
		e.preventDefault();
	}
}


function startGame(){
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick",updateGame);
	
}

function updateGame(e){	
	if(isDrag == false && isSet == true){
		moveTheBall();
	}
	stage.update();	
}
function getDistance(newX,newY,targetX,targetY){
	var dx =newX-targetX;
	var dy =newY-targetY;
	var dist = Math.sqrt(dx*dx + dy*dy);
	return parseInt(dist);
			
}

function gameOver(){
	if (typeof finishS !== "undefined") finishS.play();
	Ball.removeEventListener("pressmove", startDrag);
	Ball.removeEventListener("pressup", stopDrag);
	btExit.removeEventListener("click", exitGame);
	instrB.removeEventListener("click", hideInfoWin);
	btInstr.removeEventListener("click", showInstr);
	songBt.removeEventListener("click",playSongb);
	stage.removeChild(instrB);
	stage.removeChild(gameCont);
	
	isDrag = false;
	isSet = false;
	startCont = new createjs.Container();
		// background
 	var gBack = addBmp("GStartScr",0,0,false);
	startCont.addChild(gBack);
	
	stage.addChild(startCont);
	
	var congB = addBmp("GCongrat",0,0,true);
	startCont.addChild(congB);
	congB.x = stWidth/2;
	congB.y = 160;
	
	var sname="";
	var pArray = new Array();
	if(score <= 5){
		sname = String("GTrophy1");
		pArray = new Array(1,0,0);
	}
	if(score > 5 && score <= 8){
		sname = String("GTrophy2");
		pArray = new Array(1,1,0);
	}
	if(score > 8){
		sname = String("GTrophy3");
		pArray = new Array(1,1,1);
	}
	
	var trophy = addBmp(sname,0,0,true);
	trophy.x = stWidth/2;
	trophy.y = 410;
	startCont.addChild(trophy);
	
	var btAgain = addBmp("GTryagain",0,0,true);
	btAgain.x = stWidth/2;
	btAgain.y = trophy.y+240;
	startCont.addChild(btAgain);
	btAgain.addEventListener("click", playAgain);
	btAgain.cursor = "pointer";
	var btShare = addBmp("GShare",0,0,true);
	btShare.x = stWidth/2;
	btShare.y = btAgain.y+70;
	startCont.addChild(btShare);
	btShare.addEventListener("click", shareScore);
	btShare.cursor = "pointer";
	
	var btListen = addBmp("GListen",0,0,true);
	btListen.x = stWidth/2;
	btListen.y = btShare.y+70;
	startCont.addChild(btListen);
	btListen.addEventListener("click", listenToMusic);
	btListen.cursor = "pointer";
	
	var xoff = stWidth/2-400;
	for(var i=0;i<pArray.length;i++){
		var s = pArray[i];
		if(s == 1){
			var btPrize = addBmp("GPrize",0,0, true);
			btPrize.type = "prize";
			btPrize.cursor = "pointer";
			btPrize.addEventListener("click", claimPrize);
			
		}else{
			btPrize = addBmp("GPrizeLoc",0,0, true);
			btPrize.type = "lock";
		
		}
		btPrize.pindex = i;
		btPrize.y = btListen.y+70;
		startCont.addChild(btPrize);
		if(i== 1){
			btPrize.x = stWidth/2;
		
		}
		if(i== 0){
			btPrize.x = stWidth/2-(btPrize.image.width+10);
		
		}
		if(i== 2){
			btPrize.x = stWidth/2+(btPrize.image.width+10);
		
		}
		
	}
	btExit = addBmp("GExitbt",stWidth-100,0,false);
	startCont.addChild(btExit);
	btExit.addEventListener("click", exitGame);
	btExit.cursor = "pointer";
	
}
function listenToMusic(e){
if (typeof clickS !== "undefined") clickS.play();
window.location.href="http://smarturl.it/PMxCNCO-MeNecesita";
}
function shareScore(e){
if (typeof clickS !== "undefined") clickS.play();
shareFb();

}
function claimPrize(e){
if (typeof clickS !== "undefined") clickS.play();
if(e.target.pindex == 0){
	window.open( "prizes/PrizeOne.jpg", 'Prize1' );
	//window.location.href="prizes/PrizeOne.jpg";

}
if(e.target.pindex == 1){
	window.open( "prizes/PrizeTwo.mp4", 'Prize2' );
	// window.location.href="prizes/PrizeTwo.mp4";

}
if(e.target.pindex == 2){
	window.open( "prizes/whatsapp.mp4", 'Prize3' );
	// window.location.href="prizes/whatsapp.mp4";

}
}
function playAgain(e){
	if (typeof clickS !== "undefined") clickS.play();
	e.target.removeEventListener("click", playAgain);
	location.reload();

}
function shareFb(){
if(teamNo == 1){
var teamname = String("PRETTYMUCH");
}else{
teamname = String("CNCO");
}
var smess =  String("WOW! I just played as" );
smess += String(teamname +" and scored "+score);
smess += " on the 'Me Necesita' Shoot Out. Go check it out and see how many you can score!";

//window.location.href = "https://www.facebook.com/sharer/sharer.php?u=http://anamulweb.epizy.com/game/footballc/index.html&t=TITLE";


	FB.init(
{
//replace the following app id with your app id
    appId : '403145583959343'
});

FB.ui(
{
    method: 'share',
    picture: '',
    name: smess,
	//replace the following  url link with your game url
    link: 'http://anamulweb.epizy.com/game/footballn/index.html',
	href: 'http://anamulweb.epizy.com/game/footballn/index.html',
    caption: smess,
    description: 'Football game',
    message: smess
});
}
function alphaTween(target,t,wts){
	createjs.Tween.get(target,{loop:true}).wait(wts).to({alpha:t},1000,createjs.Ease.None);
}

function yTween(target,ty,wts){
	createjs.Tween.get(target).wait(wts).to({y:ty},500,createjs.Ease.linear);
	
}
function xTween(target,tx,wts){
	createjs.Tween.get(target).wait(wts).to({x:tx},2000,createjs.Ease.quadIn);
	
}

function ballStart(target,tx,tx1,tx2,ty,ty1,ty2,wts){
	createjs.Tween.get(target).wait(wts).to({x:tx,y:ty},300,createjs.Ease.None).to({x:tx1,y:ty1},300,createjs.Ease.None).to({x:tx2,y:ty2},200,createjs.Ease.None);
	
}
function playerDiveT(target,tx,tx1,tx2,ty,ty1,ty2,tr1,tr2,tr3,wts){
	createjs.Tween.get(target).wait(wts).to({x:tx,y:ty,rotation:tr1},200,createjs.Ease.None).to({x:tx1,y:ty1,rotation:tr2},200,createjs.Ease.None).to({x:tx2,y:ty2,rotation:tr3},200,createjs.Ease.None);

}

function zoomInOut(target,sx1,sy1,sx2,sy2,wts){
	createjs.Tween.get(target).wait(wts).to({scaleX:sx1,scaleY:sy1},500,createjs.Ease.None).to({scaleX:sx2,scaleY:sy2},500,createjs.Ease.None).call(zoomDone);
	
}
function zoomDone(e){
	
}


function addBmp(bname,tx,ty,isR){
	var bmp = new createjs.Bitmap(loader.getResult(bname));
	if(isR){
		bmp.regX =bmp.image.width/2;
		bmp.regY = bmp.image.height/2;
	}
	bmp.y = ty;
	bmp.x = tx;
	return bmp;
	
}

function boxMaker(wdt,h,color){
	var shape = new createjs.Shape();
	shape.graphics.beginStroke("#000");
	shape.graphics.setStrokeStyle(2);
 	shape.graphics.beginFill(color).drawRect(0,0,wdt,h);
	
	return shape;
	
	
}

function boxMakerb(wdt,h,color){
	var shape = new createjs.Shape();
 	shape.graphics.beginFill(color).drawRect(0,0,wdt,h);
	return shape;
	
}
function yTweenEl(target,ty){
	createjs.Tween.get(target).to({y:ty},2000,createjs.Ease.elasticOut);
}

//docReady function, John Friend, https://github.com/jfriend00/docReady
(function(g,b){function c(){if(!e){e=!0;for(var a=0;a<d.length;a++)d[a].fn.call(window,d[a].ctx);d=[]}}function h(){"complete"===document.readyState&&c()}b=b||window;var d=[],e=!1,f=!1;b[g||"docReady"]=function(a,b){if("function"!==typeof a)throw new TypeError("callback for docReady(fn) must be a function");e?setTimeout(function(){a(b)},1):(d.push({fn:a,ctx:b}),"complete"===document.readyState||!document.attachEvent&&"interactive"===document.readyState?setTimeout(c,1):f||(document.addEventListener?
(document.addEventListener("DOMContentLoaded",c,!1),window.addEventListener("load",c,!1)):(document.attachEvent("onreadystatechange",h),window.attachEvent("onload",c)),f=!0))}})("docReady",window);
 
var CanvasAspectRatio;
function reSizeHandler(){
		var canvasElement = document.getElementById('gamew');
		var canvasConteinerElement = document.getElementById('mainb');
		
		//storing intitial canvas aspect ratio
    if (typeof CanvasAspectRatio === "undefined") {			
			CanvasAspectRatio = canvasElement.height / canvasElement.width;
		}
		
		//get conteiner width and calcul canvas style height
    var canvasConteinerStyle = getComputedStyle(canvasConteinerElement);
		var NewHeight = parseInt(canvasConteinerStyle.width) * CanvasAspectRatio;
		//if canvas height > window height	
		if (NewHeight > window.innerHeight && !window.matchMedia("(min-width:1024px)").matches) {  
			NewHeight = window.innerHeight;
		} 

		//set canvas height and width
		canvasElement.style.width = Math.floor(parseInt(NewHeight) / CanvasAspectRatio) + 'px';
	  canvasElement.style.height = Math.floor(NewHeight) + 'px';
}


//when document Ready, resize and init game
 docReady(function() {
		reSizeHandler();
		InitFootball();
	
	window.addEventListener("resize", function() {
		reSizeHandler();	 
	});
	
	//orientation change: auto scroll to game top
	window.addEventListener('orientationchange', function() {	
			window.setTimeout(function() {
					document.getElementById('mainb').scrollIntoView(true);
				}, 350);						
		});
		
	//disable scroll event on '#NoTouchMoveDiv' DIV
	var NoTouchMoveDiv = document.getElementById('NoTouchMoveDiv');
	NoTouchMoveDiv.addEventListener('touchmove', function(e) {
						e.preventDefault();
		}, false);
		
});

//end document
})();