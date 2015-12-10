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
 

// http://codecanyon.net/item/html-5-upload-image-ratio-with-drag-and-drop/full_screen_preview/8712634?ref=jqueryrain

/*


      modal: false,
      guides: false,
      
      dragCrop: false,
      movable: false,
      resizable: false,
      zoomable: false,
      touchDragZoom: false,
      mouseWheelZoom: false,
      */
/*
        aspectRatio: 16 / 9,
        autoCrop:false,
        preview: '.img-preview',


        viewMode: 3,
        dragMode: 'none',
        //autoCropArea: 1,
        modal: false,
        guides: false,
        highlight: false,
        cropBoxMovable: false,
        cropBoxResizable: true,
        //minCropBoxWidth:774,
        maxCropBoxWidth:1500,

*/


  /*
        aspectRatio: 16 / 9,
        preview: '.img-preview',
*/

        aspectRatio: 1 / 1,
        preview: '.img-preview',
        minCropBoxWidth: 516,
        minCropBoxHeight: 516,
        dragCrop: false,
        mouseWheelZoom: false,
        resizable: false,

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
                $('#image').cropper('setCropBoxData',{
                    width: 516,
                    height: 516
                });
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


  // Buttons
  /*
  if (!$.isFunction(document.createElement('canvas').getContext)) {
    $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
  }

  if (typeof document.createElement('cropper').style.transition === 'undefined') {
    $('button[data-method="rotate"]').prop('disabled', true);
    $('button[data-method="scale"]').prop('disabled', true);
  }
  */


  // Download
  /*
  if (typeof $download[0].download === 'undefined') {
    alert('1');
    //$download.addClass('disabled');
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
            $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);
          
            if (!$download.hasClass('disabled')) {
              alert(result.toDataURL());
              return false;
              //$download.attr('href', result.toDataURL());
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


/*
  // Keyboard   //cuando muevo con las teclas 
  $(document.body).on('keydown', function (e) {

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
*/

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