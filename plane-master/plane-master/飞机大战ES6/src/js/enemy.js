

//敌机： 构造函数（类）
class Enemy extends Base{
	
	//属性
	constructor(type) {
		super();
	    this.ele = null;
		this.hp = 1;
		this.speed = 6;
		this.dieImgs = []; //爆炸时的动画图片
		this.score = 10; //分数
		this.type = type;
	}
	
	//方法
	//init：初始化方法
	init(){
		this.ele = document.createElement("div");
		gameEngine.ele.appendChild(this.ele);
		
		//当敌机节点添加到页面上的同时，也将敌机对象添加到数组allEnemys中
		gameEngine.allEnemys.push(this);
		
		
		switch(this.type){
			//大型敌机
			case this.Enemy_Type_Large:
				this.ele.className = "enemy-large";
				this.hp = this.Enemy_Hp_Large;
				this.speed = this.Enemy_Speed_Large;
				this.dieImgs = ["images2/plane3_die1.png", "images2/plane3_die2.png", "images2/plane3_die3.png", "images2/plane3_die4.png", "images2/plane3_die5.png", "images2/plane3_die6.png"];
				this.score = 30;
				break;
				
			//中型敌机
			case this.Enemy_Type_Middle:
				this.ele.className = "enemy-middle";
				this.hp = this.Enemy_Hp_Middle;
				this.speed = this.Enemy_Speed_Middle;
				this.dieImgs = ["images2/plane2_die1.png", "images2/plane2_die2.png", "images2/plane2_die3.png", "images2/plane2_die4.png"];
				this.score = 20;
				break;
			
			//小型敌机
			case this.Enemy_Type_Small:
				this.ele.className = "enemy-small";
				this.hp = this.Enemy_Hp_Small;
				this.speed = this.Enemy_Speed_Small;
				this.dieImgs = ["images2/plane1_die1.png", "images2/plane1_die2.png", "images2/plane1_die3.png"];
				this.score = 10;
				break;
			
			default: 
				console.log("error");
		}
		
		//位置
		this.ele.style.left = parseInt(Math.random()*(gameEngine.ele.offsetWidth-this.ele.offsetWidth)) + "px";
		this.ele.style.top = -this.ele.offsetHeight + "px";
		
		return this;
	}
	
	//移动
	move(){
		let timer = setInterval(()=>{
			if (this.ele.offsetTop > gameEngine.ele.offsetHeight){
				clearInterval(timer);	//停止移动
				gameEngine.ele.removeChild(this.ele); //移除敌机节点
				
				//当敌机节点从页面上移除的同时， 也将当前敌机对象从数组allEnemys中移除
				gameEngine.allEnemys.splice( gameEngine.allEnemys.indexOf(this), 1 );
			}
			else {
				this.ele.style.top = this.ele.offsetTop + this.speed + "px";
			}
		}, 30);
	}
	
	//受到一点伤害
	hurt(){
		this.hp--; 
		
		if (this.hp == 0) {
			this.boom();
			gameEngine.totalScore += this.score;
			console.log("总分数： " + gameEngine.totalScore);
		}
	}
	
	//爆炸
	boom(){
		
		//爆炸动画
		let [i, that] = [0, this];
		let dieTimer = setInterval(()=>{
			
			if (i >= that.dieImgs.length-1) {
				clearInterval(dieTimer); //停止动画
				gameEngine.ele.removeChild(that.ele); 
				//当敌机节点从页面上移除的同时， 也将当前敌机对象从数组allEnemys中移除
				gameEngine.allEnemys.splice( gameEngine.allEnemys.indexOf(that), 1 );
			}
			else {
				that.ele.style.background = "url("+ that.dieImgs[++i] +") no-repeat";
			}
		}, 100);
		
	}
	
}


//类型， 血量， 速度
Enemy.prototype.Enemy_Type_Large = 1;  //类型
Enemy.prototype.Enemy_Type_Middle = 2;
Enemy.prototype.Enemy_Type_Small = 3;

Enemy.prototype.Enemy_Hp_Large = 8;  //血量
Enemy.prototype.Enemy_Hp_Middle = 3;
Enemy.prototype.Enemy_Hp_Small = 1;

Enemy.prototype.Enemy_Speed_Large = 2;  //速度
Enemy.prototype.Enemy_Speed_Middle = 3;
Enemy.prototype.Enemy_Speed_Small = 5;



















