$(document).bind("mobileinit", function () {
	$.mobile.loadingMessage = "Cargando ...";
	$.mobile.pageLoadErrorMessage = "No se ha podido cargar la página";
});


jQuery(document).ready(function() 
{ 
	if (typeof(localStorage) == 'undefined')	// window.localStorage 
	  {
		  alert('Tu navegador no permite LocalStorage.\n' +
				'La persistencia de los datos no funcionará.');
	  }
	  else
	  {	
		if(localStorage.Configuracion == null){
			alert("Tienes que configurar los datos de horarios y equivalencias.");
			localStorage.setItem('HorasExtras', '00:00' );
		}
		
		
			
		cargarHorasExtras();
		cargarListaTrabajadas();
		cargarListaDisfrutadas();
		
		//Definicion de los campos de horas
		$('#laboral').scroller({ preset: 'time', theme: 'ios', ampm: false, cancelText: 'Cancelar', setText: 'Guardar', timeFormat:'HH:ii', width:'65'});
		wheels = [];
            wheels[0] = { 'Hours': {} };
            wheels[1] = { 'Minutes': {} };
            for (var i = 0; i < 60; i++) {
                if (i < 16) wheels[0]['Hours'][i] = (i < 10) ? ('0' + i) : i;
                wheels[1]['Minutes'][i] = (i < 10) ? ('0' + i) : i;
            }
		
		$('#nocturno').scroller({ preset: 'time', theme: 'ios', ampm: false, cancelText: 'Cancelar', setText: 'Guardar', timeFormat:'HH:ii', width:'65'});
		wheels = [];
            wheels[0] = { 'Hours': {} };
            wheels[1] = { 'Minutes': {} };
            for (var i = 0; i < 60; i++) {
                if (i < 16) wheels[0]['Hours'][i] = (i < 10) ? ('0' + i) : i;
                wheels[1]['Minutes'][i] = (i < 10) ? ('0' + i) : i;
            }
			
		$('#horanocturno').scroller({ preset: 'time', theme: 'ios', ampm: false, cancelText: 'Cancelar', setText: 'Guardar', timeFormat:'HH:ii', width:'65'});
		wheels = [];
            wheels[0] = { 'Hours': {} };
            wheels[1] = { 'Minutes': {} };
            for (var i = 0; i < 60; i++) {
                if (i < 16) wheels[0]['Hours'][i] = (i < 10) ? ('0' + i) : i;
                wheels[1]['Minutes'][i] = (i < 10) ? ('0' + i) : i;
            }	
			
		$('#festivo').scroller({ preset: 'time', theme: 'ios', ampm: false, cancelText: 'Cancelar', setText: 'Guardar', timeFormat:'HH:ii', width:'65'});
		wheels = [];
            wheels[0] = { 'Hours': {} };
            wheels[1] = { 'Minutes': {} };
            for (var i = 0; i < 60; i++) {
                if (i < 16) wheels[0]['Hours'][i] = (i < 10) ? ('0' + i) : i;
                wheels[1]['Minutes'][i] = (i < 10) ? ('0' + i) : i;
            }		
			
			
		//===
		//Definicion de los campos de horas
		$('#fecha').scroller({ preset: 'date', theme: 'ios', cancelText: 'Cancelar', setText: 'Guardar', dateOrder:'ddmmyyyy',dateFormat:'dd/mm/yyyy', width:'65', endYear:2012 + 5, startYear:2012});
		wheels = [];
            wheels[0] = { 'Hours': {} };
            wheels[1] = { 'Minutes': {} };
            for (var i = 0; i < 60; i++) {
                if (i < 16) wheels[0]['Hours'][i] = (i < 10) ? ('0' + i) : i;
                wheels[1]['Minutes'][i] = (i < 10) ? ('0' + i) : i;
            }
			
		$('#horainicio').scroller({ preset: 'time', theme: 'ios', ampm: false, cancelText: 'Cancelar', setText: 'Guardar', timeFormat:'HH:ii', width:'65'});
		wheels = [];
            wheels[0] = { 'Hours': {} };
            wheels[1] = { 'Minutes': {} };
            for (var i = 0; i < 60; i++) {
                if (i < 16) wheels[0]['Hours'][i] = (i < 10) ? ('0' + i) : i;
                wheels[1]['Minutes'][i] = (i < 10) ? ('0' + i) : i;
            }
			
		$('#horafin').scroller({ preset: 'time', theme: 'ios', ampm: false, cancelText: 'Cancelar', setText: 'Guardar', timeFormat:'HH:ii', width:'65'});
		wheels = [];
            wheels[0] = { 'Hours': {} };
            wheels[1] = { 'Minutes': {} };
            for (var i = 0; i < 60; i++) {
                if (i < 16) wheels[0]['Hours'][i] = (i < 10) ? ('0' + i) : i;
                wheels[1]['Minutes'][i] = (i < 10) ? ('0' + i) : i;
            }	
		
	  $('#tiempodisfrutado').scroller({ preset: 'time', theme: 'ios', ampm: false, cancelText: 'Cancelar', setText: 'Guardar', timeFormat:'HH:ii', width:'65'});
		wheels = [];
            wheels[0] = { 'Hours': {} };
            wheels[1] = { 'Minutes': {} };
            for (var i = 0; i < 60; i++) {
                if (i < 16) wheels[0]['Hours'][i] = (i < 10) ? ('0' + i) : i;
                wheels[1]['Minutes'][i] = (i < 10) ? ('0' + i) : i;
            }
		
		//==			
	  }

});

function insertarConfiguracion(){
		var sLaboral = document.getElementById('laboral').value;
		var sNocturno = document.getElementById('nocturno').value;
		var sHoranocturno = document.getElementById('horanocturno').value;
		var sFestivo = document.getElementById('festivo').value;
		
		//Validamos campos
		if(sLaboral == ""){
			alert ("Debe indicar el equivalente en jornada laboral.");
			return false;	
		}
		if(sNocturno == ""){
			alert ("Debe indicar el equivalente en horario nocturno.");
			return false;	
		}
		if(sHoranocturno == ""){
			alert ("Debe indicar el inicio de horario nocturno.");
			return false;	
		}
		if(sFestivo == ""){
			alert ("Debe indicar el equivalente en jornada festiva.");
			return false;	
		}
		
		
		var configuracion = {
			cfg_clave:			'configuracion',
			cfg_laboral:		sLaboral,
			cfg_nocturno:		sNocturno,
			cfg_horanocturno:	sHoranocturno,
			cfg_festivo:		sFestivo
		}
		
		localStorage.setItem('Configuracion', JSON.stringify(configuracion) );
		
		return true;
}


//Recuperar Configuracion
function recuperarConfiguracion(){
	
		var jsonData = localStorage.getItem('Configuracion');
		if(jsonData)
		{
			var data = JSON.parse(jsonData);
			document.getElementById('laboral').value = data.cfg_laboral;
			document.getElementById('nocturno').value = data.cfg_nocturno;
			document.getElementById('horanocturno').value = data.cfg_horanocturno;
			document.getElementById('festivo').value = data.cfg_festivo;
	
		} else {
			document.getElementById('laboral').value = '';
			document.getElementById('nocturno').value = '';
			document.getElementById('horanocturno').value = '';
			document.getElementById('festivo').value = '';
		}
	
}


function devolver_festivo(svalor){
	document.getElementById('esfestivo').value = svalor;
}

//Cargar la edición de la Configuración
$('#configuracion').live('pagebeforeshow',function(event, ui){	
		recuperarConfiguracion();
});


function cargarHorasExtras(){
	var horas = localStorage.getItem('HorasExtras');
	$('#inicio div[data-role="content"]').html("<div id='horasextras'>" + "<br>" +  horas + "</div>");
	//$('#inicio div[data-role="content"]').html("<div id='horasextras'>" + "<span style='font-size:100%'>" + horas + "</span>" + "</div>");
}

function PasarHoraAMinutos(sHora){
	var arHora = sHora.split(":"); 
	var hh = parseInt(arHora[0],10); 
    var mm = parseInt(arHora[1],10); 
	var fHoraEnMin = ((hh*60) + mm);
	var retHoraAMinutos = fHoraEnMin;
	return retHoraAMinutos;
}
function PasarMinutosAHora(sMinutos){
	var horas = parseInt((sMinutos / 60),10);
	var minutos = (parseInt(sMinutos,10) % 60);
	retMinutosAHora = horas +  ":" + minutos;
	return retMinutosAHora;
}

function eliminaActualiza(){
	dato = $('#dialogoEliminar div[data-role="content"] #clave').val();	
	tipo = dato.split("_");
	//Recuperamos el valor de tiempo acumulado con esta entrada
	var jsonEliminar = localStorage.getItem(dato);
		if(jsonEliminar)
		{
			var data = JSON.parse(jsonEliminar);
			entrada = data.tiempoEntrada;	
			
			if(tipo[0] == 'trabajada'){
				//Restamos la cantidad a las horas totales
				actualizarHorasExtrasResta(entrada);
				//Elimamos la entrada en localstorage
				localStorage.removeItem(dato);
				document.location = "#trabajadas";	
				window.location.reload();
			}else{
				//Sumamos la cantidad a las horas totales
				actualizarHorasExtrasSuma(entrada)
				//Elimamos la entrada en localstorage
				localStorage.removeItem(dato);
				document.location = "#disfrutadas";	
				window.location.reload();
			}
		}
}

function eliminaEntrada(){
	dato = $('#dialogoEliminar div[data-role="content"] #clave').val();	
	tipo = dato.split("_");
	localStorage.removeItem(dato);
	if(tipo[0] == 'trabajada'){
		document.location = "#trabajadas";	
		window.location.reload();
	}else{
		document.location = "#disfrutadas";	
		window.location.reload();
	}
	//window.location.reload();
}

function reiniciar(){
	localStorage.clear(); //elimina todos los elementos
	document.location = "#inicio";	
	window.location.reload();
}

function enviaridActual(parsID){
	localStorage.setItem("idActual", parsID);
}
function recuperaridActual(){
	var retID = localStorage.getItem("idActual");
	return retID;
}
function borraridActual(){
	localStorage.setItem("idActual", "");
}
