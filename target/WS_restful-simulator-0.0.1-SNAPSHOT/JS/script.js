var myObj, $row, $text;
var resource = "campaigns.json";

function getDetailes(req, methode) {
//	alert("i'm in Details");
	// var required = document.getElementById(elementId)
	
	var url = 'http://localhost:8080/WS_restful-simulator/rest/' + resource;
	var xmlhttp = new XMLHttpRequest();
	var jsonObj = null;

	if (req == 3 || req == 4) {
		create_Update(req);
		document.getElementById("insertButton").onclick = function() {
			jsonObj = document.getElementById("inputJson").value;
			console.log(methode);
			xmlhttp.open(methode, url, true);
			xmlhttp.setRequestHeader("Content-Type", "application/json");
			xmlhttp.onreadystatechange = function() {// Call a function when
				// the state changes.
				if (this.readyState == 4 && this.status == 200) {
//					alert("-? ",methode);
					myObj = JSON.parse(this.responseText);
					console.log(myObj);
					getOne();
				} else if (this.status == 404) {
					error();
				}
			};
			xmlhttp.send(jsonObj);
		};
	} else {
		// $('#myModal').modal('show');
		// $('#myCreateModal').modal('hide');
		// document.getElementById('showData').style.display = 'block'; // show

		xmlhttp.onreadystatechange = function() {
			if (this.status == 500) {
				console.log("SERVER");
			} else if (this.readyState == 4 && this.status == 200) {
				if (req == 1) {
					myObj = JSON.parse(this.responseText);
					getAll();
				} else if (req == 2) {
					console.log("PPPPPPPPPPPPPPPPPPPPPP");
					create_Update();
					jsonObj = document.getElementById("inputJson").value;
					myObj = JSON.parse(this.responseText);
					getOne();
				} else if (req == 5) {
					console.log("DDD");
					deleteOne();
				}
			}
		};
		xmlhttp.open(methode, url, true);
		xmlhttp.setRequestHeader("Content-Type", "application/json");
		xmlhttp.send(jsonObj);
	}
}

function create_Update(req) {
//	console.log("i'm in create");
	var button;
	if (req == 3) {
		document.getElementById('insertButton').innerHTML = 'Insert';
		 button = document.getElementById('create');
		 button.setAttribute('data-toggle', 'modal');
			button.setAttribute('data-target', '#myCreateModal');
	} else if (req == 4) {
		document.getElementById('insertButton').innerHTML = 'Update';
		 button = document.getElementById('update' + $text);
		 button.setAttribute('data-toggle', 'modal');
		 button.setAttribute('data-target', '#myCreateModal');
			$('#myCreateModal').modal('show');

	}
	
//	document.getElementById("insertButton").onclick = function() {
//		var jsonObj = document.getElementById("inputJson").value;
//		console.log(jsonObj);
//		return jsonObj;
//	};
}
function error() {
	// console.log("i'm in error");

	document.getElementById('headMsg').innerHTML = 'Error!';
	document.getElementById('bodyMsg').innerHTML = 'Please insert new object';
	document.getElementById('bodyMsg').setAttribute('class',
			'alert alert-danger');
	var button = document.getElementById('create');
	button.setAttribute('data-toggle', 'modal');
	button.setAttribute('data-target', '#myModal');
	$('#myModal').modal('show');
	$('#myCreateModal').modal('hide');

}
function createJsonTree(obj) {
	return result = JSONTree.create(obj);
}
function srch() {
	// console.log("i'm in srch");
	console.log("==========");
	$(document).ready(
			function() {
				$(searchTab).show();
				$("#myInputSearch").on(
						"keyup",
						function() {
							var value = $(this).val().toLowerCase();
							$("#myTable tr").filter(
									function() {
										$(this).toggle(
												$(this).text().toLowerCase()
														.indexOf(value) > -1)
									});
						});
			});

}
function getAll() {
	// alert("i'm in all");
	var col = [];
	var idIndex = 0;

	col.push("Operation");
	for (var i = 0; i < myObj.length; i++) {
		for ( var key in myObj[i]) {

			if (col.indexOf(key) === -1) {
				col.push(key);
			}
			if (key == "ID") {
				idIndex = col.indexOf(key);
				// console.log(idIndex);
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
	tbody.setAttribute('id', 'myTable');

	table.appendChild(tbody);
	// ADD JSON DATA TO THE TABLE AS ROWS.
	for (var i = 0; i < myObj.length; i++) {
		tr = document.createElement("tr");
		for (var j = 0; j < col.length; j++) {
			if (j == 0) {
				var tabCell = tr.insertCell(-1);
				var buttonGroup = document.createElement('div');
				buttonGroup.setAttribute('class', 'btn-group-vertical');
				buttonGroup.setAttribute('id', 'buttonsGroup');

				// var button = document.createElement('button');
				// button.setAttribute('id', 'get');
				// button.setAttribute('type', 'Submit');
				// button.setAttribute('class', 'btn btn-success');
				// button.innerHTML = "Get ID";
				// button.onclick = function() {
				// getDetailes(2, 'GET');
				// };
				// buttonGroup.appendChild(button);

				button = document.createElement('button');
				// button.setAttribute('id', 'create');
				button.setAttribute('type', 'Submit');
				button.setAttribute('class', 'btn btn-warning use-address');
				button.innerHTML = "Update";
				button.onclick = function() {
					resource = "campaigns.json";
					console.log("PPP");
					$row = $(this).closest("tr"); // Find the row
					$text = $row.find("._id").text(); // Find the text
					button.setAttribute('id', 'update' + $text);
					console.log("-->",'update' + $text);
//					resource = resource + "/" + $text;
//					console.log(resource);
					getDetailes(4, 'PATCH');
					resource = "campaigns.json";
				};
				
				buttonGroup.appendChild(button);

				button = document.createElement('button');
				button.setAttribute('type', 'Submit');
				button.setAttribute('class', 'btn btn-danger use-address');
				// button.setAttribute('onclick', 'getDetailes(5, "DELETE");');
				button.innerHTML = "Delete";

				button.onclick = function() {
					resource = "campaigns.json";
					console.log("PPP");
					$row = $(this).closest("tr"); // Find the row
					$text = $row.find("._id").text(); // Find the text

					button.setAttribute('id', 'del' + $text);
					console.log($text);
					resource = resource + "/" + $text;
					console.log(resource);
					getDetailes(5, 'DELETE');
					resource = "campaigns.json";
				};

				buttonGroup.appendChild(button);
				tabCell.appendChild(buttonGroup);
				continue;
			}

			var tabCell = tr.insertCell(-1);
			var cellObj = myObj[i][col[j]];
			// console.log(myObj[i][j]);
			if (j == idIndex) {
				// var id= myObj[i][col[j]] ;
				tabCell.setAttribute('class', '_id');

			}
			if (typeof (cellObj) == 'object') {
				var tree = createJsonTree(myObj[i][col[j]]);
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
	srch();

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
	tbody.setAttribute('id', 'myTable');

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
	srch();

}

function deleteOne() {
	// alert("i'm in delete");
	// document.getElementById('showData').style.display = 'none'; // Hide
	var button = document.getElementById('del' + $text);
	document.getElementById('headMsg').innerHTML = 'Delete!';
	document.getElementById('bodyMsg').innerHTML = 'Item deleted successfully';
	document.getElementById('bodyMsg').setAttribute('class',
			'alert alert-success');

	button.setAttribute('data-toggle', 'modal');
	button.setAttribute('data-target', '#myModal');
	$('#myModal').modal('show');
	$row.hide();

}
