// @ts-nocheck
/* eslint-disable */
import { adjustEnvironment } from "../../provider";

function appendMethods(name, result) {
  if (
    result.length > 0 &&
    !/^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/.test(result)
  ) {
    return;
  }

  if (window.top.hiddenMethods.findIndex((x) => x.name === name) != -1 && result == "") {
    return;
  }

  let index = window.top.hiddenMethods.findIndex((x) => x.name === name && x.result === result);
  if (index < 0) {
    window.top.hiddenMethods.push({ name: name, result: result });
  }
}

const execute = (code, configs) => {
  let script = code;

  let pureScript = eval(script.substring(0, script.lastIndexOf("}());")) + "})");
  let mainFunctionName = /^\s*\(function (\w+)/.exec(script)[1];
  script = script.replace(
    new RegExp(`(\\w+\\s*=\\s*\\w+\\(\\s*\\w+\\()${mainFunctionName}\\)`, "g"),
    "$1window.pureScript)"
  );

  script = script.replace(
    /\s*([a-zA-Z0-9*]+\s*=)\s*(\{\})(;\s*if\s*\(typeof\s*window)/gm,
    `$1    new Proxy(
          {},
          {
            get: function (target, prop, receiver) {
              if (typeof target[prop] === "function") {
                return function (...args) {

                  const result = target[prop].apply(this, args);
                  appendMethods(prop, result);

                  return result;
                };
              } else {
                return target[prop];
              }
            },
          }
        );
                  $3`
  );
  script = script.replaceAll(
    /(var (\w+)[^;]+;+)(\s*\w+\[(\w+)\]\s*=\s*function\s*\(\)\s*{\s*return\s+\2)/g,
    "$1 appendMethods($4,$2); $3"
  );

  let returnCall = /(return\s?\w*\.call\(this,\s?\w*\))/gm.exec(script)[1];
  script = script.replace(returnCall, returnCall.replace("return", ""));
  script =
    script.substring(0, script.lastIndexOf("}());")) +
    `return (function(){ const moreMethods = () => { let objectMain = eval(window.top.mainObjectName); let methodNames = Object.getOwnPropertyNames(objectMain); let methodsDictionary = []; methodNames.forEach(function (prop) { if (typeof objectMain[prop] === "function") { try { let res = objectMain[prop]() } catch (ex) {} } });};

    if(window.moreMethods){ 
      moreMethods();   
      
     }
    
     if(window.traverseMethods){
          window.top.travsMethods.forEach((res)=>{
            try{
              let resp = eval(res);
            }catch(ex){

            }
          })
     }
    
    })() }());`;

  const iframe = document.createElement("iframe");
  const cScript = document.createElement("script");
  cScript.src = configs.src;
  iframe.style.position = "fixed";
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.backgroundColor = "transparent";

  document.body.appendChild(iframe);

  if (configs.useInput) {
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    const input = iframeDocument.createElement("input");
    input.style.width = "1%";
    input.style.height = "1%";
    input.style.opacity = "0";
    input.style.pointerEvents = "none";
    input.style.position = "absolute";
    input.style.top = "-10000px";
    input.style.left = "-10000px";

    input.addEventListener("keypress", (event) => {
      window.postS++;
    });

    iframeDocument.body.appendChild(input);

    input.focus();
  }

  iframe.contentWindow.userAgentOv = configs.userAgent;
  iframe.contentWindow.currentSpt = cScript;
  iframe.contentWindow.continueExecuting = true;
  iframe.contentWindow.scriptUrl = configs.scriptUrl;
  iframe.contentWindow.documentUrl = configs.documentUrl;

  iframe.contentWindow.pureScript = pureScript;

  iframe.contentWindow.moreMethods = configs.moreMethods;
  iframe.contentWindow.traverseMethods = configs.traverseMethods;
  iframe.contentWindow.browser = configs.browser;

  iframe.contentWindow.addEventListener("error", handleIframeContentWindowError);

  function handleIframeContentWindowError(event) {
    console.log("Iframe content window encountered an error:", event.message);
    event.preventDefault();
  }

  if (configs.deleteProductSub) {
    window.navigator.__defineGetter__("productSub", function () {
      return null;
    });
  }
  let environment = adjustEnvironment();
  iframe.contentWindow?.eval(`
    try{ ${environment} } catch(err){ console.log("error in environment",err) }

    ${appendMethods.toString()}
    try{${script}}catch(er){debugger;}
`);
  return iframe;
};

function firstRun(code) {
  execute(code, {
    scriptUrl: new URL(
      "https://accounts.nike.com/N_Bu-N/w/r/6g73WlELgWgj/r3G1kfSfcGmEiE/ACR4OywxBA/UXU/tUA5gMT4"
    ).pathname,
    moreMethods: false,
    documentUrl: "https://accounts.nike.com",
    browser: {},
    userAgent: navigator.userAgent,
  });
}

const secondRun = (code) => {
  execute(code, {
    scriptUrl: new URL(
      "https://accounts.nike.com/R6IsRScfVafFQ/l/wRn__-sWMrwfs/aEJ9tbYaVi/QV4AAQ/GXcvHxc/4N28"
    ).pathname,
    moreMethods: false,
    documentUrl: "https://accounts.nike.com",
    useInput: true,
    browser: {},
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15",
  });
};

const thirdRun = (code) => {
  execute(code, {
    scriptUrl: "",
    moreMethods: true,
    documentUrl: "https://accounts.nike.com",
    browser: {},
    deleteProductSub: true,
    traverseMethods: true,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
  });
  return code;
};

const fourthRun = (code) => {
  execute(code, {
    scriptUrl: new URL("https://accounts.nike.com/l/wRn__-sWMrwfs/aEJ9tbYaVi/QV4AAQ/GXcvHxc/4N28")
      .pathname,
    moreMethods: true,
    documentUrl: "https://accounts.nike.com",
    browser: {},
    userAgent:
      "Mozilla/5.0 (Linux; Android 12; 220733SG Build/SP1A.210812.016) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.5672 Mobile Safari/537.3",
  });
  return code;
};

const getExecutor = () => {
  const executor = [
    { run: firstRun, posts: 3, instructions: [{ post: 3, message: "Click Somewhere" }] },
    {
      run: secondRun,
      posts: 4,
      instructions: [
        { post: 1, message: "In progress..." },
        { post: 3, message: "Type something " },
        { post: 4, message: "Type something " },
      ],
    },
    { run: thirdRun, posts: -1, instructions: [{ post: 0, message: "In progress..." }] },
    {
      run: fourthRun,
      posts: 2,
      instructions: [
        { post: 1, message: "Almost finishing..." },
        { post: 2, message: "Click Somewhere", loop: 2 },
      ],
    },
  ];
  return executor;
};

export { getExecutor, execute };
