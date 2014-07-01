function Board(){
	this.vals = loadPresetBoard();
	this.make();
	this.editor = new Editor();
	watch(this, "vals", this.update);


	function loadPresetBoard(){
		var a = $.getUrlVar('board');
		var boardVals = null;
		try {
			boardVals = a ? JSON.parse(a) : undefined; a=null;
		}
		catch (e) {
			$body.append('Opps something went wrong!');
		}

		//set board to unselected if no preset
		if (!boardVals){ boardVals=[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]; }
		return boardVals;
	}
}

//members
Board.prototype.vals = {};
Board.prototype.$table = null;
Board.prototype.editor = {};
Board.prototype.orbSprites = {	0:'fire',
								1:'water',
								2:'wood',
								3:'light',
								4:'dark',
								5:'heal',
								6:'unknown' };

Board.prototype.boardBGs = {0:'bg_0', 
							1:'bg_1' };

//generate table cells
Board.prototype.make = function (b){
	var $t = $('<table>', {id: 'board'});
	var boardVals = b ? b : this.vals;
	var orbSprites = this.orbSprites;
	var boardBGs = this.boardBGs;


	for (var i=0; i < 5;++i){
		var $row = $('<tr>');
		var $populator = {};
		for (var j=0; j < 6; ++j){
			var bgClass=boardBGs[((i%2)+(j%2)+1)%2];	//calculate the bg class
			var orbClass=orbSprites[boardVals[6*i+j]] ? orbSprites[boardVals[6*i+j]] : orbSprites[6];
			var $orb = $('<div>').addClass('orb').addClass(orbClass);
			var $cell = $('<td>')
				.addClass(bgClass)
				.append($orb);
			$populator[j] = $cell;
			$row.append($cell);
		}
		$t.append($row);
	}
	this.$table = $t;
}

Board.prototype.update = function(id, action, newVal, oldVal){
	console.log('update table values');
	this.make(newVal);
	this.render();
}

Board.prototype.render = function(){
	//to rerender all we need to do is delete our current object from the DOM
	//add our new one
	$('#board').replaceWith(this.$table);
}

function Editor(){
	this.make();
	watch(this, "curOrb", this.activateOrb);
}

Editor.prototype.$panel = null;
Editor.prototype.active = false;
Editor.prototype.curOrb = 'wtf';
Editor.prototype.buffer = [];

Editor.prototype.activateOrb = function(id, action, newVal, oldVal){
	var $oldOrb = $(this.$orbs.get(oldVal));
	var $newOrb = $(this.$orbs.get(newVal));

	if (newVal != null){
		if ($oldOrb.length == 1){ //orb exists
			$oldOrb.toggleClass('selected unselected');
		}
		$newOrb.toggleClass('selected unselected');
	}
}

Editor.prototype.editOrb = function(event){
	if (!this.active){ return null; }

	//colour to add
	var colour = event.currentTarget.className.replace('orb', '').trim();

	//get our current orb
	var $gem = $(this.$orbs.get(this.curOrb));
	$gem.removeClass('fire water wood dark light heal unknown')
	.addClass(colour);

	//modify the vars from board
	this.buffer[this.curOrb] = sagashi($board.orbSprites, colour);

	this.curOrb = this.curOrb + 1;		//can't use ++ cuz it screws wiht the watch
}

Editor.prototype.make = function(){
	//orb selection panel
	var $panel = $('<ul>', {id:'board_editor'});
	var $orb0 = $('<li>').addClass('orb').addClass('fire').on('click', this.editOrb.bind(this));
	var $orb1 = $('<li>').addClass('orb').addClass('water').on('click', this.editOrb.bind(this));
	var $orb2 = $('<li>').addClass('orb').addClass('wood').on('click', this.editOrb.bind(this));
	var $orb3 = $('<li>').addClass('orb').addClass('light').on('click', this.editOrb.bind(this));
	var $orb4 = $('<li>').addClass('orb').addClass('dark').on('click', this.editOrb.bind(this));
	var $orb5 = $('<li>').addClass('orb').addClass('heal').on('click', this.editOrb.bind(this));

	var $onOffSwitch = $('<button>', {text:'Edit'})
	.on('click', this.edit.bind(this));

	$panel.append($onOffSwitch)
	.append($orb0)
	.append($orb1)
	.append($orb2)
	.append($orb3)
	.append($orb4)
	.append($orb5);

	this.$panel = $panel;
}

Editor.prototype.edit = function(event){
	//load orbs
	this.$orbs = $('#board').find('.orb');

	//toggle active
	this.active = !this.active;
	event.currentTarget.textContent = this.active ? 'Done' : 'Edit';

	if (this.active){		//edit mode on
		this.$orbs.toggleClass('unselected');
		this.curOrb = 0;
	}
	else {		//edit mode off
		this.$orbs.removeClass('unselected selected');
		this.curOrb = null;

		//push the changes into real board buffer
		$board.vals = this.buffer;
	}
}


