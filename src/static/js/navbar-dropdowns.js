// slideUp and slideDown customer/supplier dropdown
$('div.role-dropdown a').each(function(){
    $(this).click(function(){
        var click_id = $(this).attr('id');
        var curr_id = $(".curr-role a").attr('id');

        if(click_id === curr_id){

            if($('div.role-dropdown .other').hasClass('visible')){
                $('div.role-dropdown .other').slideUp();
                $('div.role-dropdown .other').removeClass('visible');


            }else{
                $('div.role-dropdown .other').slideDown();
                $('div.role-dropdown .other').addClass('visible');
            }

        }
        else {
            $('div.role-dropdown .other').hide();
            $('div.role-dropdown .other').removeClass('visible');

            return false;
        }
    });
});

//////////
// redirects directly to customer/supplier home page when dropdown clicked
// need CHANGING!
/////////

$('.role-dropdown .other #customer').click(function(){
    window.location.href = '/customer/'
});

$('.role-dropdown .other #supplier').click(function(){
    window.location.href = '/supplier/'
});

