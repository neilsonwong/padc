function Codec (){ 
}

Codec.dec = 
	{
		"0":"00",
		"1":"01",
		"2":"02",
		"3":"03",
		"4":"04",
		"5":"05",
		"6":"06",
		"7":"10",
		"8":"11",
		"9":"12",
		"a":"13",
		"b":"14",
		"c":"15",
		"d":"16",
		"e":"20",
		"f":"21",
		"g":"22",
		"h":"23",
		"i":"24",
		"j":"25",
		"k":"26",
		"l":"30",
		"m":"31",
		"n":"32",
		"o":"33",
		"p":"34",
		"q":"35",
		"r":"36",
		"s":"40",
		"t":"41",
		"u":"42",
		"v":"43",
		"w":"44",
		"x":"45",
		"y":"46",
		"z":"50",
		"A":"51",
		"B":"52",
		"C":"53",
		"D":"54",
		"E":"55",
		"F":"56",
		"G":"60",
		"H":"61",
		"I":"62",
		"J":"63",
		"K":"64",
		"L":"65",
		"M":"66",
		"P":"",
		"Q":"",
		"R":"",
		"S":"",
		"T":"",
		"U":"",
		"V":"",
		"W":"",
		"X":"",
		"Y":"",
		"Z":""
	};
Codec.enc =
	{
		"00":"0",
		"01":"1",
		"02":"2",
		"03":"3",
		"04":"4",
		"05":"5",
		"06":"6",
		"10":"7",
		"11":"8",
		"12":"9",
		"13":"a",
		"14":"b",
		"15":"c",
		"16":"d",
		"20":"e",
		"21":"f",
		"22":"g",
		"23":"h",
		"24":"i",
		"25":"j",
		"26":"k",
		"30":"l",
		"31":"m",
		"32":"n",
		"33":"o",
		"34":"p",
		"35":"q",
		"36":"r",
		"40":"s",
		"41":"t",
		"42":"u",
		"43":"v",
		"44":"w",
		"45":"x",
		"46":"y",
		"50":"z",
		"51":"A",
		"52":"B",
		"53":"C",
		"54":"D",
		"55":"E",
		"56":"F",
		"60":"G",
		"61":"H",
		"62":"I",
		"63":"J",
		"64":"K",
		"65":"L",
		"66":"M"
	};

Codec.encode = function(array){
	var hash = "";
	//assume a valid array (fair assumption cuz i try to sanitize before adding stuff in)
	for (var i = 0; i < array.length; i+=2){
		var key=""+array[i]+array[i+1];
		if (key in Codec.enc){
			hash += Codec.enc[key];
		}
	}
	return hash;
}

Codec.decode = function(hash){
	var array = [];
	for (var i = 0; i<hash.length; ++i){
		var key = hash[i];
		if (key in Codec.dec){
			var a = parseInt(Codec.dec[key][0]);
			var b = parseInt(Codec.dec[key][1]);
			array.push(a != NaN ? a : 6);
			array.push(b != NaN ? b : 6);
		}
	}
	return array;
}