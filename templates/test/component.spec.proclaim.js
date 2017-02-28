import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon';
import * as fixtures from './helpers/fixtures';
import component from '../main';

describe('<%= style === "function" ? _.camelCase(componentName) : PascalCase(componentName) %>', () => {
	it('is defined', () => {
		proclaim.equal(typeof component, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof component.init, 'function');
	});

	it('should autoinitialize', (done) => {
		const initSpy = sinon.spy(component, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it('should not autoinitialize when the event is not dispached', () => {
		const initSpy = sinon.spy(component, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe('should create a new', () => {
		beforeEach(() => {
			fixtures.htmlCode();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it('returns a component array when initialized', () => {
			const boilerplate = component.init();
			proclaim.equal(boilerplate instanceof Array, true);
			proclaim.equal(boilerplate[0] instanceof component, true);
		});

		it('returns a single component when initialized with a root element', () => {
			const boilerplate = component.init('#element');
			proclaim.equal(boilerplate instanceof component, true);
		});
	});
});
