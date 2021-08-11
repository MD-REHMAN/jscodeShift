module.exports = function (fileInfo, api, options) {
	// transform `fileInfo.source` here
	// ...
	// return changed source
	console.log(
		'%c MYLOG: fileInfo',
		'background: #374151; color: #FBBF24; font-weight: 700; padding: 2px 8px;',
		fileInfo,
	);

	return fileInfo.source;
};
