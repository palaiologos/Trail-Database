function updateContact(id){
    $.ajax({
        url: '/contact/' + id,
        type: 'PUT',
        data: $('#update-contact').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
