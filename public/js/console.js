function Console (){
	var self = this;
	var oldEventBindings = [];

	var $container = $('<div>', {id:'console', class:'console inactive'});
	var $display = $('<div>', {class:'consoleWindow display', html:'Thanks for using our Pazudora tool! This console is here cuz I\'m a nerd. type \'help\' for available commands'});
	var $entry = $('<div>', {class:'consoleWindow entry', 'data-value':''});
	var $before = $('<span>');
	var $after = $('<span>');
	var $blinker = $('<span>', {class:'blinker', html:'&nbsp;'});
	$entry.append($before).append($blinker).append($after);

	this.$outputBar = $display;
	this.$inputBar = $entry;
	this.$blinker = $blinker;
	this.$e1 = $before;
	this.$e2 = $after;
	this.cmdStack = [];
	this.stackPtr = 0;

	this.cmdDef = this.loadCommands();

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
			var current = self.$inputBar.attr('data-value');

			switch(key){
				case 8:		//delete key
					self.$inputBar.attr('data-value', current.slice(0, -1));
					decIndex();
					break;
				case 13:	//enter
					self.cmdStack.push(current);
					self.stackPtr = self.cmdStack.length;
					self.$inputBar.attr('data-value', '');
					//submit command
					self.run(current);
					break;
				case 37:	//right arrow
					decIndex();
					break;
				case 39:	//left arrow
					incIndex();
					break;
				case 38:	//up arrow
					if (self.stackPtr > 0){
						var getto = self.cmdStack[--self.stackPtr];
						self.$inputBar.attr('data-value', getto);
						maxIndex();
					}
					break;
				case 40:	//down arrow
					if (self.stackPtr < self.cmdStack.length){
						var getto = self.cmdStack[++self.stackPtr];
						self.$inputBar.attr('data-value', getto);
						maxIndex();
					}
					break;
				default:
					var char = String.fromCharCode(event.which);
					char = shift || caps ? char : char.toLowerCase();
					self.$inputBar.attr('data-value', current+char);
					incIndex();
					break;
			}
			render();

			function isCapsLockOn(e) {
				return false;
			}

			function render(){
				var text = self.$inputBar.attr('data-value');
				var idx = self.$charIndex;
				var part1 = text.slice(0,idx);
				var part2 = text.slice(idx+1);
				var blink = text.charAt(idx);
				if (blink.length == 0){ blink = '&nbsp;'; }
				self.$e1.html(part1);
				self.$e2.html(part2);
				self.$blinker.html(blink);
			}

			function decIndex(){
				if (self.$charIndex > 0)
					--self.$charIndex;
			}
			function incIndex(){
				if (self.$charIndex < self.$inputBar.attr('data-value').length)
					++self.$charIndex;
			}
			function maxIndex(){
				self.$charIndex = self.$inputBar.attr('data-value').length;
			}
			function minIndex(){
				self.$charIndex = 0;
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
Console.prototype.$charIndex = 0;
Console.prototype.$html = {};
Console.prototype.active = false;
Console.prototype.renderDisplay = function(text){
	this.$outputBar.html(text);
}

Console.prototype.loadCommands = function(){
	//all handlers are run assuming that the context is the console object
	var defs = {};

	var cmdHelp = function(){
		this.renderDisplay('I\'m Helping!');
	}

	defs['help'] = cmdHelp;

	return defs;
}

Console.prototype.run = function(cmd){
	if (cmd in this.cmdDef){
		this.cmdDef[cmd].bind(this)();
	}
	else {
		this.renderDisplay(cmd+': command not found');
	}
}
