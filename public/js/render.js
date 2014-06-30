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
