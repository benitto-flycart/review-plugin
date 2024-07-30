module.exports = {
    plugins: {
        'tailwindcss/nesting': 'postcss-nesting',
        tailwindcss: {},
        autoprefixer: {},
        'postcss-preset-env': {
            stage: 1, // You can configure the stage as needed
        },
    }
};

