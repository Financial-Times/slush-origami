class <%= PascalCase(componentName) %> {
	constructor (<%= PascalCase(componentName) %>El, opts) {
		this.<%= PascalCase(componentName) %>El = <%= PascalCase(componentName) %>El;
		this.opts = opts || {values: 'default'};
	}

	static init (rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (rootEl instanceof HTMLElement && /\b<%= componentName %>\b/.test(rootEl.getAttribute('data-o-component'))) {
			return new <%= PascalCase(componentName) %>(rootEl, opts);
		}
		return Array.from(rootEl.querySelectorAll('[data-o-component="<%= componentName %>"]'), rootEl => new <%= PascalCase(componentName) %>(rootEl, opts));
	}
}

export default <%= PascalCase(componentName) %>;
