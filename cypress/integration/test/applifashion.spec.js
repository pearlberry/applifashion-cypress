const v1Url = "https://demo.applitools.com/tlcHackathonMasterV1.html";
const devUrl = "http://demo.applitools.com/tlcHackathonDev.html";
const finalUrl = "https://demo.applitools.com/tlcHackathonMasterV2.html";

const browserSettings = [
  { width: 1200, height: 800, name: "chrome" },
  { width: 1200, height: 800, name: "safari" },
  { width: 1200, height: 800, name: "firefox" },
  { width: 1200, height: 800, name: "edgechromium" },
  {
    deviceName: "iPhone X"
  }
];

//const browserSettings = { width: 1200, height: 800, name: "chrome" };
const appName = "AppliFashion";
const batchName = "Testing Lifecycle";

function eyesCheck(params) {
  cy.eyesOpen({
    appName: appName,
    batchName: batchName,
    browser: browserSettings,
    target: params.target,
    testName: params.testName  
  });

  if (params.target != "region") {
    cy.eyesCheckWindow(params.testName, params.fully);
  } else {
    cy.eyesCheckWindow({
      tag: params.testName,
      target: "region",
      selector: params.selector,
    });
  }

  cy.eyesClose();
}

describe("Test 1", () => {

  it(`main page`, function () {
    cy.visit(finalUrl);
    eyesCheck({ 
      fully: true,
      testName: this.test.title,
      target: 'window'
     });
  });

});

describe("Test 2", () => {

  it(`filter by color`, function () {
    
    cy.get('#colors__Black').click()

    cy.get('#filterBtn').click()

    eyesCheck({ 
      testName: this.test.title,
      target: 'region',
      selector: '#product_grid'
     });
  });

});

describe("Test 3", () => {

  it(`product details`, function () {
    
    cy.get('#resetBtn').click()

    cy.contains('Appli Air x Night').click()

    eyesCheck({ 
      testName: this.test.title,
      target: 'window'
     });
  });

});