<?php
class Default_Model_Pharmaceutical extends Zend_Db_Table_Abstract {

    protected $_name = 'pharmaceuticals';
    protected $_primary = 'id';

    
    public function indexPharmaceutical() {
    
      $select = $this->select();
      
      return $this->fetchAll($select);
    
    }
    
    public function createPharmaceutical($data) {
       return $this->insert($data);
    }
    
    public function updatePharmaceutical($id, $data) {
        
        $where = array('id = ?' => (int)$id);
        return $this->update($data, $where);
    
    }
        
    public function readPharmaceutical($id) {
       return  $this->find($id)->current();
    }
    
    public function deletePharmaceutical($id) {
         
       $found = $this->find($id)->current()->toArray();
        
       if(count($found) > 0){
            $where = array('id = ?' => (int)$id);
           return  $this->delete($where);
       }
    
        return false;
    
    }

    
    public function findByPharmaceuticalName($name) {
    
       $select = $this->select()->where("name Like %?%", $name);
       return $this->fetchRow($select);
    
    }
    
    public function countByField($field, $val) {
       $select = $this->select()->where("{$field} = ?", $val);
       $select->from($this->_name,'COUNT(id) AS num');
       return $this->fetchRow($select)->num;
    }
    
    
    public function findAssociations($id) {
    
        $assingedToConsumer = new Consumer_Model_ConsumersPharmaceuticals;
        $assingedConsumer = $assingedToConsumer->findById($id)->toArray();
        
        
        $assingedToMedical = new Consumer_Model_ConsumersMedical;
        $assingedMedical = $assingedToMedical->findByColumn('pharmaceutical_id', $id)->toArray(); 
        
        return array( 'assingedToConsumer' => $assingedConsumer, 'assingedToMedical'=>  $assingedMedical);
        
    }
    


}

