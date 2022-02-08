# Function.prototype.log

Logs the output, time, arguments, and stacktrace of any function when it's called.

## How to use: 

Like this:
```js
function yourFunction(params, etc){
	return 5;
}
//Now, if you wanted to debug this function, you *could* do this:
/*
function yourFunction(params, etc){
    console.log({params, etc});
	return 5;
}

yourFunction("stuff", "etc");
*/
//But that's not as nice as just doing this:

yourFunction = yourFunction.log();
yourFunction("stuff", "etc");

//And getting an output such as below

```

## Example log output:

https://user-images.githubusercontent.com/61319150/130657983-c884cb2c-59c3-43e6-b5e7-b171181f4688.mp4


## Minified version
Minified version: 

```js
Function.prototype.log=function(){function c(o,e,t){var n=t||`__${e.name}`;return Object.defineProperty(o,n,{get:function(){e.apply(this,arguments),delete this[n],addDebuggerButton(o,e)},configurable:!0}),o}return(...e)=>{var o=(new Date).toTimeString().split(" ")[0],t=(this+"").replace(/[/][/].*$/gm,"").replace(/\s+/g,"").replace(/[/][*][^/*]*[*][/]/g,"").split("){",1)[0].replace(/^[^(]*[(]/,"").replace(/=[^,]+/g,"").split(",").filter(Boolean),n=(new Error).stack.split(":"),l=`${this.name?`${this.name}(${t.join(", ")})`:"<anonymous function>"} (🕑 ${o}) ⇒ `;console.group(`%c${o} %c${this.name?`${this.name}(${t.join(", ")})`:"<anonymous function>"} %ccalled %c(line %c${n.slice(n.length-2,n.length).join(":")}%c)`,"color: gray; font-weight: light;","color: orangered; font-style: italic; font-weight: extralight","color: orange; font-weight: light","font-weight: light; font-style: italic; color: orange","color: lightseagreen; font-weight: light; font-style: italic","font-weight: light; font-style: italic; color: orange"),console.groupCollapsed("%cArguments passed:","color: lightseagreen; font-weight: bold; font-size: 0.9rem;");var r={};for(let o=0;o<e.length;o++){var a=e[o];r[t[o]||`${o}*`]={"Parameter name":t[o]||"",Argument:a}}console.table(r),console.info("%c*: No parameter name given in the function","font-style: italic; font-size: 0.5rem; color: gray;"),console.groupEnd(),console.groupCollapsed("%cStacktrace","color: lightseagreen; font-weight: bold; font-size: 0.9rem;"),console.trace(l),console.groupEnd(),console.groupCollapsed("%cActions","color: lightseagreen; font-weight: bold; font-size: 0.9rem;"),console.log("%cClick on an object, then expand it and click on the 3 dots (%c(...)%c) to run it.","font-style: italic; color: gray;","background: #6663; color: gray; padding: 3px; border-radius: 2px; text-decoration: underline","font-style: italic; color: gray;"),console.log(c({message:"Log arguments to the console in a new message"},()=>{for(var o in console.group(`%cArguments logged from ${l}`,"font-weight: bold; color: blue"),e)console.log(`%c${t[o]||"(No parameter name)"}: %o`,"color: gray; font-style: italic;",e[o]);console.groupEnd()},"Log arguments")),console.log(c({message:"Set a variable with the arguments passed."},()=>{window.FUNCTION_ARGUMENTS=e,console.log(`${l} %cThe global variable %cFUNCTION_ARGUMENTS%c has been set to %o`,"font-weight: bold; color: blue","background: #6663; color: gray; padding: 3px; border-radius: 2px;","font-weight: bold; color: blue",e)},"Set the FUNCTION_ARGUMENTS variable to the arguments passed."));var i=this(...e);return console.log(c({message:"Store the result of this function in a variable."},()=>{window.FUNCTION_RESULT=i,console.log(`${l} %cThe global variable %cFUNCTION_RESULT%c has been set to %o`,"font-weight: bold; color: blue","background: #6663; color: gray; padding: 3px; border-radius: 2px;","font-weight: bold; color: blue",i)},"Set the FUNCTION_RESULT variable to the arguments passed.")),console.groupEnd(),console.groupEnd(),i}};
```
