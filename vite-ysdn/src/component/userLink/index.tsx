import React, { FC } from 'react';
import AvatarLink from '../avatarLink';

const UserLink: FC<{
    user: { username: string; avatarUrl?: string; nickname: string };
}> = ({ user }) => (
    <AvatarLink
        src={user.avatarUrl}
        name={user.nickname}
    />
);
export default UserLink;
