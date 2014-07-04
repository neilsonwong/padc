//Global state of the page
//essentially just a namespace for me :)

function Pazudora() {
	this.$board = new Board(); 
}

//Gloabl Constants vars
Pazudora.orbSprites = {	0:'fire',
				1:'water',
				2:'wood',
				3:'light',
				4:'dark',
				5:'heal',
				6:'unknown' };

//vars representing the global state
Pazudora.prototype.$board;


var baseURL = [location.protocol, '//', location.host, location.pathname].join('');

//methods
Pazudora.prototype.render = function() {
	var $body = $('body');

	//layout elements
	// var $madoka = makeMadoka();

	//main layout
	// var $D2 = $('<div>').append($madoka);

	//clear body
	$body.html('');

	//update content values
	var $D1 = $('<div>').addClass('module').append(this.$board.$table)
	.append(this.$board.editor.$panel);

	//render content
	$body.append($D1);
}

