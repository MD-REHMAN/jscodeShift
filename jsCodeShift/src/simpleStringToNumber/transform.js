const describe = require('jscodeshift-helper').describe;

export default (fileInfo, api) => {
	const j = api.jscodeshift;

	const root = j(fileInfo.source);

	// finding Box
	const Box = root.find(j.JSXOpeningElement, {
		name: {
			type: 'JSXIdentifier',
			name: 'Box',
		},
	});

	// console.log('MYLOG: Box: ', Box);

	// find bg in Box
	const updatedBox = Box.find(j.JSXAttribute, {
		type: 'JSXAttribute',
	})
		.replaceWith((nodePath) => {
			// get the underlying Node
			// console.log('MYLOG: nodePath: ', nodePath);
			const { node } = nodePath;
			// console.log('MYLOG: node: ', node);
			// if ((node.name.name === 'bg')) {
			// 	node.value.value = 'cyan.200';
			// }

			// TODO: instead of m, we use it dynamically

			if (node.name.name === 'p') {
				// describe(node);

				// NOTE: Getting values from JSXExpressionContainer
				if (node.value.type === 'Literal') {
					// console.log(
					// 	'MYLOG: node.value.expression.value: ',
					// 	node.value.expression.value,
					// );

					// NOTE: creating new node
					const newNode = j.jsxExpressionContainer(
						j.literal(parseInt(node.value.value)),
					);
					// NOTE: Replacing JSXExpressionContainer with Literal
					node.value = newNode;

					describe(node);
				} else {
					// TODO: Log it in a file
				}

				// console.log('MYLOG: node.value: ', node.value);

				// console.log('MYLOG: typeof node.value: ', node.value);
				// const literal = node.value.find(j.Literal);
				// if (literal) {
				// console.log('MYLOG: literal: ', literal);
				// node.value.value = literal.value;
				// }
			}

			// if (typeof node.value.value === 'number') {
			// 	if (node.name.name === 'p' || node.name.name === 'm') {
			// 		node.value.value = parseInt(`{${parseInt(node.value.value)}}`);
			// 	}
			// }

			// change to our new prop
			// node.value.value = 'red.400';
			// replaceWith should return a Node, not a NodePath
			return node;
		})
		.toSource();

	// console.log('MYLOG:Box: ', Box);
	// console.log('MYLOG: updatedBox: ', updatedBox);

	return updatedBox;
};
