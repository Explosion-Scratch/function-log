Function.prototype.log = function () {
  function annotate(func) {
    return (func + "")
      .replace(/[/][/].*$/gm, "")
      .replace(/\s+/g, "")
      .replace(/[/][*][^/*]*[*][/]/g, "")
      .split("){", 1)[0]
      .replace(/^[^(]*[(]/, "")
      .replace(/=[^,]+/g, "")
      .split(",")
      .filter(Boolean);
  }
  function button(obj, f, name) {
    var buttonName = name || `__${f.name}`;
    Object.defineProperty(obj, buttonName, {
      get: function () {
        f.apply(this, arguments);
        delete this[buttonName];
        addDebuggerButton(obj, f);
      },
      configurable: true,
    });

    return obj;
  }
  return (...args) => {
    var oldtime = performance.now();
    var result = this(...args);
    var spentTime = performance.now() - oldtime;

    var time = new Date().toTimeString().split(" ")[0];
    var argList = annotate(this);
    var stacktrace = new Error().stack;
    var err = stacktrace.split(":");
    var description = `${
      this.name ? `${this.name}(${argList.join(", ")})` : "<anonymous function>"
    } (🕑 ${time}) ⇒ `;

    console.group(
      `%c+${spentTime.toFixed(2)}ms %c${
        this.name
          ? `${this.name}(${argList.join(", ")})`
          : "<anonymous function>"
      } %ccalled %c(line %c${err
        .slice(err.length - 2, err.length)
        .join(":")}%c)`,
      "color: gray; font-weight: 300;",
      "color: orangered; font-style: italic; font-weight: 200",
      "color: orange; font-weight: 400",
      "font-weight: 300; font-style: italic; color: orange",
      "color: lightseagreen; font-weight: 300;",
      "font-weight: 300; font-style: italic; color: orange"
    );

    //Args group
    console.groupCollapsed(
      "%cArguments passed:",
      "color: lightseagreen; font-weight: bold; font-size: 0.9rem;"
    );
    var _args = {};
    for (let i = 0; i < args.length; i++) {
      var arg = args[i];
      _args[argList[i] || `${i}*`] = {
        "Parameter name": argList[i] || "",
        Argument: arg,
      };
    }
    console.table(_args);
    console.info(
      `%c*: No parameter name given in the function`,
      "font-style: italic; font-size: 0.5rem; color: gray;"
    );
    console.groupEnd();

    console.groupCollapsed(
      `%cStacktrace`,
      "color: lightseagreen; font-weight: bold; font-size: 0.9rem;"
    );
    console.trace(description);
    console.groupEnd();

    //Actions group
    console.groupCollapsed(
      `%cActions`,
      "color: lightseagreen; font-weight: bold; font-size: 0.9rem;"
    );
    console.log(
      `%cClick on an object, then expand it and click on the 3 dots (%c(...)%c) to run it.`,
      "font-style: italic; color: gray;",
      "background: #6663; color: gray; padding: 3px; border-radius: 2px; text-decoration: underline",
      "font-style: italic; color: gray;"
    );
    console.log(
      button(
        { message: "Log arguments to the console in a new message" },
        () => {
          console.group(
            `%cArguments logged from ${description}`,
            "font-weight: bold; color: blue"
          );
          for (let i in args) {
            console.log(
              `%c${argList[i] || "(No parameter name)"}: %o`,
              "color: gray; font-style: italic;",
              args[i]
            );
          }
          console.groupEnd();
        },
        "Log arguments"
      )
    );
    console.log(
      button(
        { message: "Set a variable with the arguments passed." },
        () => {
          window.FUNCTION_ARGUMENTS = args;
          console.log(
            `${description} %cThe global variable %cFUNCTION_ARGUMENTS%c has been set to %o`,
            "font-weight: bold; color: blue",
            "background: #6663; color: gray; padding: 3px; border-radius: 2px;",
            "font-weight: bold; color: blue",
            args
          );
        },
        "Set the FUNCTION_ARGUMENTS variable to the arguments passed."
      )
    );

    console.log(
      button(
        { message: "Store the result of this function in a variable." },
        () => {
          window.FUNCTION_RESULT = result;
          console.log(
            `${description} %cThe global variable %cFUNCTION_RESULT%c has been set to %o`,
            "font-weight: bold; color: blue",
            "background: #6663; color: gray; padding: 3px; border-radius: 2px;",
            "font-weight: bold; color: blue",
            result
          );
        },
        "Set the FUNCTION_RESULT variable to the arguments passed."
      )
    );

    //End the actions group
    console.groupEnd();

    //End the main group
    console.groupEnd();
    return result;
  };
};
