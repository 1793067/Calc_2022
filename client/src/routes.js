import Home from "./pages/Home"
import Letters from "./pages/Letters"
import Tariff from "./pages/Tariff"
import User from "./pages/User"
import Auth from "./pages/Auth"

import {HOME_ROUTE, LETTERS_ROUTE, TARIFF_ROUTE, USER_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "./utils/consts"

export const authRoutes = [
    {   path: USER_ROUTE,             Component: User        },
    {   path: USER_ROUTE + '/:id',    Component: Home        }
]

export const publicRoutes = [
    {   path: LOGIN_ROUTE,           Component: Auth        },
    {   path: REGISTRATION_ROUTE,    Component: Auth        },
    {   path: HOME_ROUTE,            Component: Home        },
    {   path: LETTERS_ROUTE,         Component: Letters     },
    {   path: TARIFF_ROUTE,          Component: Tariff      }
]