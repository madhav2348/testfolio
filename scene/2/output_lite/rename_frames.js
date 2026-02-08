const fs = require('fs');
const path = require('path');

// Function to rename files in a directory
function renameFiles(folderPath) {
  try {
    const files = fs.readdirSync(folderPath);
    
    // Filter only PNG files and sort them
    const pngFiles = files
      .filter(file => file.endsWith('.png'))
      .sort();

    console.log(`\nProcessing folder: ${folderPath}`);
    console.log(`Found ${pngFiles.length} PNG files`);

    let renamedCount = 0;

    pngFiles.forEach((file, index) => {
      const oldPath = path.join(folderPath, file);
      const frameNumber = index + 1;
      const newFileName = `output_frames${String(frameNumber).padStart(4, '0')}.jpeg`;
      const newPath = path.join(folderPath, newFileName);

      // Skip if already has correct name
      if (file === newFileName) {
        console.log(`Skipped (already correct): ${file}`);
        return;
      }

      try {
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed: ${file} -> ${newFileName}`);
        renamedCount++;
      } catch (err) {
        console.error(`Error renaming ${file}:`, err.message);
      }
    });

    console.log(`\nCompleted: ${renamedCount} files renamed in ${folderPath}`);
  } catch (error) {
    console.error(`Error processing folder ${folderPath}:`, error.message);
  }
}

// Rename files in both output_lite folders
console.log('Starting file rename process...');
renameFiles('scene/1/output_lite');
renameFiles('scene/2/output_lite');
console.log('\nAll done!');
