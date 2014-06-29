//calculator functions
//assumes render.js has board already set up

//calculates the number of combos for each colour
	//returns a javascript object
	function getCombos(b){

		//internal function
		function addGroup(colour, group){
			//we have a group we want to add
			//check for the case where its like 1 1 1 0 0 0
			//									2 2 1 1 1 0

			if (!groups[colour]){ return; }		//don't need to calculate combos for this orb
			var CG=groups[colour]; var l = CG.length;

			for (var i=0; i<l; ++i) {
				var l2 = CG[i].length;
				for (var j=0; j<l2; ++j) {	//loop through each grouped orb
					if (group.indexOf(CG[i][j]+6) != -1){
						//we found our case
						var newGrp = CG[i].concat(group);
						CG[i] = newGrp; newGrp=null;
						return;
					}
				}
			}

			//we have not found a common orb in the matched orbs, it is a new group
			CG.push(group);
			++groups.combo;
		}

		function cleanupBuffers(){
			//deal with the orbs we stored up that are left in the buffers
			if (curGroup.length > 2){
				addGroup(curColour, curGroup);
				curGroup=undefined; curColour=undefined;
			}
			for (var j=0; j<6; ++j){
				if (v[j]>2){
					var oldColour = b[24+j];	//start from last row and increment the position
					var vGrp=[];
					for (var i=v[j]; i>0; --i){ vGrp.push(p-i*6); }
					addGroup(oldColour, vGrp);
				}	
			}
			v=null;		}

		//b = boardVals from render.js AKA array
		if (!b){return null;}

		var r,c; var p=0;
		var groups={ 0:[], 1:[], 2:[], 3:[], 4:[], 5:[], combo:0 };
		var curGroup=[];
		var curColour;
		var pv;
		var v=[1,1,1,1,1,1];
		for (r=0; r<5; ++r){
			for (c=0; c<6; ++c, ++p){
				//move horizontally through the row to get horizontal matches of min 3
				if (curColour==b[p]){	//if current colour matches current orb
					curGroup.push(p);
				}
				else {	//didn't match

					//add the existing group if its valid
					if (curGroup.length > 2){
						addGroup(curColour, curGroup);
					}

					//create a new group
					curColour = b[p];
					consec=1;
					curGroup=[];
					curGroup.push(p);
				}

				//do the vertical matches
				if (p>5 && b[p]==b[p-6]){		//if current orb matches previous increment
					++v[c];
				}
				else {		//didn't match
					if (v[c]>2){
						var oldColour = b[p-6];
						var vGrp=[];
						for (var i=v[c]; i>0; --i){ vGrp.push(p-i*6); }
						addGroup(oldColour, vGrp);
						v[c]=1;
					}
				}
			}
		}

		cleanupBuffers();
		return groups;
	}