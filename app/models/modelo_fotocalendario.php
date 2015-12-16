<?php if(! defined('BASEPATH')) exit('No tienes permiso para acceder a este archivo');
  class modelo_fotocalendario extends CI_Model{
    
    private $key_hash;
    private $timezone;
    function __construct(){
      parent::__construct();
      $this->load->database("default");
      $this->key_hash    = $_SERVER['HASH_ENCRYPT'];
      $this->timezone    = 'UM1';
      date_default_timezone_set('America/Mexico_City');   
      $this->catalogo_logo           = $this->db->dbprefix('catalogo_logo');
      $this->catalogo_festividad     = $this->db->dbprefix('catalogo_festividad');
      
      //uid_fotocalendario
      $this->fotocalendario_temporal    = $this->db->dbprefix('fotocalendario_temporal');
      $this->fechas_especiales    = $this->db->dbprefix('fechas_especiales');
      $this->nombre_meses    = $this->db->dbprefix('nombre_meses');
      //uid_lista
      $this->fotocalendario_lista    = $this->db->dbprefix('fotocalendario_lista');
      $this->lista_nombre_meses    = $this->db->dbprefix('lista_nombre_meses');
      $this->lista_fechas_especiales    = $this->db->dbprefix('lista_fechas_especiales');
      $this->fotocalendario_imagenes    = $this->db->dbprefix('fotocalendario_imagenes');
      $this->fotocalendario_imagenes_original    = $this->db->dbprefix('fotocalendario_imagenes_original');
      $this->fotocalendario_imagenes_recorte    = $this->db->dbprefix('fotocalendario_imagenes_recorte');
    }
///////////////////checar si existe el dato q voy agregar//////////////////////////
    public function fotocalendario_edicion($data){
            $this->db->select("id, uid_fotocalendario, id_session,cantDiseno, movposicion, id_diseno, id_tamano");         
            $this->db->select("titulo, nombre, apellidos");         
            $this->db->select("id_mes, id_dia, id_festividad, id_ano, id_lista, logo, coleccion_id_logo, fecha");         
            //, id_mes, id_dia, id_festividad, id_ano, id_lista, logo, coleccion_id_logo, fecha
            $this->db->from($this->fotocalendario_temporal);
            $where = '(
                        (
                          ( id_session =  "'.$data['id_session'].'" ) AND
                          ( movposicion =  '.$data['movposicion'].' ) 
                          
                         )
              )';   
  
            $this->db->where($where);
            
            $info = $this->db->get();
            if ($info->num_rows() > 0) {
                return $info->row();
            }    
            else
                return false;
            $info->free_result();
    } 
///////////////////checar si existe el dato q voy agregar//////////////////////////
    public function check_existente_fotocalendario($data){
            $this->db->select("uid_fotocalendario", FALSE);         
            $this->db->from($this->fotocalendario_temporal);
            $where = '(
                        (
                          ( id_session =  "'.$data['id_session'].'" ) AND
                          ( movposicion =  '.$data['movposicion'].' ) 
                          
                         )
              )';   
  
            $this->db->where($where);
            
            $info = $this->db->get();
            if ($info->num_rows() > 0) {
                $fila = $info->row(); 
                return $fila->uid_fotocalendario;
            }    
            else
                return false;
            $info->free_result();
    } 
    /////////////////////////////////////////////    
    /////////////////////////////////////////////
    public function listado_listas($data){
            $this->db->select("l.id, l.uid_lista, l.correo, l.nombre");         
            $this->db->from($this->fotocalendario_lista.' As l');
            $this->db->where('l.correo',$data['correo_activo']);
            $result = $this->db->get(  );
                if ($result->num_rows() > 0)
                    return $result->result();
                else 
                    return FALSE;
                $result->free_result();
     }  
  public function listadias_cambiar($data){
            $this->db->select("l.id, l.uid_lista, l.correo, l.nombre");         
            $this->db->select("d.ano, d.mes, d.dia, d.valor");         
            $this->db->from($this->fotocalendario_lista.' As l');
            $this->db->join($this->lista_fechas_especiales.' As d', 'd.uid_lista = l.uid_lista','LEFT');
      $where = '(
                      (
                        ( l.correo =  '.$data['correo_activo'].' ) AND ( l.id =  '.$data['id_lista'].' ) 
                       )
            )';   
      $this->db->where($where);
            $result = $this->db->get(  );
                if ($result->num_rows() > 0)
                    return $result->result();
                else 
                    return FALSE;
                $result->free_result();
    }            
 public function listames_cambiar($data){
            $this->db->select("l.id, l.uid_lista, l.correo, l.nombre");         
            $this->db->select("m.ano, m.mes,  m.valor");         
            $this->db->from($this->fotocalendario_lista.' As l');
            $this->db->join($this->lista_nombre_meses.' As m', 'm.uid_lista = l.uid_lista','LEFT');
            $where = '(
                            (
                              ( l.correo =  '.$data['correo_activo'].' ) AND ( l.id =  '.$data['id_lista'].' ) 
                             )
                  )';   
            $this->db->where($where);
            $result = $this->db->get(  );
                if ($result->num_rows() > 0)
                    return $result->result();
                else 
                    return FALSE;
                $result->free_result();
    }             
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
     public function listado_logos( ){
              
            $this->db->select("l.id, l.nombre,l.tooltip ");         
            $this->db->from($this->catalogo_logo.' As l');
            $result = $this->db->get(  );
                if ($result->num_rows() > 0)
                    return $result->result();
                else 
                    return FALSE;
                $result->free_result();
     }  
     public function listado_festividades( ){
              
            $this->db->select("f.id, f.nombre");         
            $this->db->from($this->catalogo_festividad.' As f');
            $result = $this->db->get(  );
                if ($result->num_rows() > 0)
                    return $result->result();
                else 
                    return FALSE;
                $result->free_result();
     }       
     //fin de catalogos
    //Fotocalendario
     public function anadir_fotocalendario($data){
          
          
         //id, uid_fotocalendario,
         //** id_diseno, id_tamano,
         // titulo, nombre, apellidos, id_mes, id_dia, id_festividad, 
         //"id_ano", id_lista, 
         //logo, coleccion_id_logo 
         //, fecha
          $this->db->set( 'uid_fotocalendario', $data['uid_fotocalendario'] );  //
          $this->db->set( 'id_diseno', $data['id_diseno'] );  //
          $this->db->set( 'id_tamano', $data['id_tamano'] );  //
          $this->db->set( 'id_session', $data['id_session'] );  //
          $this->db->set( 'cantDiseno', $data['cantDiseno'] );  //
          $this->db->set( 'movposicion', $data['movposicion'] );  //
          $this->db->set( 'titulo', $data['titulo'] );  
          $this->db->set( 'nombre', $data['nombre'] );  
          $this->db->set( 'apellidos', $data['apellidos'] );  
          $this->db->set( 'id_dia', $data['id_dia'] );  
          $this->db->set( 'id_mes', $data['id_mes'] );  
          $this->db->set( 'id_festividad', $data['id_festividad'] );  
          if (isset($data['id_lista'])) {
              $this->db->set( 'id_lista', $data['id_lista'] );  
          }    
          //$this->db->set( 'logo', $data['logo'] );  //
          if  (isset($data['logo'])) {
                $this->db->set( 'logo', $data['logo']['file_name']);          
           }  
          $this->db->set( 'coleccion_id_logo', $data['coleccion_id_logo'] );  
            $this->db->insert($this->fotocalendario_temporal);
            if ($this->db->affected_rows() > 0){
                    return TRUE;
                } else {
                    return FALSE;
                }
                $result->free_result();
     }            
      public function anadir_nombre_mes($data){
         
          foreach ($data['nombre_mes'] as $llave => $valor) {
            if (isset($valor['ano'])) {
                 $this->db->set( 'uid_fotocalendario', $data['uid_fotocalendario'] );  
                 $this->db->set( 'ano', $valor['ano'] );  
                 $this->db->set( 'mes', $valor['mes'] );  //+1
                 $this->db->set( 'valor', $valor['valor'] );  
                 $this->db->insert($this->nombre_meses);
             }    
            } 
            
            if ($this->db->affected_rows() > 0){
                    return TRUE;
                } else {
                    return FALSE;
                }
                $result->free_result();
      } 
      public function anadir_listadias($data){
          foreach ($data['listadias'] as $llave => $valor) {
               $this->db->set( 'uid_fotocalendario', $data['uid_fotocalendario'] );  
               $this->db->set( 'ano', $valor['ano'] );  
               $this->db->set( 'mes', $valor['mes'] );   //+1
               $this->db->set( 'dia', $valor['dia'] );  
               $this->db->set( 'valor', $valor['valor'] );  
               $this->db->insert($this->fechas_especiales);
            } 
            
            if ($this->db->affected_rows() > 0){
                    return TRUE;
                } else {
                    return FALSE;
                }
                $result->free_result();
      }       
     
     //fin del fotocalendario
/////////////////////////ver lista de un diseño particular////////////////////////////////////
  public function listadias_fcalendario($data){
            //$this->db->select("l.id, l.uid_fotocalendario, l.correo, l.nombre");         
            $this->db->select("d.ano, d.mes, d.dia, d.valor");         
            $this->db->from($this->fotocalendario_temporal.' As l');
            $this->db->join($this->fechas_especiales.' As d', 'd.uid_fotocalendario = l.uid_fotocalendario','LEFT');
            $where = '(
                      (
                        ( l.uid_fotocalendario =  "'.$data['uid_fotocalendario'].'" )
                       )
            )';   
           $this->db->where($where);
            $result = $this->db->get( );
                if ($result->num_rows() > 0)
                    return $result->result();
                else 
                    return FALSE;
                $result->free_result();
    }            
 public function listames_fcalendario($data){
            //$this->db->select("l.id, l.uid_fotocalendario, l.correo, l.nombre");         
            $this->db->select("m.ano, m.mes,  m.valor");         
            $this->db->from($this->fotocalendario_temporal.' As l');
            $this->db->join($this->nombre_meses.' As m', 'm.uid_fotocalendario = l.uid_fotocalendario','LEFT');
            $where = '(
                            (
                              ( l.uid_fotocalendario =  "'.$data['uid_fotocalendario'].'" )
                             )
                  )';   
            $this->db->where($where);
            $result = $this->db->get();
                if ($result->num_rows() > 0)
                    return $result->result();
                else 
                    return FALSE;
                $result->free_result();
    }                 
////////////////////////////eliminar/////////////////////////////
    public function eliminar_fotocalendario( $data ){
        $this->db->delete( $this->fotocalendario_temporal, array( 'uid_fotocalendario' => $data ) );
        if ( $this->db->affected_rows() > 0 ) return TRUE;
        else return FALSE;
    }
    public function eliminar_listadias( $data ){
        $this->db->delete( $this->fechas_especiales, array( 'uid_fotocalendario' => $data ) );
        if ( $this->db->affected_rows() > 0 ) return TRUE;
        else return FALSE;
    }
    public function eliminar_nombre_mes( $data ){
        $this->db->delete( $this->nombre_meses, array( 'uid_fotocalendario' => $data ) );
        if ( $this->db->affected_rows() > 0 ) return TRUE;
        else return FALSE;
    }
///////////////////////fin de eliminar ///////////////////////////      
     //listas
     public function anadir_lista($data){
           $this->db->set( 'uid_lista', $data['uid_lista'] );  
           $this->db->set( 'nombre', $data['nombre_lista'] );  
           $this->db->set( 'correo', $data['correo_lista'] );   //+1
           $this->db->insert($this->fotocalendario_lista);
          
          if ($this->db->affected_rows() > 0){
                    return TRUE;
                } else {
                    return FALSE;
                }
                $result->free_result();
     }
      public function anadir_lista_listadias($data){
          foreach ($data['listadias'] as $llave => $valor) {
               $this->db->set( 'uid_lista', $data['uid_lista'] );  
               $this->db->set( 'ano', $valor['ano'] );  
               $this->db->set( 'mes', $valor['mes'] );   //+1
               $this->db->set( 'dia', $valor['dia'] );  
               $this->db->set( 'valor', $valor['valor'] );  
               $this->db->insert($this->lista_fechas_especiales);
            } 
            
            if ($this->db->affected_rows() > 0){
                    return TRUE;
                } else {
                    return FALSE;
                }
                $result->free_result();
      }       
     
     public function anadir_lista_nombre_mes($data){
         
          foreach ($data['nombre_mes'] as $llave => $valor) {
            if (isset($valor['ano'])) {
                 $this->db->set( 'uid_lista', $data['uid_lista'] );  
                 $this->db->set( 'ano', $valor['ano'] );  
                 $this->db->set( 'mes', $valor['mes'] );  //+1
                 $this->db->set( 'valor', $valor['valor'] );  
                 $this->db->insert($this->lista_nombre_meses);
             }    
            } 
            
            if ($this->db->affected_rows() > 0){
                    return TRUE;
                } else {
                    return FALSE;
                }
                $result->free_result();
      } 
     //fin de la lista
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////Tratamiento de imagen////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////checar si existe el dato de IMAGEN q voy agregar//////////////////////////
    public function check_existente_imagen($data){
            $this->db->select("uid_imagen", FALSE);         
            $this->db->from($this->fotocalendario_imagenes);
      /*
      $this->fotocalendario_imagenes    
      $this->fotocalendario_imagenes_original
      $this->fotocalendario_imagenes_recorte 
      */
            $where = '(
                        (
                          ( id_session =  "'.$data['id_session'].'" ) AND
                          ( original =  "'.$data['nombre'].'" ) AND
                          ( ano =  "'.$data['ano'].'" ) AND
                          ( mes =  "'.$data['mes'].'" ) AND
                          ( id_diseno =  '.$data['id_diseno'].' ) AND
                          
                          ( dia =  "'.$data['dia'].'" ) 
                          
                         )
              )';   
  
            $this->db->where($where);
            
            $info = $this->db->get();
            if ($info->num_rows() > 0) {
                $fila = $info->row(); 
                return $fila->uid_imagen;
            }    
            else
                return false;
            $info->free_result();
    } 
    /////////////////////////////////////////////    
    /////////////////////////////////////////////
////////////////////////////eliminar/////////////////////////////
    public function eliminar_imagenes( $data ){
        $this->db->delete( $this->fotocalendario_imagenes, array( 'uid_imagen' => $data ) );
        if ( $this->db->affected_rows() > 0 ) return TRUE;
        else return FALSE;
    }
    public function eliminar_imagenes_original( $data ){
        $this->db->delete( $this->fotocalendario_imagenes_original, array( 'uid_imagen' => $data ) );
        if ( $this->db->affected_rows() > 0 ) return TRUE;
        else return FALSE;
    }
    public function eliminar_imagenes_recorte( $data ){
        $this->db->delete( $this->fotocalendario_imagenes_recorte, array( 'uid_imagen' => $data ) );
        if ( $this->db->affected_rows() > 0 ) return TRUE;
        else return FALSE;
    }
/////////////////////////////////////////////    
    /////////////////////////////////////////////
////////////////////////////Agregar/////////////////////////////
     public function anadir_imagenes($data){
          $this->db->set('id_session', $data['id_session']);  
          $this->db->set('uid_imagen', $data['uid_imagen']);  

          $this->db->set('id_diseno', $data['id_diseno']);  

          $this->db->set('ano', $data['ano']);  
          $this->db->set('mes', $data['mes']);  
          $this->db->set('dia', $data['dia']);  
          $this->db->set('original', $data['nombre']);  
          $this->db->set('recorte', 'recorte_'.$data['nombre']);  
          
          $this->db->insert($this->fotocalendario_imagenes);
          
          if ($this->db->affected_rows() > 0){
                    return TRUE;
          } else {
              return FALSE;
          }
          $result->free_result();
     }
     
      public function anadir_imagenes_original($data){
             $this->db->set('id_session', $data['id_session']);  
             $this->db->set('uid_imagen', $data['uid_imagen']);  
                 $this->db->set('nombre', $data['nombre']);
           $this->db->set('tipo_archivo', $data['tipo_archivo']);  
                   $this->db->set('tipo', $data['tipo']);  
                    $this->db->set('ext', $data['ext']);   
                 $this->db->set('tamano', $data['tamano']);  
                  $this->db->set('ancho', $data['ancho']);   
                   $this->db->set('alto', $data['alto']);  
                 $this->db->insert($this->fotocalendario_imagenes_original);
           
            if ($this->db->affected_rows() > 0){
                    return TRUE;
                } else {
                    return FALSE;
            }
            $result->free_result();
      }       
     
/*
          foreach ($data['listadias'] as $llave => $valor) {
               $this->db->set( 'uid_lista', $data['uid_lista'] );  
               $this->db->set( 'ano', $valor['ano'] );  
               $this->db->set( 'mes', $valor['mes'] );   //+1
               $this->db->set( 'dia', $valor['dia'] );  
               $this->db->set( 'valor', $valor['valor'] );  
               $this->db->insert($this->fotocalendario_imagenes_original);
            } 
*/            
     public function anadir_imagenes_recorte($data){
         
             $this->db->set('id_session', $data['id_session']);  
             $this->db->set('uid_imagen', $data['uid_imagen']);  
             

             $this->db->set('nombre', 'recorte_'.$data['nombre']);  

         
          foreach ($data['datoimagen'] as $llave => $valor) {
                 $this->db->set( $llave, $valor );  
          } 
          foreach ($data['datocanvas'] as $llave => $valor) {
                 $this->db->set( 'c'.$llave, $valor );  
          } 

          foreach ($data['datos'] as $llave => $valor) {
                 $this->db->set( 'd'.$llave, $valor );  
          } 

          foreach ($data['datocropbox'] as $llave => $valor) {
                 $this->db->set( 'b'.$llave, $valor );  
          } 



          $this->db->insert($this->fotocalendario_imagenes_recorte);
            
            if ($this->db->affected_rows() > 0){
                    return TRUE;
                } else {
                    return FALSE;
                }
                $result->free_result();
      } 
     //fin de la lista
    public function buscar_imagen($data){
            $this->db->select("i.id, i.id_session, i.id_diseno, i.uid_imagen, i.ano, i.mes, i.dia");         
            $this->db->select("o.nombre original, o.tipo_archivo, o.tipo, o.ext, o.tamano, o.ancho, o.alto");         
            $this->db->select("r.nombre recorte, r.aspectRatio, r.height, r.left, r.naturalHeight, r.naturalWidth, r.rotate, r.scaleX, r.scaleY, r.top, r.width");         
            $this->db->select("r.cwidth, r.cheight, r.cnaturalWidth, r.cnaturalHeight,  r.cleft, r.ctop");         
            $this->db->select("r.dx, r.dy, r.dwidth, r.dheight, r.drotate, r.dscaleX, r.dscaleY");         
            $this->db->select("r.bleft, r.btop, r.bwidth, r.bheight");         
            


            $this->db->from($this->fotocalendario_imagenes.' As i');
            $this->db->join($this->fotocalendario_imagenes_original.' As o', 'i.uid_imagen = o.uid_imagen','LEFT');
            $this->db->join($this->fotocalendario_imagenes_recorte.' As r', 'i.uid_imagen = r.uid_imagen','LEFT');
            $where = '(
                        (
                          ( i.id_session =  "'.$data['id_session'].'" )                          
                         )
              )';   
  
            $this->db->where($where);
            
            $info = $this->db->get();
            if ($info->num_rows() > 0) {
                return $info->row(); 
            }    
            else
                return false;
            $info->free_result();
    } 
  } 
?>