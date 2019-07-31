

//我的飞机: 对象
let myPlane = {
	
	//属性
	ele: null,
	fireInterval: 300, //子弹发射间隔
	
	//方法
	//init: 初始化属性
	init: function(){
		this.ele = document.createElement("div");
		gameEngine.ele.appendChild(this.ele);
		this.ele.className = "myplane";
		this.ele.style.left = (gameEngine.ele.offsetWidth-this.ele.offsetWidth)/2 + "px";
		this.ele.style.top = gameEngine.ele.offsetHeight-this.ele.offsetHeight + "px";
		
		return this;
	},
	
	//开火,发射子弹
	fire: function(){
		
		setInterval(()=>{
			
			//创建子弹对象
			let bullet = new Bullet();
			bullet.init().move();
			
		}, this.fireInterval);
		
	},
	
	//可以拖拽
	canMove: function(){
		console.log(this.ele)
		this.ele.onmousedown = e=>{
			e = e || event;
			e.preventDefault();
			
			const disx = e.offsetX;
			const disy = e.offsetY;
			
			document.onmousemove = e=>{
				console.log(333)
				e = e || event;
				let x = e.pageX - disx - gameEngine.ele.offsetLeft;
				if (x <= 0) {
					x = 0;
				}
				else if (x >= gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth) {
					x = gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth;
				}
				myPlane.ele.style.left = x + "px";
				myPlane.ele.style.top = e.pageY - disy + "px";
			}
			document.onmouseup = ()=>{
				document.onmousemove = document.onmouseup = null;
			}
		}
	}
}












