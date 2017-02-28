import <%= _.camelCase(componentName) %> from './src/js/<%= componentName %>';

const constructAll = () => {
	const <%= _.camelCase(componentName) %>Components = document.querySelectorAll('.<%= _.kebabCase(componentName) %>');

	// Constructor code here

	document.removeEventListener('o.DOMContentLoaded', constructAll);
};

document.addEventListener('o.DOMContentLoaded', constructAll);

export { constructAll as init };
export default <%= _.camelCase(componentName) %>;
