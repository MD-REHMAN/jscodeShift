import { describe } from 'jscodeshift-helper';

//deprecated.js
export default (fileInfo, api) => {
	const j = api.jscodeshift;
	const root = j(fileInfo.source);

	// find declaration for "geometry" import
	const nbImports = root
		.find(j.ImportDeclaration, {
			source: {
				type: 'Literal',
				value: 'native-base',
			},
		})
		.find(j.ImportSpecifier);

	// const nbSpecifiers = nbImports.find(j.ImportSpecifier);

	nbImports.map((nbImportPath) => {
		// console.log(
		// 	'MYLOG: nbImportPath.getValueProperty: ',
		// 	nbImportPath.getValueProperty('imported').name,
		// );
		// console.log(
		// 	'MYLOG: nbImportPath.getValueProperty: ',
		// 	nbImportPath.getValueProperty('local').name,
		// );

		// console.log(nbImportPath.node);
		// describe(nbImportPath.getValueProperty('imported'));
		// describe(nbImportPath);
		// finding Box
		const nbComponent = root.find(j.JSXOpeningElement, {
			name: {
				type: 'JSXIdentifier',
				name: nbImportPath.node.local.name,
			},
		});
		// console.log('MYLOG: nbComponent: ', nbComponent);
		describe(nbComponent);
		const updatedNBComponent = nbComponent
			.find(j.JSXAttribute, {
				type: 'JSXAttribute',
			})
			.replaceWith((nodePath) => {
				// get the underlying Node
				// console.log('MYLOG: nodePath: ', nodePath);
				const { node } = nodePath;
				// console.log('MYLOG: node: ', node);
				if (node.name.name === 'bg') {
					node.value.value = 'cyan.200';
				}
				// change to our new prop
				// node.value.value = 'red.400';
				// replaceWith should return a Node, not a NodePath
				return node;
			})
			.toSource();
	});

	// const BoxLocalName = nbImport.find(j.ImportSpecifier, {
	// 	imported: {
	// 		type: 'Identifier',
	// 		name: 'Box',
	// 	},
	// });

	// describe(nbSprcifiers);
	// describe(nbImport.toSource);
	// console.log('MYLOG: nbImport.toSource(): ', nbImport.toSource());
	// console.log('MYLOG: BoxLocalName: ', BoxLocalName);

	// console.log('MYLOG: importDeclaration: ', importDeclaration);

	// console.log(
	// 	'MYLOG: importDeclaration.specifiers: ',
	// 	importDeclaration.specifiers,
	// );

	// const allImportsFromNB = importDeclaration.specifiers.map(
	// 	(item) => item.local.name,
	// );

	// console.log('MYLOG: allImportsFromNB: ', allImportsFromNB);

	// allImportsFromNB.map((NBComponent) => {
	// 	const NBComponentCollection = root.find(j.JSXOpeningElement, {
	// 		name: {
	// 			type: 'JSXIdentifier',
	// 			name: NBComponent,
	// 		},
	// 	});

	// 	const updatedNBComponent = NBComponentCollection.find(j.JSXAttribute, {
	// 		type: 'JSXAttribute',
	// 	})
	// 		.replaceWith((nodePath) => {
	// 			// get the underlying Node
	// 			// console.log('MYLOG: nodePath: ', nodePath);
	// 			const { node } = nodePath;
	// 			// console.log('MYLOG: node: ', node);
	// 			if ((node.name.name = 'bg')) {
	// 				node.value.value = 'cyan.200';
	// 			}

	// 			// change to our new prop
	// 			// node.value.value = 'red.400';
	// 			// replaceWith should return a Node, not a NodePath
	// 			return node;
	// 		})
	// 		.toSource();
	// });

	return root.toSource();

	// get the local name for the imported module
	// const localName =
	// 	// find the Identifiers
	// 	// get the Node in the NodePath and grab its "name"
	// 	importDeclaration
	// 		.find(j.Identifier)
	// 		// get the first NodePath from the Collection
	// 		.get(0).node.name;

	// return root
	// 	.find(j.MemberExpression, {
	// 		object: {
	// 			name: localName,
	// 		},
	// 		property: {
	// 			name: 'circleArea',
	// 		},
	// 	})

	// 	.replaceWith((nodePath) => {
	// 		// get the underlying Node
	// 		const { node } = nodePath;
	// 		// change to our new prop
	// 		node.property.name = 'getCircleArea';
	// 		// replaceWith should return a Node, not a NodePath
	// 		return node;
	// 	})

	// 	.toSource();
};
