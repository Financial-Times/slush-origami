# <%= componentName %>

This is an [origami](http://origami.ft.com/) component <%= componentDescription %>.

### Getting started

Install via Bower:

```
bower install --S <%= componentName %>
```
<% if (hasJs) { %>
Load the JS:

```js<% if (useBabel) { %>
import <%= _.camelCase(componentName) %> from '<%= componentName %>';
<% } else { %>
const <%= _.camelCase(componentName) %> = require('<%= componentName %>');
<% } %><%= _.camelCase(componentName) %>.init();
```
<% } %><% if (hasSass) { %>
Load the CSS:

```scss
@import '<%= componentName %>/main';
```<% } %>
<% if (hasMarkup) { %>Copy markup from one of the following demos:

```html
<div class="<%= componentName %>">
  <!-- @TODO Put your component markup here! -->
</div>
```<% } %>
### License

Copyright (c) <%= new Date().getYear() %> Financial Times Ltd. All rights reserved.

This software is published under the [MIT licence](http://opensource.org/licenses/MIT).
