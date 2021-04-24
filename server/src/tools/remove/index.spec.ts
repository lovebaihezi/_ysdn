import { remove } from './index';

describe('test remove attributes in an object', () => {
    test('should delete nothing', () => {
        expect(
            remove<{ username: string; password: string }, ''>({
                username: '123',
                password: '456',
            }),
        ).toStrictEqual({ username: '123', password: '456' });
    });
    test('should remove username', () => {
        expect(
            remove<{ username: string; password: string }, 'username'>(
                {
                    username: '123',
                    password: '456',
                },
                'username',
            ),
        ).toStrictEqual({ password: '456' });
    });
});
