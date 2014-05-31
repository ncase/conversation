window.Game = {};

Game.choices = {};

var game_output = document.getElementById("game_output");
Game.say = function(person,message){
	var dom = document.createElement("div");
	dom.innerHTML = "<b>"+person+": </b><br>"+message;
	game_output.appendChild(dom);
};
Game.choose = function(choices,callback){
	var dom = document.createElement("div");
	for(var i=0;i<choices.length;i++){
		var button = document.createElement("button");
		button.innerHTML = choices[i];
		button.onclick = (function(choice,echo){
			return function(){
				game_output.innerHTML = "";
				callback(choice,echo);
			};
		})(i,choices[i]);
		dom.appendChild(button);
	}
	game_output.appendChild(dom);
};

////////////////////////////////////////////////

function Start(){
	
	Game.say("Clem",	"Lee!");
	Game.say("Lee",		"Hi, Clementine.");
	Game.say("Clem",	"Do you prefer Coke or Pepsi?");

	Game.choose(["Coke.","Pepsi.","Neither.","Both."],Choose_Soda);

}

function Choose_Soda(choice){

	// Clementine will remember that.
	Game.choices.Choose_Soda = ["Coke","Pepsi","neither","both"][choice];

	// Four possible conversations
	if(choice==0){
		Game.say("Lee",		"Why, I like Coke better!");
		Game.say("Clem",	"[crying] Do you always hate the sweeter, younger version?...");
		Game.choose(["What?! No!","Yes I do.","Yes, including you, Clem.","..."],Kenny_Enters);
	}
	if(choice==1){
		Game.say("Lee",		"You just can't go wrong with Pepsi!");
		Game.say("Clem",	"[crying] You like copycats?");
		Game.choose(["What?! No!","Yes I do.","[crying] You like copycats?","..."],Kenny_Enters);
	}
	if(choice==2){
		Game.say("Lee",		"Ugh. They're both bad for you, Clem.");
		Game.say("Clem",	"[crying] Do you want to destroy my childhood?...");
		Game.choose(["What?! No!","Yes I do.","Better than destroying your health!","..."],Kenny_Enters);
	}
	if(choice==3){
		Game.say("Lee",		"I think they're both equally as good!");
		Game.say("Clem",	"[crying] You're a communist! A freedom-hating communist!");
		Game.choose(["What?! No!","Yes I am.","For the motherland!","..."],Kenny_Enters);
	}

}

function Kenny_Enters(choice,echo){

	// Clem likes what you hate
	Game.choices.Clem_Likes = ({
		Coke: "Pepsi",
		Pepsi: "Coke",
		neither: "soda",
		both: "soda"
	})[Game.choices.Choose_Soda];

	// Kenny thinks you hate...
	var kenny_says = ({
		Coke: "Pepsi",
		Pepsi: "Coke",
		neither: "soda",
		both: "America"
	})[Game.choices.Choose_Soda];

	// Conversation
	Game.say("Lee",		echo);
	Game.say("Kenny",	"Lee, you talkin' shit about "+kenny_says+"?!");
	Game.say("Lee",		"Kenny, it's not what you think.");
	Game.say("Clem",	"He was talkin' shit about "+kenny_says+"!");
	Game.say("Lee",		"...Clementine!");
	Game.say("Kenny",	"[points gun at Lee] No one talks shit about "+kenny_says+" and gets away with it!");
	Game.say("Lee",		"Kenny, calm down!");
	Game.say("Kenny",	"This IS calm.");
	Game.say("Lee",		"Put the gun down, and let's just talk about this over a nice cup of...");
	Game.say("Kenny",	"...yes?");

	// Uh oh...
	Game.choose(["Coke.","Pepsi.","Water.","Any soft drink you like."],Choose_Soda_Again);

}

function Choose_Soda_Again(choice,echo){

	// DO YOU LIVE? (By default, no)
	var alive = false;

	// What you'd say if you were cut off
	var cutoff = ["Co--","Pe--","Wa--","Any soft drink you--"][choice];

	// Shortcut
	var CL = Game.choices.Clem_Likes;

	// Coke -- you live only if Clem likes Coke/Soda
	if(choice==0){
		if(CL=="Coke" || CL=="soda"){
			alive = true;
		}else{
			Game.say("Lee",		cutoff);
			Game.say("...",		"[BLAM BLAM BLAM]");
		}
	}

	// Pepsi -- you live only if Clem likes Pepsi/Soda
	if(choice==1){
		if(CL=="Pepsi" || CL=="soda"){
			alive = true;
		}else{
			Game.say("Lee",		cutoff);
			Game.say("...",		"[BLAM BLAM BLAM]");
		}
	}

	// Water -- you die. That's it.
	if(choice==2){
		Game.say("Lee",		"Water.");
		Game.say("Kenny",	"You... sick... bastard.");
		Game.say("...",		"[BLAM BLAM BLAM]");
	}

	// Any drink -- you live only if Clementine likes all kinds of soda
	if(choice==3){
		if(Game.choices.Clem_Likes=="soda"){
			alive = true;
		}else{
			Game.say("Lee",		"Any soft drink you--");
			Game.say("...",		"[BLAM BLAM BLAM]");
			Game.say("Kenny",	"Coward.");
		}
	}

	// Which of two ENDINGS do you get?
	if(alive){
		Game.say("Lee",		"...");
		Game.say("Lee",		echo);
		Game.choices.Choose_Soda_Again = ["Coke","Pepsi","water","any"][choice];
		Ending_Live();
	}else{
		Ending_Die();
	}

}

function Ending_Live(){

	// What You Offered
	var CSA = Game.choices.Choose_Soda_Again;
	if(CSA=="any"){ // If just soda, choose randomly.
		CSA = (Math.random()>0.5) ? "Pepsi" : "Coke";
	}

	Game.say("Kenny",	"...");
	Game.say("Kenny",	"You're goddamn right.");
	Game.say("Kenny",	"[puts down gun]");
	Game.say("Lee",		"...");
	Game.say("Kenny",	"[throws Lee a can of "+CSA+"]");
	Game.say("Lee",		"...");
	Game.say("Clem",	"Cheers, motherfucker.");
	Game.say("...",		"[THE END]");

}

function Ending_Die(){

	// What Clem likes
	var CL = Game.choices.Clem_Likes;
	if(CL=="soda"){ // If just soda, choose randomly.
		CL = (Math.random()>0.5) ? "Pepsi" : "Coke";
	}

	Game.say("Lee",		"[gurgle]");
	Game.say("Kenny",	"You saw it. He was bit.");
	Game.say("Lee",		"[twitch]");
	Game.say("Clem",	"Yes. He was going to turn.");
	Game.say("Lee",		"[asdf]");
	Game.say("Kenny",	"What a shame.");
	Game.say("Lee",		"[dies]");
	
	Game.say("Kenny",	"[Gives Clem a can of "+CL+"]");
	Game.say("Kenny",	"To lost friends.");
	Game.say("Clem",	"To lost friends.");
	Game.say("...",		"[THE END]");

}