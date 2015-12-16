$(document).ready(function() {
	$("#drop-area").on('dragenter', function (e){
		e.preventDefault();
		$(this).css('background', '#BBD5B8');
	});

	$("#drop-area").on('dragover', function (e){
		e.preventDefault();
	});

	$("#drop-area").on('drop', function (e){
		$(this).css('background', '#D8F9D3');
		e.preventDefault();
		var image = e.originalEvent.dataTransfer.files;
		createFormData(image);
	});

	//1- cuando carga la pagina checar si hay imagenes
	var session = $('#session').val();
	buscarImagen(session);

});

function createFormData(image) {

	var anoActual = new Date();

	var dia = anoActual.getDay().toString();
	var mes = anoActual.getMonth().toString();
	var ano = anoActual.getFullYear().toString();

	

	var session = $('#session').val();
	var uid_original = dia+' '+mes+' '+ano;
	


	var formImage = new FormData();

	//LIMPIAR PRIMERO EL COMPONENTE
	$('#cont_img').remove();
	formImage.append('userImage', image[0]);
	formImage.append('session', session);
	formImage.append('uid_original', uid_original);
	uploadFormData(formImage);
}

//2 ARRASTRA IMAGEN
function uploadFormData(formData) {
	$.ajax({
		url: "http://localhost/tinbox/upload",
		type: "POST",
		data: formData,
		contentType:false,
		cache: false,
		processData: false,
		success: function(data){
			//var daa = '<div id="cont_img"><img id_diseno="1" id="image" src="http://localhost/tinbox/uploads/BjDzaRqO5QnKIuSdmv/Orig_3_11_2015.png" style="max-width: 100%;" alt="Picture" class="cropper-hidden"></div>'+'<script src="http://localhost/tinbox/js/fotoimagen/main.js" type="text/javascript"></script>';
			//$('#drop-area').append(daa);
			$('#drop-area').append(data);
		}
	});
}


//1
function buscarImagen(id_session) {
	$.ajax({
		url: "http://localhost/tinbox/buscarimagen",
		type: "POST",
		data: {
			id_session:id_session	
		},
		dataType: 'json',
		success: function(data){
			//mostrar la imagen
			    //console.log(data);
				if (data.datos != []) {
					$.each((data.datos), function (i, valor) { //$.parseJSON
						//console.log(i+':'+valor);
						//$('#drop-area').append(i+':'+valor);
					});
					
				}
			//$('#drop-area').append(data.datos.recorte);	

			$('#drop-area').append(data.imagen);
			
		}
	});
}