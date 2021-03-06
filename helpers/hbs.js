const hbs = require("hbs");
const moment = require("moment");

// CUSTOM HELPERS

// function below: add the ternary operator functionnality to .hbs files
// usage : {{ternary true "yay" "nay "}} => prints yay
// usage : {{ternary NaN "yay" "nay "}} => prints nay
hbs.registerHelper("ternary", (test, yes, no) => (test ? yes : no));

// add comparison operator feature to hbs templates
/* 

USAGE =>

{{#compare 1 10 operator="<"}}
awesome, 1 is less thant 10 !!!
{{/compare}}

*/

hbs.registerHelper("compare", function (lvalue, rvalue, options) {
  if (arguments.length < 3)
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

  var operator = options.hash.operator || "==";

  var operators = {
    "==": function (l, r) {
      return l == r;
    },
    "===": function (l, r) {
      return l === r;
    },
    "!=": function (l, r) {
      return l != r;
    },
    "<": function (l, r) {
      return l < r;
    },
    ">": function (l, r) {
      return l > r;
    },
    "<=": function (l, r) {
      return l <= r;
    },
    ">=": function (l, r) {
      return l >= r;
    },
    typeof: function (l, r) {
      return typeof l == r;
    },
  };

  if (!operators[operator])
    throw new Error(
      "Handlerbars Helper 'compare' doesn't know the operator " + operator
    );

  var result = operators[operator](lvalue, rvalue);

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

hbs.registerHelper("formatDate", function (date) {
  return moment(date).format("DD-MM-YYYY");
});

hbs.registerHelper("userStatus", function (role) {
  if (role === "manager") {
    return `<a href="/dashboard/settings" title="Settings">
    <i class="fas fa-cog"></i>
</a>`;
  } else if (role === "admin") {
    return `<a href="/dashboard/settings/admin" title="Settings Admin">
    <i class="fas fa-users-cog"></i>
</a>`;
  }
});

hbs.registerHelper("each_upto", function (array, max, options) {
  if (!array || array.length == 0) return options.inverse(this);

  var result = [];
  for (var i = 0; i < max && i < array.length; ++i)
    result.push(options.fn(array[i]));
  return result.join("");
});
