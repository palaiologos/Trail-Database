function deleteUser(id){
    $.ajax({
        url: '/user/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
