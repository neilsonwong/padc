var pad = new Pazudora();
pad.render();


function Console (){
	var self = this;
	var oldEventBindings = [];

	var $container = $('<div>', {id:'console', class:'console inactive'});
	var $display = $('<div>', {class:'consoleWindow display', html:'Thanks for using our Pazudora tool! This console is here cuz I\'m a nerd. type \'help\' for available commands'});
	var $entry = $('<div>', {class:'consoleWindow entry'});

	this.$outputBar = $display;
	this.$inputBar = $entry;

	$container.append($display);
	$container.append($entry);
	$container.on('click',activate);
	this.$html = $container;

	function activate(){
		if (!self.active){		//activate
			self.active = true;
			self.$html.toggleClass('inactive');

			//remove old bindings and push them onto the stack

			//bind deactivate and keyboard stuff
			addNewBinding(document, 'mouseup', clickStuff);
			addNewBinding(document, 'keydown', typeStuff);
		}

		function clickStuff(event){
			var y = event.clientY;
			var pos = self.$html.position();
			var minY = pos.top;
			if (y < minY){	//no longer inside editor, lets turn it off
				self.active = false;
				self.$html.toggleClass('inactive');
				$(document).off('mouseup');
				$(document).off('keydown');
			}
		}

		function typeStuff(e){
			e.preventDefault();
			var key = e.keyCode;
			var caps = isCapsLockOn(e);
			var shift = e.shiftKey;
			var ctrl = e.ctrlKey;

			if (ctrl){
				//copy and paste code for later
			}

			switch(key){
				case 8:		//delete key
					var current = self.$inputBar.html();
					self.$inputBar.html(current.slice(0, -1));
					break;
				case 13:
				default:
					var char = String.fromCharCode(event.which);
					char = shift || caps ? char : char.toLowerCase();
					self.$inputBar.append(char);
					break;
			}
			function isCapsLockOn(e) {
				return false;
			}
		}

		function addNewBinding(element, trigger, func){
			var eves = $._data(element,'events');
			if (eves != null && trigger in eves){
				//assume only 1 click handler
				var binding = {};
				binding['event'] = trigger;
				binding['handler'] = eves[trigger][0].handler;
				oldEventBindings.push(binding);
				element.off(trigger);
			}
			$(element).on(trigger,func);
		}

		function restoreBindings(){
			for (var i = 0; i < oldEventBindings.length; ++i){
				var trigger = oldEventBindings[i]['event'];
				var handler = oldEventBindings[i]['handler'];
				$(document).on(trigger, handler);
			}
		}
	}
}

Console.prototype.$outputBar = {};
Console.prototype.$inputBar = {};
Console.prototype.$html = {};
Console.prototype.active = false;

var c = new Console();

$('body').append(c.$html);