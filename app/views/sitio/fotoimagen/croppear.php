<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed'); ?>

<?php $this->load->view( 'sitio/fotoimagen/header' ); ?>      

<input type="text" id="session" name="session" value="<?php echo $session; ?>" >

  <!-- Content -->
   
  <div class="container">

    <div class="row">
        <span class="page-header">Enero</span> 
        <button id="anterior" type="button" class="btn btn-info">MES ANTERIOR</button>
        <button id="siguiente" type="button" class="btn btn-info">MES SIGUIENTE</button>
     </div>
     
    
    <div class="row">
      
      <div class="col-md-3">
         <?php $this->load->view( 'sitio/fotoimagen/slider' ); ?>
      </div>

      <h3 class="page-header">Imagen:</h3> 
      

      <div class="col-md-6" id="drop-area" style="max-width:520px;min-height:520px; padding:10px;border: 2px solid blue;">         



      <!--
      <div class="col-md-6" id="drop-area" style="min-height:520px; padding:10px;border: 2px solid blue;">         
         
        <div class="img-container" id="cont_img">
          <img id="image" style="height:100%;width:100%" src="<?php echo base_url(); ?>js/fotoimagen/cropear/assets/img/picture.jpg" alt="Picture">
        </div>
        -->
      </div>
 

      <div class="col-md-3">
        <!-- <h3 class="page-header">Preview:</h3> -->
        <div class="docs-preview clearfix">
          <div class="img-preview preview-lg"></div>
          <div class="img-preview preview-md"></div>
          <div class="img-preview preview-sm"></div>
          <div class="img-preview preview-xs"></div>
        </div>
      </div>


    </div>
    <div class="row">
      <div class="col-md-9 docs-buttons">
       
        <div class="btn-group">
          <button type="button" class="btn btn-primary" data-method="zoom" data-option="0.1" title="Zoom In">
            <span class="docs-tooltip" data-toggle="tooltip" title="$().cropper(&quot;zoom&quot;, 0.1)">
              <span class="fa fa-search-plus"></span>
            </span>
          </button>
          <button type="button" class="btn btn-primary" data-method="zoom" data-option="-0.1" title="Zoom Out">
            <span class="docs-tooltip" data-toggle="tooltip" title="$().cropper(&quot;zoom&quot;, -0.1)">
              <span class="fa fa-search-minus"></span>
            </span>
          </button>
        </div>

  
        <div class="btn-group">
          <button type="button" class="btn btn-primary" data-method="rotate" data-option="-45" title="Rotate Left">
            <span class="docs-tooltip" data-toggle="tooltip" title="$().cropper(&quot;rotate&quot;, -45)">
              <span class="fa fa-rotate-left"></span>
            </span>
          </button>
          <button type="button" class="btn btn-primary" data-method="rotate" data-option="45" title="Rotate Right">
            <span class="docs-tooltip" data-toggle="tooltip" title="$().cropper(&quot;rotate&quot;, 45)">
              <span class="fa fa-rotate-right"></span>
            </span>
          </button>
        </div>
 
        <div class="btn-group">
          <button type="button" class="btn btn-primary" data-method="scaleX" data-option="-1" title="Flip Horizontal">
            <span class="docs-tooltip" data-toggle="tooltip" title="$().cropper(&quot;scaleX&quot;, -1)">
              <span class="fa fa-arrows-h"></span>
            </span>
          </button>
          <button type="button" class="btn btn-primary" data-method="scaleY" data-option="-1" title="Flip Vertical">
            <span class="docs-tooltip" data-toggle="tooltip" title="$().cropper(&quot;scaleY&quot;-1)">
              <span class="fa fa-arrows-v"></span>
            </span>
          </button>
        </div>
 
          <label class="btn btn-primary btn-upload" for="inputImage" title="Upload image file">
            <input type="file" class="sr-only" id="inputImage" name="file" accept="image/*">
            <span class="docs-tooltip" data-toggle="tooltip" title="Import image with Blob URLs">
              <span class="fa fa-upload"></span>
            </span>
          </label>

           <button id="guardar" type="button" class="btn btn-success">continuar</button>
       </div><!-- /.docs-buttons -->

    </div>
  </div>

<?php $this->load->view( 'sitio/fotoimagen/footer' ); ?>
