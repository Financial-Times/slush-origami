/*
* slush-origami
* https://github.com/ft-interactive/slush-origami
*
* Copyright (c) 2017, Ændrew Rininsland, Financial Times
* Licensed under the MIT license.
*/

const gulp = require('gulp');
const install = require('gulp-install');
const conflict = require('gulp-conflict');
const template = require('gulp-template');
const rename = require('gulp-rename');
const _ = require('underscore.string');
const inquirer = require('inquirer');
const path = require('path');

function format(string) {
	const username = string.toLowerCase();
	return username.replace(/\s/g, '');
}

const defaults = (function () {
	const workingDirName = path.basename(process.cwd());
	const configFile = path.join(homeDir, '.gitconfig');
	let homeDir;
	let osUserName;
	let user;

	if (process.platform === 'win32') {
		homeDir = process.env.USERPROFILE;
		osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
	} else {
		homeDir = process.env.HOME || process.env.HOMEPATH;
		osUserName = homeDir && homeDir.split('/').pop() || 'root';
	}

	user = {};

	if (require('fs').existsSync(configFile)) {
		user = require('iniparser').parseSync(configFile).user;
	}

	return {
		componentName: workingDirName,
		userName: osUserName || format(user.name || ''),
		authorName: user.name || '',
		authorEmail: user.email || '',
		repoUrl: `https://github.com/financial-times/${workingDirName}`,
		issuesUrl: `https://github.com/financial-times/${workingDirName}/issues`,
		ciUrl: `https://circleci.com/api/v1/project/Financial-Times/${workingDirName}`,
	};
}());

gulp.task('default', function (done) {
	const prompts = [{
		name: 'componentName',
		message: 'What is the name of your component?',
		default: defaults.componentName,
	}, {
		name: 'repoUrl',
		message: 'What is the Git repo of the component?',
		default: defaults.repoUrl,
	},{
		name: 'componentDescription',
		message: `What does this component do? Complete the following sentence:
		"This is an Origami component..."`,
		filter: v => v.replace(/\.$/, ''), // Remove trailing periods
	}, {
		name: 'componentType',
		message: 'What type of component is it?',
		type: 'list',
		choices: [
			'component',
			'primitive',
			'utility',
			'layout',
		],
	}, {
		name: 'componentKeywords',
		message: 'Provide a comma-separated list of keywords describing the component',
		default: '',
	}, {
		name: 'componentVersion',
		message: 'What is the version of your component?',
		default: '0.1.0',
	}, {
		name: 'supportStatus',
		message: 'What is the current support status?',
		type: 'list',
		choices: [
			{
				name: 'active',
				value: 'active',
				short: 'feature development ongoing, bug reports will be gratefully received and acted upon promptly',
			},
			{
				name: 'maintained',
				value: 'maintained',
				short: 'not actively developed but reproducible bugs will be fixed promptly and work done where necessary to maintain compatibility with browsers and other components',
			},
			{
				name: 'experimental',
				value: 'experimental',
				short: 'the component is not ready for production use. This was previously called "not implemented"',
			},
		],
		default: 'active',
	}, {
		name: 'ciUrl',
		message: 'What is the CircleCI URL?',
		default: defaults.ciUrl,
	}, {
		name: 'browserFeatures',
		message: 'Please provide a comma-separated list of browser features to polyfill',
		default: '',
	}, {
		name: 'hasSass',
		message: 'Does your component need Sass?',
		default: true,
		type: 'confirm',
	}, {
		name: 'hasJs',
		message: 'Does your component need JavaScript?',
		default: true,
		type: 'confirm',
	}, {
		name: 'hasMarkup',
		message: 'Does your component need markup?',
		default: true,
		type: 'confirm',
	}, {
		name: 'authorName',
		message: 'What is the your name?',
		default: defaults.authorName,
	}, {
		name: 'authorEmail',
		message: 'What is the your email?',
		default: defaults.authorEmail,
	}, {
		name: 'userName',
		message: 'What is the github username?',
		default: defaults.userName,
	}, {
		name: 'favColor', // @TODO record this somewhere for teh lulz.
		message: 'What is your favourite colour?!',
		type: 'list',
		choices: [
			'Blue!',
			'Blue. No yel-- Auuuuuuuugh!',
			'This is silly.',
		],
	}];

	const jsQuestions = [
		{
			name: 'useBabel',
			message: 'Do you want to use ES2015 via Babel?',
			type: 'confirm',
			default: true,
		},
	];

	const markupQuestions = [
		{
			name: 'markupLang',
			message: 'Which markup dialect do you want to use for examples?',
			type: 'list',
			choices: [
				'Nunjucks',
				'Handlebars',
			],
		},
	];

	const handleAnswers = answers => {
		const markupAnswers = answers.hasMarkup || inquirer.prompt(markupQuestions);
		const jsAnswers = answers.hasJs || inquirer.prompt(jsQuestions);

		return Promise.all([markupAnswers, jsAnswers]).then(([markupAnswers, jsAnswers] )=> {
			return inquirer.prompt({
				type: 'confirm',
				name: 'moveon',
				message: 'Continue?',
				default: true,
			}).then(moveon => {
				if (!moveon) {
					return done();
				}

				if (!answers.componentName.match(/^[a-z]-[a-z-]+?[a-z]$/)) {
					console.log('Invalid component name!');
					console.log('Should match regex: /^[a-z]-[a-z-]+?[a-z]$/');
					console.log('That is, something like...');
					console.log('* o-grid');
					console.log('* n-ui');
					console.log('* g-audio');
					console.log(`You supplied: ${answers.componentName}`);
					console.log('Please re-run generator, supplying an appropriate name!');
					return done();
				}

				gulp.src(__dirname + '/templates/**')
				.pipe(template([...answers, ...markupAnswers, ...jsAnswers]))
				.pipe(rename(function (file) {
					if (file.basename[0] === '_') { // Hidden files
						file.basename = '.' + file.basename.slice(1);
					} else if (file.basename === 'component.scss') { // Sass partial
						file.basename = `${answers.componentName}.scss`;
					} else if (file.basename === 'component.js') {
						file.basename = `${answers.componentName}.js`;
					} else if (file.basename === 'component.spec.js') {
						file.basename = `${answers.componentName}.spec.js`;
					} else if (file.basename === 'package_json') { // package.json so Atom stops complaining
						file.basename = 'package.json';
					}
				}))
				.pipe(conflict('./'))
				.pipe(gulp.dest('./'))
				.pipe(install())
				.on('end', function () {
					done();
				});
			});
		});
	};

	//Ask
	inquirer.prompt(prompts, handleAnswers);
});
