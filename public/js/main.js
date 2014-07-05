var pad = new Pazudora();
pad.render();

function hiz () {console.log('hi3');}
var hi = $('<div>', {class:'module', html:'<p>this is a lot of text </p>'});
var hi2 = $('<div>', {class:'module wood', 
					click:function(){console.log('hi2');}});
var hi3 = $('<div>', {class:'module fire', 
					click:hiz});


$('body').append(hi);
$('body').append(hi2);
$('body').append(hi3);