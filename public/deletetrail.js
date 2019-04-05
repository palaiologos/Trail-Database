function deleteTrail(id){
    $.ajax({
        url: '/trail/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
