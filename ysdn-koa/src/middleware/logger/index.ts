import * as fs_Promise from 'fs/promises';
import * as fs from 'fs';
import { PathLike } from 'fs';
import { Msg } from '../interface/message';

const logger: (path: PathLike) => (msg: Msg) => void = path => {
    const file = fs.createWriteStream(path, { flags: 'a', encoding: 'utf-8' });
    file.on('error', e => console.error(e));
    return msg => {
        file.write(msg.msg);
    };
};

const recordError = logger('../../log/error-log.log');
const recordInformation = logger('../../log/record-log.log');
export default { recordError, recordInformation };
