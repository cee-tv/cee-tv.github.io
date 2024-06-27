var system = require('system');

// Exit in case of wrong parameter count.
if (system.args.length !== 3) {
    console.log('Usage: scriptname targetUrl referrer');
    console.log('example: $> phantomjs fake-referrer.phantom.js https://xve.me/M0oq0 https://l.facebook.com');
	phantom.exit();
}

// Set the important pieces
var targetUrl = system.args[1];
var referrer = system.args[2];

console.log('Going to open '+targetUrl+' with the referrer '+referrer);

var page = require('webpage').create();

// set our custom referer [sic]
page.customHeaders = {
	"Referer" : referrer
};

page.onLoadFinished = function(status){
	page.customHeaders = {};
	
	// get the currentUrl
	var currentUrl = page.evaluate(function() {
		return document.location.href;
	});
	
	// get the referrer
	var currentReferrer = page.evaluate(function() {
		return document.referrer;
	});
	
	
	console.log('Loading ' + currentUrl + ' finished with status: ' + status+'. document.referrer is: '+currentReferrer);

	// Only once do
	if ( page.firstLoad ) {
		page.firstLoad = false;

		console.log('Injecting the Link.');

		// Inject and Click a Link to our target
		page.evaluate(function (href) {
			// Create and append the link
			var link = document.createElement('a');
			link.setAttribute('href', href);
			document.body.appendChild(link);
			
			// Dispatch Click Event on the link
			var evt = document.createEvent('MouseEvents');
			evt.initMouseEvent('click', true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, link);
			link.dispatchEvent(evt);
		}, targetUrl);
	} else {
		console.log('Exiting');
		phantom.exit();
	};
};

page.firstLoad = true;
page.open(referrer);
