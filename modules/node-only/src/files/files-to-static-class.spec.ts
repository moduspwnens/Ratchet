import path from 'path';
import { FilesToStaticClass } from './files-to-static-class.js';
import { EsmRatchet } from '@bitblit/ratchet-common/dist/lang/esm-ratchet.js';
//import { fileURLToPath, URL } from 'url';
//import { Logger } from '../../common/logger.js';

const testDirname: string = EsmRatchet.fetchDirName();

describe('#filesToStaticClass', function () {
  it('should convert files to a static class', async () => {
    const out: string = await FilesToStaticClass.process(
      [path.join(testDirname, 'files-to-static-class.ts'), path.join(testDirname, 'cli-ratchet.ts')],
      'Test'
    );
    //Logger.info('xx: %s', out);
    expect(out).not.toBeNull();
    expect(out.length).toBeGreaterThan(0);
  });
});
