import { v2 as compose } from 'docker-compose'
import path from "path"

async function globalSetup() {
  await compose.upAll({
    cwd: path.join(__dirname),
    log: true,
  });
}

export default globalSetup;
