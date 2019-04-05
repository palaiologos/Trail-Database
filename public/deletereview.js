function deleteReview(id){
    $.ajax({
        url: '/review/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};
