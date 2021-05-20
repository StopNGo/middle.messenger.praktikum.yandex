/* eslint-env and, mocha */
import {Routerator} from './routerator';
import Screen from '../../components/screen/main';

import chai from 'chai';
import {JSDOM} from 'jsdom';

import {Crypto} from '@peculiar/webcrypto';

global.crypto = new Crypto();

const {assert} = chai;

const index = `<!DOCTYPE html>
<!doctype html>
<html class="no-js" lang="ru">
    <head>
        <meta charset="utf-8">
        <title>YAPPI Chat</title>
        <meta name="description" content="YAPPI Chat">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <app></app>
    </body>
</html>
`;

const {window} = new JSDOM(index, {
    url: 'http://localhost:1234/'
});

let router: Routerator;

before(() => {
    global.document = window.document;
    if (global.document.defaultView) {
        global.window = global.document.defaultView;
    }

    router = new Routerator('app');
    router
        .use('/', Screen)
        .use('/register', Screen)
        .use('/profile', Screen)
        .use('/password', Screen)
        .use('/chat', Screen)
        .use('/private', Screen)
        .use('/login', Screen)
        .use('/404', Screen)
        .use('/500', Screen)
        .start();
});

describe('Test Routerator module', () => {
    context('Test simple navigation', () => {
        ['/', '/register', '/profile', '/password', '/chat', '/404', '/500', '/', '/profile', '/private', '/login'].forEach(page => {
            it(`Navigate to ${page}`, () => {
                router.go(page);
                assert.isTrue(global.window.location.pathname === page, `Navigated to '${global.window.location.pathname}' but should be on '${page}'`);
            });
        });
    });
    /* U
    context('Test history navigation', () => {
        it(`Navigate back`, () => {
            router.back();
            const shouldBe = '/private';
            assert.isTrue(global.window.location.pathname === shouldBe, `Navigated to '${global.window.location.pathname}' but should be on '${shouldBe}'`);
        });
    });
*/
    context('Test wrong page', () => {
        it(`Navigate to wrong page`, () => {
            router.go('/some-page');
            const shouldBe = '/404';
            assert.isTrue(global.window.location.pathname === shouldBe, `Navigated to '${global.window.location.pathname}' but should be on '${shouldBe}'`);
        });
    });
});
