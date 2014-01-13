$(function(){
          
          /*
          * add tool tips
          */
          $(".show-tooltip").tooltip();
            
          /*
          if checked set the exam element background
          */
          $("body").delegate("[name='exams[]']", "click", function() {
                var el = $(this)
                    el.closest('tr').css({'background-color': el.prop("checked") == true ? '#D6FFB7' : '#FFFFFF'});
          });
          
          /* //////////////////////////////////////////
	  * Crud New/Edit insurance Form
	  */////////////////////////////////////////////
	  $("body").delegate("a.crud-new-update-insurance", "click", function() {
		var el  = $(this);
		var id  = el.attr('data-id');
                var cid  = el.attr('data-cid');
		var path = '/consumer/insurance/';
                var action = id == '' ? 'new' : 'edit';
                var btn = '<input type="button" value="Submit" class="js-insurance-form-'+action+' btn" />';
		lightBox.show('mainModal', 'Add Medical Info',
					  {'remote':path+action+'/'+id+'/',
					   'params': { id:id, cid:cid },
					   'callback':function(data) {
                                           $("#consumerinsuranceform").append(btn);
					}},
					'get');
	  });  

          /*
	  * Crud Update Insurance
	  */
	  $("body").delegate( ".js-insurance-form-new", "click", function() {
		Crud.Update('/consumer/insurance/new/','consumerinsuranceform', function(data) {
		    var template = _.template($("#js-crud-edit-insurance").html());
                    $(".js-insurance-index tbody").prepend(template(data)).css({'display':'none'}).fadeIn(1000,function() {});          
                    lightBox.close('mainModal');  
		}, 'json' );
	  });
	 
          /*
	  * Crud Update Insurance
	  */
	  $("body").delegate( ".js-insurance-form-edit", "click", function() {
		Crud.Update('/consumer/insurance/edit/','consumerinsuranceform', function(data) {
		    var template = _.template($("#js-crud-edit-insurance").html());
                    $(".insurance-row-"+data.id).html(template(data)).css({'display':'none'}).fadeIn(1000,function() {});          
                    lightBox.close('mainModal');  
		}, 'json' );
	  });

          /*
           Curd Delete Insurance
          */
       $("body").delegate(".crud-del-insurance", "click", function() {
	   var el = $(this);
           var id =  el.attr('data-id');
           Crud.Confirm({ url: '/consumer/insurance/delete/',
                                    params: {id: id},
                                    title: 'Please confirm deleting of Insurance Info.',
                                    text:  'The record will be completelly removed! Is it ok?',
                                    ok: 'Remove',
                                    cancel: 'Cancel'
             }).done(function(data) {
                   var el = $(".insurance-row-"+data.id).css({'color':'red'});
                       el.fadeOut(1000, function() { $(this).remove(); });
             }).fail(function() {
            });
	  });
          
	  /*////////////////////////////////////
          * ///////////////////////////////////
	  * Crud New/Edit Medical Exam Form
	  * ////////////////////////////////////
	  */
	  
          /*
          Select all exams 
          */
          $(".js-select-all").click(function() {

              var el = $(this)
              var at = el.attr('data-status');    
              at == 'n' ? el.attr('data-status', 'y') : el.attr('data-status', 'n');
              
              $("table.js-med-index input[type=checkbox]").each(function() {
                    var input = $(this);
                    at == 'n' ? input.prop("checked", "checked") : input.removeProp("checked");
                    input.closest('tr').css({'background-color': at == 'n' ? '#D6FFB7' : '#FFFFFF'})
              });
              
          });
          
          $("body").delegate("a.crud-new-update-med", "click", function() {
		
		var el  = $(this);
		var cid = el.attr('data-cid');
		var id  = el.attr('data-id');
		var path = '/consumer/exam/';
		var action =  id != '' ? 'edit': 'new';
		
		lightBox.show('mainModal', 'Add Medical Info',
					  {'remote':path+action+'/'+id+'/',
					   'params': { cid:cid, id:id },
					   'callback':function(data) {
			    
						var examDate  = $("#date-element");
							
						var dateField = $("#date");
							dateField.attr('readonly','readonly' );
						
						var template  = _.template($('#date-template').html());	
						var efield    = examDate.html();
						examDate.html("");
						
						$("#date-element").append(template({start:'now',field:efield}));
						$("#date-picker").datepicker({format:'yyyy-mm-dd'}).on('changeDate', function(ev){});
						$("#consumerexamform").append('<input type="button" value="Submit" class="js-exam-form-'+action+' btn" />');
					}},
					'get');
	  });  
	 
	 /*
	  * Crud Create Med Submit
	  */
	  $("body").delegate( ".js-exam-form-new", "click", function() {
		Crud.Create('/consumer/exam/new/',
			'consumerexamform', function(data) {
				var template = _.template($("#js-crud-edit-med").html());
				data.checked = '';
                                $(".js-med-index tbody").prepend(template(data));
                                lightBox.close('mainModal');
		}, 'json' );
	  });
	
	 /*
	  * Crud Update Med Submit
	  */
	  $("body").delegate( ".js-exam-form-edit", "click", function() {
		Crud.Update('/consumer/exam/edit/',
			'consumerexamform', function(data) {
				var template = _.template($("#js-crud-edit-med").html());
				var el = $(".exam-row-"+data.id);
                                var ck = el.find('input[type=checkbox]');
                                    data.checked = ck.prop('checked') == true ? 'checked="checked"' : '';
                                    el.html(template(data)).css({'display':'none', 'color':'green'}).fadeIn("slow",
                                     function() {
                                        $(this).css('color','');
                                        if (data.checked) {
                                           $(this).css({'background-color':'#D6FFB7'});
                                        }else{
                                           $(this).css({'background-color':'#FFFFFF'});       
                                        }
                                       
                                    });
			            
				$("#mainModalLabel").html("<i class='alert-success'>Medical Info Updated</i>");
                                lightBox.close('mainModal');
                                
		}, 'json' );
	  });

          /*
           Curd Delete
          */
      $("body").delegate(".crud-del-med", "click", function() {
		 
		 var el = $(this);
         var id =  el.attr('data-id');
         var cd = el.attr('data-cid');
		 
		 Crud.Confirm({ url: '/consumer/exam/delete/',
					   params: {id: id, cid:cd },
					   title: 'Please confirm deleting of Medical Info.',
					   text:  'The record will be completelly removed! Is it ok?',
					   ok: 'Remove',
					   cancel: 'Cancel'
		  }).done(function(data) {
			  var el = $("#med-"+data.id).closest('tr');
			      el.css({'color':'red'});
			      el.fadeOut(1000, function() { $(this).remove(); });
		  }).fail(function() {
		  });
		  });
      
      
      
      
      
         /* //////////////////////////////////////////
	  * //////////////////////////////////////////
	  * Crud New/Edit medication Form
	  */////////////////////////////////////////////
	  $("body").delegate("a.crud-new-update-medication", "click", function() {
		var el  = $(this);
		var id  = el.attr('data-id');
                var cid  = el.attr('data-cid');
		var path = '/consumers/medications/';
                var action = id == '' ? 'new' : 'edit';
                var btn = '<input type="button" value="Submit" class="js-medication-form-'+action+' btn" />';
		lightBox.show('mainModal', 'Add Medical Info',
					  {'remote':path+action+'/'+id+'/',
					   'params': { id:id, cid:cid },
					   'callback':function(data) {
                                           $("#consumers_pharmaceuticals_form").append(btn);
					}},
					'get');
	  });  

          /*
	  * Crud Update Medication
	  */
	  $("body").delegate( ".js-medication-form-new", "click", function() {
		Crud.Update('/consumers/medications/new/','consumers_pharmaceuticals_form', function(data) {
		    var template = _.template($("#js-crud-edit-medication").html());
                    $(".js-medication-index tbody").prepend(template(data)).css({'display':'none'}).fadeIn(1000,function() {});          
                    lightBox.close('mainModal');  
		}, 'json' );
	  });
	 
          /*
	  * Crud Update Medication
	  */
	  $("body").delegate( ".js-medication-form-edit", "click", function() {
		Crud.Update('/consumers/medications/edit/','consumers_pharmaceuticals_form', function(data) {
		    var template = _.template($("#js-crud-edit-medication").html());
                    $(".medication-row-"+data.id).html(template(data)).css({'display':'none'}).fadeIn(1000,function() {});          
                    lightBox.close('mainModal');  
		}, 'json' );
	  });

          /*
           Curd Delete Insurance
          */
       $("body").delegate(".crud-del-medication", "click", function() {
	   var el = $(this);
           var id =  el.attr('data-id');
           Crud.Confirm({ url: '/consumers/medications/delete/',
                                    params: {id: id},
                                    title: 'Please confirm deleting of Medication Info.',
                                    text:  'The record will be completelly removed! Is it ok?',
                                    ok: 'Remove',
                                    cancel: 'Cancel'
             }).done(function(data) {
                   var el = $(".medication-row-"+data.id).css({'color':'red'});
                       el.fadeOut(1000, function() { $(this).remove(); });
             }).fail(function() {
            });
	  });
       
       
       
          /* //////////////////////////////////////////
	  * //////////////////////////////////////////
	  * Crud New/Edit Allergies
	  */////////////////////////////////////////////
	  $("body").delegate("a.crud-new-update-allergy", "click", function() {
		var el  = $(this);
		var id  = el.attr('data-id');
                var cid  = el.attr('data-cid');
		var path = '/consumers/allergies/';
                var action = id == '' ? 'new' : 'edit';
                var btn = '<input type="button" value="Submit" class="js-allergy-form-'+action+' btn" />';
		lightBox.show('mainModal', 'Add Medical Info',
					  {'remote':path+action+'/'+id+'/',
					   'params': { id:id, cid:cid },
					   'callback':function(data) {
                                           $("#consumerallergiesform").append(btn);
					}},
					'get');
	  });  

          /*
	  * Crud Update Medication
	  */
	  $("body").delegate( ".js-allergy-form-new", "click", function() {
		Crud.Update('/consumers/allergies/new/','consumerallergiesform', function(data) {
		    var template = _.template($("#js-crud-edit-allergy").html());
                    $(".js-allergy-index tbody").prepend(template(data)).css({'display':'none'}).fadeIn(1000,function() {});          
                    lightBox.close('mainModal');  
		}, 'json' );
	  });
	 
          /*
	  * Crud Update Medication
	  */
	  $("body").delegate( ".js-allergy-form-edit", "click", function() {
		Crud.Update('/consumers/allergies/edit/','consumerallergiesform', function(data) {
		    var template = _.template($("#js-crud-edit-allergy").html());
                    $(".allergy-row-"+data.id).html(template(data)).css({'display':'none'}).fadeIn(1000,function() {});          
                    lightBox.close('mainModal');  
		}, 'json' );
	  });

          /*
           Curd Delete Insurance
          */
       $("body").delegate(".crud-del-allergy", "click", function() {
	   var el = $(this);
           var id =  el.attr('data-id');
           Crud.Confirm({ url: '/consumers/allergies/delete/',
                                    params: {id: id},
                                    title: 'Please confirm deleting of Allergy Info.',
                                    text:  'The record will be completelly removed! Is it ok?',
                                    ok: 'Remove',
                                    cancel: 'Cancel'
             }).done(function(data) {
                   var el = $(".allergy-row-"+data.id).css({'color':'red'});
                       el.fadeOut(1000, function() { $(this).remove(); });
             }).fail(function() {
            });
	  });      
       


          /* //////////////////////////////////////////
	  * //////////////////////////////////////////
	  * Crud New/Edit Hospital
	  */////////////////////////////////////////////
	  $("body").delegate("a.crud-new-update-hospital", "click", function() {
		var el  = $(this);
		var id  = el.attr('data-id');
                var cid  = el.attr('data-cid');
		var path = '/consumer/hospitalized/';
                var action = id == '' ? 'new' : 'edit';
                var btn = '<input type="button" value="Submit" class="js-hospital-form-'+action+' btn" />';
		lightBox.show('mainModal', 'Add Hospital Info',
					  {'remote':path+action+'/'+id+'/',
					   'params': { id:id, cid:cid },
					   'callback':function(data) {
                                           $("#consumerhospitalizedform").append(btn);
                                           
                                                  var examDate  = $("#date-element");
                                                  
                                                  var dateField = $("#date");
                                                  dateField.attr('readonly','readonly' );
                                                  
                                                  var template  = _.template($('#date-template').html());	
                                                  var efield    = examDate.html();
                                                  examDate.html("");
                                                  
                                                  $("#date-element").append(template({start:'now',field:efield}));
                                                  $("#date-picker").datepicker({format:'yyyy-mm-dd'}).on('changeDate', function(ev){});
                                                  $("#consumerexamform").append('<input type="button" value="Submit" class="js-exam-form-'+action+' btn" />');

                                           
                                           
                                           
					}},
					'get');
	  });  

          /*
	  * Crud Update Medication
	  */
	  $("body").delegate( ".js-hospital-form-new", "click", function() {
		Crud.Update('/consumer/hospitalized/new/','consumerhospitalizedform', function(data) {
		    var template = _.template($("#js-crud-edit-hospital").html());
                    $(".js-hospital-index tbody").prepend(template(data)).css({'display':'none'}).fadeIn(1000,function() {});          
                    lightBox.close('mainModal');  
		}, 'json' );
	  });
	 
          /*
	  * Crud Update Medication
	  */
	  $("body").delegate( ".js-hospital-form-edit", "click", function() {
		Crud.Update('/consumer/hospitalized/edit/','consumerhospitalizedform', function(data) {
		    var template = _.template($("#js-crud-edit-hospital").html());
                    $(".hospital-row-"+data.id).html(template(data)).css({'display':'none'}).fadeIn(1000,function() {});          
                    lightBox.close('mainModal');  
		}, 'json' );
	  });

          /*
           Curd Delete Insurance
          */
       $("body").delegate(".crud-del-hospital", "click", function() {
	   var el = $(this);
           var id =  el.attr('data-id');
           Crud.Confirm({ url: '/consumer/hospitalized/delete/',
                                    params: {id: id},
                                    title: 'Please confirm deleting of Hospital Visit Info.',
                                    text:  'The record will be completelly removed! Is it ok?',
                                    ok: 'Remove',
                                    cancel: 'Cancel'
             }).done(function(data) {
                   var el = $(".hospital-row-"+data.id).css({'color':'red'});
                       el.fadeOut(1000, function() { $(this).remove(); });
             }).fail(function() {
            });
	  }); 
      
	  
});
