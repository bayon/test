/*
SUBJECT:

*/
function Subject(name) {
	this.observers = new ObserverList();
	///add Traffic Light 'host' characteristics for state design pattern.//
	console.log('name:'+name);
	this.name = name;
    this.who = 'not defined yet';
    this.what = 'not defined yet';
    this.start_amount = 'not defined yet';
    this.paid_out = 'not defined yet';
    this.subtotal = 'not defined yet';
	this.count = 0;
	this.status = 'not defined';
    this.currentState = new Red(this);
    this.change = function (state) {
        // limits number of changes
        if (this.count++ >= 5) return;
        this.currentState = state;
        this.currentState.go();
    };
    this.start = function () {
        this.currentState.go();
    };
	/////
}
Subject.prototype.addObserver = function(observer) {
	this.observers.add(observer);
};
Subject.prototype.removeObserver = function(observer) {
	this.observers.removeAt(this.observers.indexOf(observer, 0));
};
Subject.prototype.notify = function(context) {
	var observerCount = this.observers.count();
	console.log('this is',this);
	console.log(this.currentState);
	this.go;
	for (var i = 0; i < observerCount; i++) {
		this.observers.get(i).update(context);

		//console.log("subject matter inserted into context: "+context);
	}
};

///////
/*
subject = new Subject();
	observer1 = new Observer("'The App Brain'");
	subject.addObserver(observer1);
*/


 
var Red = function (light) {
    this.light = light;
    this.go = function () {
        log.add("Red --> for 1 minute"+this.light.name);
        light.change(new Green(light));
    }
};
 
var Yellow = function (light) {
    this.light = light;
 
    this.go = function () {
        log.add("Yellow --> for 10 seconds"+this.light.name);
        light.change(new Red(light));
    }
};
 
var Green = function (light) {
    this.light = light;
 
    this.go = function () {
        log.add("Green --> for 1 minute"+this.light.name);
        light.change(new Yellow(light));
    }
};
 
// log helper
 
var log = (function () {
    var log = "";
 
    return {
        add: function (msg) { log += msg + "\n"; },
       // show: function () { alert(log); log = ""; }
        show: function () { console.log(log); log = ""; }
    }
})();
 /*
function run() {
    //var light = new TrafficLight();
    var light = new Subject();
    light.start();
 
    log.show();
}*/
 
