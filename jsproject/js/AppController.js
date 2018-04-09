var Troshka = (function() {

    function registerController(name, controller) {
        if (!controllers[name]) {
            controllers[name] = controller;
        } else {
            console.error(`${name} controller is already registered!`);
        }
    }

    function getController(name) {
        if (controllers[name]) {
            return controllers[name];
        } else {
            console.error(`${name} controller is not found!`);
        }
    }
    
    function initController(name) {
        var controller = getController(name);
        if (controller && typeof controller.init === 'function') {
            controller.init();
        }
    }
    
    function destroyController(name) {
        var controller = getController(name);
        if (controller && typeof controller.destroy === 'function') {
            controller.destroy();
        }
    }

    function getUrlPage(address) {
        return address.split('/').pop().split('.')[0];
    }
    
    function gotoPage(address) {
        var page = getUrlPage(address);
        if (page !== currentPage) {
            if(!pages[page]) {
                sendRequest(address, onPageSuccess.bind(this, page), onPageError);
            } else {
                showPage(page, pages[page]);
            }
            history.pushState({ page: page }, page.slice(0, 1).toUpperCase() + page.slice(1), address);
        }
    }

    function sendRequest(url, success, error) {
        console.log('sendRequest', url);
        var request;
        try {
            request = new XMLHttpRequest();
        } catch (err) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (err) {
                error(new Error('no ajax sorry'));
            }
        }
        if (request) {
            request.addEventListener('readystatechange', function(event) {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        success(request);
                    } else {
                        error(new Error(request.status));
                    }
                }
            });
            request.open('GET', url, true);
            request.send(null);
        }
    }

    function onPageSuccess(page, request) {
        console.log('onPageSuccess', page, request);
        var startIndex = request.responseText.indexOf('<body');
        startIndex = request.responseText.indexOf('>', startIndex) + 1;
        var endIndex = request.responseText.indexOf('</body>');
        var container = document.createElement('div');
        container.innerHTML = request.responseText.slice(startIndex, endIndex);
        var pageContent = container.querySelector('main').innerHTML;
        
        pages[page] = pageContent;

        showPage(page, pageContent);
    }

    function onPageError(error) {
        console.log('onPageError', error.message);
    }

    function showPage(page, pageContent) {
        pageElement.classList.remove(currentPage);
        destroyController(currentPage);
        currentPage = page;
        pageElement.classList.add(currentPage);
        updateNavigations();
        mainElement.innerHTML = pageContent;
        document.head.getElementsByTagName('title')[0].textContent = page.slice(0, 1).toUpperCase() + page.slice(1);
        initController(page);
    }

    function updateNavigations() {
        Array.from(document.querySelectorAll('nav a')).forEach(function(link) {
            if (getUrlPage(link.href) === currentPage) {
                link.parentNode.classList.add('current');
            } else {
                link.parentNode.classList.remove('current');
            }
        });
    }

    var pageElement = document.querySelector('.page'),
        mainElement = pageElement.querySelector('main'),
        currentPage = getUrlPage(location.href),
        navigations = document.querySelectorAll('nav a'),
        pages = {},
        controllers = {};

    Array.from(document.querySelectorAll('nav a')).forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            gotoPage(this.href);
        });
    });

    window.addEventListener('popstate', function(event) {
        var page = getUrlPage(location.href);
        if(!pages[currentPage]){
            sendRequest(location.href, onPageSuccess.bind(this, page), onPageError);
        } else {
            showPage(page, pages[page]);
        }
    });

    window.addEventListener('DOMContentLoaded', function() {
        pages[currentPage] = document.querySelector('main').innerHTML;
        initController(currentPage);
    });

    return {
        registerController: registerController,
        getController: getController,
        initController: initController,
        destroyController: destroyController
    };
})();