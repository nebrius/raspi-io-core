"use strict";
/*
Copyright (c) 2014-2018 Bryan Hughes <bryan@nebri.us>

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the 'Software'), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const mocks_1 = require("./mocks");
describe('LED', () => {
    let raspi;
    afterEach(() => {
        raspi.reset();
    });
    it('sets the pin mode properly for the built-in LED', (done) => mocks_1.createInstance((newRaspi) => {
        raspi = newRaspi;
        expect(raspi.defaultLed).toEqual(-1);
        expect(raspi.pins[raspi.defaultLed].supportedModes).toEqual([1]);
        const peripheral = raspi.getLEDInstance();
        expect(peripheral).not.toBeUndefined();
        if (peripheral) {
            expect(peripheral.args.length).toEqual(0);
        }
        done();
    }));
    it('can write to the LED', (done) => mocks_1.createInstance((newRaspi) => {
        raspi = newRaspi;
        const peripheral = raspi.getLEDInstance();
        raspi.digitalWrite(raspi.defaultLed, 0);
        expect(peripheral.read()).toEqual(0);
        raspi.digitalWrite(raspi.defaultLed, 1);
        expect(peripheral.read()).toEqual(1);
        done();
    }));
    it(`doesn't create the defaultLed property when there is no default LED`, (done) => mocks_1.createInstance({ enableDefaultLED: false }, (newRaspi) => {
        raspi = newRaspi;
        expect(() => raspi.defaultLed).toThrow();
        done();
    }));
});
//# sourceMappingURL=led.spec.js.map