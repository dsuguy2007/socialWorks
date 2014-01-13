<?php
class Application_Form_Pharmaceutical extends Main_Forms_Builder {


   public $formType = 'Add';
   public $row_id;
   public $customSubmitBtn = false;

    public function build( $action = "/pharmaceutical/new",  $id = null, $method = "post" ) {
       
      $this->row_id = $id;
       
       if ( !empty( $this->row_id )) {
            $this->formType = 'Update';
       }
     
       $this->setName("pharmaceutical-form");
       $this->setMethod($method);
       $this->setAction($action);
       $this->formElementsFromTable('pharmaceuticals', $this->getFields());
       $this->formElementsFromArray($this->getCustomFields());
       $this->createElements();

    }

    public function getFields() {

       return  array( "maker" => array('label'=>'Drug Manufacturer', 'required'=> false), 
                      "name"=>array('label'=>'Drug Name', 'required'=> true),
                      "site"=>array('label'=>'Web Site', 'required'=> true ),
                      "blood_level_monitoring"=> array('label'=>'Requires periodic blood level monitoring', 'value'=>1, 'type'=>'checkbox'),
                      "side_effects" => array('label'=>'Side Effects', 'attributes'=>array('rows'=>'4', 'cols'=>'8', 'class'=>'textarea-standard-size'))
                      );
    }
      /*
                   
    "mg"=>array('label'=>'mg/mL', 'required'=> false ),
                      "frequency"=> array('label'=>'Frequency', 'required'=> false ), 
                      "unit"=> array('label'=>'Time', 'required'=> false ), 
                      
    */
  
    public function getCustomFields() {

     $custom = array('submit' => array(
                                 'label'=>$this->formType,
                                 'type'=>'submit',
                                 'name'=>'submit',
                                 'disableDecorator' => array('HtmlTag', 'Label', 'DtDdWrapper'), 
                                 'options' => array('class'=>'btn btn-small btn-primary'),
                                 'ignore'=>true),
                                 
                    'cancel' => array(
                                  'label'=>'Cancel',
                                  'type'=>'button',
                                  'name'=>'cancel',
                                  'disableDecorator' => array('HtmlTag', 'Label', 'DtDdWrapper'),
                                  'attributes'=>array('onclick'=>"history.back();"),
                                  'options' => array('class'=>'btn btn-small btn-primary'),
                                  'ignore'=>true       
                                 )
                                 
                                 );
                                 
                                 
        if(!empty($this->row_id )) {
        $custom['id'] = array('type'=>'hidden',
                              'name'=>'id',
                              'disableDecorator' => array('HtmlTag', 'Label', 'DtDdWrapper'),
                              'default'=>$this->row_id,
                              'required'=>true);
    }                
                                 


    return $custom;


    }
    
    
}
