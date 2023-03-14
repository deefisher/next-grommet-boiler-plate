import { grommet, Grommet } from 'grommet';

const MyApp = ({ Component, pageProps }) => {
    return (
        <Grommet theme={grommet}>
            <Component {...pageProps} />
        </Grommet>
    );
};

export default MyApp;
