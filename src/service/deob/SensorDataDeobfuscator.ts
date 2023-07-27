// @ts-nocheck
/* eslint-disable */
import { getExecutor } from "./executor";
import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import generate from "@babel/generator";
import { isMemberExpression, isIdentifier } from "@babel/types";

const deobfuscateKeys = (code, SetFinalResult) => {
  const ast = parser.parse(code);

  let tokensReplaced = 0;
  let tokensNotReplaced = 0;
  let totalTokens = window.travsMethods.length;

  traverse(ast, {
    CallExpression: (path) => {
      const { node } = path;
      if (
        isMemberExpression(node.callee) &&
        ((isIdentifier(node.callee.object) && node.callee.object.name === window.mainObjectName) ||
          (isMemberExpression(node.callee.object) &&
            isIdentifier(node.callee.object.object) &&
            node.callee.object.object.name === window.mainObjectName)) &&
        isIdentifier(node.callee.property)
      ) {
        try {
          let pas = new RegExp(`${window.mainObjectName}\\.(\\w+)`).exec(path.toString())[1];
          let res = window.hiddenMethods.find((x) => x.name == pas);

          if (res && res.result.endsWith("==") && res.result.length == 24) {
            window.encodeKey = res.result;
          }

          if (res) {
            path.replaceWithSourceString(`${JSON.stringify(res.result).replace(/'/g, "\\'")}`);
            tokensReplaced++;
          } else {
            path.addComment("inner", "COULD NOT REPLACE THIS TOKEN");
            tokensNotReplaced++;
          }
        } catch (err) {
          tokensNotReplaced++;
          console.log(err);
        }
      }
    },
  });

  if (!window.encodeKey) {
    try {
      window.encodeKey = /\"(.{22}==)\"/gm.exec(code)[1];
    } catch {}
  }

  let codeParsed =
    `/**
* CODE DEOBFUSCATED SUCESSFULLY BY SENSOR TOOLS
* ${new Date()}
*
* TOTAL TOKENS: ${totalTokens}
* TOKENS REPLACED: ${tokensReplaced}
* TOKENS NOT REPLACED: ${tokensNotReplaced}
* 
* Payload Encoding Key: ${window.encodeKey}
*/
    
` + generate(ast).code;
  SetFinalResult(codeParsed);
  return codeParsed;
};

const prepare = (code) => {
  window.mainObjectName = /\s*([a-zA-Z0-9*]+\s*)=\s*\{\};\s*if\s*\(typeof\s*window/gm.exec(code)[1];
  window.travsMethods = [];
  window.hiddenMethods = [];
  window.postS = 0;
  window.encodeKey = undefined;

  const ast = parser.parse(code);
  traverse(ast, {
    CallExpression: (path) => {
      const { node } = path;
      if (
        isMemberExpression(node.callee) &&
        ((isIdentifier(node.callee.object) && node.callee.object.name === window.mainObjectName) ||
          (isMemberExpression(node.callee.object) &&
            isIdentifier(node.callee.object.object) &&
            node.callee.object.object.name === window.mainObjectName)) &&
        isIdentifier(node.callee.property)
      ) {
        try {
          window.travsMethods.push(path.toString());
        } catch (err) {
          console.log(err);
        }
      }
    },
  });
};

const executeDeob = (code, setResponse, setFinalResult) => {

  prepare(code);

  let executing = false;

  let script = code;
  const executor = getExecutor();
  let loop = 0;

  const interval = setInterval(() => {
    console.log("Checking...");
    if (!executing) {
      console.log("Start run...");
      loop = 0;
      executor[0].run(script);
      executing = true;
    }

    console.log("Post:", window.postS);
    console.log("Loop:", loop);
    let instruction = executor[0].instructions.find(
      (x) => (x.post == window.postS && !x.loop) || (x.post == window.postS && x.loop < loop)
    );
    loop++;
    if (loop > 10) {
      setResponse("Something got stuck during script execution; please click somewhere...");
    } else if (instruction) {
      setResponse(instruction.message);
    }

    if (window.postS > executor[0].posts) {
      window.postS = 0;
      executing = false;

      const iframe = document.querySelector("iframe");

      iframe.parentNode.removeChild(iframe);

      if (executor.length > 1) {
        executor.shift();
      } else {
        clearInterval(interval);
        deobfuscateKeys(code, setFinalResult);
      }
    }
  }, 1000);

  return "in Progress...";
};

const SensorDataDeobfuscator = {
  deob: executeDeob,
};

export { SensorDataDeobfuscator };
