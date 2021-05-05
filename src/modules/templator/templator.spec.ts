import Templator from './templator';

import chai from 'chai';

const {assert} = chai;

describe('Test Templator module', () => {
    const tmpl: string = `
    <div class="{{class}}">
        <img src="{{ img }}">
        {{ text}}
        <span>{{empty }}</span>
    </div>
    `;
    const context = {
        class: 'style-class__test',
        img: '/static/img/avatar.jpg',
        text: 'Some Cool Text'
    };
    const templator = new Templator(tmpl);

    it('Insert data to curly braces', async () => {
        const shouldBe = `
    <div class="style-class__test">
        <img src="/static/img/avatar.jpg">
        Some Cool Text
        <span></span>
    </div>
    `;
        const res = templator.compile(context);
        assert.isTrue(shouldBe === res, 'Wrong output of Templator compiler');
    });

    it('Insert data to curly braces, leave empty values for other insertions', async () => {
        const shouldBe = `
    <div class="style-class__test">
        <img src="/static/img/avatar.jpg">
        Some Cool Text
        <span>{{empty }}</span>
    </div>
    `;
        const res = templator.compile(context, false);
        assert.isTrue(shouldBe === res, 'Wrong output of Templator compiler');
    });
});
