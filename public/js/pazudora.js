//Global state of the page

function Pazudora() {
	var self = this;
	this.baseURL = [location.protocol, '//', location.host, location.pathname].join('');

	this.$board = new Board();

	//add only renderable properties
	(function pushContent(){
	    for (key in self) {
	        if (self.hasOwnProperty(key) && self[key].hasOwnProperty('$html')){
				self.$content.push(self[key]);
	        }
	    }
	})();
}

//Gloabl Constants vars
Pazudora.orbSprites = {	0:'fire',
				1:'water',
				2:'wood',
				3:'light',
				4:'dark',
				5:'heal',
				6:'unknown' };

//vars representing the global state
Pazudora.prototype.$board = {};
Pazudora.prototype.$content = [];
Pazudora.prototype.baseURL = '';

//methods
Pazudora.prototype.render = function() {
	var $body = $('body');

	//render content
	for (var i=0; i<this.$content.length;++i) {
		$body.append(this.$content[i].$html);
	}
}

