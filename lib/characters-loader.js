const assert = require('assert');
const unicodeNames = require('unicode-10.0.0/Names');

module.exports = function (json) {
	const characters = JSON.parse(json);

	assert(Array.isArray(characters));

	for (const character of characters) {
		assert(Number.isInteger(character.codepoint));
		assert(character.codepoint >= 0);

		const correctName = unicodeNames.get(character.codepoint);
		const codePointHex = character.codepoint.toString(16).toUpperCase().padStart(4, '0');

		// http://www.unicode.org/Public/UCD/latest/ucd/extracted/DerivedName.txt
		// 3400..4DB5    ; CJK UNIFIED IDEOGRAPH-*
		// 4E00..9FEA    ; CJK UNIFIED IDEOGRAPH-*
		// F900..FA6D    ; CJK COMPATIBILITY IDEOGRAPH-*
		// FA70..FAD9    ; CJK COMPATIBILITY IDEOGRAPH-*
		// 17000..187EC  ; TANGUT IDEOGRAPH-*
		// 1B170..1B2FB  ; NUSHU CHARACTER-*
		// 20000..2A6D6  ; CJK UNIFIED IDEOGRAPH-*
		// 2A700..2B734  ; CJK UNIFIED IDEOGRAPH-*
		// 2B740..2B81D  ; CJK UNIFIED IDEOGRAPH-*
		// 2B820..2CEA1  ; CJK UNIFIED IDEOGRAPH-*
		// 2CEB0..2EBE0  ; CJK UNIFIED IDEOGRAPH-*
		// 2F800..2FA1D  ; CJK COMPATIBILITY IDEOGRAPH-*
		if ([
			'CJK Ideograph',
			'CJK Ideograph Extension A',
			'CJK Ideograph Extension B',
			'CJK Ideograph Extension C',
			'CJK Ideograph Extension D',
			'CJK Ideograph Extension E',
			'CJK Ideograph Extension F',
		].includes(correctName)) {
			assert.strictEqual(`CJK UNIFIED IDEOGRAPH-${codePointHex}`, character.name);
			continue;
		}

		assert.strictEqual(correctName, character.name);
	}

	return JSON.stringify(characters);
};
