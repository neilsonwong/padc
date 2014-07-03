
//Constants vars
function pazudora() { 
	//empty for now
}

pazudora.orbSprites = {	0:'fire',
				1:'water',
				2:'wood',
				3:'light',
				4:'dark',
				5:'heal',
				6:'unknown' };

function Board(){
	var self = this;
	this.vals = loadPresetBoard();
	this.make();
	this.editor = new Editor(this);


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


	var update = function(id, action, newVal, oldVal){
		console.log('update table values');
		self.render(newVal);
	}

	watch(this, "vals", update);
}

//members
Board.prototype.vals = {};
Board.prototype.$table = null;
Board.prototype.editor = {};

Board.prototype.boardBGs = {0:'bg_0', 
							1:'bg_1' };

//generate table cells
Board.prototype.make = function (b){
	var $t = $('<table>', {id: 'board'});
	var boardVals = b ? b : this.vals;
	var orbSprites = pazudora.orbSprites;
	var boardBGs = this.boardBGs;


	for (var i=0; i < 5;++i){
		var $row = $('<tr>');
		var $populator = {};
		for (var j=0; j < 6; ++j){
			var bgClass=boardBGs[((i%2)+(j%2)+1)%2];	//calculate the bg class
			var orbClass=pazudora.orbSprites[boardVals[6*i+j]] ? orbSprites[boardVals[6*i+j]] : orbSprites[6];
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

Board.prototype.render = function(newVals){
	//to rerender all we need to do is delete our current object from the DOM
	//add our new one
	var self = this;
	if (newVals != null){
		$('#board .orb').each(function(i, element){
			//careful context of this changed ! :O
			var $gem = $(element);
			$gem.removeClass('fire water wood dark light heal unknown')
			.addClass(pazudora.orbSprites[self.vals[i]]);
		});
	}
}

function Editor(parent){
	this.mommy = parent;
	var self = this;
	this.make();

	var activateOrb = function (id, action, newVal, oldVal){
		var $oldOrb = $(this.$orbs.get(oldVal));
		var $newOrb = $(this.$orbs.get(newVal));
		if ($newOrb.length == 0){
			//no more orbs to match
			//reset the orb to the last orb
			this.curOrb = this.$orbs.length-1;
		}

		if (newVal != null){
			if ($oldOrb.length == 1){ //orb exists
				$oldOrb.toggleClass('selected unselected');
			}
			$newOrb.toggleClass('selected unselected');
		}
	}


	watch(this, "curOrb", activateOrb);
}

Editor.prototype.$panel = null;
Editor.prototype.active = false;
Editor.prototype.curOrb = 'wtf';
Editor.prototype.buffer = [];
Editor.prototype.mommy = null;


Editor.prototype.editOrb = function(event){
	if (!this.active){ return null; }

	// //colour to add
	var colour = event.currentTarget.className.replace('orb', '').trim();

	// //get our current orb
	// var $gem = $(this.$orbs.get(this.curOrb));
	// $gem.removeClass('fire water wood dark light heal unknown')
	// .addClass(colour);

	//modify the vars from board
	// this.buffer[this.curOrb] = sagashi($board.orbSprites, colour);

	$board.vals[this.curOrb] = sagashi(pazudora.orbSprites, colour);
	++this.curOrb;		//can't use ++ cuz it screws wiht the watch
}

Editor.prototype.make = function(){
	var self = this;

	var $onOffSwitch = $('<button>', {text:'Edit'})
	.on('click', this.edit.bind(this));

	//we also need to glue a callback function onto the orbs from our board :P
	function poke(event){
		//load orbs
		if (!self.$orbs){
			self.$orbs = self.mommy.$table.find('.orb');
		}

		//when we are clicked change the edit mode
		if (!self.active){
			$onOffSwitch.click();
		}

		//set edit styles	
		var index = self.$orbs.index(event.currentTarget);
		self.curOrb = index;
	};

	this.mommy.$table.find('.orb').click(poke);

	//orb selection panel
	var $panel = $('<ul>', {id:'board_editor'});
	var $panelOrbs = [];
	for (var i=0; i<6;++i){
		var orbClass = pazudora.orbSprites[i];
		var $orb = $('<li>').addClass('orb').addClass(orbClass).on('click', this.editOrb.bind(this));
		$panelOrbs.push($orb);
	}

	$panel.append($onOffSwitch);
	for (var i=0;i<$panelOrbs.length;++i){
		$panel.append($panelOrbs[i]);
	}

	this.$panel = $panel;

}

Editor.prototype.edit = function(event){
	//load orbs
	this.$orbs = this.mommy.$table.find('.orb');

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
	}
}


