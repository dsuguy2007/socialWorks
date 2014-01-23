<?php 
class Base_Functions_Strings
{
    public static function Slug($str, $length = 70) {   
    
        $glu = array();
        $str = strtolower(trim($str));
		$str = substr(preg_replace('/[^0-9A-Za-z\s]/', '', $str), 0, $length);
        foreach( explode(' ', $str) as $s ) if($s != '') array_push($glu,  trim($s));
        return implode('-',$glu);	
    
    } 
    
    public static function NoSpecialChar($str ='') {
        
        return trim(preg_replace('/[^A-Za-z0-9\s]/', '', $str));
        
    }
    
    public static function truncate($str='', $limit = 50, $appendix = '...') {
	
	return mb_strimwidth($str, 0, $limit, $appendix);	
    }
    

    public static function truncateWords($text, $limit=50, $appendix='...') {

        if (str_word_count($text, 0) > $limit) {
            $pos = array_keys(str_word_count($text, 2));
            $text = substr($text, 0, $pos[$limit]) . $appendix;
        }
        return $text;
    }
    
    
    
	public static function scrub($str = "", $scrub='number', $tolower=false)
	{
		
		if($tolower) $str = strtolower($str);
		
		switch($scrub)
		{
			case "number":
			case "numeric":
				$str = preg_replace('/[^0-9]/', '', $str);
			break;
		
		    case "str":
			case "string":
				$str = preg_replace('/[\s]/', '', $str);
			break;
		
			case"int":
				$str = preg_replace('/[^0-9]/', '', $str);
				$str = (int)$str;
			break;

			case"float":
			case"double":
				$str = preg_replace('/[^0-9.]/', '', $str);
				$str = (float)$str;
			break;
		
			case "alpha":
			case "alphanumeric":
				$str = preg_replace('/[^A-Za-z0-9]/', '', $str);
				$str = (string)$str;
			break;
		
			default:
			break;
		}
		
		return $str;
		
	}
	
    
	
}
