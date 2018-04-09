(function() {

	function init() {
		console.log('index init');
		Troshka.initController('login');
	}

	function destroy() {
		Troshka.destroyController('login');
	}

    Troshka.registerController('index', {
		init: init,
		destroy: destroy
	});
	
})();