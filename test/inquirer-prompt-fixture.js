/**
 * Modified from http://simiansblog.com/2015/04/04/testing-a-slush-generator/
 */


const inquirer = require('inquirer');

function mockPrompt(answers) {
	function assignAnswer(prompt) {
		if (!(prompt.name in answers)) {
			answers[prompt.name] = prompt.default;
		}
	}
	function inquirerPrompt(prompts) {
		[].concat(prompts).forEach(assignAnswer);
		return Promise.resolve(answers);
	}
	inquirer.prompt = inquirerPrompt;
}

module.exports = mockPrompt;
