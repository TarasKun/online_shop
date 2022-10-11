import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {Spinner} from "react-bootstrap";
import NavBar from "./components/NavBar";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userAPI";

function App() {
    const {user} = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check().then(() => {
            user.setUser(true);
            user.setIsAuth(true);
        }).finally(() => setLoading(false));
    }, [])

    if (loading) {
        return <Spinner animation={"grow"}/>
    }
  return (
    <BrowserRouter>
        <NavBar />
        <AppRouter />
    </BrowserRouter>
  );
}

export default App;
