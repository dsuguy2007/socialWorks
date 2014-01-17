<?php
class Application_Form_Physician extends Main_Forms_Builder {


   public $formType = 'Add';
   public $row_id; 

    public function build( $action = "/physician/new",  $id = null, $method = "post" ) {
       
      $this->row_id = $id;
       
       if ( !empty( $this->row_id )) {
            $this->formType = 'Update';
       }
     
       $this->setName("physician-form");
       $this->setMethod($method);
       $this->setAction($action);
       $this->formElementsFromTable('physicians', $this->getFields());
       $this->formElementsFromArray($this->getCustomFields());
       $this->createElements();

    }

    public function getFields() {

       return  array( "name"=>array('label'=>'Full Name', 'required'=> true),       
                      "phone"=>array('label'=>'Phone', 'required'=> true ), 
                      "email" => array('label'=>'Email', 'required'=> false), 
                      "address" => array('required'=> true),
                      "state" => array('required'=> true, 
                                       'type'=>'select', 
                                       'multiOptions' => Main_Forms_Data::AmericaStates(), 'default'=>'CA'),
                      "county"  => array('required'=> true),
                      "city"  => array('required'=> true), 
                      "zip"  => array('required'=> true), 
                      "site"  => array('required'=> false), 
                      "notes"  => array('label'=>'Notes', 'attributes'=>array('rows'=>'4', 'cols'=>'8')),
                      );
    }


    public function getCustomFields() {

        

    $custom = array('submit' => array(
                                 'label'=>$this->formType,
                                 'type'=>'submit',
                                 'name'=>'submit',
                                 'disableDecorator' => array('HtmlTag', 'Label', 'DtDdWrapper'), 
                                 'options' => array('class'=>'btn btn-small btn-primary'),
                                 'ignore'=>true));
                                 
                                 
        if(!empty($this->row_id )){
        
        
       $custom['cancel'] = array('label'=>'Done',
                                  'type'=>'button',
                                  'name'=>'cancel',
                                  'disableDecorator' => array('HtmlTag', 'Label', 'DtDdWrapper'),
                                  'attributes'=>array('onclick'=>"history.back();"),
                                  'options' => array('class'=>'btn btn-small btn-primary'),
                                  'ignore'=>true);   
        
        
        $custom['id'] = array('type'=>'hidden',
                              'name'=>'id',
                              'disableDecorator' => array('HtmlTag', 'Label', 'DtDdWrapper'),
                              'default'=>$this->row_id,
                              'required'=>true);
    }                
                                 


    return $custom;


    }
    
    
}
