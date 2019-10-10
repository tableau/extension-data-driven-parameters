const multipleEntry = require('react-app-rewire-multiple-entry')(
	[{
		entry: 'src/entry_config.tsx',
		template: 'public/config.html',
		outPath: '/config.html'
	}
	]
);

module.exports = {
	webpack: function (config, env) {
		multipleEntry.addMultiEntry(config);
		return config;
	},
	devServer: function (configFunction) {
		multipleEntry.addEntryProxy(configFunction);
		return configFunction;
	}
}
