var myObj;
function getDetailes(req, methode) {
	var resource = document.getElementById('resource').value;
	var url = 'http://localhost:8080/WS_restful-simulator/rest/' + resource;
	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
		if (this.status == 500) {
			console.log("SERVER");
		} else if (this.readyState == 4 && this.status == 200) {
			// console.log("YUP");
			// console.log(JSON.parse(this.responseText));
			if (req == 1) {
				myObj = JSON.parse(this.responseText);
				getAll();
			} else if (req == 2) {
				myObj = JSON.parse(this.responseText);
				getOne();
			} else if (req == 5) {
				console.log("I DELETE IT");
				deleteOne();
			}
		} else if (this.status == 404) {
			console.log("ERORRRRRRRR");
		}
	};

	xmlhttp.open(methode, url, true);
	xmlhttp.send(null);

}
function createJsonTree(obj) {
	return result = JSONTree.create(obj);
}

function getAll() {
	var col = [];
	// col.push('#');
	// list of object keys
	for (var i = 0; i < myObj.length; i++) {
		for ( var key in myObj[i]) {
			if (col.indexOf(key) === -1) {
				col.push(key);
			}
		}
	}
	// CREATE DYNAMIC TABLE.
	var table = document.createElement("table");
	table.className = "table table-bordered table-hover table-fixed";

	// CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

	var thead = document.createElement("thead");
	table.appendChild(thead);

	var tr = document.createElement("tr"); // TABLE ROW.
	tr.className = 'success';

	// tr.addChild(inp);
	// <th><input type="checkbox" id="checkall" /></th>

	thead.appendChild(tr);

	for (var i = 0; i < col.length; i++) {

		th = document.createElement("th");

		th.innerHTML = col[i];
		tr.appendChild(th);
	}

	var tbody = document.createElement('tbody');
	table.appendChild(tbody);
	// ADD JSON DATA TO THE TABLE AS ROWS.
	for (var i = 0; i < myObj.length; i++) {
		tr = document.createElement("tr");

		for (var j = 0; j < col.length; j++) {

			var tabCell = tr.insertCell(-1);
			// if (j == 0) {
			// var chkBox = document.createElement('input');
			// chkBox.setAttribute('type', 'checkbox');
			// tabCell.appendChild( chkBox);
			// continue;
			// }
			var cellObj = myObj[i][col[j]];
			if (typeof (cellObj) == 'object') {
				var tree = createJsonTree(myObj[i][col[j]]);
				console.log(myObj[i]);
				tabCell.innerHTML = tree;
			} else {
				tabCell.innerHTML = myObj[i][col[j]];
			}
		}
		tbody.appendChild(tr);
	}
	// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
	var divContainer = document.getElementById("showData");
	divContainer.innerHTML = "";
	divContainer.appendChild(table);

}

function getOne() {
	var col = [];
	// list of object keys
	for ( var key in myObj) {
		if (col.indexOf(key) === -1) {
			col.push(key);
		}

	}
	console.log(col);
	// CREATE DYNAMIC TABLE.
	var table = document.createElement("table");
	table.className = "table table-bordered table-hover table-fixed";

	// CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

	var thead = document.createElement("thead");
	table.appendChild(thead);

	var tr = document.createElement("tr"); // TABLE ROW.
	tr.className = 'success';
	thead.appendChild(tr);

	for (var i = 0; i < col.length; i++) {
		th = document.createElement("th");
		th.innerHTML = col[i];
		tr.appendChild(th);
	}

	var tbody = document.createElement('tbody');
	table.appendChild(tbody);
	// ADD JSON DATA TO THE TABLE AS ROWS.

	tr = document.createElement("tr");

	for (var j = 0; j < col.length; j++) {

		var tabCell = tr.insertCell(-1);
		// if (j == 0) {
		// var chkBox = document.createElement('input');
		// chkBox.setAttribute('type', 'checkbox');
		// tabCell.appendChild( chkBox);
		// continue;
		// }
		var cellObj = myObj[col[j]];
		if (typeof (cellObj) == 'object') {
			var tree = createJsonTree(myObj[col[j]]);
			// console.log(myObj[i]);
			tabCell.innerHTML = tree;
		} else {
			tabCell.innerHTML = myObj[col[j]];
		}
	}
	tbody.appendChild(tr);

	// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
	var divContainer = document.getElementById("showData");
	divContainer.innerHTML = "";
	divContainer.appendChild(table);

}

function deleteOne() {
	// data-toggle="modal" data-target="#myModal"
	var button = document.getElementById('del');
	button.setAttribute('data-toggle', 'modal');
	button.setAttribute('data-target', '#myModal');
	$('#myModal').modal('show'); 
	
//	 $(window).load(function(){        
//		   $('#myModal').modal('show');
//		    }); 


}