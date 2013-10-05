var lightBox = {


    path:null,
    div:null,
    
    show:function(div, label, options, method) {
        
        if (options.remote != undefined && this.path != options.remote) {
       
            var params = options.params != undefined ? options.params : {};

            this.path = options.remote;
            this.div = div;     

            $("#"+div+"Label").html(label);
            $('#'+div+"Body").html( "loading..." );
                        
            var reqm = (method != undefined) ? method : 'get'; 
            var send = (reqm.toLowerCase() == 'post') ? asyncAction.sendPost : asyncAction.sendGet;
            send(this.path, params,  lightBox.load, 'html');
                        
        }else{
            
           $('#'+div).modal('show');
        }
       
    },
    
    load:function(data) {
        
        $('#'+lightBox.div+"Body").html(data);
        $('#'+lightBox.div).modal('show');
        
    }


};

var content = {
    
        load:function(path, params, callback, format) {
            
             asyncAction.sendPost(path, params, callback, format);
        }
    
    }; 


var asyncAction = {
    
    ele:{},
        
    
    sendPost:function( path, params, callback, format) {
        
        
        var reqf = format !== undefined ? format : 'json'; 
        
        $.post(path,
	    params,
	    callback,
	    reqf).error(function(e){ console.log(e); });
        
    },
    
    
    sendGet:function( path, params, callback, format) {
     
     
     var reqf = format !== undefined ? format : 'json'; 
     
     $.get(path,
         params,
         callback,
         reqf).error(function(e){ console.log(e); });
     
 },
 
 
 
  appendToDom:function(ele, path, params, method, format ) {
    
     var reqf = format !== undefined ? format.toLowerCase() : 'html'; 
     var reqm = method !== undefined ? method.toLowerCase() : 'get';
     var send = reqm == 'post' ? this.sendPost : this.sendGet;
     this.ele = ele;
     send( path, params, this.appendToDomComplete, format );
    
    
  },
  
  
  appendToDomComplete:function(html) {
    
        $("#"+asyncAction.ele.id).append(html);
        
        if (typeof asyncAction.ele.callback == 'function') {
            asyncAction.ele.callback( asyncAction.ele.id );
        }
        
  }
    
    
    
    
};




var imgUpload = {
     
         complete:function(success, msg){
             
             if (success) {

                 var timestamp = new Date().getTime();
                 var refresh = $("#js-update-img").attr('src')+'/'+timestamp;
                 $('.js-update-img').attr('src', refresh);
                
             }else{
                 
                 $('#img-upload-form-msg').addClass('alert alert-error');
                 $('#img-upload-form-msg').html( this.error(msg) );
             }
                            
         },
        
         error:function(key){
             
             var errs = {};
                 errs.fileMimeTypeFalse = 'Allowed file types, gif and jpg';
                 errs.fileUploadErrorNoFile = 'File field can not be empty'; 
             
             if (errs[key] != undefined) {
                 return errs[key];
             }
             
             
             return key;
             
         }
     
     };
     
  var assignTo = {
     
     
     update:function(prefix, data, html ){
         
         
         var par = "#"+prefix+"_"+data.focus;
         var div = $(par);
         
         var btnOn    = 'js-'+prefix+'-remove-link';
         var btnOff   = 'js-'+prefix+'-assign-link';
         var styleOn  = 'btn-success';
         var styleOff = 'btn-warning';
         
         
         if(data.do == "assign") {
             var template = _.template(html);
             var params   = {name:div.attr(prefix+':name'), phone:div.attr(prefix+':phone'), id:data.focus, node:prefix};
             $("#consumer-"+prefix+"-list").append(template(params));
         
         }else{
         
             btnOn   = 'js-'+prefix+'-assign-link';
             btnOff  = 'js-'+prefix+'-remove-link';
             styleOn  = 'btn-warning';
             styleOff = 'btn-success';
             $(".consumer-"+prefix+"-"+data.focus).remove();
         
         }
         
         
         $(par+" ."+btnOn).removeClass('hidden');
         $(par+" ."+btnOff).addClass('hidden');
         $(par+" .js-assign-to-consumer-btn" ).addClass(styleOn);
         $(par+" .js-assign-to-consumer-btn" ).removeClass(styleOff);    
     
     }
     
 };
 
 
 
     var helpers = {
        
      
        editIcon:function(element){
            
              var ele = $(element);

            //onmouse over    
            ele.mouseenter(
                function () {
                     ele.find("div:last").append($("<p class='pull-right'><i class='icon-edit'> </i> <small>edit</small></p>"));
                });
             //on mouse out
             ele.mouseleave( 
                function () {
                     ele.find("p:last").remove();
                }
            );
            
        }  
        
    }; 




