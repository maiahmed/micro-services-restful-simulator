var myObj;
function getDetailes(req, methode) {
	// alert("i'm in Details");
	var resource = document.getElementById('resource').value;
	var url = 'http://localhost:8080/WS_restful-simulator/rest/' + resource;
	var xmlhttp = new XMLHttpRequest();
	var jsonObj = null;

	if (req == 3) {
		$('#myModal').modal('hide');
		$('#myCreateModal').modal('hide');
		document.getElementById('showData').style.display = 'block'; // Hide

		createOne();
		document.getElementById("insertButton").onclick = function() {
			var jsonObj = document.getElementById("inputJson").value;
			xmlhttp.open(methode, url, true);
			xmlhttp.setRequestHeader("Content-Type", "application/json");
			xmlhttp.onreadystatechange = function() {// Call a function when
				// the state changes.
				if (this.readyState == 4 && this.status == 200) {
					myObj = JSON.parse(this.responseText);
					console.log(myObj);
					getOne();
				}
			};
			xmlhttp.send(jsonObj);
		};
	} else {
		$('#myModal').modal('hide');
		$('#myCreateModal').modal('hide');
		document.getElementById('showData').style.display = 'block'; // Hide

		xmlhttp.onreadystatechange = function() {

			if (this.status == 500) {
				console.log("SERVER");
			} else if (this.readyState == 4 && this.status == 200) {
				if (req == 1) {
					myObj = JSON.parse(this.responseText);
					getAll();
				} else if (req == 2 || req == 4) {
					myObj = JSON.parse(this.responseText);
					getOne();
				} else if (req == 5) {
					deleteOne();
				}
			}
		};
		xmlhttp.open(methode, url, true);
		xmlhttp.send(jsonObj);
	}
}

function createOne() {
	var button = document.getElementById('create');
	button.setAttribute('data-toggle', 'modal');
	button.setAttribute('data-target', '#myCreateModal');
	document.getElementById("insertButton").onclick = function() {
		var jsonObj = document.getElementById("inputJson").value;
		console.log(jsonObj);
		return jsonObj;
	};
}
function error() {
	document.getElementById('headMsg').innerHTML = 'Error!';
	document.getElementById('bodyMsg').innerHTML = 'Please insert correct path';
	document.getElementById('bodyMsg').setAttribute('class',
			'alert alert-danger');
	var button = document.getElementById('get');
	button.setAttribute('data-toggle', 'modal');
	button.setAttribute('data-target', '#myModal');
	$('#myModal').modal('show');

}
function createJsonTree(obj) {
	return result = JSONTree.create(obj);
}

function getAll() {
	// alert("i'm in all");
	var col = [];
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
			var cellObj = myObj[i][col[j]];

			if (typeof (cellObj) == 'object') {
				var tree = createJsonTree(myObj[i][col[j]]);

				console.log(tree);
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
	// alert("i'm in one");

	document.getElementById('showData').style.display = 'block'; // Hide

	var col = [];
	// list of object keys
	for ( var key in myObj) {
		if (col.indexOf(key) === -1) {
			col.push(key);
		}

	}
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
	// alert("i'm in delete");
	document.getElementById('showData').style.display = 'none'; // Hide
	var button = document.getElementById('del');
	document.getElementById('headMsg').innerHTML = 'Delete!';
	document.getElementById('bodyMsg').innerHTML = 'Item deleted successfully';
	document.getElementById('bodyMsg').setAttribute('class',
			'alert alert-success');
	button.setAttribute('data-toggle', 'modal');
	button.setAttribute('data-target', '#myModal');
	$('#myModal').modal('show');

}
