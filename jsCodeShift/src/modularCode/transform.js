import { describe } from 'jscodeshift-helper';

const replaceNode = (node, prop, value) => {};

const operationsJSON = [
	{
		component: 'Box', // Box | Text | HStack | ...
		propName: 'm',
		convert: 'value', // value | type | both
		mode: 'persistType', // persistType | wrapWith
		// when mode is persistType
		wrapper: 'jsxExpressionContainer', // undefined | jsxExpressionContainer | or any other node type
		// when mode is wrapWith
		wrapper: 'jsxExpressionContainer', // undefined | jsxExpressionContainer | or any other node type
	},
];

export default (fileInfo, api) => {
	const j = api.jscodeshift;
	const root = j(fileInfo.source);

	// Getting all the NativeBase Imports
	const nbImports = root
		.find(j.ImportDeclaration, {
			source: {
				type: 'Literal',
				value: 'native-base',
			},
		})
		.find(j.ImportSpecifier);

	const filteredOperationJSON = operationsJSON.filter(
		(item) => item.component === nbImportPath.node.imported.name,
	);

	// Mapping through each NativeBase imports
	nbImports.map((nbImportPath) => {
		root
			.find(j.JSXOpeningElement, {
				name: {
					type: 'JSXIdentifier',
					name: nbImportPath.node.local.name,
				},
			})
			// Going throught each props
			.find(j.JSXAttribute, {
				type: 'JSXAttribute',
			})
			.replaceWith((nodePath) => {
				const { node } = nodePath;
				const operationForProps = filteredOperationJSON.filter(
					(item) => item.propName === node.name.name,
				);

				if (node.value.type === 'Literal') {
					// NOTE: Literal signifies that the value is most likely a string
					if (nbImportPath.node.local.name === 'component')
						if (node.name.name === 'bg') {
							node.value.value = 'cyan.200';
						}
				} else if (node.value.type === 'JSXExpressionContainer') {
				} else {
					// TODO: log it in a file
				}

				// if (node.name.name === 'bg') {
				// 	replaceNode()
				// 	node.value.value = 'cyan.200';
				// }

				return node;
			})
			.toSource();
	});
	return root.toSource();
};
