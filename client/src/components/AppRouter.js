import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {authRoutes as aRoutes, publicRoutes as pRoutes} from "../routes";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context);
    let authRoutes;

    const publicRoutes = pRoutes.map(({path, component}) =>
        <Route key={path} path={path} element={component} exact/>
    );

    if (user.isAuth) {
        authRoutes =  aRoutes.map(({path, component}) =>
            <Route key={path} path={path} element={component} exact/>
        );
    }

    return (
        <Routes>
            {authRoutes}
            {publicRoutes}
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
        </Routes>
    );
};

export default AppRouter;