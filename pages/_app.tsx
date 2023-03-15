import { Grommet } from 'grommet';
import React, { useState } from 'react';
import { theme } from '../styles';

// import { useDispatch } from 'react-redux/es/exports';
// import { setThemeModeAction } from '../redux/actions';

interface IAppContext {
    dark: boolean;
    setDark: (value: React.SetStateAction<boolean>) => void;
}
const AppContext = React.createContext<IAppContext>({ dark: false, setDark: () => {} });

const App = ({ Component, pageProps }) => {
    const [dark, setDark] = useState(true);

    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(setThemeModeAction(dark ? 'dark' : 'light'));
    // }, [dark, dispatch]);

    return (
        <AppContext.Provider value={{ dark, setDark }}>
            <Grommet theme={theme} full themeMode={dark ? 'dark' : 'light'} background={{ dark: 'darkBlue' }}>
                <Component {...pageProps} />
            </Grommet>
        </AppContext.Provider>
    );
};

export default App;

export const useApp = () => {
    const context = React.useContext(AppContext);

    if (context === undefined) {
        throw new Error('useComponent must be used within a ComponentProvider');
    }

    return context;
};
