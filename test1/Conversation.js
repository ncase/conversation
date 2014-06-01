var game_output = document.getElementById("game_output");

var $ = {}; // Save File

var timer = 0;
function clear(){
	timer = 0;
	game_output.innerHTML = "";
}

function Character(name,color){
	color = color || "#000";
	return function(message){

		var dom = document.createElement("div");
		dom.innerHTML = "<span style='color:"+color+"'><b>"+name+": </b><br>"+message+"</span>";

		// How long does the message last? Approx 5 words per second, or 200ms per word. Plus 500ms just in case.
		var duration = 500 + message.split(" ").length*200;

		// Add & Remove based on time.
		timer += 100;
		setTimeout(function(){ game_output.appendChild(dom); },timer);
		timer += duration;
		setTimeout(function(){ game_output.removeChild(dom); },timer);

	};
}

function choose(args){

	// Arguments list: Bunch of choices, then callback.
	var callback = arguments[arguments.length-1];
	var choices = Array.prototype.splice.call(arguments,0,arguments.length-1);

	// Create choices
	var dom = document.createElement("div");
	for(var i=0;i<choices.length;i++){
		var button = document.createElement("button");
		button.innerHTML = choices[i];
		button.onclick = (function(number,message){
			return function(){
				clear();
				callback({ number:number, message:message });
			};
		})(i,choices[i]);
		dom.appendChild(button);
	}

	// Finally, add it!
	timer += 100;
	setTimeout(function(){ game_output.appendChild(dom); },timer);

};

window.onload = function(){
	Start();
}