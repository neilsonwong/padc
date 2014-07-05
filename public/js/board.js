//board.js
//all the functions involving board creation and interactions

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
			console.log('Invalid parameters passed to page');
			console.log(e);
		}

		//set board to unselected if no preset
		if (!boardVals){ boardVals = Board.defaultBoard; }
		return boardVals;
	}


	var update = function(id, action, newVal, oldVal){
		self.render(newVal);
	}

	watch(this, "vals", update);
}

Board.boardBGs = {0:'bg_0', 
							1:'bg_1' };
Board.defaultBoard = [6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6];

//members
Board.prototype.vals = Board.defaultBoard;
Board.prototype.$table = null;
Board.prototype.editor = {};

//generate table cells
Board.prototype.make = function (b){
	var $t = $('<table>', {id: 'board'});
	var boardVals = b ? b : this.vals;
	var orbSprites = Pazudora.orbSprites;
	var boardBGs = Board.boardBGs;


	for (var i=0; i < 5;++i){
		var $row = $('<tr>');
		for (var j=0; j < 6; ++j){
			var bgClass=boardBGs[((i%2)+(j%2)+1)%2];	//calculate the bg class
			var orbClass=Pazudora.orbSprites[boardVals[6*i+j]] ? orbSprites[boardVals[6*i+j]] : orbSprites[6];
			var $orb = $('<div>', {class:'orb '+orbClass});
			var $cell = $('<td>', {class:bgClass}).append($orb);
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
		self.$table.find('.orb').each(function(i, element){
			//careful context of this changed ! :O
			var $gem = $(element);
			var colour = Pazudora.orbSprites[self.vals[i]];
			if (colour == null){ 
				self.vals[i] = 6;		//set colour to unknown if invalid
				colour = Pazudora.orbSprites[self.vals[i]];	
			}
			$gem.removeClass('fire water wood dark light heal unknown')
			.addClass(colour);
		});
	}
}

function Editor(parent){
	this.mommy = parent;
	var self = this;
	this.make();

	//load orbs
	this.$orbs = this.mommy.$table.find('.orb');

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

	function toggleActive(){
		var boardOrbs = this.$orbs;
		var panelOrbs = this.$panel.find('.orb');
		if (this.active){		//edit mode on
			boardOrbs.toggleClass('unselected');
			//edit mode on, lets bind this stupid click event
			$(document).on('mouseup', urusai);
			//bind clicks to panel
			panelOrbs.on('click', this.editOrb.bind(this));
		}
		else {		//edit mode off
			this.$orbs.removeClass('unselected selected');
			this.curOrb = null;
			$(document).off('mouseup');
			panelOrbs.off('click');
		}

		function urusai (event){
			var pos = self.$panel.position();
			var x = self.$panel.width() + pos.left;
			var y = self.$panel.height() + pos.top;
			if (event.clientX > x || event.clientY > y){	//no longer inside editor, lets turn it off
				self.toggleEdit();
			}
		}
	}

	watch(this, "curOrb", activateOrb);
	watch(this, "active", toggleActive);
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

	this.mommy.vals[this.curOrb] = sagashi(Pazudora.orbSprites, colour);
	++this.curOrb;
}

Editor.prototype.make = function(){
	var self = this;

	//we also need to glue a callback function onto the orbs from our board :P
	function poke(event){
		//when we are clicked change the edit mode
		if (!self.active){
			self.toggleEdit();
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
		var orbClass = Pazudora.orbSprites[i];
		var $orb = $('<li>', {class:'orb '+orbClass});
		$panelOrbs.push($orb);
	}

	for (var i=0;i<$panelOrbs.length;++i){
		$panel.append($panelOrbs[i]);
	}

	this.$panel = $panel;
}

Editor.prototype.toggleEdit = function(){
	//toggle active
	this.active = !this.active;
}


