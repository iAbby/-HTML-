

//导演
//游戏引擎： 对象
//创建敌机
//创建我的飞机
//加载游戏
var gameEngine = {
	
	//属性
	ele: null,  //游戏界面的div
	
	allBullets: [], //当前页面上所有子弹
	allEnemys: [], //当前页面上所有敌机
	
	
	//分数
	totalScore: 0, 
	
	//方法
	//init: 初始化属性
	init:function(){
		this.ele = document.getElementById("main");
		return this;
	},
	
	//start: 开始游戏
	start: ()=>{
		//console.log("开始游戏");
		
		//加载游戏
		gameEngine.loadding(()=>{
			
			//进入了游戏主界面
			//console.log("加载完成！");
			
			//创建我的飞机
			myPlane.init().canMove();
			myPlane.fire();
			
			//监听键盘控制飞机的移动
			gameEngine.listenKeybord();
			
			//创建敌机
			gameEngine.createEnemy();
			
			//碰撞检测
			gameEngine.crash();
			
			
			//移动背景
			gameEngine.moveBackground();
			
		});
		
	},
	
	//loadding: 加载游戏
	loadding: callback=>{
		
		//logo
		let logo = document.createElement("div");
		logo.className = "logo";
		gameEngine.ele.appendChild(logo);
		
		//load
		let load = document.createElement("div");
		load.className = "load";
		gameEngine.ele.appendChild(load);
		
		//动画
		let imgs = ["images2/loading1.png", "images2/loading2.png", "images2/loading3.png"]
		let i = 0;
		let timer1 = setInterval(()=>{
			if (i >= 5) {
				clearInterval(timer1); //停止动画
				gameEngine.ele.removeChild(logo); //删除logo节点
				gameEngine.ele.removeChild(load); //删除load节点
				callback(); //回调
			}
			else{
				load.style.background = "url("+ imgs[++i%3] +") no-repeat"
			}
		}, 500);
		
	},
	
	//监听键盘
	listenKeybord: ()=>{
		
		let xspeed = 0;
		let yspeed = 0;
		
		onkeydown = e=>{
			e = e || event;
			
			if (e.keyCode==37) { //左
				xspeed = -10;
			}
			else if (e.keyCode==38) { //上
				yspeed = -10;
			}
			else if (e.keyCode==39) { //右
				xspeed = 10;
			}
			else if (e.keyCode==40) { //下
				yspeed = 10;
			}
		}
		onkeyup = e=>{
			e = e || event;
			
			if (e.keyCode==37 || e.keyCode==39 ) {
				xspeed = 0;
			}
			if (e.keyCode==38 || e.keyCode==40) {
				yspeed = 0;
			}
			
		}
		setInterval(()=>{
			let x = myPlane.ele.offsetLeft + xspeed;
			
			if (x <= 0) {
				x = 0;
			}
			else if (x >= gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth) {
				x = gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth;
			}
			
			myPlane.ele.style.left = x + "px";
			myPlane.ele.style.top = myPlane.ele.offsetTop + yspeed + "px";
		}, 30);
		
	},
	
	//创建敌机
	createEnemy: ()=>{
		
		//随机创建大型飞机
		setInterval(()=>{
			var flag = Math.random()>0.5 ? true : false;
			if (flag) {
				var enemy = new Enemy(Enemy.prototype.Enemy_Type_Large);
				enemy.init().move();
			}
		}, 6000);
		
		//随机创建中型飞机
		setInterval(()=>{
			var flag = Math.random()>0.5 ? true : false;
			if (flag) {
				var enemy = new Enemy(Enemy.prototype.Enemy_Type_Middle);
				enemy.init().move();
			}
		}, 3000);
		
		//随机创建小型飞机
		setInterval(()=>{
			var flag = Math.random()>0.5 ? true : false;
			if (flag) {
				var enemy = new Enemy(Enemy.prototype.Enemy_Type_Small);
				enemy.init().move();
			}
		}, 1000);
	},
	
	//碰撞检测
	crash: ()=>{
		
		//每隔30毫秒检测一次碰撞
		let timer = setInterval(()=>{
			
			for (var i=0; i<gameEngine.allEnemys.length; i++) { //遍历敌机数组
				
				//敌机和子弹发射碰撞
				for (var j=0; j<gameEngine.allBullets.length; j++) { //遍历子弹数组
					
					//检测每个敌机和每个子弹是否发生了碰撞
					if ( isCrash(gameEngine.allEnemys[i].ele, gameEngine.allBullets[j].ele) ) {
						//console.log("碰撞了");
						
						//让子弹爆炸，然后消失
						gameEngine.allBullets[j].boom();
						gameEngine.allBullets.splice( j, 1 ); //从数组allBullets中移除
						
						//让敌机掉一滴血
						gameEngine.allEnemys[i].hurt(); 
					}
				}
				
				//敌机和我的飞机发射碰撞
				if ( isCrash( gameEngine.allEnemys[i].ele, myPlane.ele ) ) {
					clearInterval(timer); //取消碰撞检测
					
					var myName = prompt("请留下您的大名， 您当前的分数是:"+gameEngine.totalScore, "");

					ajax({
						type: "post",
						url: "http://60.205.181.47/myPHPCode4/uploadScore.php",
						data: {name: myName, score: gameEngine.totalScore},
						
						success: function(data){
							console.log("提交成功: " + data);
							//进入排行榜
							location.href = "rand.html";
						}
					})
					
					break;
				}
			}
			
			
		}, 30);
		
	},
	
	//移动背景图
	moveBackground: ()=>{
		var y = 0;
		setInterval(()=>{
			gameEngine.ele.style.backgroundPositionY = y++ + "px";
		}, 30);

	}
	
}













