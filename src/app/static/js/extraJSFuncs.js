var port = location.port; // initialize global variable for the port

$(document).ready(function(){  
    // make the current anchor tag showing active
    if (location.pathname !== '/') {
        $(".secondary-navigation a[href*='" + location.pathname.split("/")[1] + "']").addClass("active");
    } else {
        $(".secondary-navigation a[name='dashboard']").addClass("active");
    }
});

// auto resize each textarea with class 'autoExpand'
$(document)
    .one('focus.autoExpand', 'textarea.autoExpand', function(){
        var savedValue = this.value;
        this.value = '';
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
    })
    .on('input.autoExpand', 'textarea.autoExpand', function(){
        var minRows = this.getAttribute('data-min-rows')|0, rows;
        this.rows = minRows;
        rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
        this.rows = minRows + rows;
    });