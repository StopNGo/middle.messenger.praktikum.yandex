import {Routerator} from '../modules/routerator/routerator';

import ChatListScreen from '../screens/chat-main/main';
import LoginScreen from '../screens/login/main';
import RegisterScreen from '../screens/register/main';
import ProfileScreen from '../screens/profile/main';
import PasswordScreen from '../screens/password/main';
import Error404Screen from '../screens/error-404/main';
import Error500Screen from '../screens/error-500/main';

import {AuthAPI} from '../modules/api/auth-api';

const router = new Routerator('app');
const auth = new AuthAPI();

router.setResctrictionPromise(auth.isLogedIn());

router
    .use('/', LoginScreen, {restrictionCondition: true, redirect: '/chat'})
    .use('/register', RegisterScreen, {restrictionCondition: true, redirect: '/chat'})
    .use('/profile', ProfileScreen, {restrictionCondition: false, redirect: '/'})
    .use('/password', PasswordScreen, {restrictionCondition: false, redirect: '/'})
    .use('/chat', ChatListScreen, {restrictionCondition: false, redirect: '/'})
    .use('/404', Error404Screen)
    .use('/500', Error500Screen)
    .start();
