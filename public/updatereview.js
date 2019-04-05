function updateReview(id){
    $.ajax({
        url: '/review/' + id,
        type: 'PUT',
        data: $('#update-review').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
