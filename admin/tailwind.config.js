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
            'primary': 'hsl(211, 100%, 50%)',
            'primary-light': 'rgba(0, 123, 255, 0.1)',
        }
    },
    variants: {
        extend: {
            backgroundColor: ['active'],
        },
    },
    plugins: [],
}
