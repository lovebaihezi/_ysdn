import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { LoginState } from '../../auth';

import { Login } from './index';

let container: HTMLElementTagNameMap['div'] = document.createElement('div');
beforeEach(() => {
    // 创建一个 DOM 元素作为渲染目标
    document.body.appendChild(container);
});

afterEach(() => {
    // 退出时进行清理
    unmountComponentAtNode(container);
    container.remove();
});

it('login test', () => {
    const check = (x: any) => {
        return x;
    };
    act(() => {
        render(
            <LoginState.Provider value={false}>
                <BrowserRouter>
                    <Login setState={check} />
                </BrowserRouter>
            </LoginState.Provider>,
            container
        );
    });
    const [usernameInput, passwordInput, submitButton]: [
        HTMLInputElement,
        HTMLInputElement,
        HTMLFormElement
    ] = [
        document.getElementById('username-test'),
        document.getElementById('password-test'),
        document.forms[0],
    ] as [HTMLInputElement, HTMLInputElement, HTMLFormElement];
    // console.log([...document.querySelectorAll('input')].map(e => e.id));
    usernameInput.value = '123456';
    passwordInput.value = '123456';

    act(() => {
        submitButton.dispatchEvent(new MouseEvent('submit', { bubbles: true }));
    });
    expect(sessionStorage.getItem('user')).toBe('{"msg":"login success"}');
});
