import React, { FC } from 'react';
import { baseurl } from '../../auth';
import AvatarLink from '../AvatarLink';

const UserLink: FC<{
    user: { username: string; avatarUrl?: string; nickname: string };
}> = ({ user }) => (
    <AvatarLink
        src={baseurl + `/user/avatar/${user.username}/${user.avatarUrl}`}
        name={user.username}
        nickname={user.nickname}
    />
);
export default UserLink;
