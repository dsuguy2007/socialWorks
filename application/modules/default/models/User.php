<?php

class Default_Model_User extends Zend_Db_Table_Abstract {

    protected $_name = 'users';
    protected $_primary = 'id';
    protected $_current;
    protected $_dependentTables = array();
    
    
    public function init() {
    
    }

     public function findById($id) {
        $this->_current = $this->find($id)->current();
        return $this->_current;
    }
    
    
    
      public function all($asArray=false) {
      
      $select = $this->select();
        if( $asArray ){
        
            return $this->fetchAll($select)->toArray();
        
        }else{
        
            return $this->fetchAll($select);
        
        }
        
     }

    public function create($params) {
        /*
            salt the password
        */
        $salt     = Main_Salt::getRandomSha1Hash();
        $pass     = Main_Salt::getSha1Hash($params['password'], $salt);

        /*
            get current sql date
        */
        $date = new Zend_Db_Expr('NOW()');

        /*
            insert data
        */
        $data = array('username'      => $params['username'],
                      'email'         => $params['email'],                
                      'password'      => $pass,
                      'salt'          => $salt,
                      'last_log'      => $date,
                      'date_created'  => $date);
        

        $this->insert($data);

        return true;
    }

    public function findByUsername($username) {
       $select = $this->select()->where("username = ?", $username);
       return $this->fetchRow($select);
    }

    public function findbyHash($hash) {
    
       $select = $this->select()->where("status = ?", $hash);
       $result = $this->fetchRow($select);

       return $result != null ? $result->toArray() : null;

    }

    public function updateUser($data) {
        $data['last_log'] = new Zend_Db_Expr('NOW()');
        $where = array('id = ?' => (int)$data['id']);
        return parent::update($data, $where) ? true : false;
    }


    public function countByField($field, $val) {
       $select = $this->select()->where("{$field} = ?", $val);
       $select->from($this->_name,'COUNT(id) AS num');
       return $this->fetchRow($select)->num;
    }

}

