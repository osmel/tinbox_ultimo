$(function () {

  'use strict';

  var console = window.console || { log: function () {} };
  var $image = $('#image');
  var $download = $('#download');
  var $dataX = $('#dataX');
  var $dataY = $('#dataY');
  var $dataHeight = $('#dataHeight');
  var $dataWidth = $('#dataWidth');
  var $dataRotate = $('#dataRotate');
  var $dataScaleX = $('#dataScaleX');
  var $dataScaleY = $('#dataScaleY');
  
  var options = {
 

        //Estableciendo la relación de aspecto
        aspectRatio: 1 / 1,
        //viewMode: 3,

        //deshabilita para recortar la imagen de forma automática cuando initialize.
        autoCropArea: 1,
        restore: false,
        
        //Mostrar el modal negro sobre la imagen y en el cuadro de recorte.
        modal: false,
        //Mostrar las líneas de puntos(dashed ) por encima del cuadro de recorte.
        guides: false,

        //Mostrar el modal blanco sobre el cuadro de recorte (resaltando el cuadro de recorte).
        highlight: false,



        preview: '.img-preview',
        dragCrop: false,
        mouseWheelZoom: true,
        resizable: true,

        //comenzar con el estado de mover (manito)
        dragMode: 'move',
        //Deshabilitar el cambio entre el modo "crop" y "move"  al hacer dobleClick
        toggleDragModeOnDblclick:false,

        //Desabilitar las acciones de mover y cambiar tamaño en cuadro de recorte.
        cropBoxMovable:false,
        cropBoxResizable:false,


        //minimo en que se puede poner el contenedor        
        minContainerHeight:500,
        minContainerWidth:500,

        //minimo en que se puede poner el cropper
        minCropBoxWidth: 500,
        minCropBoxHeight: 500,

        //minimo en que puede achicar la imagen(Canvas)
        minCanvasHeight:100, //minimo Alto de la imagen 
        minCanvasWidth:100,  //minimo Ancho de la imagen



        crop: function (e) {
          $dataX.val(Math.round(e.x));
          $dataY.val(Math.round(e.y));
          $dataHeight.val(Math.round(e.height));
          $dataWidth.val(Math.round(e.width));
          $dataRotate.val(e.rotate);
          $dataScaleX.val(e.scaleX);
          $dataScaleY.val(e.scaleY);
        },
        built:function(){

             var cwidth = parseFloat($('#image').attr('cwidth'));
            var cheight = parseFloat($('#image').attr('height'));
              var cleft = parseFloat($('#image').attr('cleft'));
               var ctop = parseFloat($('#image').attr('ctop'));
               var rotate = ($('#image').attr('rotate'));

               var scaleX = parseInt($('#image').attr('scaleX'));
               var scaleY = parseInt($('#image').attr('scaleY'));

                //$('#image').cropper('setCropBoxData',{
                $('#image').cropper('setCanvasData',{
                    width: cwidth,
                    height: cheight,
                    left:cleft,
                     top:ctop,
                     //naturalWidth:960,
                     //naturalHeight:540
                });

                $('#image').cropper('rotateTo',rotate);

                $('#image').cropper('scaleX', scaleX);
                $('#image').cropper('scaleY', scaleY);


                /*
          rotate: 45
          scaleX: 1
          scaleY: -1
                */
            }        
      };


  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();


  // Cropper

  $image.on({
    
    //"build" Es llamada cuando una instancia cropper comienza a cargar una imagen.
    'build.cropper': function (e) {
      console.log(e.type);
    },

    //"built" Es llamada cuando una instancia cropper se ha construido completamente.
    'built.cropper': function (e) {
      console.log(e.type);
    },
    
    
    //"cropstart" Es llamada cuando el "canvas" o el "cuadro de recorte" comienza(start) a cambiar.
    'cropstart.cropper': function (e) {
      console.log(e.type, e.action);
    },

    
    
    //"cropmove" Es llamada cuando el "canvas" o el "cuadro de recorte" esta cambiando
    'cropmove.cropper': function (e) {
      console.log(e.type, e.action);
    },

    //"cropend" Es llamada cuando el "canvas" o el "cuadro de recorte" deja(stop) de cambiar.
    'cropend.cropper': function (e) {
      console.log(e.type, e.action);
    },

    //"crop". Se llama cuando el "canvas" o el "cuadro de recorte" cambiaron.
    'crop.cropper': function (e) { //constantemente mientras se mueva
      console.log(e.type, e.x, e.y, e.width, e.height, e.rotate, e.scaleX, e.scaleY);
    },

    //"zoom" Se llama cuando una instancia cropper comienza a acercar o alejar(zoom) la imagen de su canvas
    'zoom.cropper': function (e) { //zoom + o -
      console.log(e.type, e.ratio);
    }
    
  }).cropper(options);



$('body').on('click', '#guardar', function () {
  var result;

  var anoActual = new Date();

  var dia = anoActual.getDay().toString();
  var mes = anoActual.getMonth().toString();
  var ano = anoActual.getFullYear().toString();

  
  var tipo_archivo= ($('#image').attr('tipo_archivo'));
  var nombre = ($('#image').attr('nombre'));
  
  var tipo = ($('#image').attr('tipo'));
  var ext = ($('#image').attr('ext'));
  var tamano = ($('#image').attr('tamano'));
  var ancho = ($('#image').attr('ancho'));
  var alto = ($('#image').attr('alto'));

                 



     if ($image.data('cropper')) {

           // console.log($image.cropper('getImageData'));

          /*
          aspectRatio: 0.5436183927804039
          height: 291.8658290226868
          left: 79.95440237773605
          naturalHeight: 2327
          naturalWidth: 1265
          rotate: 45
          scaleX: 1
          scaleY: -1
          top: 13.353304306809264
          width: 158.66363288083318

          tinbox_fotocalendario_imagenes
          tinbox_fotocalendario_imagenes_original
          tinbox_fotocalendario_imagenes_recorte
          */


            var session = $('#session').val();

            var datoimagen = $image.cropper('getImageData');
            var datocanvas = $image.cropper('getCanvasData');
            
            var result =  $image.cropper('getCroppedCanvas');
            var croppedImageDataURL = result.toDataURL(tipo_archivo); 
            var formData = new FormData();

            formData.append('croppedImage', croppedImageDataURL);
            formData.append('datoimagen', JSON.stringify(datoimagen));
            formData.append('datocanvas', JSON.stringify(datocanvas));

            console.log(JSON.stringify(datocanvas));

            formData.append('session', session);


            formData.append('tipo_archivo', tipo_archivo);
            formData.append('nombre', nombre);
            formData.append('tipo', tipo);
            formData.append('ext', ext);
            formData.append('tamano', tamano);
            formData.append('ancho', ancho);
            formData.append('alto', alto);

            formData.append('ano', ano);
            formData.append('mes', mes);
            formData.append('dia', dia);




            $.ajax('http://localhost/tinbox/guardar_imagen', {
              method: "POST",
              data: formData,
              processData: false,
              contentType: false,
              success: function(data){  
                console.log('Upload success');
              },
              error: function () {
                console.log('Upload error');
              }
            }); 
         
     }   

});



  // Buttons
  
  if (!$.isFunction(document.createElement('canvas').getContext)) {
    $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
  }

  if (typeof document.createElement('cropper').style.transition === 'undefined') {
    $('button[data-method="rotate"]').prop('disabled', true);
    $('button[data-method="scale"]').prop('disabled', true);
  }
  


  // Download
  /*
  if (typeof $download[0].download === 'undefined') {
    //alert('1');
    $download.addClass('disabled');
  }
  */


  // Options  // todos los botones que estan al lado derecho "desde 16:9 - toggle options"
  /*
  $('.docs-toggles').on('change', 'input', function () {
    var $this = $(this);
    var name = $this.attr('name');
    var type = $this.prop('type');
    var cropBoxData;
    var canvasData;

    if (!$image.data('cropper')) {
      return;
    }

    if (type === 'checkbox') {
      options[name] = $this.prop('checked');
      cropBoxData = $image.cropper('getCropBoxData');
      canvasData = $image.cropper('getCanvasData');

      options.built = function () {
        $image.cropper('setCropBoxData', cropBoxData);
        $image.cropper('setCanvasData', canvasData);
      };
    } else if (type === 'radio') {
      options[name] = $this.val();
    }

    $image.cropper('destroy').cropper(options);
  });
*/

//http://www.scriptscoop.net/t/60e754985ac3/javascript-canvas-toblob-fails-when-a-patterned-fill-is-used.html
/*
if( !HTMLCanvasElement.prototype.toBlob ) {
    Object.defineProperty( HTMLCanvasElement.prototype, 'toBlob', { 
        value: function( callback, type, quality ) {
            const bin = atob( this.toDataURL( type, quality ).split(',')[1] ),
                  len = bin.length,
                  len32 = len >> 2,
                  a8 = new Uint8Array( len ),
                  a32 = new Uint32Array( a8.buffer, 0, len32 );

            for( var i=0, j=0; i < len32; i++ ) {
                a32[i] = bin.charCodeAt(j++)  |
                    bin.charCodeAt(j++) << 8  |
                    bin.charCodeAt(j++) << 16 |
                    bin.charCodeAt(j++) << 24;
            }

            let tailLength = len & 3;

            while( tailLength-- ) {
                a8[ j ] = bin.charCodeAt(j++);
            }

            callback( new Blob( [a8], {'type': type || 'image/png'} ) );
        }
    });
}
*/

//https://developer.mozilla.org/es/docs/Web/API/HTMLCanvasElement/toBlob (PolyfillEDIT)
if (!HTMLCanvasElement.prototype.toBlob) {
 Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
  value: function (callback, type, quality) {

    var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
        len = binStr.length,
        arr = new Uint8Array(len);

    for (var i=0; i<len; i++ ) {
     arr[i] = binStr.charCodeAt(i);
    }

    callback( new Blob( [arr], {type: type || 'image/png'} ) );
  }
 });
}







  // Methods //click encima de cualquier boton que esta debajo de la imagen
  $('.docs-buttons').on('click', '[data-method]', function () {
    var $this = $(this);
    var data = $this.data();
    var $target;
    var result;


    if ($this.prop('disabled') || $this.hasClass('disabled')) {
      return;
    }

    if ($image.data('cropper') && data.method) {
      data = $.extend({}, data); // Clone a new one

      if (typeof data.target !== 'undefined') {
        $target = $(data.target);

        if (typeof data.option === 'undefined') {
          try {
            data.option = JSON.parse($target.val());
          } catch (e) {
            console.log(e.message);
          }
        }
      }

      result = $image.cropper(data.method, data.option, data.secondOption);



      switch (data.method) {
     
        
        case 'scaleX':
        case 'scaleY':
          $(this).data('option', -data.option);
          break;
        
        case 'getCroppedCanvas':
          if (result) {

            // Bootstrap's Modal
            //$('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

            //console.log($image.cropper("getCanvasData"));

            $image.attr('href', result.toDataURL() );

            if (!$download.hasClass('disabled')) {
              //alert(result.toDataURL());
              //http://www.jqueryscript.net/demo/jQuery-In-Place-Image-Cropping-Plugin-cropbox/
              //console.log($image.getImageData());
              //var canvasData;
              //canvasData = $image.cropper('getCanvasData');
              //console.log(canvasData);

              //https://fengyuanchen.github.io/cropper/v0.7.9/
              
              //$download.attr('href', result.toDataURL());

              //http://jsfiddle.net/PAEz/XfDUS/
            }
          }

          break;
      }

      if ($.isPlainObject(result) && $target) {
        try {
          $target.val(JSON.stringify(result));
        } catch (e) {
          console.log(e.message);
        }
      }

    }
  });



  // Keyboard   //cuando muevo con las teclas 
  $(document.body).on('keydown', function (e) {
    
    //console.log($image.cropper("getImageData"));
    //console.log($('#image').cropper("getImageData"));

    //console.log($image.cropper("getCanvasData"));
    


//$image.cropper('getCroppedCanvas')

/*
$image.cropper('getCroppedCanvas');

$image.cropper('getCroppedCanvas', {
  width: 160,
  height: 90
});
*/



    
    return;

    if (!$image.data('cropper') || this.scrollTop > 300) {
      return;
    }

    switch (e.which) {
      case 37:
        e.preventDefault();
        $image.cropper('move', -1, 0);
        break;

      case 38:
        e.preventDefault();
        $image.cropper('move', 0, -1);
        break;



      case 39:
        e.preventDefault();
        $image.cropper('move', 1, 0);
        break;

      case 40:
        e.preventDefault();
        $image.cropper('move', 0, 1);
        break;
    }

  });


  // Import image
  var $inputImage = $('#inputImage');
  var URL = window.URL || window.webkitURL;
  var blobURL;

  if (URL) {
    $inputImage.change(function () {
      var files = this.files;
      var file;

      if (!$image.data('cropper')) {
        return;
      }

      if (files && files.length) {
        file = files[0];

        if (/^image\/\w+$/.test(file.type)) {
          blobURL = URL.createObjectURL(file);
          $image.one('built.cropper', function () {

            // Revoke when load complete
            URL.revokeObjectURL(blobURL);
          }).cropper('reset').cropper('replace', blobURL);
          $inputImage.val('');
        } else {
          window.alert('Please choose an image file.');
        }
      }
    });
  } else {
    $inputImage.prop('disabled', true).parent().addClass('disabled');
  }

});
