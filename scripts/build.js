import { promises as fs } from 'fs';
import path from 'path';

async function main() {
  const distDir = path.resolve('dist');
  await fs.rm(distDir, { recursive: true, force: true });
  await fs.mkdir(distDir, { recursive: true });

  const filesToCopy = ['index.html'];
  for (const file of filesToCopy) {
    await fs.copyFile(path.resolve(file), path.join(distDir, path.basename(file)));
  }

  async function copyDir(src, dest) {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  }

  await copyDir(path.resolve('src'), path.join(distDir, 'src'));
  console.log('Build complete. Static assets are available in the dist directory.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
