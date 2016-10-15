$(document).ready(function(){  
    if (location.pathname !== '/') {
        $(".secondary-navigation a[href*='" + location.pathname.split("/")[1] + "']").addClass("active");
    } else {
        $(".secondary-navigation a[name='dashboard']").addClass("active")
    }
});