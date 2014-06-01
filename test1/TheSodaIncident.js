l = new Character("Lee","#fff");
c = new Character("Clementine","#b695c0");
k = new Character("Kenny","#44B344");
_ = new Character("");

function Start(){

	scene("bg/intro.png");

	c("Lee!");
	l("Hi, Clementine.");
	c("Do you prefer Coke or Pepsi?");
	choose("Coke.","Pepsi.","Neither.","Both.",Choose_Soda);

}

function Choose_Soda(choice){

	// Clementine likes the opposite of what Lee does.
	$.soda_choice = choice;
	$.clem_likes = ["Pepsi","Coke","soda","specific"][choice.number];

	// Clem expresses her disappointment.
	if(choice.number==0){
		l("Why, I like Coke better!");
		scene("bg/what.png");
		c("Do you always hate the sweeter, younger version?...");
		choose("What?! No!","Yes I do.","Yes, including you, Clem.","...",Kenny_Enters);
	}
	if(choice.number==1){
		l("You just can't go wrong with Pepsi!");
		scene("bg/what.png");
		c("You like copycats?");
		choose("What?! No!","Yes I do.","You like copycats?","...",Kenny_Enters);
	}
	if(choice.number==2){
		l("Ugh. They're both bad for you, Clem.");
		scene("bg/what.png");
		c("Do you want to destroy my childhood?...");
		choose("What?! No!","Yes I do.","Better than destroying your health!","...",Kenny_Enters);
	}
	if(choice.number==3){
		l("I think they're both equally as good!");
		scene("bg/what.png");
		c("You're a communist! A freedom-hating communist!");
		choose("What?! No!","Yes I am.","For the motherland!","...",Kenny_Enters);
	}

}

function Kenny_Enters(choice){

	// What you're talking shit about.
	var wytsa = ["Pepsi","Coke","soda","America"][$.soda_choice.number];

	// Heated Argument
	l(choice.message);
	scene("bg/kenny.png");
	k("Lee, you talkin' shit about "+wytsa+"?!");
	l("Kenny, it's not what you think.");
	c("He was talkin' shit about "+wytsa+"!");
	l("...Clementine!");
	scene("bg/threaten.png");
	k("No one talks shit about "+wytsa+" and gets away with it!");
	l("Kenny, calm down!");
	k("This IS calm.");
	l("Put the gun down, and let's just talk about this over a nice cup of...");
	k("...yes?");
	choose("Coke.","Pepsi.","Water.","Any soft drink you like.",Choose_Soda_Again);

}

function Choose_Soda_Again(choice){

	// We'll remember what you suggest.
	$.soda_choice_2 = choice;
	// DO YOU LIVE? (By default, no)
	var alive = false;
	// What you'd say if you were cut off
	var cutoff = ["Co--","Pe--","Wa--","Any soft drink you--"][choice.number];

	// COKE -- you live only if Clem doesn't like Pepsi
	if(choice.number==0){
		if($.clem_likes!="Pepsi"){
			alive = true;
		}else{
			l(cutoff);
			scene("bg/die_1.png");
			_("[BLAM BLAM BLAM]");
		}
	}

	// PEPSI -- you live only if Clem doesn't like Coke
	if(choice.number==1){
		if($.clem_likes!="Coke"){
			alive = true;
		}else{
			l(cutoff);
			scene("bg/die_1.png");
			_("[BLAM BLAM BLAM]");
		}
	}

	// WATER -- you die. That's it.
	if(choice.number==2){
		l("Water.");
		k("You... sick... bastard.");
		scene("bg/die_1.png");
		_("[BLAM BLAM BLAM]");
	}

	// ANY -- you live only if Clem likes non-specific soda
	if(choice.number==3){
		if($.clem_likes=="soda"){
			alive = true;
		}else{
			l("Any soft drink you--");
			scene("bg/die_1.png");
			_("[BLAM BLAM BLAM]");
			k("Communist.");
		}
	}

	// Which of two ENDINGS do you get?
	if(alive){
		l("...");
		l(choice.message);
		Ending_Live();
	}else{
		Ending_Die();
	}

}

function Ending_Live(){

	// If you suggested Coke or Pepsi, do that. If choice Any Drink, randomly choose
	var drink = ["Coke", "Pepsi", null, (Math.random()>0.5?"Coke":"Pepsi")][$.soda_choice_2.number];

	// Ending Conversation
	k("...");
	k("You're goddamn right.");
	scene("bg/live_1.png");
	//k("[puts down gun]");
	l("...");
	scene("bg/live_2.png");
	//k("[throws Lee a can of "+drink+"]");
	l("...");
	c("Cheers, motherfucker.");
	_("[THE END]");
	choose("Play Again",Start);

}

function Ending_Die(){

	// What Clem likes. If Coke or Pepsi, do that. If "soda" or "specific", randomly choose.
	var drink;
	if($.clem_likes=="soda"||$.clem_likes=="specific"){
		drink = (Math.random()>0.5?"Coke":"Pepsi");
	}else{
		drink = $.clem_likes;
	}

	// Ending Conversation
	scene("bg/die_2.png");
	l("[gurgle]");
	k("You saw it. He was bit.");
	l("[twitch]");
	c("Yes. He was going to turn.");
	l("[asdf]");
	k("What a shame.");
	l("[dies]");
	//k("[Gives Clementine a can of "+drink+"]");
	k("To lost friends.");
	c("To lost friends.");
	_("[THE END]");
	choose("Play Again",Start);

}