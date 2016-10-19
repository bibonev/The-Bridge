$(document).ready(function(){  
    if (location.pathname !== '/') {
        $(".secondary-navigation a[href*='" + location.pathname.split("/")[1] + "']").addClass("active");
    } else {
        $(".secondary-navigation a[name='dashboard']").addClass("active")
    }

    $('#search_field').keydown(function(e){
        if (e.keyCode === 13) {
            e.preventDefault();
            searchTerm = $(this).val()
            if(searchTerm !=''){
                $(this).val('');
                window.location.replace("http://localhost:8000/organisations/");
                localStorage.setItem("searchTerm",searchTerm);
            }
        }
    })
    if($("input[name='searchTerm']").length > 0){
        var searchTerm = localStorage.getItem("searchTerm")
        $("input[name='searchTerm']").val(searchTerm)
    }
});