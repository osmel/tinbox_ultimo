jQuery(document).ready(function($) {



//activar los slider que ya se han llenado
for (var i = 1 ; i <= $.miespacionombre.posicionDiseno; i++) {
  jQuery('.editar_slider[value="'+i+'"]').prop('disabled', false);	
};

//marcar el elemento activo
jQuery('.editar_slider[value="'+$.miespacionombre.movposicion+'"]').parent().parent().css({"border-color": "red", 
             								"border-weight":"8px", 	
             								"border-style":"solid"});



for (var i = 1 ; i <= $.miespacionombre.cantDiseno_original; i++) {
  //jQuery('.cuadro_slider[value="'+i+'"]').removeClass('cuadro_slider');
  	
  	arreglo = $.miespacionombre.array_eliminar;
  	if (((arreglo.indexOf(i.toString()))>=0))  {

  		jQuery('.cuadro_slider[value="'+i+'"]').css({"display":"none"});	
  	}

  		// a.indexOf(6)>=0;

  	
  //prop('disabled', false);	
};


//jQuery('.cuadro_slider[value="'+$.miespacionombre.movposicion+'"]').css({"display": "none"});




jQuery('body').on('click','.eliminar_slider', function (e) {
   //jQuery('.cuadro_slider[value="'+e.target.value+'"]').css({"display": "none"});
   //jQuery('.cuadro_slider[value="'+e.target.value+'"]').removeClass('cuadro_slider');

   	
   		jQuery.miespacionombre.array_eliminar.push(e.target.value);
   		
   		//console.log(jQuery.miespacionombre.array_eliminar);
   		//alert('');

		$catalogo ='tinbox/fotocalendario';
		email_lista = $.miespacionombre.correo_activo;


		if (e.target.value != jQuery.miespacionombre.movposicion) {
			//movi = parseInt(jQuery.miespacionombre.posicionDiseno);
			movipos = parseInt(jQuery.miespacionombre.posicionDiseno); 

			if (jQuery.miespacionombre.posicionDiseno == jQuery.miespacionombre.movposicion) {  //
				//movi = parseInt(jQuery.miespacionombre.posicionDiseno);
				//movipos = parseInt(jQuery.miespacionombre.posicionDiseno); 

				bandera=false;
				for (var i = $.miespacionombre.posicionDiseno-1 ; i >=1 ; i--) {
				  	
				  	arreglo = $.miespacionombre.array_eliminar;
				  	if (!((arreglo.indexOf(i.toString()))>=0))  {  
							movi = i;       // cantDiseno
							bandera=true;
				  	}

				};

				if (bandera==false) {
					for (var i = $.miespacionombre.posicionDiseno+1; i <= $.miespacionombre.cantDiseno_original ; i++) {
					  	
					  	arreglo = $.miespacionombre.array_eliminar;
					  	if (!((arreglo.indexOf(i.toString()))>=0))  {  
								movi= i;   // cantDiseno
								bandera=true;
					  	}

					};
				}


			}	

		} else {

	
			//

		}


		hrefPost('POST', '/'+$catalogo, {
			      correo_activo : email_lista,
			         cantDiseno : jQuery.miespacionombre.cantDiseno,
			     posicionDiseno : movi,
			        movposicion : movipos,
			        id_session  : jQuery.miespacionombre.id_session,
			    array_eliminar  : jQuery.miespacionombre.array_eliminar.toString()

	    }, ''); 		
			
			
/*
								    //console.log($.miespacionombre.posicionDiseno);
								    if (valor_slider==0) {
								    	//si el q estoy eliminando es desigual de donde estoy posicionado
								    	if (jQuery.miespacionombre.posicionDiseno!=jQuery.miespacionombre.movposicion) {
								    		movi= parseInt(jQuery.miespacionombre.posicionDiseno);
								    		movipos= parseInt(jQuery.miespacionombre.posicionDiseno); //movi;
								    		//movipos= parseInt(jQuery.miespacionombre.movposicion)+1;
								    	} else {
								    		movi= parseInt(jQuery.miespacionombre.posicionDiseno)+1;
								    		movipos= parseInt(jQuery.miespacionombre.movposicion)+1;
								    	}

												hrefPost('POST', '/'+$catalogo, {
												      correo_activo: email_lista,
												         cantDiseno:jQuery.miespacionombre.cantDiseno,
												     posicionDiseno:movi,
												        movposicion:movipos,

												        id_session:jQuery.miespacionombre.id_session,
												    array_eliminar:jQuery.miespacionombre.array_eliminar.toString()

										    }, ''); 
								    } else {

								    	//editar slider
												hrefPost('POST', '/'+$catalogo, { //no se mueva, que retorne al mismo lugar
												      correo_activo: email_lista,
												         cantDiseno:jQuery.miespacionombre.cantDiseno,
												     posicionDiseno:parseInt(jQuery.miespacionombre.posicionDiseno)+0,
												     movposicion:valor_slider,

												     id_session:jQuery.miespacionombre.id_session,
												 array_eliminar:jQuery.miespacionombre.array_eliminar.toString()
												     
										    }, ''); 
								    }

								    valor_slider=0;
*/



});













$.miespacionombre.posicionDiseno
	var opts = {
		lines: 13, 
		length: 20, 
		width: 10, 
		radius: 30, 
		corners: 1, 
		rotate: 0, 
		direction: 1, 
		color: '#E8192C',
		speed: 1, 
		trail: 60,
		shadow: false,
		hwaccel: false,
		className: 'spinner',
		zIndex: 2e9, 
		top: '50%', // Top position relative to parent
		left: '50%' // Left position relative to parent		
	};

	jQuery(".navigacion").change(function()	{
	    document.location.href = jQuery(this).val();
	});


	var target = document.getElementById('foo');


	//tratamiento de año
	jQuery("#id_ano").on('change', function(e) {

		//jQuery("#modalsinLista").modal("show");
		  		//evitar q se ejecute el submit
		 //console.log($(this).val());

		 //console.log(jQuery('#id_ano option:selected').text());
		 //jQuery('#id_ano option:selected').value('2030');
		 //jQuery('#id_ano option:selected').text('2030');

		 //id_descripcion = jQuery('#producto option:selected').text();
		 //event.preventDefault();
		 //return false;
	});		


	//actualizar los dias de cumpleano, en funcion del año actual señalado
	jQuery("#id_mes").on('change', function(e) {
		anoactual=$("#almanaque").attr('anomostrado');
		mesactual=$(this).val();
	    var cantDiasMesMostrado1 = 32 - new Date(anoactual, mesactual-1, 32).getDate();
	    jQuery("#id_dia").html(''); 
	    for (i = 1; i <= cantDiasMesMostrado1; i++) { 
 			   jQuery("#id_dia").append('<option value="'+i+'" >'+i+'</option>');
		}
	});		


	function nombreMes() {
	
			llave =	$("#almanaque").attr('anomostrado')+'_'+$("#almanaque").attr('mesamostrarmenos1');
			ano= $("#almanaque").attr('anomostrado');
			mes= $("#almanaque").attr('mesamostrarmenos1');

			valor = $('#texto_mes').val();
			if ((valor.trim())!='') {
				$.miespacionombre.nombre_mes[llave] = { "valor" : valor, "ano" : ano, "mes":mes }; //valor;
			}	


    }


    //form_validar_fotocalendario

	jQuery('body').on('submit','#form_validar_fotocalendario', function (e) {
		//asignar el mes activo, para que entre en el arra
		
		nombreMes();		

		jQuery('#foo').css('display','block');

		var spinner = new Spinner(opts).spin(target);
		jQuery(this).ajaxSubmit({

      		data: {
      			 listadias:$.miespacionombre.listaDias,
      			 nombre_mes:$.miespacionombre.nombre_mes
      		 },
      		
			success: function(data){
				if(data != true){
					
					spinner.stop();
					jQuery('#foo').css('display','none');
					jQuery('#messages').css('display','block');
					jQuery('#messages').addClass('alert-danger');
					jQuery('#messages').html(data);
					jQuery('html,body').animate({
						'scrollTop': jQuery('#messages').offset().top
					}, 1000);
				
					
				}else{
  							$catalogo = e.target.name;
							spinner.stop();
							jQuery('#foo').css('display','none');
				      			 //console.log(Object.keys($.miespacionombre.listaDias).length===0);

				      			 //console.log(Object.keys($.miespacionombre.nombre_mes).length===0);

      			 			if ( (Object.keys($.miespacionombre.listaDias).length===0) && (Object.keys($.miespacionombre.nombre_mes).length===0) ) {
      			 				jQuery("#modalsinLista").modal("show");
      			 			} else {
      			 				jQuery("#modalPregunta").modal("show",{valor:10});	
      			 			}
							
				}
			} 
		});
		return false;
	});	
	
	//esto sucede antes de q se muestre
	/*
	jQuery('#modalPregunta').on('show.bs.modal', function(e) {
		alert('asd');
	});	
	*/


	jQuery('#modalPregunta').on('hide.bs.modal', function(e) {
		jQuery('#foo1').css('display','none');
		jQuery('#messages1').css('display','none');
	    jQuery(this).removeData('bs.modal');
	});	

	jQuery('#modalsinLista').on('hide.bs.modal', function(e) {
		jQuery('#foo1').css('display','none');
		jQuery('#messages1').css('display','none');
	    jQuery(this).removeData('bs.modal');
	});		

	var guardar = 'guardar';

    jQuery('body').on('click','#deleteUserSubmit', function (e) {
    	guardar= e.target.name;
    });	
    	    	

    			/*
				jQuery("body .editar_slider").on('onload','.editar_slider',function(e){
					
				});	
				*/		



	//editar un slider
	var valor_slider=0;
	jQuery('body').on('click','.editar_slider', function (e) {   
		valor_slider=parseInt(e.target.value);
	 	jQuery("#form_validar_fotocalendario").trigger('submit');
	 	
	});	



	function randomString(len, an){
	    an = an&&an.toLowerCase();
	    var str="", i=0, min=an=="a"?10:0, max=an=="n"?10:62;
	    for(;i++<len;){
	      var r = Math.random()*(max-min)+min <<0;
	      str += String.fromCharCode(r+=r>9?r<36?55:61:48);
	    }
	    return str;
	}



	jQuery('body').on('submit','#form_guardar_lista', function (e) {


			//evitar q se ejecute el submit
	 	event.preventDefault();

		jQuery('#foo').css('display','block');

		var spinner = new Spinner(opts).spin(target);

		//asignar el mes activo, para que entre en el arra
		nombreMes();		

		//para tomar la lista de checkBox
		listCheck = [];
		jQuery("input[name='coleccion_id_logo[]']:checked").each(function() {
		     listCheck.push(jQuery(this).val());
		});		

				
			//este es el formulario de la session 3
			var datoFormulario = new FormData(document.getElementById("form_validar_fotocalendario"));

			//el arreglo de día y meses
			datoFormulario.append('listadias', JSON.stringify($.miespacionombre.listaDias));
			datoFormulario.append('nombre_mes', JSON.stringify($.miespacionombre.nombre_mes));

			//los datos del formulario modal
			datoFormulario.append('nombre_lista', jQuery('#nombre_lista').val());
			datoFormulario.append('correo_lista', jQuery('#correo_lista').val());

			//el valor de la session q esta en uso
			
			//idsession = randomString(10); 

			if 	($.miespacionombre.id_session=='') {
				$.miespacionombre.id_session = randomString(20); 
			}


			datoFormulario.append('id_session', $.miespacionombre.id_session);
			

			datoFormulario.append('cantDiseno', $.miespacionombre.cantDiseno);
			datoFormulario.append('movposicion',$.miespacionombre.movposicion);



			//estatus para guardar o no guardar lista
			datoFormulario.append('guardar', guardar);
			

			datoFormulario.append('coleccion_id_logo', listCheck);

			//este es el email activo	
			email_lista = $.miespacionombre.correo_activo;

			if (guardar=="guardar") {

					url='guardar_lista';
					email_lista = jQuery('#correo_lista').val();

			} else {
				url='noguardar_lista';
			} 

			 
			$.ajax({
			    url: url,
			    type: 'POST',
			    data:  datoFormulario,
			    		
			    async: false,
			    cache: false,
			    contentType: false,
			    processData: false,

				success: function(data){
					if(data != true){
						
						spinner.stop();
						jQuery('#foo1').css('display','none');
						jQuery('#messages1').css('display','block');
						jQuery('#messages1').addClass('alert-danger');
						jQuery('#messages1').html(data);
						jQuery('html,body').animate({
							'scrollTop': jQuery('#messages1').offset().top
						}, 1000);
					
						
					}else{
	  							$catalogo = e.target.name;
								spinner.stop();
								jQuery('#foo1').css('display','none');

								    //console.log($.miespacionombre.posicionDiseno);
								    if (valor_slider==0) {
								    	//siguiente calendario
								    	if (jQuery.miespacionombre.posicionDiseno!=jQuery.miespacionombre.movposicion) {
								    		movi= parseInt(jQuery.miespacionombre.posicionDiseno);
								    		movipos= parseInt(jQuery.miespacionombre.posicionDiseno); //movi;
								    		//movipos= parseInt(jQuery.miespacionombre.movposicion)+1;
								    	} else {
								    		movi= parseInt(jQuery.miespacionombre.posicionDiseno)+1;
								    		movipos= parseInt(jQuery.miespacionombre.movposicion)+1;
								    	}

												hrefPost('POST', '/'+$catalogo, {
												      correo_activo: email_lista,
												         cantDiseno:jQuery.miespacionombre.cantDiseno,
												     posicionDiseno:movi,
												        movposicion:movipos,

												        id_session:jQuery.miespacionombre.id_session,
												    array_eliminar:jQuery.miespacionombre.array_eliminar.toString()

										    }, ''); 
								    } else {

								    	//editar slider
												hrefPost('POST', '/'+$catalogo, { //no se mueva, que retorne al mismo lugar
												      correo_activo: email_lista,
												         cantDiseno:jQuery.miespacionombre.cantDiseno,
												     posicionDiseno:parseInt(jQuery.miespacionombre.posicionDiseno)+0,
												     movposicion:valor_slider,

												     id_session:jQuery.miespacionombre.id_session,
												 array_eliminar:jQuery.miespacionombre.array_eliminar.toString()

												     
										    }, ''); 
								    }

								    valor_slider=0;




					}
				} 



			  });
			 
			  return false;
			})
					

	hrefPost = function(verb, url, data, target) {
	  var form = document.createElement("form");
	  form.action = url;
	  form.method = verb;
	  form.target = target || "_self";
	  if (data) {
	    for (var key in data) {
	      var input = document.createElement("textarea");
	      input.name = key;
	      input.value = typeof data[key] === "object" ? JSON.stringify(data[key]) : data[key];
	      form.appendChild(input);
	    }
	  }
	  form.style.display = 'none';
	  document.body.appendChild(form);
	  form.submit();
	};


});