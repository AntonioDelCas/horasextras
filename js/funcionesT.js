jQuery(document).ready(function() 
//$(document).bind('mobileinit', function()
{ 
	if (typeof(localStorage) == 'undefined')	// window.localStorage 
	  {
		  alert('Tu navegador no permite LocalStorage.\n' +
				'La persistencia de los datos no funcionará.');
	  }
	  else
	  {	
		if(localStorage.nTrabajadas == null){
			localStorage.setItem("nTrabajadas", 0);
		} else {
			//localStorage.setItem("count", 1);
		}
		//cargarListaTrabajadas();
		
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
		$('#fecha_e').scroller({ preset: 'date', theme: 'ios', cancelText: 'Cancelar', setText: 'Guardar', dateOrder:'ddmmyyyy',dateFormat:'dd/mm/yyyy', width:'65', endYear:2012 + 5, startYear:2012});
		wheels = [];
            wheels[0] = { 'Hours': {} };
            wheels[1] = { 'Minutes': {} };
            for (var i = 0; i < 60; i++) {
                if (i < 16) wheels[0]['Hours'][i] = (i < 10) ? ('0' + i) : i;
                wheels[1]['Minutes'][i] = (i < 10) ? ('0' + i) : i;
            }
			
		$('#horainicio_e').scroller({ preset: 'time', theme: 'ios', ampm: false, cancelText: 'Cancelar', setText: 'Guardar', timeFormat:'HH:ii', width:'65'});
		wheels = [];
            wheels[0] = { 'Hours': {} };
            wheels[1] = { 'Minutes': {} };
            for (var i = 0; i < 60; i++) {
                if (i < 16) wheels[0]['Hours'][i] = (i < 10) ? ('0' + i) : i;
                wheels[1]['Minutes'][i] = (i < 10) ? ('0' + i) : i;
            }
			
		$('#horafin_e').scroller({ preset: 'time', theme: 'ios', ampm: false, cancelText: 'Cancelar', setText: 'Guardar', timeFormat:'HH:ii', width:'65'});
		wheels = [];
            wheels[0] = { 'Hours': {} };
            wheels[1] = { 'Minutes': {} };
            for (var i = 0; i < 60; i++) {
                if (i < 16) wheels[0]['Hours'][i] = (i < 10) ? ('0' + i) : i;
                wheels[1]['Minutes'][i] = (i < 10) ? ('0' + i) : i;
            }	
	  }
});

function insertarTrabajada(){
		var sFecha = document.getElementById('fecha').value;
		var sHoraInicio = document.getElementById('horainicio').value;
		var sHoraFin = document.getElementById('horafin').value;
		var sFestivo= document.getElementById('esfestivo').value;
		var sComentario = document.getElementById('comentario').value;
		
		
		//Validamos campos
		if(sFecha == ""){
			alert ("Debe indicar una fecha.");
			return false;	
		}
		if(sHoraInicio == ""){
			alert ("Debe indicar una hora de inicio.");
			return false;	
		}
		if(sHoraFin == ""){
			alert ("Debe indicar una hora de fin.");
			return false;	
		}
		
		
			
		var n = parseInt(localStorage.nTrabajadas,10) + 1;
		
		horasASumar = calcularTiempo(sHoraFin, sHoraInicio, sFestivo); //La hora final como primer argumento, dentro de dicha función
		var vtiempoEntrada = horasASumar.split(":"); 
		var tiempoEntrada = vtiempoEntrada[0] + ":" + ( (parseInt(vtiempoEntrada[1],10) < 10) ? ("0" + vtiempoEntrada[1]) : vtiempoEntrada[1] );
			
		var trabajada = {
			clave:		'trabajada_' + n,
			fecha:		sFecha,
			horainicio:	sHoraInicio,
			horafin:	sHoraFin,
			esfestivo:	sFestivo,
			comentario:	sComentario,
			tiempoEntrada:	tiempoEntrada
		}
		
		localStorage.setItem('trabajada_' + n, JSON.stringify(trabajada) );
		localStorage.setItem("nTrabajadas", n);
		
		actualizarHorasExtrasSuma(horasASumar);//actualizará las HorasExtras "actualizarHorasExtras(horasASumar)"
}

//Calcular Diferencia entre horas
function calculaDiferencia(v1, v2){	
		horas1=v1.split(":"); 
		horas2=v2.split(":");
		horatotale=new Array();
		for(a=0;a<2;a++)
		{
		  horas1[a]=(isNaN(parseInt(horas1[a],10)))?0:parseInt(horas1[a],10)
		  horas2[a]=(isNaN(parseInt(horas2[a],10)))?0:parseInt(horas2[a],10)
		  
		  horatotale[a]=(horas1[a]-horas2[a]);
		}
		horatotal=new Date()
		horatotal.setHours(horatotale[0]);
		horatotal.setMinutes(horatotale[1]);
		diferencia = horatotal.getHours()+":"+horatotal.getMinutes();
		return diferencia;
}

//Calcular Suma entre horas
function sumaHoras(v1, v2){
		horas1=v1.split(":"); 
		horas2=v2.split(":");
		horas = parseInt(horas1[0],10) + parseInt(horas2[0],10);
		minutos = parseInt(horas1[1],10) + parseInt(horas2[1],10);
		sumaMinutosAHora = parseInt((minutos / 60),10);
		restoMinutos = minutos % 60;
		totalHoras = horas + sumaMinutosAHora;
		retSuma = totalHoras + ":" + restoMinutos;		
		return retSuma;
}

//Funcion Comparar Horas
function CompararHoras(sHora1, sHora2) {
    var arHora1 = sHora1.split(":"); 
    var arHora2 = sHora2.split(":"); 
    var hh1 = parseInt(arHora1[0],10); 
    var mm1 = parseInt(arHora1[1],10); 
    var hh2 = parseInt(arHora2[0],10); 
    var mm2 = parseInt(arHora2[1],10); 
    if (hh1<hh2 || (hh1==hh2 && mm1<mm2)){
		retCompararHoras = '0'; 
	}else if (hh1>hh2 || (hh1==hh2 && mm1>mm2)){
		 retCompararHoras = '1';
	}else{  
		retCompararHoras = '0';
	}
	return retCompararHoras;
} 

function FactoresHoras(sHoraConfig){
	retFactoresHoras = PasarHoraAMinutos(sHoraConfig) / 60;
	return retFactoresHoras;
}


//Calcular tiempo entre horas ,según la configuración, y en cada caso actualiza las Horas Extras
function calcularTiempo(v1, v2, esFestivo){ //horaFin, horaInicio, Festivo (Si/No)
	var jsonData = localStorage.getItem('Configuracion');
		if(jsonData)
		{
			var data = JSON.parse(jsonData);
			var horaNocturno = data.cfg_horanocturno;
			var valor_laboral = data.cfg_laboral;
			var valor_nocturno = data.cfg_nocturno;
			var valor_festivo = data.cfg_festivo;	
		}
		
	var factorLaboral = FactoresHoras(valor_laboral);
	var factorNocturno = FactoresHoras(valor_nocturno);
	var factorFestivo = FactoresHoras(valor_festivo);	
		
	var comp1 = CompararHoras(v2,horaNocturno);
	var comp2 = CompararHoras(v1,"24:00");
	var comp3 = CompararHoras(v1,horaNocturno);
	var comp4 = CompararHoras(v2,"24:00");
	var comp5 = CompararHoras("6:00", v1);
	var comp6 = CompararHoras("6:00", v2);
	var compF = esFestivo;
	
	//v2
	if(comp1 == "0" && comp6 == "0"){ //v2<=Hn
		if(comp3 == "0" && comp5 == "0") { //v1<=Hn
			//desde v2 hasta v1, pero menor que Hn
			var tramo1 = calculaDiferencia(v1,v2);
			var tiempoTramo1 = PasarHoraAMinutos(tramo1) * factorLaboral ;
			var tiempoTramo11 = PasarMinutosAHora(tiempoTramo1);
			retornoTramos = tiempoTramo11;
			return retornoTramos;
					
		} else { //v1>Hn
			if(comp5 == "0"){ //08:00<=v1 - para saber si es dentro de las 24:00
				//desde v2 hasta Hn
				var tramo1 = calculaDiferencia(horaNocturno,v2);
				var tiempoTramo1 = PasarHoraAMinutos(tramo1) * factorLaboral ;
				var tiempoTramo11 = PasarMinutosAHora(tiempoTramo1);
				retornoTramo1 = tiempoTramo11;
				//desde Hn hasta v1
				var tramo2 = calculaDiferencia(v1,horaNocturno);
				var tiempoTramo2 = PasarHoraAMinutos(tramo2) * factorNocturno ;
				var tiempoTramo22 = PasarMinutosAHora(tiempoTramo2);
				retornoTramo2 = tiempoTramo22;
				//suma
				var retornoTramos = sumaHoras(retornoTramo1, retornoTramo2);
				return retornoTramos;
				
			} else { //v1 > 24:00				
					if(compF == "Si"){ //es F
						//desde v2 hasta Hn
						var tramo1 = calculaDiferencia(horaNocturno,v2);
						var tiempoTramo1 = PasarHoraAMinutos(tramo1) * factorLaboral ;
						var tiempoTramo11 = PasarMinutosAHora(tiempoTramo1);
						retornoTramo1 = tiempoTramo11;
						//desde Hn hasta 24:00
						var tramo2 = calculaDiferencia('24:00',horaNocturno);
						var tiempoTramo2 = PasarHoraAMinutos(tramo2) * factorNocturno ;
						var tiempoTramo22 = PasarMinutosAHora(tiempoTramo2);
						retornoTramo2 = tiempoTramo22;
						//desde 00:00 hasta v1 y Festivo
						var tramo3 = calculaDiferencia(v1,'00:00');
						var tiempoTramo3 = PasarHoraAMinutos(tramo3) * factorFestivo ;
						var tiempoTramo33 = PasarMinutosAHora(tiempoTramo3);
						retornoTramo3 = tiempoTramo33;
						//suma
						var retornoTramoA = sumaHoras(retornoTramo1, retornoTramo2);
						var retornoTramoB = sumaHoras(retornoTramoA, retornoTramo3);
						return retornoTramoB;
						
					} else { //no es F
						//desde v2 hasta Hn
						var tramo1 = calculaDiferencia(horaNocturno,v2);
						var tiempoTramo1 = PasarHoraAMinutos(tramo1) * factorLaboral ;
						var tiempoTramo11 = PasarMinutosAHora(tiempoTramo1);
						retornoTramo1 = tiempoTramo11;
						//desde Hn hasta 24:00
						var tramo2 = calculaDiferencia('24:00',horaNocturno);
						var tiempoTramo2 = PasarHoraAMinutos(tramo2) * factorNocturno ;
						var tiempoTramo22 = PasarMinutosAHora(tiempoTramo2);
						retornoTramo2 = tiempoTramo22;
						//desde 00:00 hasta v1 y No Festivo
						var tramo3 = calculaDiferencia(v1,'00:00');
						var tiempoTramo3 = PasarHoraAMinutos(tramo3) * factorNocturno ;
						var tiempoTramo33 = PasarMinutosAHora(tiempoTramo3);
						retornoTramo3 = tiempoTramo33;
						//suma
						var retornoTramoA = sumaHoras(retornoTramo1, retornoTramo2);
						var retornoTramoB = sumaHoras(retornoTramoA, retornoTramo3);
						return retornoTramoB;
					}
			}
		}
	} else { //v2>Hn
		if(comp4 == "0" && comp6 == "0"){ //v2<=24:00
			if(comp2 == "0" && comp5 == "0"){ //v1<=24:00 - comparo con las 8:00 para saber si esta dentro de las 24:00
				var tramo1 = calculaDiferencia(v1,v2);
				var tiempoTramo1 = PasarHoraAMinutos(tramo1) * factorNocturno ;
				var tiempoTramo11 = PasarMinutosAHora(tiempoTramo1);
				retornoTramo = tiempoTramo11;
				return retornoTramo;
				
			} else { //v1>24:00
				if(compF == "Si"){ //es F
					//desde v2 hasta 24:00
					var tramo2 = calculaDiferencia('24:00',v2);
					var tiempoTramo2 = PasarHoraAMinutos(tramo2) * factorNocturno ;
					var tiempoTramo22 = PasarMinutosAHora(tiempoTramo2);
					retornoTramo2 = tiempoTramo22;
					//desde 00:00 hasta v1 y Festivo
					var tramo3 = calculaDiferencia(v1,'00:00');
					var tiempoTramo3 = PasarHoraAMinutos(tramo3) * factorFestivo ;
					var tiempoTramo33 = PasarMinutosAHora(tiempoTramo3);
					retornoTramo3 = tiempoTramo33;
					//suma
					var retornoTramo = sumaHoras(retornoTramo2, retornoTramo3);
					return retornoTramo;

				} else {// no es F
					//desde v2 hasta 24:00
					var tramo2 = calculaDiferencia('24:00',v2);
					var tiempoTramo2 = PasarHoraAMinutos(tramo2) * factorNocturno ;
					var tiempoTramo22 = PasarMinutosAHora(tiempoTramo2);
					retornoTramo2 = tiempoTramo22;
					//desde 00:00 hasta v1 y No Festivo
					var tramo3 = calculaDiferencia(v1,'00:00');
					var tiempoTramo3 = PasarHoraAMinutos(tramo3) * factorNocturno ;
					var tiempoTramo33 = PasarMinutosAHora(tiempoTramo3);
					retornoTramo3 = tiempoTramo33;
					//suma
					var retornoTramo = sumaHoras(retornoTramo2, retornoTramo3);
					return retornoTramo;

				}
			}
		} else { //v2 > 24:00
			if(compF == "Si"){//es F
				var tramo3 = calculaDiferencia(v1,v2);
				var tiempoTramo3 = PasarHoraAMinutos(tramo3) * factorFestivo ;
				var tiempoTramo33 = PasarMinutosAHora(tiempoTramo3);
				retornoTramo3 = tiempoTramo33;
				return retornoTramo3;
	
			} else { //no es F
				var tramo3 = calculaDiferencia(v1,v2);
				var tiempoTramo3 = PasarHoraAMinutos(tramo3) * factorNocturno ;
				var tiempoTramo33 = PasarMinutosAHora(tiempoTramo3);
				retornoTramo3 = tiempoTramo33;
				return retornoTramo3;
			}
		}
	}	
}

//Actualiza el valor de las HorasExtras en el Storage  
function actualizarHorasExtrasSuma(horasASumar){
		//obtenemos el acumulado actual de las horas extras
		var horasExtrasActuales = localStorage.getItem('HorasExtras');
		var nuevaHorasExtras = sumaHoras(horasExtrasActuales, horasASumar);	
		var vminutos = nuevaHorasExtras.split(":"); 
		var retNuevaHora = vminutos[0] + ":" + ( (parseInt(vminutos[1]) < 10) ? ("0" + vminutos[1]) : vminutos[1] );
		localStorage.setItem('HorasExtras', retNuevaHora );			
}

//Obtenemos los ids de la lista almacenada
function getListaTrabajadasIds()
{
	var length = localStorage.length;
	var result = new Array();
	for (i=0; i<length; i++) 
	{
		var key = localStorage.key(i);
		if(key.indexOf('trabajada_') === 0) // Comienza con
			result.push(key);
   }
   return result.reverse();
}

//cargamos la lista de valores
function cargarListaTrabajadas(){
   //Eliminamos el listado para construirlo de nuevo
   $('#trabajadas div[data-role="content"] ul').remove();
   $('#trabajadas div[data-role="content"]').html("<ul data-role='listview' data-theme='c'></ul>");
   //Obtenemos los ids almacenados
   var listaItemIds = getListaTrabajadasIds();

//En vez de crear una variable para almacenar los contenidos
//y después cambiarle el contenido a tu selector por esta variable
//Vacía directamente tu selector
   $('#trabajadas div[data-role="content"] ul').html('');       
   // Get the HTML code for the list of items.            
   for(item in listaItemIds)
   {
      var jsonData = localStorage.getItem(listaItemIds[item]);
      if(jsonData)
      {
         var data = JSON.parse(jsonData);
		 var html = "<li id='li_" + data.clave + "'><a id='" + data.clave + "' href='#vertrabajada'" + "<h3>" + data.fecha + "</h3>" + "<span class='ui-li-count'>"+ data.tiempoEntrada + "</span>" + "<BR><span class='subtitulo'>" + data.horainicio + " - " + data.horafin +  "</span></a></li>";
         $('#trabajadas div[data-role="content"] ul').append(html);
      }
   } 
   cargarDatosTrabajados();  
}

//Cargar el item Trabajada para visualizarlo
function cargarDatosTrabajados(){
	$('#trabajadas div[data-role="content"] ul[data-role="listview"] li a').live('click',function(){
		var idTrabajadaOpen = this.id;
		var jsonData = localStorage.getItem(idTrabajadaOpen);		
		if(jsonData)
		{
			var data = JSON.parse(jsonData);
			$('#vertrabajada div[data-role="content"] input[id="clave"]').val(data.clave);
			$('#vertrabajada div[data-role="content"] input[id="tiempoentrada"]').val(data.tiempoEntrada);
			$('#vertrabajada div[data-role="content"] input[id="fecha_l"]').val(data.fecha);
			$('#vertrabajada div[data-role="content"] input[id="horainicio_l"]').val(data.horainicio);
			$('#vertrabajada div[data-role="content"] input[id="horafin_l"]').val(data.horafin);
			if(data.esfestivo == "Si"){
			$('#vertrabajada div[data-role="content"] #festivo_l option[value=Si]').attr("selected", true);
			} else {
			$('#vertrabajada div[data-role="content"] #festivo_l option[value=No]').attr("selected", true);
			}
			$('#vertrabajada div[data-role="content"] textarea[id="comentario"]').val(data.comentario);
			
			$('#editatrabajada div[data-role="content"] input[id="clave"]').val(data.clave);
			$('#editatrabajada div[data-role="content"] input[id="tiempoentrada"]').val(data.tiempoEntrada);
			$('#editatrabajada div[data-role="content"] input[id="fecha_e"]').val(data.fecha);
			$('#editatrabajada div[data-role="content"] input[id="horainicio_e"]').val(data.horainicio);
			$('#editatrabajada div[data-role="content"] input[id="horafin_e"]').val(data.horafin);
			if(data.esfestivo == "Si"){
			$('#editatrabajada div[data-role="content"] #festivo_e option[value=Si]').attr("selected", true);
			} else {
			$('#editatrabajada div[data-role="content"] #festivo_e option[value=No]').attr("selected", true);
			}
			$('#editatrabajada div[data-role="content"] textarea[id="comentario_e"]').val(data.comentario);
		}
		//Preparamos el codigo por si elimina
		$('#dialogoEliminar div[data-role="content"] input[id="clave"]').val(idTrabajadaOpen);
		
	});	
}

//Actualiza las horas después de modificar una trabajada
function actualizarTrabajada(){
	dato = $('#editatrabajada div[data-role="content"] #clave').val();	
	//Recuperamos el valor de tiempo acumulado con esta entrada
	var jsonActualizarT = localStorage.getItem(dato);
		if(jsonActualizarT)
		{
			var data = JSON.parse(jsonActualizarT);
			entrada = data.tiempoEntrada;	
				//Restamos la cantidad a las horas totales
				actualizarHorasExtrasResta(entrada);
				//Añadimos el cálculo de las nuevas horas
				var sFecha = document.getElementById('fecha_e').value;
				var sHoraInicio = document.getElementById('horainicio_e').value;
				var sHoraFin = document.getElementById('horafin_e').value;
				var sFestivo= document.getElementById('festivo_e').value;
				var sComentario = document.getElementById('comentario_e').value;
						
				var n = parseInt(localStorage.nTrabajadas,10) + 1;
				horasASumar = calcularTiempo(sHoraFin, sHoraInicio, sFestivo); //La hora final como primer argumento, dentro de dicha función
				var vtiempoEntrada = horasASumar.split(":"); 
				var tiempoEntrada = vtiempoEntrada[0] + ":" + ( (parseInt(vtiempoEntrada[1],10) < 10) ? ("0" + vtiempoEntrada[1]) : vtiempoEntrada[1] );
				var trabajada = {
					clave:		'trabajada_' + n,
					fecha:		sFecha,
					horainicio:	sHoraInicio,
					horafin:	sHoraFin,
					esfestivo:	sFestivo,
					comentario:	sComentario,
					tiempoEntrada:	tiempoEntrada
				}
				
				//Elimamos la entrada en localstorage
				localStorage.removeItem(dato);
				
				localStorage.setItem('trabajada_' + n, JSON.stringify(trabajada) );
				localStorage.setItem("nTrabajadas", n);
				
				actualizarHorasExtrasSuma(horasASumar);//actualizará las HorasExtras "actualizarHorasExtras(horasASumar)"
				}
}
