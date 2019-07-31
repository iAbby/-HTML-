
//let,const
//箭头函数
//class

//子弹： 构造函数（类）
class Bullet extends Base {
	
	//属性
	constructor() {
		super();
	    this.ele = null;
	}
	
	//方法
	init(){
		this.ele = document.createElement("div");
		gameEngine.ele.appendChild(this.ele);
		
		//当子弹节点添加到页面上的同时，也将当前要创建的子弹对象添加到allBullets数组中
		gameEngine.allBullets.push(this);
		//console.log(gameEngine.allBullets);
		
		this.ele.className = "bullet";
		this.ele.style.left = myPlane.ele.offsetLeft + myPlane.ele.offsetWidth/2 - this.ele.offsetWidth/2+1 + "px";
		this.ele.style.top = myPlane.ele.offsetTop - this.ele.offsetHeight + "px";
		return this;
	}
	
	//移动
	move(){
		this.timer = setInterval(()=>{
			
			if (this.ele.offsetTop < -18) {
				clearInterval(this.timer); //停止移动
				gameEngine.ele.removeChild(this.ele); //移除子弹
				
				//当子弹节点从页面上移除的同时，也将当前子弹对象从allBullets数组中移除
				gameEngine.allBullets.splice( gameEngine.allBullets.indexOf(this), 1);
			}
			else {
				this.ele.style.top = this.ele.offsetTop - 10 + "px";
			}
		}, 30);
	}
	
	//爆炸
	boom(){
		
		//停止移动
		clearInterval(this.timer);
		
		this.ele.className = "bullet-die";
		
		//const PI = 3.14;
		
		//爆炸动画
		//解构赋值
		//let i = 0;
		//let that = this;
		let [i, that] = [0, this];
		
		let dieImgs = ["images/die1.png", "images/die2.png"];
		let dieTimer = setInterval(()=>{
			that.ele.style.background = "url("+ dieImgs[++i] +") no-repeat";
			clearInterval(dieTimer);
			gameEngine.ele.removeChild(that.ele); //移除节点
		}, 100);
	}
	
}











