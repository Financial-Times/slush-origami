/**
 * Spec for <%= componentName %>
 */

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import <%= _.camelCase(componentName) %> from '../main';
import * as fixtures from './helpers/fixtures';

const should = chai.should();
should.use(sinonChai);

describe(('<%= componentName %>'), () => {
	it('is defined', () => {
		should.exist(<%= _.camelCase(componentName) %>);
	});

	it('has a static init method', () => {
		<%= _.camelCase(componentName) %>.init.should.be.a('function');
	});

	it('should autoinitialize', (done) => {
		const initSpy = sinon.spy(<%= _.camelCase(componentName) %>, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			initSpy.should.have.been.called;
			initSpy.restore();
			done();
		}, 100);
	});

	it('should not autoinitialize when the event is not dispached', () => {
		const initSpy = sinon.spy(<%= _.camelCase(componentName) %>, 'init');
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
			const <%= _.camelCase(componentName) %>Items = <%= _.camelCase(componentName) %>.init();
			<%= _.camelCase(componentName) %>Items.should.be.an('array');
			<%= _.camelCase(componentName) %>Items[0].should.be.an.instanceof(<%= _.camelCase(componentName) %>);
		});

		it('single component when initialized with a root element', () => {
			const <%= _.camelCase(componentName) %>Item = <%= _.camelCase(componentName) %>.init('#element');
			const <%= _.camelCase(componentName) %>Item.should.be.an.instanceof(<%= _.camelCase(componentName) %>);
		});
	});
});
