module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/exchange-editor/datamodel/51780/data_model',
                permanent: true,
            },
        ];
    },
};
