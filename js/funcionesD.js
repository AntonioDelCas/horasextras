jQuery(document).ready(function() 
{ 
	if (typeof(localStorage) == 'undefined')	// window.localStorage 
	  {
		  alert('Tu navegador no permite LocalStorage.\n' +
				'La persistencia de los datos no funcionará.');
	  }
	  else
	  {	
		if(localStorage.nDisfrutadas == null){
			localStorage.setItem("nDisfrutadas", 0);
		} else {
			//localStorage.setItem("count", 1);
		}
		//cargarListaDisfrutadas();
		
		//Definicion de los campos de horas
		$('#fechaDisfrutado').scroller({ preset: 'date', theme: 'ios', cancelText: 'Cancelar', setText: 'Guardar', dateOrder:'ddmmyyyy',dateFormat:'dd/mm/yyyy', width:'65', endYear:2012 + 5, startYear:2012});
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
		$('#fechaDisfrutado_e').scroller({ preset: 'date', theme: 'ios', cancelText: 'Cancelar', setText: 'Guardar', dateOrder:'ddmmyyyy',dateFormat:'dd/mm/yyyy', width:'65', endYear:2012 + 5, startYear:2012});
		wheels = [];
            wheels[0] = { 'Hours': {} };
            wheels[1] = { 'Minutes': {} };
            for (var i = 0; i < 60; i++) {
                if (i < 16) wheels[0]['Hours'][i] = (i < 10) ? ('0' + i) : i;
                wheels[1]['Minutes'][i] = (i < 10) ? ('0' + i) : i;
            }
		
		$('#tiempodisfrutado_e').scroller({ preset: 'time', theme: 'ios', ampm: false, cancelText: 'Cancelar', setText: 'Guardar', timeFormat:'HH:ii', width:'65'});
		wheels = [];
            wheels[0] = { 'Hours': {} };
            wheels[1] = { 'Minutes': {} };
            for (var i = 0; i < 60; i++) {
                if (i < 16) wheels[0]['Hours'][i] = (i < 10) ? ('0' + i) : i;
                wheels[1]['Minutes'][i] = (i < 10) ? ('0' + i) : i;
            }
		
		
	  }

});


//Calcular Resta entre horas
function restaHoras(v1, v2){
		var minutos1= PasarHoraAMinutos(v1);
		var minutos2= PasarHoraAMinutos(v2);
		var minutos = minutos1 - minutos2;
		retHoras = PasarMinutosAHora(minutos);		
		return retHoras;
}


//Actualiza el valor de las HorasExtras en el Storage  
function actualizarHorasExtrasResta(horasARestar){
		//obtenemos el acumulado actual de las horas extras
		var horasExtrasActuales = localStorage.getItem('HorasExtras');
		var nuevaHorasExtras = restaHoras(horasExtrasActuales, horasARestar);
		var vminutos = nuevaHorasExtras.split(":"); 
		var retNuevaHora = vminutos[0] + ":" + ( (parseInt(vminutos[1],10) < 10) ? ("0" + vminutos[1]) : vminutos[1] );
		localStorage.setItem('HorasExtras', retNuevaHora );
}




function insertarDisfrutada(){
		var sFecha = document.getElementById('fechaDisfrutado').value;
		var sTiempoDisfrutado = document.getElementById('tiempodisfrutado').value;
		var sComentario = document.getElementById('comentario_d').value;
		
		//Validamos campos
		if(sFecha == ""){
			alert ("Debe indicar una fecha.");
			return false;	
		}
		if(sTiempoDisfrutado == ""){
			alert ("Debe indicar el tiempo disfrutado.");
			return false;	
		}
		
		
		//Comprobamos que no se disfruta más horas de las que se tienen disponibles
		var nD = localStorage.HorasExtras;
		alert nD;
		


		//
		
		var n = parseInt(localStorage.nDisfrutadas,10) + 1;
		
		var disfrutada = {
			clave:		'disfrutada_' + n,
			fecha:		sFecha,
			tiempo:		sTiempoDisfrutado,
			comentario:	sComentario,
			tiempoEntrada: sTiempoDisfrutado
		}
		
		localStorage.setItem('disfrutada_' + n, JSON.stringify(disfrutada) );
		localStorage.setItem("nDisfrutadas", n);
	
		actualizarHorasExtrasResta(sTiempoDisfrutado);//actualizará las HorasExtras "actualizarHorasExtras(horasARestar)"
}

//Obtenemos los ids de la lista almacenada
function getListaDisfrutadasIds()
{
	var length = localStorage.length;
	var result = new Array();
	for (i=0; i<length; i++) 
	{
		var key = localStorage.key(i);
		if(key.indexOf('disfrutada_') === 0) // Comienza con
			result.push(key);
   }
   return result.reverse();
}

//cargamos la lista de valores
function cargarListaDisfrutadas(){
	//Eliminamos el listado para construirlo de nuevo
	$('#disfrutadas div[data-role="content"] ul').remove();
	$('#disfrutadas div[data-role="content"]').html("<ul data-role='listview' data-theme='c'></ul>");
	//Obtenemos los ids almacenados
	var listaItemIds = getListaDisfrutadasIds();
	var code = ""; 		
	// Get the HTML code for the list of items.				
	for(item in listaItemIds)
	{
		var jsonData = localStorage.getItem(listaItemIds[item]);
		if(jsonData)
		{
			var data = JSON.parse(jsonData);
			var html = "<li id='" + data.clave + "'><a id='" + data.clave + "' href='#verdisfrutada'>" + "<h3>" + data.fecha + "</h3>" + "<span class='ui-li-count'>"+  data.tiempoEntrada +  "</span>" + "</a></li>";	
			 $('#disfrutadas div[data-role="content"] ul').append(html);
		}
	}
	cargarDatosDisfrutadas();  
}
         
//Cargar el item Disfrutada para visualizarlo
function cargarDatosDisfrutadas(){	
	$('#disfrutadas div[data-role="content"] ul[data-role="listview"] li a').live('click',function(){
		var idDisfrutadaOpen = this.id;
		var jsonData = localStorage.getItem(idDisfrutadaOpen);
		if(jsonData)
		{
			var data = JSON.parse(jsonData);
			$('#verdisfrutada div[data-role="content"] input[id="clave"]').val(data.clave);
			$('#verdisfrutada div[data-role="content"] input[id="tiempoentrada"]').val(data.tiempoEntrada);
			$('#verdisfrutada div[data-role="content"] input[id="fechaDisfrutado_l"]').val(data.fecha);
			$('#verdisfrutada div[data-role="content"] input[id="tiempodisfrutado_l"]').val(data.tiempo);
			$('#verdisfrutada div[data-role="content"] textarea[id="comentario_d_l"]').val(data.comentario);
			
			$('#editadisfrutada div[data-role="content"] input[id="clave"]').val(data.clave);
			$('#editadisfrutada div[data-role="content"] input[id="tiempoentrada"]').val(data.tiempoEntrada);
			$('#editadisfrutada div[data-role="content"] input[id="fechaDisfrutado_e"]').val(data.fecha);
			$('#editadisfrutada div[data-role="content"] input[id="tiempodisfrutado_e"]').val(data.tiempo);
			$('#editadisfrutada div[data-role="content"] textarea[id="comentario_d_e"]').val(data.comentario);

		}
		//Preparamos el codigo por si elimina
		$('#dialogoEliminar div[data-role="content"] input[id="clave"]').val(idDisfrutadaOpen);
	});	
}

//Actualiza las horas después de modificar una trabajada
function actualizarDisfrutada(){
	dato = $('#editadisfrutada div[data-role="content"] #clave').val();	
	//Recuperamos el valor de tiempo acumulado con esta entrada
	var jsonActualizarT = localStorage.getItem(dato);
		if(jsonActualizarT)
		{
			var data = JSON.parse(jsonActualizarT);
			entrada = data.tiempoEntrada;	
				//Restamos la cantidad a las horas totales
				actualizarHorasExtrasSuma(entrada)
				//Añadimos el cálculo de las nuevas horas
				var sFecha = document.getElementById('fechaDisfrutado_e').value;
				var sTiempoDisfrutado = document.getElementById('tiempodisfrutado_e').value;
				var sComentario = document.getElementById('comentario_d_e').value;
				
				var n = parseInt(localStorage.nDisfrutadas,10) + 1;
				
				var disfrutada = {
					clave:		'disfrutada_' + n,
					fecha:		sFecha,
					tiempo:		sTiempoDisfrutado,
					comentario:	sComentario,
					tiempoEntrada: sTiempoDisfrutado
				}
				
				//Elimamos la entrada en localstorage
				localStorage.removeItem(dato);
				
				localStorage.setItem('disfrutada_' + n, JSON.stringify(disfrutada) );
				localStorage.setItem("nDisfrutadas", n);
			
				actualizarHorasExtrasResta(sTiempoDisfrutado);//actualizará las HorasExtras "actualizarHorasExtras(horasARestar)"
				
	
				}
}
