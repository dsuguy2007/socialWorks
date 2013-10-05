$(function(){
    
    
    
    
    var freqItems = ['<li><a class="pointer js-select-helper">once</a></li>','<li><a class="pointer js-select-helper">twice</a></li>'];
    for(var i=3; i<11; i++){
        freqItems.push("<li><a class='pointer js-select-helper'>"+i+ " times</a></li>" );
    }
    
    
    
    $("#frequency-element").html('<div class="input-prepend">'
                                +'<div class="btn-group">'
                                +'<button class="btn dropdown-toggle" data-toggle="dropdown">'
                                +'Taken: '
                                +'<span class="caret"></span>'
                                +'</button>'
                                +'<ul class="dropdown-menu">'
                                + freqItems.join("")
                                +'</ul>'
                                +'</div>'
                                +$("#frequency-element").html()
                                +'</div>');
    
    $("#frequency").addClass("span2");
    
    $("#frequency-element .js-select-helper").click( function(){  
    
            $("#frequency").val($(this).html());
    
    }); 
    
    
    
    
   var unitItems = ['<li><a class="pointer js-select-helper">hourly</a></li>',
                    '<li><a class="pointer js-select-helper">daily</a></li>',
                    '<li><a class="pointer js-select-helper">weekly</a></li>',
                    '<li><a class="pointer js-select-helper">monthly</a></li>',
                    '<li><a class="pointer js-select-helper">yearly</a></li>'];
    
    $("#unit-element").html('<div class="input-prepend">'
                                +'<div class="btn-group">'
                                +'<button class="btn dropdown-toggle" data-toggle="dropdown">'
                                +'Unit: '
                                +'<span class="caret"></span>'
                                +'</button>'
                                +'<ul class="dropdown-menu">'
                                + unitItems.join("")
                                +'</ul>'
                                +'</div>'
                                +$("#unit-element").html()
                                +'</div>');
    
    $("#unit").addClass("span2");
    
    $("#unit-element .js-select-helper").click( function(){  
    
            $("#unit").val($(this).html());
    
    }); 
    
    
    
    
    
    
    //append the maker helper selector.   
    var makerhtml = '<div class="dropdown">'
                   +'<ul id="js-manufacture-suggestions" class="dropdown-menu" role="menu" aria-labelledby="dLabel"> </ul>'
                   +'</div>';
    $("#maker-element").append( makerhtml );
    
    $('body').delegate('.js-manufactureres-select', 'click', function(){
        
            var ele = $(this);
            $("#maker").val( ele.html() )
            $("#js-manufacture-suggestions").html("").hide();
            $("#site").val('http://www.drugs.com'+ele.attr('maker:url'));
        
        
    });
        
    $("#maker").on( "keyup",  function() {
            var val = $(this).val().trim();
            var pattern = new RegExp(val,'gi');
            var appendTo = $("#js-manufacture-suggestions");
             if (val != '') {
                appendTo.html("").show();
                asyncAction.sendPost( '/pharamchicals/manufacturers/', {'sort': val[0] }, function(data){
                   var found = false;
                   for (var i = 0; i<data.length; i++) {
                     var name = data[i].name;
                     if (name.search(pattern) != -1) {
                         found = true; 
                         appendTo.append('<li><a class="pointer js-manufactureres-select" maker:url="'+data[i].url+'">'+name+'</a></li>');
                      }
                    
                   }
               
                if (!found) {
                     appendTo.hide();
                }
               
              }, 'json');
            
            }else{
                appendTo.html("").hide();
            }
            
        });

    
    $('.dropdown-toggle').dropdown();
    
});

