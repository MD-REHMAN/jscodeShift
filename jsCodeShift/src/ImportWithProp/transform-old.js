import { describe } from 'jscodeshift-helper';

//deprecated.js
export default (fileInfo, api) => {
	const j = api.jscodeshift;
	const root = j(fileInfo.source);

	// find declaration for "geometry" import
	const jsxElement = root.find(j.JSXOpeningElement, {
		type: 'JSXIdentifier',
		value: 'native-base',
	});

	const nbSpecifiers = jsxElement.find(j.ImportSpecifier);

	nbSpecifiers.map((jsxElement) => {});

	return root.toSource();
};
