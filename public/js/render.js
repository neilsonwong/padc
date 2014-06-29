//this js generates the page


var $cells = {};
var boardVals;

//declare functions

//get GET Params
$.extend({getUrlVars:function(){for(var b,a=[],c=window.location.href.slice(window.location.href.indexOf("?")+1).split("&"),d=0;d<c.length;d++)b=c[d].split("="),a.push(b[0]),a[b[0]]=b[1];return a},getUrlVar:function(a){return $.getUrlVars()[a]}});

//generate the table cells
function makeBoard() {
	//set board to unselected if no preset
	if (!boardVals){ boardVals=[6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6]; }

	var boardBGs = {	0:'bg_0', 
						1:'bg_1' };

	var orbSprites = {	0:'fire',
						1:'water',
						2:'wood',
						3:'light',
						4:'dark',
						5:'heal',
						6:'unselected' };

	for (var i=0; i < 5;++i){
		var $row = $('<tr>');
		var $populator = {};
		for (var j=0; j < 6; ++j){
			var bgClass=boardBGs[((i%2)+(j%2)+1)%2];	//calculate the bg class
			var orbClass=orbSprites[boardVals[6*i+j]];
			var $orb = $('<div>').addClass('orb').addClass(orbClass);
			var $cell = $('<td>')
				.addClass(bgClass)
				.append($orb);
			$populator[j] = $cell;
			$row.append($cell);
		}
		$cells[i] = $populator;
		$board.append($row);
	}
}

//declare global elements
var $body = $('body');
var a = $.getUrlVar('board');
boardVals = a ? JSON.parse(a) : undefined; a=null;
var $board = $('<table>', {id: 'board'}); makeBoard();

//add board to body
function render() {
	$body.append($board);
}