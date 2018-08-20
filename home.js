const go = (e) => {
  e.preventDefault();

  // if it is a bang, go there
  // else do duckduckgo query

  const bang = document.getElementById('bang');

  let url = '';

  // Default to duckduckgo if not found
  let query = {};
  query[bang.value] = `https://duckduckgo.com/?q=${bang.value}`
  browser.storage.local.get(query)
    .then(item => (
      browser.tabs.update({
        url: item[bang.value],
        loadReplace: true
      })
    ))

  return false;
};

var goForm = document.getElementById('go-form');
goForm.addEventListener('submit', go);

function addBang(e) {
  e.preventDefault();

  const newBang = document.getElementById('new-bang');
  const url = document.getElementById('url');

  const bang = {};
  bang[newBang.value] = url.value;

  browser.storage.local.set(bang).then(() => {
    updateList();
    addForm.reset();
    newBang.focus();
  });

  return false;
}

var addForm = document.getElementById('add-form');
addForm.addEventListener('submit', addBang);

function removeBang(key) {
  console.log('removing', key);
  browser.storage.local.remove(key)
    .then(() => {
      console.log('removed');
      updateList();
    }, (err) => {
      console.log(err);
    });
}

function handleUpdate(message) {
  console.log(message);
}

function handleError(e) { console.err(e); }

function updateList() {
  const container = document.getElementById('list-container');
  while (container.firstChild) { container.removeChild(container.firstChild); }

  const list = document.createElement('ul');

  browser.storage.local.get().then((items) => {
    const keys = Object.keys(items);
    keys.forEach((key) => {
      listItem = document.createElement('li');

      removeButton = document.createElement('button');
      removeButton.addEventListener('click', () => removeBang(key));
      removeButton.appendChild(document.createTextNode('REMOVE'));

      listItem.appendChild(document.createTextNode(`${key} ${items[key]}`));
      listItem.appendChild(removeButton);

      list.appendChild(listItem);
    });

    container.appendChild(list);
  });
}

updateList();
