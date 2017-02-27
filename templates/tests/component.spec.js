/**
 * Spec for <%= componentName %>
 */

import chai from 'chai';
import <% _.camelCase(componentName) %> from '../main';

const should = chai.should();

describe(('<%= componentName %>'), () => {
	it('should exist', () => {
		should.exist(<% _.camelCase(componentName) %>);
	});
});
