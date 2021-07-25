module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            textColor: {
                'primary': '#5F6979',
                'light': '#F5F6FA',
                'light-secondary': '#818891'
            }
        },
        colors: {
            'white' : 'white',
            'primary': '#4980ff',
            'primary-light': '#e4e4ff',
            'bgLight': '#f5f6fa'
        }
    },
    variants: {
        extend: {
            backgroundColor: ['active'],
        },
    },
    plugins: [],
}
