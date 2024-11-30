const path = require('path');

module.exports = {
    entry: './src/script.js', // Entry point for the application
    output: {
        filename: 'bundle.js', // Output bundle file name
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    mode: 'production', // Set the mode to production
};
