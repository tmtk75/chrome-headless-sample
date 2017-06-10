#!/usr/bin/env node
const {launch} = require('lighthouse/chrome-launcher');
const CDP = require('chrome-remote-interface');

async function onPageLoad(Runtime) {
  const js = "document.querySelector('title').textContent";
  return await Runtime.evaluate({expression: js})
}
 
(async () => {
  const chrome = await launch({
    //port: 9222,
    userDataDir: "userData",
    chromeFlags: ['--disable-gpu', '--headless']
  })
    
  let client;
  try {
    client = await CDP({port: chrome.port})
  } catch (ex) {
    console.error(`Cannot connect to Chrome: ${ex}`);
    chrome.kill()
    return;
  }

  const {Page, Runtime} = client;
  await Promise.all([
    Page.enable(),
    Runtime.enable()
  ])

  Page.navigate({url: `file://${__dirname}/index.html`});
  Page.loadEventFired(async _ => {
    const r = await onPageLoad(Runtime)
    console.log(`Title of page: ${r.result.value}`);
    client.close()
    chrome.kill();
  });
})();

