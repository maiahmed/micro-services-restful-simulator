var myObj, $row, $text;
var resource = "campaigns.json";

function getDetailes(req, methode) {
	var url = 'http://localhost:8080/WS_restful-simulator/rest/' + resource;
	var xmlhttp = new XMLHttpRequest();
	var jsonObj = null;

// if (req == 3 || req == 4) {
// create_Update(req);
// document.getElementById("insertButton").onclick = function() {
// jsonObj = document.getElementById("inputJson").value;
// console.log(methode);
// xmlhttp.open(methode, url, true);
// xmlhttp.setRequestHeader("Content-Type", "application/json");
// xmlhttp.onreadystatechange = function() {// Call a function when
// // the state changes.
// if (this.readyState == 4 && this.status == 200) {
// // alert("-? ",methode);
// myObj = JSON.parse(this.responseText);
// console.log(myObj);
// getOne();
// } else if (this.status == 404) {
// error();
// }
// };
// xmlhttp.send(jsonObj);
// };
// } else {
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
function updateObj() {
	
}
function create_Update(req) {
	var button;
	if (req == 3) {
		$('#createForm').show();
	} else if (req == 4) {
		document.getElementById('insertButton').innerHTML = 'Update';
		button = document.getElementById('update' + $text);
		button.setAttribute('data-toggle', 'modal');
		button.setAttribute('data-target', '#myCreateModal');
		$('#myCreateModal').modal('show');

	}

}
function error() {
	 console.log("i'm in error");

// $('#myCreateForm').hide();
	document.getElementById('headMsg').innerHTML = 'Error!';
	document.getElementById('bodyMsg').innerHTML = 'Please insert new object';
	document.getElementById('bodyMsg').setAttribute('class',
			'alert alert-danger');
	
	var button = document.getElementById('input');
	button.setAttribute('data-toggle', 'modal');
	button.setAttribute('data-target', '#myModal');
	$('#myModal').modal('show');
	console.error("5lst");
	

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
	resource = "campaigns.json";
	var url = 'http://localhost:8080/WS_restful-simulator/rest/' + resource;
	var xmlhttp = new XMLHttpRequest();
	var jsonObj = null;
	xmlhttp.onreadystatechange = function() {
		if (this.status == 500) {
			console.log("SERVER");
		} else if (this.readyState == 4 && this.status == 200) {
				myObj = JSON.parse(this.responseText);
				var col = [];
				var idIndex = 0;

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
				col.push("Operation");
				// alert(col.length);
				// CREATE DYNAMIC TABLE.
				var table = document.createElement("table");
				table.className = "table table-bordered table-hover table-fixed";

				// CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS
				// ABOVE.
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
						if (j == (col.length - 1)) {

							var tabCell = tr.insertCell(-1);
							var buttonGroup = document.createElement('div');
							buttonGroup.setAttribute('class', 'btn-group-vertical');
							buttonGroup.setAttribute('id', 'buttonsGroup');

							button = document.createElement('a');
							// button.setAttribute('id', 'create');
							button.setAttribute('type', 'Submit');
							button.setAttribute('class', 'use-address');
							button.setAttribute('style', 'cursor:pointer');
							var span = document.createElement('span');
							span.setAttribute('class',
									'glyphicon glyphicon-edit text-primary');
							var strong = document.createElement('strong');
							strong.innerHTML = "Update";
							span.appendChild(strong);
							button.appendChild(span);

							// button.innerHTML = "Update";
							button.onclick = function() {
								resource = "campaigns.json";
								console.log("PPP");
								$row = $(this).closest("tr"); // Find the row
								$text = $row.find("._id").text(); // Find the
																	// text
								button.setAttribute('id', 'update' + $text);
								console.log("-->", 'update' + $text);
								getDetailes(4, 'PATCH');
								resource = "campaigns.json";
							};

							buttonGroup.appendChild(button);

							button = document.createElement('a');
							button.setAttribute('type', 'Submit');
							button.setAttribute('class', 'use-address');
							button.setAttribute('style', 'cursor:pointer');
							var span = document.createElement('span');
							span.setAttribute('class',
									'glyphicon glyphicon-remove text-danger');
							var strong = document.createElement('strong');
							strong.innerHTML = "Delete";
							span.appendChild(strong);
							button.appendChild(span);
							// button.setAttribute('onclick', 'getDetailes(5,
							// "DELETE");');

							button.onclick = function() {
								resource = "campaigns.json";
								console.log("PPP");
								$row = $(this).closest("tr"); // Find the row
								$text = $row.find("._id").text(); // Find the
																	// text

								button.setAttribute('id', 'del' + $text);
								console.log($text);
								resource = resource + "/" + $text;
								console.log(resource);
								var r = confirm("Are you sur from deleting this item ?");
								if (r == true) {
									deleteObj(5, 'DELETE');
							    } else {
							    	alert("Operation Failed!");
							    }
								
								
								resource = "campaigns.json";
							};
							buttonGroup.appendChild(button);
							tabCell.appendChild(buttonGroup);
							continue;
						}

						var tabCell = tr.insertCell(-1);
						var cellObj = myObj[i][col[j]];
						if (j == idIndex) {
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
				// FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A
				// CONTAINER.
				var divContainer = document.getElementById("showData");
				divContainer.innerHTML = "";
				divContainer.appendChild(table);
				srch();

		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	xmlhttp.send(jsonObj);
	
	
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

function deleteObj() {
	var url = 'http://localhost:8080/WS_restful-simulator/rest/' + resource;
	var xmlhttp = new XMLHttpRequest();
	var jsonObj = null;

		 xmlhttp.onreadystatechange = function() {
				if (this.status == 500) {
					console.log("SERVER");
				} else if (this.readyState == 4 && this.status == 200) {
						console.log("DDD");
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
			};
			
			xmlhttp.open("DELETE", url, true);
			xmlhttp.setRequestHeader("Content-Type", "application/json");
			xmlhttp.send(jsonObj);
	   

	
	
}

function addInput() {
	var counter = 1;
	var limit = 5;
	if (counter == limit) {
		alert("You have reached the limit of adding " + counter + " inputs");
	} else {
		var r = document.getElementById('toggle3');
		// var newdiv = document.createElement('hr');
		// newdiv.innerHTML = "Entry " + (counter + 1) + " <br><hr>";
		$("#toggle3").clone().insertAfter("#toggle3");

		// r.appendChild(newdiv);
		counter++;
	}

}

function getJsonFormData() {
	alert("i;m in getjson");
	 const formData = new FormData(document.getElementById('createForm'));
     
     var count = 0;
	let jsonObject = {};
	let control_group = {}, validity = {}, conditions = [];
	var obj = {};
	for (const [key, value] of formData.entries()) {
		
		var arr = key.toString().split('.');
		if (arr.length == 1) {
			jsonObject[key] = value;
		} else {
			if (arr[0].toString() == 'control_group') {
				control_group[arr[1]] = value;
				jsonObject[arr[0].toString()] = control_group;
			} else if (arr[0].toString() == 'validity') {
				validity[arr[1]] = value;
				jsonObject[arr[0]] = validity;
			} else if (arr[0].toString() == 'conditions') {
				
				obj[arr[1]] = value;
// jsonObject[arr[0]] = obj;
				count++;
				if(count == 3){
					conditions.push(obj);
					count = 0;
					obj = {};
					jsonObject[arr[0]] = conditions;
					
				}
			}
		}
	}
	console.log(jsonObject.validity.end_date, " , ", typeof(jsonObject.validity.end_date));
// var jsonObj = JSON.parse(jsonObject.toString());
	console.log(JSON.stringify(jsonObject));
	postData(JSON.stringify(jsonObject));
}
function postData(jsonObj) {
	alert("i'm in post");
	 resource = "campaigns.json";
	var url = 'http://localhost:8080/WS_restful-simulator/rest/' + resource;
	var xmlhttp = new XMLHttpRequest();
	console.log(jsonObj.toString());
	
			xmlhttp.open("POST", url, true);
			xmlhttp.setRequestHeader("Content-Type", "application/json");
			xmlhttp.onreadystatechange = function() {// Call a function when
				// the state changes.
				if (this.readyState == 4 && this.status == 200) {
					console.log("-=-=>GWAAA " , myObj);

					myObj = JSON.parse(this.responseText);
					console.log("-=-=> " , myObj);
					if(myObj)error();
					else getOne();
				} else  {
					console.log("-=-=>gwa gaaaaaaaaaaa " , myObj);
					error();
				}
			};
			xmlhttp.send(jsonObj);
}