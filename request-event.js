#!/usr/bin/env node
const {launch} = require('lighthouse/chrome-launcher');
const CDP = require('chrome-remote-interface');

(async () => {
  const chrome = await launch({
    userDataDir: "userData",
    chromeFlags: [
      '--window-size=480,640',
      '--disable-gpu',
      '--headless',
    ]
  })

  console.log(`Chrome debugging port: ${chrome.port}`);
  const version = await CDP.Version({port: chrome.port});
  console.log(version['User-Agent']); 

  const client = await CDP({port: chrome.port})
  const {Network, Page} = client;

  // setup handlers
  Network.requestWillBeSent(params => console.log(params.request.url));
  Page.loadEventFired(() => {
    client.close()
    chrome.kill();
  });

  // enable events then start!
  await Promise.all([
    Network.enable(),
    Page.enable()
  ])
  Page.navigate({url: 'https://github.com'});
})();
