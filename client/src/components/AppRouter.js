import {Route, Routes, Navigate} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes';

const AppRouter = () => {
    const isAuth = true;
    return (
        <Routes> {/*Здесь Switch заменена на Routes. в этом компонете указываются всенен рабочие маршруты*/}
            {/*выражение a && b  вернет b если оба значения  истинны или 0 в ином случае. то есть authRoutes будут доступны только если пользователь авторизован и вычисляемая  строка непустая */}
            {isAuth && authRoutes.map( ({path, Component}) => 
                <Route key={path} path={path} element={Component()} />
            )}

            {publicRoutes.map( ({path, Component}) => 
                <Route key={path} path={path} element={Component()} />
            )}
            <Route path="*" element={<Navigate to="/" replace />} /> {/*Перенаправление на домашнюю страницу при неверном вводе URL */}
        </Routes>
    )
}

export default AppRouter;