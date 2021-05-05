import HTTPTransportator from './transportator';

import chai from 'chai';

const {assert} = chai;

describe('Test Transportator module', () => {
    const host = 'https://httpbin.org/anything';
    const Transportator = new HTTPTransportator(`${host}`);
    const data = {
        abc: '123',
        bca: 'test'
    };

    const options = {
        headers: {
            'content-type': 'application/json'
        },
        data: JSON.stringify(data)
    };

    it('GET: Returns GET args', async () => {
        const res: any = await Transportator.get({data});
        assert.isTrue(JSON.stringify(data) === JSON.stringify(res.args), 'GET returns wrong result');
    });

    it('PUT: Returns PUT args', async () => {
        const res: any = await Transportator.put(options);
        assert.isTrue(JSON.stringify(data) === JSON.stringify(res.json), 'PUT returns wrong result');
    });

    it('POST: Returns POST args', async () => {
        const res: any = await Transportator.post(options);
        assert.isTrue(JSON.stringify(data) === JSON.stringify(res.json), 'POST returns wrong result');
    });

    it('PATCH: Returns PATCH args', async () => {
        const res: any = await Transportator.patch(options);
        assert.isTrue(JSON.stringify(data) === JSON.stringify(res.json), 'PATCH returns wrong result');
    });

    it('DELETE: Returns DELETE args', async () => {
        const res: any = await Transportator.delete(options);
        assert.isTrue(JSON.stringify(data) === JSON.stringify(res.json), 'DELETE returns wrong result');
    });
});
