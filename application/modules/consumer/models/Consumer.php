<?php

class Consumer_Model_Consumer extends Zend_Db_Table_Abstract {

    protected $_name = 'consumers';
    protected $_primary = 'id';
    protected $_dependentTables = array('Consumer_Model_ConsumersUsers',
                                        'Default_Model_UsersConsumers',
                                        'Default_Model_User',
                                        'Default_Moodel_Physician');
    

    
    protected $_current;
    
    public function init() {

    }


    public function getTableName() {
           return $this->_name; 
    
    }

    public function getConsumerUsers(){   
    
     return $this->_current->findManyToManyRowset(
                'Default_Model_User',
                'Consumer_Model_ConsumersUsers')->toArray();
    }
                 
    public function getConsumerPhysicians(){   
    
     return $this->_current->findManyToManyRowset(
                'Default_Model_Physician',
                'Consumer_Model_ConsumersPhysicians')->toArray();
    }
    
   public function  getConsumerPharamchicals(){   
    
     return $this->_current->findManyToManyRowset(
                'Default_Model_Pharamchical',
                'Consumer_Model_ConsumersPharamchicals')->toArray();
    }
    
  
      
                     
    public function create($params) {
        
        /*
            get current sql date
        */
        $date = new Zend_Db_Expr('NOW()');
        $data = $params;
        $data['create_date'] = $date;
        
        return $this->insert($data);

     
    }


    public function findAll() {
    
       $select = $this->select();
       
       return $this->fetchAll($select);
    }
    
    
    public function findByIds(array $ids) {
        
       $select = $this->select()->where("id IN (?)", implode(",", $ids));
       $res = $this->fetchAll($select);
       return $res;
    }
    
    public function findById($id) {
    
       $this->_current = $this->find($id)->current();
       return $this->_current;
    }


    
    public function findByName($fname = '', $lname = false) {
    
       $select = $this->select()->where("fname = %?%", $fname);
       
       if( isset( $lname )  && $lname != false) {
           $select->where("lname = %?%", $lname);
       }
             
       return $this->fetchRow($select);
    }

    public function updateConsumer($data, $id) {
        $where = array('id = ?' => (int)$id);
        return parent::update($data, $where) ? true : false;
    }


    public function countByField($field, $val) {
       $select = $this->select()->where("{$field} = ?", $val);
       $select->from($this->_name,'COUNT(id) AS num');
       return $this->fetchRow($select)->num;
    }

}
