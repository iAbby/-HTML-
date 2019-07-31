

/*  
 * 碰撞检测
 */
isCrash = (obj1, obj2)=>{
	if(obj1 && obj2){
		let leftSide = obj2.offsetLeft-obj1.offsetWidth/2;
		let rightSide = obj2.offsetLeft+obj2.offsetWidth+obj1.offsetWidth/2;
		let upSide = obj2.offsetTop - obj1.offsetHeight/2;
		let downSide = obj2.offsetTop + obj2.offsetHeight + obj1.offsetHeight/2;
		let x = obj1.offsetLeft+obj1.offsetWidth/2;
		let y = obj1.offsetTop + obj1.offsetHeight/2;
		if(x > leftSide && x < rightSide && y > upSide && y < downSide){
			return true;
		} 
	}
	return false;
}

















