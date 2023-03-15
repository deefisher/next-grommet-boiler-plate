import { Grommet } from 'grommet';
import React, { useState } from 'react';
import { theme } from '../styles';
import { useDispatch } from 'react-redux';
import { setThemeModeAction } from '../redux/actions';
import { Provider } from 'react-redux';
import store from '../redux/store';

interface IAppContext {
    dark: boolean;
    setDark: (value: React.SetStateAction<boolean>) => void;
}
const AppContext = React.createContext<IAppContext>({ dark: false, setDark: () => {} });

const AppProvider = ({ children }) => {
    const [dark, setDark] = useState(true);

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(setThemeModeAction(dark ? 'dark' : 'light'));
    }, [dark, dispatch]);

    return (
        <AppContext.Provider value={{ dark, setDark }}>
            <Grommet theme={theme} full themeMode={dark ? 'dark' : 'light'} background={{ dark: 'darkBlue' }}>
                {children}
            </Grommet>
        </AppContext.Provider>
    );
};

const App = ({ Component, pageProps }) => {
    return (
        <Provider store={store}>
            <AppProvider>
                <Component {...pageProps} />
            </AppProvider>
        </Provider>
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
