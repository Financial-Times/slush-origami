/**
* Inquirer questions
* N.b., I've split these off from the main Slsuhfile to facilitate testing -Æ
*/
const axios = require('axios');
const path = require('path');
const chalk = require('chalk');
const error = chalk.bold.white.bgRed;
const bold = chalk.bold.white;
const { Separator } = require('inquirer');

const defaults = (function () {
	const workingDirName = path.basename(process.cwd());
	let homeDir;
	let osUserName;
	let user = {};

	if (process.platform === 'win32') { /* istanbul ignore if  */
		homeDir = process.env.USERPROFILE;
		osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
	} else {
		homeDir = process.env.HOME || process.env.HOMEPATH;
		osUserName = homeDir && homeDir.split('/').pop() || 'root';
	}

	const configFile = path.join(homeDir, '.gitconfig');

	if (require('fs').existsSync(configFile)) {
		user = require('iniparser').parseSync(configFile).user || {};
	}

	return {
		componentName: workingDirName,
		userName: osUserName || ((string) => { /* istanbul ignore next */
			const username = string.toLowerCase();
			return username.replace(/\s/g, '');
		})(user.name || ''),
		authorName: user.name || '',
		authorEmail: user.email || '',
		repoUrl: `https://github.com/financial-times/${workingDirName}`,
		issuesUrl: `https://github.com/financial-times/${workingDirName}/issues`,
		ciUrl: `https://circleci.com/api/v1/project/Financial-Times/${workingDirName}`,
	};
}());

module.exports = [
	{
		name: 'componentName',
		message: 'What is the name of your component?',
		default: defaults.componentName,
		validate: answer => answer.match(/^[a-z]-[a-z-]+?[a-z]$/) ? true :
		error('Invalid component name!\n') +
		error('Should match regex: /^[a-z]-[a-z-]+?[a-z]$/') +
		'\nThat is, something like...\n' +
		bold('* o-grid\n') +
		bold('* n-ui\n') +
		bold('* g-audio\n') +
		`You supplied: ${answer}`,
	}, {
		name: 'repoUrl',
		message: 'What is the Git repo of the component?',
		default: defaults.repoUrl,
	},{
		name: 'componentDescription',
		default: 'An origami component',
		message: `What does this component do? Complete the following sentence:\n`
		+ `"This is an Origami component..."`,
		filter: v => v.replace(/\.$/, ''), // Remove trailing periods
	}, {
		name: 'componentType',
		message: 'What type of component is it?',
		default: 'component',
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
		name: 'issuesUrl',
		message: 'What is the support/issues URL?',
		default: defaults.issuesUrl,
	}, {
		name: 'supportStatus',
		message: 'What is the current support status?',
		type: 'list',
		choices: [
			'active',
			'maintained',
			'experimental',
		],
		default: 'active',
	}, {
		name: 'ciUrl',
		message: 'What is the CircleCI URL?',
		default: defaults.ciUrl,
	}, {
		name: 'browserFeaturesRequired',
		message: 'Please choose which browser features are *REQUIRED* from Polyfill.io\n``',
		default: [],
		type: 'checkbox',
		choices: () => axios.get('https://cdn.polyfill.io/v2/assets/compat.json')
		.then(results => [
			'default-3.6',
			new Separator(),
			...Object.keys(results.data),
		]),
	}, {
		name: 'browserFeaturesOptional',
		message: 'Please choose which browser features are *OPTIONAL* from Polyfill.io\n``',
		default: [],
		type: 'checkbox',
		choices: () => axios.get('https://cdn.polyfill.io/v2/assets/compat.json')
		.then(results => [
			'default-3.6',
			new Separator(),
			...Object.keys(results.data),
		]),
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
		name: 'style',
		message: 'Which style of component do you want to scaffold?',
		type: 'list',
		default: 'function',
		choices: [
			{
				name: 'Pure/stateless function',
				value: 'function',
			},
			{
				name: 'Higher-Order Component (HOC)', // @TODO Investigate: is this useful? Desirable? Testable?
				value: 'hoc',
			},
			{
				name: 'ES6 Class',
				value: 'class',
			},
		], /* istanbul ignore next */
		when: ({ hasJs }) => hasJs,
	}, {
		name: 'transpiler',
		message: 'Which transpiler do you want to use?',
		type: 'list',
		choices: [
			'Babel',
			// 'TypeScript', // @TODO add TypeScript support
		],
		default: 'Babel', /* istanbul ignore next */
		when: ({ hasJs }) => hasJs,
	}, {
		name: 'assertions',
		message: 'Which assertion library do you want to use?',
		type: 'list',
		default: 'Proclaim',
		choices: [
			'Chai',
			'Proclaim',
		], /* istanbul ignore next */
		when: ({ hasJs }) => hasJs,
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
		type: 'confirm',
		name: 'moveon',
		message: 'Continue?',
		default: true,
	},
];
