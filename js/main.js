var can=document.getElementById("can"),
	ctx=can.getContext("2d"),
	stage=new createjs.Stage(can),
	//loading页元素
	loadSrc=["./Image/boy.png","./Image/QixiA.jpg","./Image/QixiB-dark.png","./Image/QixiC.png","./Image/sun.png","./Image/cloud1.png",
	"./Image/cloud2.png","./Image/door-left.png","./Image/door-right.png","./Image/girl.png",
	"./Image/water1.png","./Image/water2.png","./Image/water3.png","./Image/water4.png","./Image/stars.png"
	],
	imgList=[],
	rateX=document.documentElement.clientWidth/720,
	rateY=document.documentElement.clientHeight/901;
// 初始化入口
init();

function init(){		
	var num=0;
	for(var i=0;i<loadSrc.length;i++){
		var img=new Image();
		img.src=loadSrc[i];
		imgList.push(img);
		img.onload=function(){
			num++;
			if(num==loadSrc.length){
				loading();
			}
		}
	}
}	
	
//loading页面
function loading(){
	can.width=document.documentElement.clientWidth;
	can.height=document.documentElement.clientHeight;
	var bgW=can.width/1441,bgH=can.height/901,
		bgContainer=new createjs.Container(),
		flowerContainer=new createjs.Container(),
		bg1=drawImage(imgList[0],0,0,bgContainer),
		bg2=drawImage(imgList[1],can.width*2,0,bgContainer),
		door_l=drawImage(imgList[6],can.width*3.0448,can.height*0.4815,bgContainer),
		door_r=drawImage(imgList[7],can.width*3.308,can.height*0.4815,bgContainer),
		bg3=drawImage(imgList[2],can.width*4,0,bgContainer);
		door_r.regX=100;
		door_l.scaleY*=0.92;
		door_r.scaleY*=0.92;
		bgContainer.addChild(door_l);
		bgContainer.addChild(door_r);
	stage.addChild(bgContainer);
//男孩场景一走路部分
var charactorSheet=new createjs.SpriteSheet({
	"images":["./Image/boy.png"],
	"frames":[
				[0,291,151,291],
				[0,291,151,291],
				[0,291,151,291],
				[0,291,151,291],
				[602,0,151,291],
				[602,0,151,291],
				[602,0,151,291],
				[602,0,151,291],
				[302,291,151,291],
				[302,291,151,291],
				[302,291,151,291],
				[302,291,151,291],
				[151,291,151,291],
				[151,291,151,291],
				[151,291,151,291],
				[151,291,151,291],
			 ]
});
//男孩定位部分
  charactor  = new createjs.Sprite(charactorSheet);
  charactor.x = 0;
  charactor.y = can.height*0.5;
  charactor.scaleX=rateX;
  charactor.scaleY=rateY;

  stage.addChild(charactor);
  charactor.play();
  stage.update();

//太阳定位
var sun=drawImage(imgList[3],can.width/2,0);
  stage.addChild(sun);
//白云定位
var cloud1=drawImage(imgList[4],0,can.height*0.1);
  stage.addChild(cloud1);
var cloud2=drawImage(imgList[5],can.width*0.7,can.height*0.1);
  stage.addChild(cloud2);
//水波
var water1=drawImage(imgList[9],can.width*1.1,can.height*0.9);
var water2=drawImage(imgList[10],can.width,can.height*0.92);
var water3=drawImage(imgList[11],can.width,can.height*0.94);
var water4=drawImage(imgList[12],can.width,can.height*0.86);
//星星
var star1=drawImage(imgList[13],can.width*4.77,can.height*0.1,bgContainer);
var star2=drawImage(imgList[13],can.width*4.70,can.height*0.05,bgContainer);
var star3=drawImage(imgList[13],can.width*4.65,can.height*0.2,bgContainer);
var star4=drawImage(imgList[13],can.width*5.27,can.height*0.1,bgContainer);
var star5=drawImage(imgList[13],can.width*5.20,can.height*0.05,bgContainer);
var star6=drawImage(imgList[13],can.width*5.24,can.height*0.18,bgContainer);
//创建鸟的帧动画
var birdSheet=new createjs.SpriteSheet({
	"images":["./Image/bird.png"],
	'frames':[ [0,0,91,71],
			   [0,0,91,71],
			   [0,0,91,71],
			   [0,0,91,71],
			   [91,0,91,71],
			   [91,0,91,71],
			   [91,0,91,71],
			   [91,0,91,71],
			   [182,0,91,71],
			   [182,0,91,71],
			   [182,0,91,71],
			   [182,0,91,71],
			 ]
});
var bird=new createjs.Sprite(birdSheet);
  bird.x = can.width;
  bird.y = can.height*0.2;
  bird.scaleX=rateX;
  bird.scaleY=rateY;

// 场景动画绘制
  createjs.Tween.get(bgContainer, {loop:false})
  .to({x:-can.width/2}, 3000, createjs.Ease.linear)
  .call(function(){
  	createjs.Tween.get(charactor,{loop:false})
  	.to({x:can.width/2},3000, createjs.Ease.linear)
  	.call(function(){
  	createjs.Tween.get(bgContainer,{loop:false})
  	.to({x:-can.width},3000, createjs.Ease.linear).
  	//动画过渡场景二
  	call(function(){
  		createjs.Tween.get(bgContainer,{loop:false})
  		.to({x:-2*can.width},4500,createjs.Ease.linear);
		createjs.Tween.get(charactor,{loop:false})
  		.to({x:0},4500,createjs.Ease.linear).
  		call(function(){
  			//场景二入口
  			scene();
  		})
  	})
  	})
  });
  //太阳动画控制
  createjs.Tween.get(sun, {loop:false})
  .to({x:-can.width*0.28,y:can.height*0.15},11000,createjs.Ease.linear)
  //白云移动
  createjs.Tween.get(cloud1,{loop:false})
  .to({x:can.width},9000,createjs.Ease.linear)
  createjs.Tween.get(cloud2,{loop:false})
  .to({x:-can.width*0.7},6500,createjs.Ease.linear);

/****场景二动画开始*****/
function scene(){
	var img=new Image();
	img.src="./Image/QixiB-bright.png";
	createjs.Tween.get(bgContainer, {loop:false})	
	.to({x:-2.5*can.width},3000, createjs.Ease.linear);
	createjs.Tween.get(charactor, {loop:false}).wait(3000)		
	.to({x:0.6*can.width},3000, createjs.Ease.linear)
	.to({scaleX:0,scaleY:0,y:can.height*0.6,alpha:0},2000,createjs.Ease.linear)
	.call(function(){
		//男孩拿花
		var takeFlowersSheet=new createjs.SpriteSheet({
			"images":["./Image/boy.png"],
			"frames":[
						[453,0,151,291],
						[453,0,151,291],
						[453,0,151,291],
						[453,0,151,291],
						[904,0,151,291],
						[904,0,151,291],
						[904,0,151,291],
						[904,0,151,291],
						[451,0,151,291],
						[451,0,151,291],
						[451,0,151,291],
						[451,0,151,291],
						[753,0,151,291],
						[753,0,151,291],
						[753,0,151,291],
						[753,0,151,291],
						[300,0,151,291],
						[300,0,151,291],
						[300,0,151,291],
						[300,0,151,291],
					 ]
		});
		charactor_flowers  = new createjs.Sprite(takeFlowersSheet);
		charactor_flowers.x=can.width*0.6;charactor_flowers.y=can.height*0.6;
		charactor_flowers.scaleX=0;charactor_flowers.scaleY=0;
		charactor_flowers.alpha=0;
		charactor_flowers.play();
		stage.addChild(charactor_flowers);
		createjs.Tween.get(charactor_flowers, {loop:false}).wait(1000)
		.to({scaleX:rateX,scaleY:rateY,alpha:1,y:can.height*0.5},2000,createjs.Ease.linear)
		.call(function(){
			bird.play();
			stage.addChild(bird);
			createjs.Tween.get(bird, {loop:false})
			.to({x:-can.width*0.2},2000,createjs.Ease.linear);
			createjs.Tween.get(bgContainer, {loop:false})
			.to({x:-4*can.width},6000,createjs.Ease.linear);
			createjs.Tween.get(charactor_flowers, {loop:false})
			.to({x:0},6000,createjs.Ease.linear)
			.to({x:can.width/4},2000,createjs.Ease.linear)
			.to({x:can.width*0.6,y:can.height*0.36},2000,createjs.Ease.linear)		
			.to({x:can.width*0.825},2000,createjs.Ease.linear).call(function(){
				//场景三入口
				scene2()
			})
		})
	});
	createjs.Tween.get(door_l, {loop:false}).wait(3000)		
	.to({scaleX:0},3000, createjs.Ease.linear).wait(5000)
	.to({scaleX:rateX},3000, createjs.Ease.linear)
	.call(function(){
		bg2=drawImage(img,can.width*2,0,bgContainer);
	});
	createjs.Tween.get(door_r, {loop:false}).wait(3000)		
	.to({scaleX:0},3000, createjs.Ease.linear).wait(5000)
	.to({scaleX:rateX},3000, createjs.Ease.linear);

}


  createjs.Ticker.setFPS(27);
  createjs.Ticker.addEventListener("tick", function(){
  	 stage.update();
  });

/*****场景三函数****/
function scene2(){
	var girlSheet=new createjs.SpriteSheet({
		"images":["./Image/girl.png"],
		"frames":[
					[151,0,151,291],
					[151,0,151,291],
					[151,0,151,291],
					[151,0,151,291],	
					[755,0,151,291],
					[755,0,151,291],
					[755,0,151,291],
					[755,0,151,291],					
					[906,0,151,291],	
					[906,0,151,291],	
					[906,0,151,291],	
					[906,0,151,291],				
					[0,0,151,291],
					[0,0,151,291],
					[0,0,151,291],
					[0,0,151,291],					
					[302,0,151,291],
					[302,0,151,291],
					[302,0,151,291],
					[302,0,151,291],					
					[453,0,151,291],
					[453,0,151,291],
					[453,0,151,291],
					[453,0,151,291],
					[453,0,151,291],					
					[604,0,151,291],
					[604,0,151,291],
					[604,0,151,291],
					[604,0,151,291],
					[604,0,151,291],																			
				 ]
	});
	var standSheet= new createjs.SpriteSheet({
		"images":["./Image/boy.png"],
		"frames":[
					[150,0,151,291],
					[150,0,151,291],
					[150,0,151,291],
					[150,0,151,291],
					[150,0,151,291],
					[150,0,151,291],																									
					[453,291,151,291],
					[453,291,151,291],
					[453,291,151,291],
					[453,291,151,291],
					[453,291,151,291],															
					[0,0,151,291],
					[0,0,151,291],
					[0,0,151,291],
					[0,0,151,291],
					[0,0,151,291],																				
					[903,291,151,291],
					[903,291,151,291],
					[903,291,151,291],
					[903,291,151,291],
					[903,291,151,291],																				
					[753,291,151,291],
					[753,291,151,291],
					[753,291,151,291],
					[753,291,151,291],
					[753,291,151,291],																				
					[603,291,151,291],
					[603,291,151,291],
					[603,291,151,291],
					[603,291,151,291],
					[603,291,151,291],					
				 ]
	});
	//加载飘花
	var flowerList=[];	
	for(var i=1;i<7;i++){
		var img=new Image();
		img.src="Image/snowflake/snowflake"+i+".png";
		flowerList.push(img);
	}
	//人物生成和背景
	charactor_stand  = new createjs.Sprite(standSheet);
	charactor_stand.scaleX=rateX,charactor_stand.scaleY=rateY;
	charactor_stand.x=0.825*can.width;charactor_stand.y=can.height*0.36;
	stage.addChild(charactor_stand);
	charactor_flowers.gotoAndStop(0);
	charactor_flowers.alpha=0;
	girl  = new createjs.Sprite(girlSheet);
	girl.x=can.width*1.025;girl.y=can.height*0.35;
	girl.scaleX=rateX;girl.scaleY=rateY;
	stage.addChild(girl);
	stage.addChild(water1);
	stage.addChild(water2);
	stage.addChild(water3);
	stage.addChild(water4);	
	// 动画部分
	createjs.Tween.get(bgContainer, {loop:false})
	.to({x:-4.5*can.width},3000,createjs.Ease.linear);
	createjs.Tween.get(charactor_stand, {loop:false})
	.to({x:0.3*can.width,y:can.height*0.36},3000,createjs.Ease.linear).call(function(){
		charactor_stand.play();
		girl.play()
		charactor_stand.addEventListener("animationend",function(){
			charactor_stand.gotoAndStop(27);
		});
		girl.addEventListener("animationend",function(){
			girl.gotoAndStop(27);
		});
		//开始飘花
		var time;
		time=setInterval(function(){
			if(flowerContainer.children.length>=10){
				clearInterval(time)
			}
			snowflake(flowerList);
		},200);
	})
	createjs.Tween.get(girl, {loop:false})
	.to({x:0.475*can.width,y:can.height*0.36},3000,createjs.Ease.linear);
	createjs.Tween.get(water1, {loop:false})
	.to({x:0.5*can.width,y:can.height*0.9},3000,createjs.Ease.linear);
	createjs.Tween.get(water2, {loop:false})
	.to({x:0.3*can.width,y:can.height*0.92},3000,createjs.Ease.linear);
	createjs.Tween.get(water3, {loop:false})
	.to({x:0.5*can.width,y:can.height*0.94},3000,createjs.Ease.linear);	
	//星星闪烁
	createjs.Tween.get(star1, {loop:true})
	.to({alpha:0.5},500,createjs.Ease.linear)
	.to({alpha:1},500,createjs.Ease.linear);
	createjs.Tween.get(star2, {loop:true})
	.to({alpha:0.5},500,createjs.Ease.linear)
	.to({alpha:1},500,createjs.Ease.linear);
	createjs.Tween.get(star3, {loop:true})
	.to({alpha:0.5},500,createjs.Ease.linear)
	.to({alpha:1},500,createjs.Ease.linear);	
	createjs.Tween.get(star4, {loop:true})
	.to({alpha:0.5},500,createjs.Ease.linear)
	.to({alpha:1},500,createjs.Ease.linear);	
	createjs.Tween.get(star5, {loop:true})
	.to({alpha:0.5},500,createjs.Ease.linear)
	.to({alpha:1},500,createjs.Ease.linear);	
	createjs.Tween.get(star6, {loop:true})
	.to({alpha:0.5},500,createjs.Ease.linear)
	.to({alpha:1},500,createjs.Ease.linear);							
	//波纹走动
	createjs.Tween.get(water4, {loop:false})
	.to({x:0.4*can.width,y:can.height*0.88},3000,createjs.Ease.linear).call(function(){
		createjs.Tween.get(water1, {loop:true}).to({x:0.2*can.width},3000,createjs.Ease.linear)
		.to({x:0.5*can.width},3000,createjs.Ease.linear)
		createjs.Tween.get(water2, {loop:true}).to({x:0.7*can.width},4000,createjs.Ease.linear)
		.to({x:0.3*can.width},4000,createjs.Ease.linear);
		createjs.Tween.get(water3, {loop:true}).to({x:0.2*can.width},5000,createjs.Ease.linear)
		.to({x:0.5*can.width},5000,createjs.Ease.linear)
		createjs.Tween.get(water4, {loop:true}).to({x:0.1*can.width},3000,createjs.Ease.linear)
		.to({x:0.4*can.width},3000,createjs.Ease.linear)
	});

}

///////
//飘雪花 //
///////
	function snowflake(flowerList){
		//随机六张图
		function getImagesName(){
			return flowerList[Math.floor(Math.random()*6)];
		}
		//创建一个雪花
		function createflower(x){
			var img=drawImage(getImagesName(),x,-41*rateY,flowerContainer);
			return img;
		}
       // 运动的轨迹
	    var startPositionLeft = Math.random() * can.width - 100,
	        startOpacity    = 1,
	        endPositionTop  = can.height - 41*rateY,
	        endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
	        duration        = can.height * 10 + Math.random() * 5000;
            // 随机透明度，不小于0.5
        var randomStart = Math.random();
        randomStart = randomStart < 0.5 ? startOpacity : randomStart;
        var flake=createflower(startPositionLeft);
        flake.alpha=randomStart;
        flowerContainer.addChild(flake);
        stage.addChild(flowerContainer);
         createjs.Tween.get(flake, {loop:true})
         .to({rotation:1080},10000,createjs.Ease.linear)
         .to({rotation:0},10000,createjs.Ease.linear)
        createjs.Tween.get(flake, {loop:false})
        .to({x:endPositionLeft,y:endPositionTop,alpha:0.7},duration,createjs.Ease.linear).call(function(){
        	var ratio=endPositionLeft>can.width/2?-50:50;
        	createjs.Tween.get(flake, {loop:true,override:true})
        	.to({x:endPositionLeft+ratio},5000,createjs.Ease.linear)
        	.to({x:endPositionLeft},5000,createjs.Ease.linear)
        })
	}
	

}





//绘制图片
function drawImage(obj,x,y,container){
	var img=new createjs.Bitmap(obj);
	img.scaleX=rateX;
	img.scaleY=rateY;
	img.x=x;
	img.y=y;
	if(container){
		container.addChild(img);
	}
	return img;
}

