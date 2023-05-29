import { v2 as compose } from 'docker-compose'
import path from 'path';

async function globalTeardown(globalConfig: any) {
  if(globalConfig.testPathPattern === "/tests/unit") {
    return;
  }
  await compose.down({
    cwd: path.join(__dirname),
    log: true,
  });
}

export default globalTeardown;
