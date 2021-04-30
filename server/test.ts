import * as fs from 'fs/promises';
import * as os from 'os';
(async () => {
    const username = 'lqxc';
    const home = os.homedir();
    const dir = await fs
        .opendir(`${home}/upload/${username}`)
        .catch((e) => void 0)
        .then(async () => await fs.mkdir(`${home}/upload/${username}`));
    console.log(dir);
})();
