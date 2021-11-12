import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
// routes
import routes, { renderRoutes } from "./routes";
// redux
import { store, persistor } from "./redux/store";
// theme
import ThemeConfig from "./theme";
// components
import ScrollToTop from "./components/ScrollToTop";
import LoadingScreen from "./components/LoadingScreen";
import "moment/locale/es";
import moment from "moment";
// ----------------------------------------------------------------------

const history = createBrowserHistory();

export default function App() {
  moment.locale("es");
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <ThemeConfig>
          <Router history={history}>
            <ScrollToTop />
            {renderRoutes(routes)}
          </Router>
        </ThemeConfig>
      </PersistGate>
    </ReduxProvider>
  );
}
