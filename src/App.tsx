import { SnackbarProvider } from "notistack";
import "./App.css";
import { AuthProvider } from "./global/context/AuthContext";
import Router from "./global/routes/Router";
import { LoadingProvider } from "./global/context/LoadingContext";
import { Suspense } from "react";
import { OnlineUsersProvider } from "./global/context/OnlineUsers";

function App() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <OnlineUsersProvider>
        <LoadingProvider>
          <AuthProvider>
            <SnackbarProvider maxSnack={3} autoHideDuration={1000}>
              <Router />
            </SnackbarProvider>
          </AuthProvider>
        </LoadingProvider>
      </OnlineUsersProvider>
    </Suspense>
  );
}

export default App;
