browser.tabs.getCurrent((tab) => {
  const tabId = tab.id;

  // Create new tab so address bar doesn't take focus
  browser.tabs.create({url: '/home.html'})
    .then(() => browser.tabs.remove(tabId))
    .catch(function(err) {
      console.err(err);
    });
});
