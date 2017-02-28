/**
 * Spec for <%= componentName %>
 */

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import component from '../main';
import * as fixtures from './helpers/fixtures';

const should = chai.should();
should.use(sinonChai);

describe('<%= style === "function" ? _.camelCase(componentName) : PascalCase(componentName) %>', () => {
	it('is defined', () => {
		should.exist(component);
	});

	it('has a static init method', () => {
		component.init.should.be.a('function');
	});

	it('should autoinitialize', (done) => {
		const initSpy = sinon.spy(component, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			initSpy.should.have.been.called;
			initSpy.restore();
			done();
		}, 100);
	});

	it('should not autoinitialize when the event is not dispached', () => {
		const initSpy = sinon.spy(component, 'init');
		initSpy.should.not.have.been.called;
	});

	describe('should create a new', () => {
		beforeEach(() => {
			fixtures.htmlCode();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it('component array when initialized', () => {
			const componentItems = component.init();
			componentItems.should.be.an('array');
			componentItems[0].should.be.an.instanceof(component);
		});

		it('single component when initialized with a root element', () => {
			const componentItem = component.init('#element');
			componentItem.should.be.an.instanceof(component);
		});
	});
});
