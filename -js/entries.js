var hostname = window.location.hostname;
var path;

if (hostname == 'localhost') {
  path = '/source/';
} else {
  path = '/wiki/source/';
}

// Parse and render the loaded Markdown content
function renderContent(data, el, src){
  // convert markdown to html
  var converter = new showdown.Converter(),
      html = converter.makeHtml(data);

  // render HTML in element
  el.innerHTML = html;
}

// Parse and render the loaded Markdown content
function renderBrokenLink(el, src){
  el.classList.add('broken-link');
  el.innerHTML = '<strike>'+src+'.md</strike>';
}

// load the markdown content
function loadContent(src, el) {
  var request = new XMLHttpRequest();
  var url = path+src+'.md';
  request.open('GET', url);
  request.onreadystatechange = function() {
    if (request.readyState == 2 && request.status == 404) {
      renderBrokenLink(el, src);
    }
    if (request.readyState == 4 && request.status == 200) {
      renderContent(request.responseText, el, src);
    }
  }
  request.send();
}

// Find and render entries
function loadEntries(){
  var elements = document.querySelectorAll('.entry');
  Array.prototype.forEach.call(elements, function(el, i){
    loadContent(el.dataset.src, el);
  });
}

loadEntries();
