const <%= _.camelCase(componentName) %> = (component) => (<%= _.camelCase(componentName) %>El, opts = {values: 'default'}) => {
	// Do stuff to encapsulated component here
	return component(<%= _.camelCase(componentName) %>El, opts);
};

<%= _.camelCase(componentName) %>.init(rootEl, opts, component = new Function) {
	if (!rootEl) {
		rootEl = document.body;
	}
	if (!(rootEl instanceof HTMLElement)) {
		rootEl = document.querySelector(rootEl);
	}
	if (rootEl instanceof HTMLElement && /\b<%= componentName %>\b/.test(rootEl.getAttribute('data-o-component'))) {
		return <%= _.camelCase(componentName) %>(component)(rootEl, opts);
	}

	return Array.from(rootEl.querySelectorAll('[data-o-component="<%= componentName %>"]'), rootEl => <%= _.camelCase(componentName) %>(component)(rootEl, opts));
}

export default <%= _.camelCase(componentName) %>;
