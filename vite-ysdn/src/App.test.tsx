import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

global.matchMedia =
    global.matchMedia ||
    function () {
        return {
            addListener: jest.fn(),
            removeListener: jest.fn(),
        };
    }; //fix windows.watchMedia is not a function

test('render', () => {
    render(<App />);
});
