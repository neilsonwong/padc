//this js generates the page


//declare functions


// function makeMadoka(){
// 	var $share = $('<div>');
// 	var $shorten = $('<button>', { text: 'Share' })
// 		.addClass('btn')
// 		.click(homurachan);
// 	var $homura = $('<input>', { value: baseURL+'?board='+JSON.stringify(boardVals) })
// 		.addClass('hidden');
// 	var $godoka = $('<input>', { value: baseURL+'?hash='+JSON.stringify(boardVals).hashCode()})
// 		.addClass('hidden');
// 		// .focus(function(event){ $(this).select(); });
// 	$share.append($shorten)
// 		.append($homura)
// 		.append($godoka);
// 	return $share;
// }

function makeEditor(){
	//orb selection panel
	var $panel = $('<ul>', {id:'board_editor'});
	var $orb0 = $('<li>').addClass('orb').addClass('fire');
	var $orb1 = $('<li>').addClass('orb').addClass('water');
	var $orb2 = $('<li>').addClass('orb').addClass('wood');
	var $orb3 = $('<li>').addClass('orb').addClass('light');
	var $orb4 = $('<li>').addClass('orb').addClass('dark');
	var $orb5 = $('<li>').addClass('orb').addClass('heal');

	$panel.append($orb0)
	.append($orb1)
	.append($orb2)
	.append($orb3)
	.append($orb4)
	.append($orb5);
}


//declare global elements
//part of web page
var $body = $('body');
var baseURL = [location.protocol, '//', location.host, location.pathname].join('');

//layout elements
var $board = new Board();
// var $madoka = makeMadoka();

//main layout
// var $D2 = $('<div>').append($madoka);
var $D1;

//add board to body
function render() {
	//clear body
	$body.html('');

	//update content values
	 $D1 = $('<div>').append($board.$table);

	//render content
	$body.append($D1);
}
