function Board(){
	this.vals = loadPresetBoard();
	this.make();
	this.watch("vals", this.update);


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
Board.prototype.$hash = "";

//generate table cells
Board.prototype.make = function (b){
	var $t = $('<table>', {id: 'board'});
	var boardVals = b ? b : this.vals;

	var boardBGs = {	0:'bg_0', 
						1:'bg_1' };

	var orbSprites = {	0:'fire',
						1:'water',
						2:'wood',
						3:'light',
						4:'dark',
						5:'heal',
						6:'unknown' };

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

Board.prototype.update = function(id, oldVal, newVal){
	console.log('update table values');
	this.make(newVal);
	this.render();
}

Board.prototype.render = function(){
	//to rerender all we need to do is delete our current object from the DOM
	//add our new one
	$('#board').replaceWith(this.$table);
}
