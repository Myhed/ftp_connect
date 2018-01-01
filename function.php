<?php  function isAjax(){

		if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){

			return true;
		}

		return false;	
	}
	/** 
	* @param
	*/

	/**
	*	function matches	
	*/

	function getTypeOfFile($file){
		
		preg_match('/([\w]+)([\.][\w]+)/',$file,$matches,PREG_OFFSET_CAPTURE);

		return $matches;
	}

	
		

	