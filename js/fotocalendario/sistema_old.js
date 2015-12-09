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


	function nombreMes() {
	
			llave =	$("#almanaque").attr('anomostrado')+'_'+$("#almanaque").attr('mesamostrarmenos1');
			ano= $("#almanaque").attr('anomostrado');
			mes= $("#almanaque").attr('mesamostrarmenos1');

			valor = $('#texto_mes').val();
			$.miespacionombre.nombre_mes[llave] = { "valor" : valor, "ano" : ano, "mes":mes }; //valor;


    }


	jQuery('body').on('submit','#form_fotocalendario', function (e) {
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
							jQuery("#modalPregunta").modal("show");
				}
			} 
		});
		return false;
	});	

//http://www.calbertts.com/blog/articulo/intercambio-de-objetos-entre-javascript-y-php-con-json


		function Producto(id, nombre, precio) {
		    this.id = id;
		    this.nombre = nombre;
		    this.precio = precio;
		}


   jQuery('body').on('submit','#form_validar_fotocalendario', function (e) {

   		
	  	//var prod1 = new Producto('01','Pizza','$3000');
		//var prod2 = new Producto('02','Helado','$2000');
		var prod1 = {"nombre" : "Antonio", "apellidos" : "Molina Ballesteros", "edad" : 35};
		var prod2 = {"nombre" : "Antonio", "apellidos" : "Molina Ballesteros", "edad" : 35};
 
		// Creamos un arreglo para almacenarlos
		var listaProductos = [];
		 
		listaProductos.push(prod1);
		listaProductos.push(prod2);


		var productosJSON = JSON.stringify(listaProductos);
		 
		// Realizamos la petición al servidor
		$.post('guardar_lista', {productos: productosJSON},
		    function(respuesta) {
		        console.log(respuesta);
		}).error(
		    function(){
		        console.log('Error al ejecutar la petición');
		    }
		);




  }	);




////////////////////////////PHP////////////////////////////////////

//http://www.calbertts.com/blog/articulo/intercambio-de-objetos-entre-javascript-y-php-con-json
		 $data['nombre_mes']   = $this->input->post('nombre_mes');	

		  print_r(json_decode($data['nombre_mes']));
		  //var_dump($data['nombre_mes']);
   			
   			foreach(json_decode($data['nombre_mes']) as $producto)
		    {
		        print_r($producto);
		        /*echo $producto->id . ', ';
		        echo $producto->nombre . ', ';
		        echo $producto->precio . ', ';
		        echo '<br/>';
		        */
		    }

		  die;


			$listaProductos = json_decode($_POST['productos']);
		 
		    foreach($listaProductos as $producto)
		    {
		        echo $producto->id . ', ';
		        echo $producto->nombre . ', ';
		        echo $producto->precio . ', ';
		        echo '<br/>';
		    }

		die;

//////////////////////////////////////////////////////////////
















    jQuery('body').on('submit','#form_validar_fotocalendario1', function (e) {

		//asignar el mes activo, para que entre en el arra
		nombreMes();		

		//para tomar la lista de checkBox
		listCheck = [];
		jQuery("input[name='coleccion_id_logo[]']:checked").each(function() {
		     //console.log(jQuery(this).val());
		     listCheck.push(jQuery(this).val());
		});
		//console.log(listCheck);
		

		/*
		//para tratar imagenes
		var file_data = jQuery('#logo').prop('files')[0];   
		//console.log(file_data);
		var form_data = new FormData();                  
		form_data.append('file', file_data);
		//alert(form_data);          		
		//console.log(form_data);
		*/
		

		/*
		jQuery.each(form_data, function(key, value){
	        form_data.append(key, value);
	        console.log(key);
	        console.log(value);
	    });
		console.log(form_data);
	    */

		jQuery('#foo').css('display','block');

		var spinner = new Spinner(opts).spin(target);

		/*
		var formData = new FormData();
		//formData.append('file', jQuery('#logo')[0].files[0]);
		formData.append('file', jQuery('#logo').prop('files')[0]);
		  */

		//var fd = new FormData(document.getElementById("form_fotocalendario"));
		//console.log(fd);
		//alert(fd);


//var fd = new FormData(document.getElementById("form_fotocalendario"));
//var fd1 = new FormData(document.getElementById("form_validar_fotocalendario"));
   //fd.append("personalizando", "osmel");  //agrega un campo personalizado
/*
datos = {
		fd:fd
		//fd1:fd1
};

*/

var prod1 = new Producto('01','Pizza','$3000');
var prod2 = new Producto('02','Helado','$2000');

var listaProductos = [];
 
listaProductos.push(prod1);
listaProductos.push(prod2);

productosJSON = JSON.stringify(listaProductos); //

jquery.ajax({
  url: "guardar_lista",
  type: "POST",
  data: productosJSON,

  
 // processData: false,  // tell jQuery not to process the data
  //contentType: false   // tell jQuery not to set contentType
});


/*
jQuery(this).ajaxSubmit({
	
	beforeSend: function(){
             obj = fd;
    },

    data: obj,

  processData: false,  // tell jQuery not to process the data
  contentType: false   // tell jQuery not to set contentType

});
*/

/*
		jQuery(this).ajaxSubmit({

 			 // enctype: 'multipart/form-data',
              //processData: false,  // tell jQuery not to process the data
              //contentType: false,   // tell jQuery not to set contentType
			  cache:false,
			  dataType: 'json',
			  type:'POST',

      		data: {

      			//logo:fd,
      			//logo:jQuery('#logo').val(),

      			titulo: jQuery('#titulo').val(),
      			nombre: jQuery('#nombre').val(),
      			apellidos: jQuery('#apellidos').val(),

      			coleccion_id_logo: listCheck,
      			id_dia: jQuery('#id_dia').val(),
      			id_mes: jQuery('#id_mes').val(),
      			id_festividad: jQuery('#id_festividad').val(),

      			listadias:$.miespacionombre.listaDias,
      			nombre_mes:$.miespacionombre.nombre_mes

      		 },
      		
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

							window.location.href = '/'+$catalogo;	
							//jQuery('#modalPregunta').modal();


				}
			} 
		});

*/
		return false;
	});	






/*
titulo
nombre
apellidos
logo

portada 1
interior 2

id_mes
id_dia
id_festividad

id_ano
mes_mostrar
id_lista
*/

/*
$("#theForm").ajaxSubmit({
      url: 'server.php', 
      type: 'post', 
      data: { key1: 'value1', key2: 'value2' }
})
*/


});



