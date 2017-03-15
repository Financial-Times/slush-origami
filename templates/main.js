import <%= _.camelCase(componentName) %> from './src/js/<%= componentName %>';

const constructAll = () => {
	<%= _.camelCase(componentName) %>.init();

	// Constructor code here

	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export { constructAll as init };
export default <%= _.camelCase(componentName) %>;
