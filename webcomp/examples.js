/*
 * Some examples of web components in action, no frameworks, just platform polyfills via Polymer Project's work
 */

// For the first example, we're going to programmatically remix an unordered list of darthvaders using Shadow DOM
// and <content> insertion points

window.addEventListener("load", function ()
{
    document.getElementById("remix-darthvaders").addEventListener("submit", function (event)
    {
    	// Hijack form submission to play with things
        event.preventDefault();
        remixDarthvaders();
    }, false);

    document.getElementById("append-darthvaders").addEventListener("submit", function (event)
    {
    	// Hijack form submission to play with things
        event.preventDefault();
        appendDarthvaders();
    }, false);

    document.getElementById("import-darthvaders").addEventListener("submit", function (event)
    {
    	// Hijack form submission to play with things
        event.preventDefault();
        appendDarthVadersFromImport();
    }, false);
}, false);

function remixDarthvaders(){
	// Grab DarthVaders!
	var best_darthvaders = Array.prototype.slice.call(document.querySelectorAll(":checked"));

	// A string to concatenate our insertion points of our best DarthVaders in an unordered list
	var remix_darthvaders_markup = ""

	// Iterate over best darthvaders, add classname to parent, concatenate our remixed DarthVaders markup
	best_darthvaders.forEach(function(cat){
		darth_class = "best-darth-" + cat.value;
		cat.parentNode.className = darth_class;

		// We use the <content> tag to tell the shadow tree to use elements from the host node
		// and we use the 'select' attribute to pass in a class name to choose which ones

		remix_darthvaders_markup += "<content select=\"." + darth_class + "\"></content>"
	});
	
	// Create a host node

	var host = document.getElementById('darthvaders');

	// Create a shadow root
	var shadow = host.createShadowRoot();

	// Set the innerHTML of our shadow root, thus causing the replacement of example-1's rendering
	// to be that of our shadow root using our remixed DarthVaders markup string

	shadow.innerHTML = remix_darthvaders_markup;

}

function appendDarthvaders(){
	// A div to host an instance of our DarthVaders template
	var el = document.createElement('div');

	// The element that we will append each instance of the DarthVaders template to

	var future_darthvaders = document.getElementById('future-darthvaders');

	// Create a shadow root
	var shadow = el.createShadowRoot();

	// We append the content of our template to the shadow root
	shadow.appendChild(document.getElementById('darthvaders-template').content);

	// We append our newly formed div with template content to the DOM
	future_darthvaders.appendChild(el);

	// TODO: Figure out why when we append more than one div of shadow-darthvaders, we don't see multiples despite their existence in the DOM
	// Probably I'm missing something obvious here in my post-sick fugue or something
}

function appendDarthVadersFromImport(){
	// A div to host an instance of our DarthVaders template
	var el = document.createElement('div');

	// The element that we will append each instance of the DarthVaders template to

	var imported_darthvaders = document.getElementById('imported-darthvaders');

	// Create a shadow root
	var shadow = el.createShadowRoot();

	// We append the content of our template to the shadow root
	//shadow.appendChild(document.getElementById('import-darthvaders-template').content);
	shadow.appendChild(document.querySelector('link[rel=import]').import.getElementById('import-darthvaders-template').content);

	// We append our newly formed div with template content to the DOM
	imported_darthvaders.appendChild(el);

	// TODO: Figure out why when we append more than one div of shadow-darthvaders, we don't see multiples despite their existence in the DOM
	// Probably I'm missing something obvious here in my post-sick fugue or something
}
