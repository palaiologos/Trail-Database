function updateTrail(id){
    $.ajax({
        url: '/trail/' + id,
        type: 'PUT',
        data: $('#update-trail').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
