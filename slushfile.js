/*
* slush-origami
* https://github.com/financial-times/slush-origami
*
* Copyright (c) 2017 Ændrew Rininsland, Financial Times
* Licensed under the MIT license.
*/

const gulp = require('gulp');
const filter = require('gulp-filter');
const install = require('gulp-install');
const conflict = require('gulp-conflict');
const template = require('gulp-template');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');
const inquirer = require('inquirer');
const path = require('path');
const _ = require('lodash/string');
const plumber = require('gulp-plumber');
const prompts = require('./questions');

const isTesting = process.env.NODE_ENV === 'test';

gulp.task('default', function (done) {
	const handleAnswers = answers => {
		if (!answers.moveon) {
			return done();
		}

		gulp.src(__dirname + '/templates/**')
		.pipe(plumber())
		.pipe(filter(file => {
			// Filter out JS and all testing stuff if no JS
			if (!answers.hasJs &&
				(file.path.indexOf('/test/') > -1 || path.extname(file.path) === '.js')) {
				return false;

			// Filter out Sass if no Sass
			} else if (!answers.hasSass &&
				(file.path.indexOf('/scss/') > -1 || path.extname(file.path) === '.scss')) {
				return false;

			// Filter out wrong JS files
			} else if (answers.hasJs && file.path.indexOf('/src/js/') > -1 ) {
				return path.basename(file.path).indexOf(answers.style.toLowerCase()) > -1;

			// Filter out wrong spec file
			} else if (answers.assertions && file.path.indexOf('.spec.') > -1) {
				return path.basename(file.path).indexOf(answers.assertions.toLowerCase()) > -1;

			// Otherwise keep file
			} else {
				return true;
			}
		}))
		.pipe(rename(function (file) {
			// Hidden files
			if (file.basename[0] === '_') {
				file.basename = '.' + file.basename.slice(1);

			// Sass partials
			} else if (file.basename === 'mixins' && file.extname === '.scss') {
				file.basename = `_mixins`;
			} else if (file.basename === 'variables' && file.extname === '.scss') {
				file.basename = '_variables';

			// Main JS spec file
			} else if (file.basename.match('component.spec') && file.extname === '.js') {
				file.basename = `${answers.componentName}.spec`;

			// Main JS file
			} else if (file.basename.match('component') && file.extname === '.js') {
				file.basename = `${answers.componentName}`;

			// package.json et al.
			} else if (file.basename.match(/_json$/)) {
				file.basename = file.basename.replace(/_json$/, '');
				file.extname = '.json';
			}
		}))
		.pipe(template(answers, {
			imports: {
				_,
				PascalCase: s => _.upperFirst(_.camelCase(s)),
			},
		}))
		.pipe(conflict(isTesting ? '/tmp' : './'))
		.pipe(gulp.dest('./'))
		.pipe(gulpif(!isTesting, install()))
		.on('data', () => {}) // No idea why this is needed for tests to pass
		.on('end', done);
	};

	//Ask
	inquirer.prompt(prompts)
		.then(handleAnswers);
});
