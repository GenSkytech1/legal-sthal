const { execSync } = require('child_process');

try {
  const result = execSync('npx tsc --noEmit', { encoding: 'utf-8' });
  console.log("SUCCESS");
  console.log(result);
} catch (e) {
  console.log("FAILED");
  console.log(e.stdout);
  console.log(e.stderr);
}
