function deleteContact(id){
    $.ajax({
        url: '/contact/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
