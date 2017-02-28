<% if (useBabel) { %>import <%= _.camelCase(componentName) %> from './src/js/<%= componentName %>';

const constructAll = () => {
  const <%= _.camelCase(componentName) %>Components = document.querySelectorAll('.<%= _.kebabCase(componentName) %>');

	// Constructor code here

  document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export { constructAll as init };
export default <%= _.camelCase(componentName) %>;<% } else { %>var <%= _.camelCase(componentName) %> = require('./src/js/<%= _.lowerCase(componentName) %>');

var constructAll = function() {
  var <%= _.camelCase(componentName) %>Components = document.querySelectorAll('.<%= _.kebabCase(componentName) %>');

	// Constructor code here

  document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

module.exports.default = <%= _.camelCase(componentName) %>;
module.exports.init = constructAll;<% } %>
