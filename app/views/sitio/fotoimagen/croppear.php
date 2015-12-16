<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed'); ?>

<?php $this->load->view( 'sitio/fotoimagen/header' ); ?>      

<input type="text" id="session" name="session" value="<?php echo $session; ?>" >


  <!-- Content -->
   
  <div class="container">

  <!--
    <div class="row">
        <span class="page-header">Enero</span> 
        <button id="anterior" type="button" class="btn btn-info">MES ANTERIOR</button>
        <button id="siguiente" type="button" class="btn btn-info">MES SIGUIENTE</button>
     </div>
 -->
 
              <div id="meses" class="row">  
                <div class="col-md-4">  </div>
                <div class="col-md-4">  
                  <div class="col-xs-2 col-md-1"><a id="mes1" nmes="0" class="calendarioEventos-flecha1 botonMes" >Ene</a></div>
                  <div class="col-xs-2 col-md-1"><a id="mes2" nmes="1" class="calendarioEventos-flecha1 botonMes" >Feb</a></div>
                  <div class="col-xs-2 col-md-1"><a id="mes3" nmes="2" class="calendarioEventos-flecha1 botonMes" >Mar</a></div>
                  <div class="col-xs-2 col-md-1"><a id="mes4" nmes="3" class="calendarioEventos-flecha1 botonMes" >Abr</a></div>
                  <div class="col-xs-2 col-md-1"><a id="mes5" nmes="4" class="calendarioEventos-flecha1 botonMes" >May</a></div>
                  <div class="col-xs-2 col-md-1"><a id="mes6" nmes="5" class="calendarioEventos-flecha1 botonMes" >Jun</a></div>
                  <div class="col-xs-2 col-md-1"><a id="mes7" nmes="6" class="calendarioEventos-flecha1 botonMes" >Jul</a></div>
                  <div class="col-xs-2 col-md-1"><a id="mes8" nmes="7" class="calendarioEventos-flecha1 botonMes" >Ago</a></div>
                  <div class="col-xs-2 col-md-1"><a id="mes9" nmes="8" class="calendarioEventos-flecha1 botonMes" >Sep</a></div>
                  <div class="col-xs-2 col-md-1"><a id="mes10" nmes="9" class="calendarioEventos-flecha1 botonMes" >Oct</a></div>
                  <div class="col-xs-2 col-md-1"><a id="mes11" nmes="10" class="calendarioEventos-flecha1 botonMes" >Nov</a></div>
                  <div class="col-xs-2 col-md-1"><a id="mes12" nmes="11" class="calendarioEventos-flecha1 botonMes" >Dic</a></div>
                </div>
              </div>

    
    <div class="row">
      
      <div class="col-md-3">
         <?php $this->load->view( 'sitio/fotoimagen/slider' ); ?>
      </div>

      <h3 class="page-header">Imagen:</h3> 
      

      <div class="col-md-6" id="drop-area" style="max-width:520px;min-height:520px; padding:10px;border: 2px solid blue;">         
         

        
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
