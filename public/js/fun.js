function homurachan(event){
	console.log('madoka!');
	var $madoka = $(event.currentTarget);
	$madoka.siblings().toggleClass('hidden');
}
