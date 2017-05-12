/*
OBSERVER:

*/
function Observer(name) {
	var receivedMsg;
	this.name = name;
	//addition 1: array of recieved messages (memory);
	var memory = [];
	this.update = function(context) {
		receivedMsg = context;
		memory.push(context);
	};
	this.remember = function(){
		console.log("I am "+ this.name +" and  the last thing I remember was "+ receivedMsg); 
	};
	this.memory = function(){
		console.log("I am "+ this.name +" and I remember all of the following subject matters:");
		//loop through memory:
		var i = 0;
		while (i < memory.length) {
			console.log(memory[i]);
			i++;
		}
	}
}