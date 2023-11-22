import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Axios from '../infra/api/Axios';
import LoadingSpin from '../presentation/components/Loading/loading'

const PrivateRoute = ({ element: Element, ...rest }) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get('token');
                if (token) {
                    const res = await Axios.get('/autenticacao', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log(res.data);
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                }
            } catch (err) {
                console.error("Erro na chamada da API", err.response.data);
                setAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <LoadingSpin />;
    }

    return (
        <Route
            {...rest}
            element={
                authenticated ? (
                    <Element />
                ) : (
                    <Navigate to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
