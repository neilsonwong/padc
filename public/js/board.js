//board.js
//all the functions involving board creation and interactions

function Board(){
	var self = this;
	this.vals = loadPresetBoard();
	this.$table = this.make();
	this.editor = new Editor(this);
	this.infos = new LMeta();


	this.$html = $('<div>', {class:'module'})
	.append(this.infos.$infoBox)
	.append(this.$table)
	.append(this.editor.$panel);


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
Board.prototype.infos = {};
Board.prototype.$html = {};

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
	return $t;
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
		panelOrbs.find('ul.hotkey').toggleClass('hidden');
		
		if (this.active){		//edit mode on
			boardOrbs.toggleClass('unselected');
			//edit mode on, lets bind this stupid click event
			$(document).on('mouseup', urusai);
			//bind clicks to panel
			panelOrbs.addClass('levitate');
			panelOrbs.on('click', this.editOrb.bind(this));
		}
		else {		//edit mode off
			panelOrbs.removeClass('levitate');
			this.$orbs.removeClass('unselected selected');
			this.curOrb = null;
			$(document).off('mouseup');
			panelOrbs.off('click');
		}

		function urusai (event){
			var x = event.clientX;
			var y = event.clientY;
			var bPos = self.mommy.$table.position();
			var pos = self.$panel.position();
			var minX = bPos.left;
			var minY = bPos.top;
			var maxX = self.$panel.outerWidth(true) + pos.left;
			var maxY = self.$panel.outerHeight(true) + pos.top;
			if (x > maxX || y > maxY || x < minX || y < minY){	//no longer inside editor, lets turn it off
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

	this.mommy.vals[this.curOrb] = parseInt($(event.currentTarget).attr('orbType'));
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
	var hotkeys = ['a','s','d','f','g','h'];
	for (var i=0; i<6;++i){
		var orbClass = Pazudora.orbSprites[i];
		var $HK1 = $('<li>', {class:'hotkey',html:i});
		var $HK2 = $('<li>', {class:'hotkey',html:hotkeys[i]});
		var $HKS = $('<ul>',{class:'hotkey hidden'}).append($HK1).append($HK2);

		var $orb = $('<li>', {class:'orb '+orbClass, orbType:i})
		.append($HKS);

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


function LMeta(){
	var $metatron = $('<div>', {class:'speaker light-metatron'});
	this.$shujinko = $metatron;
	this.setText(this.defaultText);
	var hasSpoken = $('<div>', {id:'infobox', class:'encapsulate'})
	.append(this.$shujinko)
	.append(this.$bubble);
	this.$infoBox = hasSpoken;
}

LMeta.prototype.text = '';
LMeta.prototype.defaultText = 'Click on an orb to edit it\nYou can pick orbs quickly using the keyboard hotkeys\nClick anywhere else when you are done';
LMeta.prototype.$shujinko = {};
LMeta.prototype.$bubble = {};
LMeta.prototype.$infoBox = {};

LMeta.prototype.setText = function(text){
	var bubble = $('<div>', {id:'LMeta_is_talking', class:'bubble bubble-left'});
	var parts = text.split('\n');
	for (var i=0; i<parts.length; ++i){
		var $newLine = $('<p>', {html:parts[i]});
		bubble.append($newLine);
	}
	this.text = text;
	this.$bubble = bubble;
}
