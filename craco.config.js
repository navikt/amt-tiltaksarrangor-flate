const CracoLessPlugin = require("craco-less");

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin
        },
        {
            plugin: CracoLessPlugin,
            options: {
                modifyLessRule: function(lessRule, _context) {
                    lessRule.test = /\.(module)\.(less)$/;
                    lessRule.exclude = /node_modules/;

                    return lessRule;
                },
                cssLoaderOptions: {
                    modules: {
                        localIdentName: "[local]__[hash:base64:5]"
                    }
                }
            }
        }
    ]
};