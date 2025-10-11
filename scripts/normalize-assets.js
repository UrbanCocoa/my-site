import fs from "fs";
import path from "path";

const root = path.resolve("./src/assets");

function lowercaseFiles(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      lowercaseFiles(fullPath);
    } else {
      const newFile = path.join(dir, file.toLowerCase());
      if (fullPath !== newFile) {
        fs.renameSync(fullPath, newFile);
        console.log(`Renamed: ${file} → ${file.toLowerCase()}`);
      }
    }
  });
}

if (fs.existsSync(root)) {
  lowercaseFiles(root);
  console.log("✅ All asset filenames normalized to lowercase!");
} else {
  console.log("⚠️ No /src/assets folder found, skipping normalization.");
}
