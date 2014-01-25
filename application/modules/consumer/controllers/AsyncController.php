<?php

class Consumer_AsyncController  extends Zend_Controller_Action {    
   
   public $id;
   public $xhr;
   public $uri;
   public $post;
   public $params;
   public $callback;
   
   public function init() {
    
        $this->id = $this->getRequest()->getParam('id', null);
        $this->xhr = $this->getRequest()->isXmlHttpRequest();
        $this->uri = $this->getRequest()->getRequestUri();
        $this->post = $this->getRequest()->isPost();
        $this->params = $this->getRequest()->getParams();
        $this->callback = $this->getRequest()->getParam('callback', null);
        
        
        if(!$this->xhr) {    
          throw new Exception("Async Controller can only be accessed via xhr request.");   
        }
    }
    
  /**
    * Lis goals from a consumer.
    */
    public function searchGoalsAction() {
        
        $search = $this->getRequest()->getParam('search', '');
        $consumer_id = $this->getRequest()->getParam('consumer_id', 0);
        
        $goalsModel = new Consumer_Model_ConsumersGoals;
        $goals = $goalsModel->findByConsumerId((int)$consumer_id, array( "goal LIKE ? " => "%{$search}%"  ));
       
       
        $this->_asJson($goals->toArray());
  
    }
    

    public function personInfoAction() {
        $this->_helper->layout->disableLayout();
        $pModel = new Default_Model_People;
        $this->view->person = $pModel->_read((int) $this->id);
  
    }
  
   public function peopleCreateAction(){
    
    $this->_helper->layout->disableLayout();
    $this->consumer_id = $this->getRequest()->getParam('cid', null);
    $model = new Default_Model_People;
    $action = '_create';    
    $form = new  Application_Form_People;
    $form->_types = array('payee'=>'Payee');  
    $form->customSubmitBtn = true;  
    $form->build( $this->uri,
                  $this->id);
    
    if(!empty($this->id)){
        $data = $model->_read($this->id)->toArray();
        $this->_form->populate($data);
         $action = '_update';  
         
    }
    
    $result = Main_Forms_Handler::onPost($form,
                                               $this->post,
                                               $model,
                                               $action,
                                               $this->params,
                                               $this->_helper,
                                               $this->uri ."/set/". $this->consumer_id,
                                               "Note updated.",
                                               $this->xhr);
  
      
    if($this->xhr && $this->post && !empty($result)) {
        
    
        $result["values"] = $model->_read( (int)$result['id'] )->toArray();
        $this->_asJson($result);
        return;
    }
        
        if($this->xhr && $this->post) {
            $this->_asJson(array( 'success'=>false, 'id'=>$this->id, 'action'=>'no change', 'message'=>'form not changed', 'errors'=>array() ));
        }else{        
            $this->view->form  = $form;
        }
        
         
   }


   protected function _asJson(array $data) {
        
        $this->_helper->layout->disableLayout();
        $this->_helper->viewRenderer->setNoRender(true);
        
        $this->getResponse()->setHeader('Content-type', 'application/json')
                            ->setBody(json_encode($data));
    }

    
}
