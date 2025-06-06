import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { store } from "./redux/store.js";
import "./index.css";
import { App } from "./App.jsx";

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
    </QueryClientProvider>
);
