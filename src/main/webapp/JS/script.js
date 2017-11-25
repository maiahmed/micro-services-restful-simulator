function getDetailes(){
	var xmlhttp = new XMLHttpRequest();
	var resource = document.getElementById('resource');
	var url = 'http://localhost:8080/WS_restful-simulator/rest/' + resource.value;

	xmlhttp.onreadystatechange = function () {	
		if(this.readyState == 4 && this.status == 200){
//			dbParam = JSON.stringify(this.responseText);
	        myObj = JSON.parse(this.responseText);

				document.getElementById("tmp").innerHTML = myObj;
		}
		
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);

	
}

