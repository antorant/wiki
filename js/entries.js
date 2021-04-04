// Parse and render the loaded Markdown content
function renderContent(data, el){
  // convert markdown to html
  var converter = new showdown.Converter(),
      html      = converter.makeHtml(data);

  // render HTML in element
  el.innerHTML = html;
}

// load the markdown content
function loadContent(hash, el) {
  var request = new XMLHttpRequest();
  var url = '/source/'+hash+'.md';
  request.open('GET', url);
  request.onreadystatechange = function() {
    if (request.readyState == 4 && request.status == 200) {
      renderContent(request.responseText, el);
    }
  }
  request.send();
}

// Find and render entries
function loadEntries(){
  var elements = document.querySelectorAll('.entry');
  Array.prototype.forEach.call(elements, function(el, i){
    console.log(el.dataset.src);

    loadContent(el.dataset.src, el);
  });
}

loadEntries();
