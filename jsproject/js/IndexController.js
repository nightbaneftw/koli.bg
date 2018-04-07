(function() {

    Troshka.registerController('index', {
        init: function() {
			console.log('index init');
			Troshka.initController('login');
        }
	});
	
})();