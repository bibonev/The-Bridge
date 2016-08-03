$(document).ready(function(){       
   var scroll_start = 0;
   var startchange = $('#slider').height()/2;
   $(document).scroll(function() { 
      scroll_start = $(this).scrollTop();
      if(scroll_start > startchange) {
          $('header.navbar-default').css({'background-color': '#029acf', 'border-bottom':'1px solid #c4c4c4 !important'});
       } else {
          $('header.navbar-default').css({'background-color': 'transparent', 'border-bottom':'0 !important'});
       }
   });
});