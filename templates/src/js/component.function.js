function <%= _.camelCase(componentName) %>(<%= _.camelCase(componentName) %>El, opts = {values: 'default'}, component = false) {
	this.<%= _.camelCase(componentName) %>El = <%= _.camelCase(componentName) %>El;
	this.opts = opts;

	return this;
};

<%= _.camelCase(componentName) %>.init(rootEl, opts) {
	if (!rootEl) {
		rootEl = document.body;
	}
	if (!(rootEl instanceof HTMLElement)) {
		rootEl = document.querySelector(rootEl);
	}
	if (rootEl instanceof HTMLElement && /\b<%= componentName %>\b/.test(rootEl.getAttribute('data-o-component'))) {
		return <%= _.camelCase(componentName) %>(rootEl, opts);
	}

	return Array.from(rootEl.querySelectorAll('[data-o-component="<%= componentName %>"]'), rootEl => <%= _.camelCase(componentName) %>(rootEl, opts));
}

export default <%= _.camelCase(componentName) %>;
