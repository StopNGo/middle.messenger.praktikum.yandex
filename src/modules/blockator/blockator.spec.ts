/* eslint-env and, mocha */
import Blockator from './blockator';

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

const tmplBlock = `
<div class="block {{class}}">
    <span class="block__text">{{text}}</span>
    <button></button>
</div>
`;

const tmplButton = `
<div class="button {{class}}">{{caption}}</div>
`;

const dom = new JSDOM(index, {
    url: 'http://localhost:1234/'
});

const root = dom.window.document.querySelector('app');

const block = new Blockator(
    'block',
    {
        class: 'block--red',
        text: 'This is block'
    },
    tmplBlock
);

const button = new Blockator(
    'button',
    {
        class: 'button--red',
        caption: 'Click me'
    },
    tmplButton
);

describe('Test Blockator module', () => {
    it(`Test block rendering`, () => {
        if (root) {
            root.appendChild(block.getContent());
        }

        assert.isOk(dom.window.document.querySelector('.block--red'), `Block is not in DOM'`);
    });

    it(`Test block nesting`, () => {
        block.addNestedBlocksToTag('button', [button]);

        assert.isOk(dom.window.document.querySelector('.button--red'), `Button is not in DOM'`);
    });

    it(`Test changing props`, () => {
        const captionToChange = 'Clicked';
        button.props.caption = captionToChange;

        const buttonInDOM = dom.window.document.querySelector('.button--red');
        let captionInDOM: string | null = '';
        if (buttonInDOM) {
            captionInDOM = buttonInDOM.textContent;
        }

        assert.isTrue(captionInDOM === captionToChange, `Caption is not changed'`);
    });

    it(`Delete nested block`, () => {
        block.deleteNestedBlocksFromTag('button');

        assert.isNotOk(dom.window.document.querySelector('.button--red'), `Button still is in DOM'`);
    });
});
