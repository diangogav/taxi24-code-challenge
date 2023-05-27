import { v2 as compose } from 'docker-compose'
import path from 'path';

async function globalTeardown() {
  // await compose.down({
  //   cwd: path.join(__dirname),
  //   log: true,
  // });
}

export default globalTeardown;
