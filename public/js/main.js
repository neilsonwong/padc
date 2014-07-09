var pad = new Pazudora();
pad.render();


function Console (){
	var $container = $('<div>', {id:'console', class:'console inactive'});
	var $display = $('<div>', {class:'consoleWindow display', html:"hi"});
	var $entry = $('<div>', {class:'consoleWindow entry'});

	$container.append($display);
	$container.append($entry);
	this.$html = $container;
}

Console.prototype.inputBar = {};
Console.prototype.$html = {};

var c = new Console();

$('body').append(c.$html);