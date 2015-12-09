jQuery(document).ready(function($) {


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



	//leer la lista elegida y actualizar valores
	jQuery("#id_lista").on('change', function(e) {

						//jQuery('#foo').css('display','block');
					//var spinner = new Spinner(opts).spin(target);


					correo_activo = JSON.stringify($.miespacionombre.correo_activo);
					id_lista = jQuery(this).val();

				 	url ="leer_lista";
					$.ajax({
					    url: url,
					    type: 'POST',
					    dataType: "json",
					    data:  {
					    	correo_activo: correo_activo,
					    	id_lista:id_lista

					    },
					    		
						success: function(data){
							if(data != true){
								/*
								spinner.stop();
								jQuery('#foo1').css('display','none');
								jQuery('#messages1').css('display','block');
								jQuery('#messages1').addClass('alert-danger');
								jQuery('#messages1').html(data);
								jQuery('html,body').animate({
									'scrollTop': jQuery('#messages1').offset().top
								}, 1000);*/
								
						//jQuery(elem_hijo).append('<option value="-1" selected >Seleccione un elemento</option>');
                        //console.log(JSON.stringify($.miespacionombre.nombre_mes));
						 



					//listaDias


                        jQuery.each(data, function (i, valor) {
                        	   //console.log(i);
                        	   $.miespacionombre.nombre_mes ={};
                        	   $.miespacionombre.listaDias  ={};

                        	   jQuery.each(valor, function (j, valo) {	

                        	   	  if (i=="list_dia") {
                        	   	  		/*console.log(valo.ano);
                        	   	  		console.log(valo.mes);
                        	   	  		console.log(valo.dia);
                        	   	  		console.log(valo.valor);*/

										

										//console.log(valo.mes);
										if ((valo.valor)!='') {
										llave =	valo.ano+'_'+valo.mes+'_'+valo.dia;
											 $.miespacionombre.listaDias[llave] = { "valor" : valo.valor, "ano" : valo.ano, "mes":valo.mes, "dia":valo.dia }; //valor;
										
										/*
										console.log(llave);	 
										console.log(valo.ano);
                        	   	  		console.log(valo.mes);
                        	   	  		console.log(valo.dia);
                        	   	  		console.log(valo.valor)
                        	   	  		*/

                        	   	  		//console.log(JSON.stringify($.miespacionombre.listaDias));


										}
										//console.log($.miespacionombre.listaDias);
                        	   	  }

                        	   	  if (i=="list_mes") {
                        	   	  		/*console.log(valo.ano);
                        	   	  		console.log(valo.mes);
                        	   	  		console.log(valo.valor);*/


										llave =	valo.ano+'_'+valo.mes;

										if ((valo.valor)!='') {
											$.miespacionombre.nombre_mes[llave] = { "valor" : valo.valor, "ano" : valo.ano, "mes":valo.mes }; //valor;	
										}

			//{"2015_11":{"valor":"dsfdf","ano":"2015","mes":"11"},"2015_8":{"valor":"dsffsdfdfsdf","ano":"2015","mes":"8"},"2015_0":{"valor":"sssssssssssss","ano":"2015","mes":"0"}}
			// sistema.js:90 list_dia



                        	   	  }

		                        	
		                        });
								console.log(JSON.stringify($.miespacionombre.listaDias));
									
								console.log(JSON.stringify($.miespacionombre.nombre_mes));	
								

                           /* if (valor.nombre !== null) {
                                 jQuery(elem_hijo).append('<option value="' + valor.identificador + '">' + valor.nombre + '</option>');     
                            }*/
                        });


								//console.log(data);
																	
							}else{

								//console.log(data);
			  							/*
			  							$catalogo = e.target.name;
										spinner.stop();
										jQuery('#foo1').css('display','none');

										    //console.log($.miespacionombre.posicionDiseno);

										  	hrefPost('POST', '/'+$catalogo, {
												      correo_activo: email_lista,
												         cantDiseno:jQuery.miespacionombre.cantDiseno,
												     posicionDiseno:parseInt(jQuery.miespacionombre.posicionDiseno)+1
										    }, '' ); 
										*/



							}
						} 



					  });
					 
					  return false;
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
					var datoFormulario = new FormData(document.getElementById("form_fotocalendario"));

					//el arreglo de día y meses
					datoFormulario.append('listadias', JSON.stringify($.miespacionombre.listaDias));
					datoFormulario.append('nombre_mes', JSON.stringify($.miespacionombre.nombre_mes));

					//los datos del formulario modal
					datoFormulario.append('nombre_lista', jQuery('#nombre_lista').val());
					datoFormulario.append('correo_lista', jQuery('#correo_lista').val());


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

										  	hrefPost('POST', '/'+$catalogo, {
												      correo_activo: email_lista,
												         cantDiseno:jQuery.miespacionombre.cantDiseno,
												     posicionDiseno:parseInt(jQuery.miespacionombre.posicionDiseno)+1
										    }, '' ); 



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