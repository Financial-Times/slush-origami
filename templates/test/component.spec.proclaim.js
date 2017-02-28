import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';

import <%= _.camelCase(componentName) %> from '../main';

describe("<%= _.camelCase(componentName) %>", () => {
	it('is defined', () => {
		proclaim.equal(typeof <%= _.camelCase(componentName) %>, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof <%= _.camelCase(componentName) %>.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(<%= _.camelCase(componentName) %>, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(<%= _.camelCase(componentName) %>, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe("should create a new", () => {
		beforeEach(() => {
				fixtures.htmlCode();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("component array when initialized", () => {
			const boilerplate = <%= _.camelCase(componentName) %>.init();
			proclaim.equal(boilerplate instanceof Array, true);
			proclaim.equal(boilerplate[0] instanceof <%= _.camelCase(componentName) %>, true);
		});

		it("single component when initialized with a root element", () => {
			const boilerplate = <%= _.camelCase(componentName) %>.init('#element');
			proclaim.equal(boilerplate instanceof <%= _.camelCase(componentName) %>, true);
		});
	});
});
