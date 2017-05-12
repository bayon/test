var subject=null;
var observer1 = null;
var observer2 = null;
var subject_matter = null;
var newMessage = null;
var workOrderNumber = 1;
var worker_id = 0;
function main(){
	subject = new Subject('workorder');
	//subject.start();
 
    log.show();
	observer1 = new Observer("'The App Brain'");
	subject.addObserver(observer1);
	observer2 = new Observer("Bobby");
	subject.addObserver(observer2);
}
function addWorkorder(wo){
	 console.log('wo is of type:',wo.name);
	 var subject_matter = "new workorder number "+workOrderNumber;
	 subject.notify(subject_matter);
	 var list = document.getElementById('wo_list');
	 var items = list.innerHTML;
	 var newList = items;
	 newList += "<div class='row  boxy'>";
	 newList += "<div class='col-lg-2 col-md-2 col-sm-2 col-xs-2'  >";
	 newList += "<input type='button' id='wo_"+workOrderNumber+"' onclick='workorderComplete(this)'  class='pay_button' value='pay' /> ";
	newList += "</div>";
	 //newList += "<select id='wo_"+workOrderNumber+"_status'  onchange='changeStatus(this);' >";
	 //newList += "<option>red</option><option>yellow</option><option>green</option>";
	 //newList += "</select>";
newList += "<div class='col-lg-2 col-md-2 col-sm-2 col-xs-2'  >who</div>";

newList += "<div class='col-lg-2 col-md-2 col-sm-2 col-xs-2'  > <input id='wo_"+workOrderNumber+"_who'   value=''  onchange='changeWho(this);'  />";
newList += "</div>";
newList += "<div class='col-lg-2 col-md-2 col-sm-2 col-xs-2'  >cost</div>";

newList += "<div class='col-lg-2 col-md-2 col-sm-2 col-xs-2'  ><input id='wo_"+workOrderNumber+"_what' value='0'  onchange='changeWhat(this);'   />";
newList += "</div>";

newList += "</div>";//end of  row
	// newList += "";
	 //newList += "cost:<input id='wo_"+workOrderNumber+"_what' value='0'  onchange='changeWhat(this);'   />";

	 //newList += "</div>";

	list.innerHTML = newList; //     <button id='"++"'onclick='workorderComplete()'>wo complete</button>      "<li>"+workOrderNumber+"</li>";
	//increment work order number
	workOrderNumber++;
}
function whoKnows(){
	subject.observers.get(0).remember();
	subject.observers.get(0).memory();
}
function workorderComplete(obj){
	//console.log('subject is ',subject);
	//alert(obj.id);
	var subject_matter = "workorder "+obj.id+"COMPLETED";
	var btn = document.getElementById(obj.id).style.color = "green";
	document.getElementById(obj.id).value = "paid";
	document.getElementById(obj.id).disabled = true;
	//console.log('and so ...'+ document.getElementById(obj.id).value);
	//console.log(subject_matter);
	 subject.notify(subject_matter);

	 var change = {};
	 var obj_id = obj.id+'_what';
	// console.log('object is is '+ obj_id);
	 change.value = parseFloat(document.getElementById(obj_id).value);
	  subject.notify('paid out'+change.value);
	 calculateSubtotal(change);


}

/////state
function changeStatus(obj){
	subject.status = obj.value;
	//var stateX = new Yellow(subject);
	//subject.change(stateX);
	//subject.go;
	subject.notify(obj.id + "changed status to "+ subject.status ); 
	//document.getElementById(obj.id).setAttribute('value',subject.status);
	//document.getElementById("mySelect").value = "banana";
	console.log(obj);
document.getElementById(obj.id).value = subject.status;

	var foo = document.getElementById(obj.id).childNodes;
	console.log(foo);
	//loop through foo 
	// if childNodes[i].innerHTML == subject.status
	//then childNodes[i].selected = true;





}
function changeWho(obj){
	subject.who = obj.value;
	subject.notify(obj.id + "changed who to "+ subject.who ); 
	console.log(obj);
	//element.setAttribute("style", "background-color: red;");

	document.getElementById(obj.id).setAttribute('value',subject.who);
}
function changeWhat(obj){
	subject.what = parseFloat(obj.value);
	subject.notify(obj.id + "changed what to "+ subject.what ); 
	document.getElementById(obj.id).setAttribute('value',subject.what);

	// REALLY SHOULD BE WHEN BUTTON PUSHED calculateSubtotal(obj);
}
function startAmount(obj){
	subject.start_amount = parseFloat(obj.value);
	subject.paid_out = 0; //parseFloat(obj.value);
	subject.subtotal = parseFloat(obj.value);
	subject.notify(obj.id + "changed start amount to "+ subject.start_amount ); 

	document.getElementById("start_amount").setAttribute('value',subject.start_amount);
	document.getElementById("paid_out").setAttribute('value',subject.paid_out );
	document.getElementById("subtotal").setAttribute('value',subject.subtotal);

	document.getElementById(obj.id).disabled = true;
//recalculate if necessary
//onblur='calculateSubtotal(this);' 


}
function calculateSubtotal(obj){
	subject.change_amount = parseFloat(obj.value);
	subject.notify(obj.id + "changed start amount to "+ parseFloat(subject.start_amount)  - parseFloat(subject.change_amount)); 
	

	 
	//subject.start_amount = parseFloat(newAmount);
	var oldOut = parseFloat(document.getElementById("paid_out").value);
	var newOut = oldOut + parseFloat(subject.change_amount);
var newSubtotal = parseFloat(subject.start_amount)  - parseFloat(newOut);

	document.getElementById("paid_out").setAttribute('value',newOut);
	document.getElementById("subtotal").setAttribute('value',newSubtotal);
}

//////////////
function syncData(){
	console.log('time to sync data via ajax to mysql and proof that it worked...');
 }

 //
 //-----NETWORK CHECK

var NETWORK_STATUS = "";
function CheckOnlineStatus(msg) {
	var condition = navigator.onLine ? "ONLINE" : "OFFLINE";           
	NETWORK_STATUS = condition;  
	console.log('NETWORK_STATUS is');
	console.log(NETWORK_STATUS);       
}
function networkCheck() {
	CheckOnlineStatus("load");
	document.body.addEventListener("offline", function () {
	    CheckOnlineStatus("offline")
	}, false);
	document.body.addEventListener("online", function () {
	    CheckOnlineStatus("online")
	}, false);
}
//////////////
