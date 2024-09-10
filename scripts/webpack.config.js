const path = require('path');

module.exports = {
    entry: './src/app.ts',                   // Entry point
    module: {
        rules: [
            {
                test: /\.ts$/,                     // Use ts-loader for TypeScript files
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],            // Resolve these extensions
    },
    output: {
        filename: 'bundle.js',                 // Output file
        path: path.resolve(__dirname, 'dist'),
    },
    watch: true
};
