var game = {
	data:null,//启动后是一个二维数组
	RN:4,//总行数
	CN:4,//总列数
	score:0,//分数
	state:1,//状态
	RUNNING:1,//运行
	GAMEOVER:0,//游戏结束
	getGridHTML:function(){
		for(var r = 0,arr = []; r < this.RN; r++){
	
			for(var c = 0; c < this.CN; c++){
				arr.push(''+r+c);
			}
		}
		return '<div id = "g'
				+arr.join('" class = "grid"></div><div id = "g')
				+'" class = "grid"></div>';
	},
	getCellHTML:function(){
		for(var r = 0,arr = []; r < this.RN; r++){
			for(var c = 0; c < this.CN; c++){
				arr.push(''+r+c);
			}
		}
		return '<div id = "c'
				+arr.join('" class = "cell"></div><div id = "c')
				+'" class = "cell"></div>';
	},
	init:function(){
		var gbg = document.getElementById('gridPanel');
		gbg.innerHTML=this.getGridHTML()+this.getCellHTML();
		gbg.style.width = 116*this.RN+16+'px';
		gbg.style.height = 116*this.CN+16+'px';
		console.log(this.getGridHTML());
	},
	start:function(){//游戏启动时
		this.state=this.RUNNING;
		this.init();
		this.data=[];
		this.score=0;
		for(var r = 0;r < this.RN;r++){
			this.data[r]=[];
			for(var c = 0;c <this.RN;c++){
				this.data[r][c]=0;
			}
		}
		this.randomNum();
		this.randomNum();
		console.log(this.data.join('\n'));
		this.updateView();
	},
	randomNum:function(){//随机挑选一个位置，生成2,4
		if(!this.isFull()){
			while(true){
				var row = parseInt(Math.random()*(this.RN));
				var col = parseInt(Math.random()*(this.CN));
				if(this.data[row][col] == 0){
					this.data[row][col]=Math.random()<0.5? 2 : 4
					break;
				}
			}
		}
	},
	isFull:function(){//判断数组是否已经满格
		for(var row = 0; row < this.data.length;row++){
			for(var col = 0; col < this.data[row].length;col++){
				if(this.data[row][col]==0){
					return false;
				}
			}
		}
		return true;
	},
	updateView:function(){//刷新页面
		for(var row = 0; row < this.data.length;row++){
			for(var col = 0; col < this.data[row].length;col++){
				var div = document.getElementById("c"+row+col);
				if(this.data[row][col]!=0){
					div.innerHTML=this.data[row][col];
					div.className="cell n"+this.data[row][col];
				}else{
					div.className="cell";
					div.innerHTML="";
				}
			}
		}
		var span = document.getElementById("score");
		span.innerHTML=this.score;
		var finalspan = document.getElementById("finalScore");
		finalspan.innerHTML=this.score;
		var gameover = document.getElementById("gameover");
		if(this.state == this.RUNNING){
			gameover.style.display="none";
		}else{
			gameover.style.display="block";
		}
	},
	//按左移键时的函数
	moveLeft:function(){
		var before = this.data.toString();
		for(var r=0;r<this.data.length;r++){
			for(var c=0;c<this.data[r].length - 1;c++){
				var next = this.getRightNext(r,c);
				if(next == -1){
					break;
				}else{
					if(this.data[r][c] == 0){
						this.data[r][c] = this.data[r][next];
						this.data[r][next] = 0;
						c--;
					}else if(this.data[r][c] == this.data[r][next]){
						this.data[r][c] *=2;
						this.data[r][next] = 0;
						this.score += this.data[r][c];
					}
				}
			}
		}
		var after = this.data.toString();
		if(before!=after){
			this.randomNum();
			
		}
			this.isGameOver();
			this.updateView();
	},
	getRightNext:function(r,c){//获取右侧下一个不为0的下标
		for(var next = c+1;next < this.data[r].length;next++){
			if(this.data[r][next] != 0){
				return next;
			}
		}
		return -1;
	},
	//按右移键时的函数
	moveRight:function(){
		var before = this.data.toString();
		for(var r=0;r<this.data.length;r++){
			for(var c=this.data[r].length - 1;c>0;c--){
				var next = this.getLeftNext(r,c);
				if(next == -1){break;}
				else{
					if(this.data[r][c] == 0){
						this.data[r][c] = this.data[r][next];
						this.data[r][next] = 0;
						c++;
					}else if(this.data[r][c] == this.data[r][next]){
						this.data[r][c] *=2;
						this.data[r][next] = 0;
						this.score += this.data[r][c];
					}
				}
			}
		}
		var after = this.data.toString();
		if(before!=after){
			this.randomNum();
			
		}
		this.isGameOver();
		this.updateView();
	},
	getLeftNext:function(r,c){//获取右侧下一个不为0的下标
		for(var next = c - 1;next >= 0;next--){
			if(this.data[r][next] != 0){
				return next;
			}
		}
		return -1;
	},
	//按上移键时的函数
	moveTop:function(){
		var before = this.data.toString();
		for(var c=0;c<this.data[0].length;c++){
			for(var r=0;r<this.data.length - 1;r++){
				var next = this.getBottomNext(r,c);
				if(next == -1){
					break;
				}else{
					if(this.data[r][c] == 0){
						this.data[r][c] = this.data[next][c];
						this.data[next][c] = 0;
						r--;
					}else if(this.data[r][c] == this.data[next][c]){
						this.data[r][c] *=2;
						this.data[next][c] = 0;
						this.score += this.data[r][c];
					}
				}
			}
		}
		var after = this.data.toString();
		if(before!=after){
			this.randomNum();
			
		}
		this.isGameOver();
		this.updateView();
	},
	getBottomNext:function(r,c){//获取右侧下一个不为0的下标
		for(var next = r+1;next < this.data.length;next++){
			if(this.data[next][c] != 0){
				return next;
			}
		}
		return -1;
	},
	//按下移键时的函数
	moveBottom:function(){
		var before = this.data.toString();
		for(var c=0;c<this.data[0].length;c++){
			for(var r=this.data.length - 1;r>0;r--){
				var next = this.getTopNext(r,c);
				if(next == -1){
					break;
				}else{
					if(this.data[r][c] == 0){
						this.data[r][c] = this.data[next][c];
						this.data[next][c] = 0;
						r++;
					}else if(this.data[r][c] == this.data[next][c]){
						this.data[r][c] *=2;
						this.data[next][c] = 0;
						this.score += this.data[r][c];
					}
				}
			}
		}
		var after = this.data.toString();
		if(before!=after){
			this.randomNum();
			
		}
		this.isGameOver();
		this.updateView();
	},
	getTopNext:function(r,c){//获取上侧下一个不为0的下标
		for(var next = r - 1 ;next >= 0;next--){
			if(this.data[next][c] != 0){
				return next;
			}
		}
		return -1;
	},
	isGameOver:function(){
		if(!this.isFull()){
			return this.state = this.RUNNING;
		}else{
			for(var r = 0;r < this.data.length;r++){
				for(var c = 0;c < this.data[r].length;c++){
					if((c != this.data[r].length - 1 ) && (this.data[r][c] == this.data[r][c+1])){
						return this.state = this.RUNNING;
					}else if(r != this.data.length - 1 && (this.data[r][c] ==this.data[r+1][c])){
						return this.state = this.RUNNING;
					}
				}
			}
			return this.state = this.GAMEOVER;
		}
	}
}
window.onload=function(){
	game.start();
	//当按键按下时
	document.onkeydown=function(){
		var e=window.event||arguments[0];
		if(e.keyCode==37){ 
			game.moveLeft();
		}else if(e.keyCode==38){ 
			game.moveTop();
		}
		else if(e.keyCode==39){ 
			game.moveRight();
		}else if(e.keyCode==40){ 
			game.moveBottom();
		}
	}
}