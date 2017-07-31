const assert = require('assert');
const unicodeNames = require('unicode-10.0.0/Names');

module.exports = function (json) {
	const characters = JSON.parse(json);

	assert(Array.isArray(characters));

	for (const character of characters) {
		assert(Number.isInteger(character.codepoint));
		assert(character.codepoint >= 0);

		const correctName = unicodeNames.get(character.codepoint);
		if (!['CJK Ideograph'].includes(correctName)) {
			assert.strictEqual(correctName, character.name);
		}
	}

	return JSON.stringify(characters);
};
