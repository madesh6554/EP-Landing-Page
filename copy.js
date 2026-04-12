const fs = require('fs');
const path = require('path');

const srcFiles = [
  'C:\\Users\\mades\\.gemini\\antigravity\\brain\\1c6efa90-0bb4-46a3-922e-dcda21d2b8b1\\3d_student_icon_1775910170386.png',
  'C:\\Users\\mades\\.gemini\\antigravity\\brain\\1c6efa90-0bb4-46a3-922e-dcda21d2b8b1\\3d_job_icon_1775910197083.png',
  'C:\\Users\\mades\\.gemini\\antigravity\\brain\\1c6efa90-0bb4-46a3-922e-dcda21d2b8b1\\3d_pro_icon_1775910213422.png',
  'C:\\Users\\mades\\.gemini\\antigravity\\brain\\1c6efa90-0bb4-46a3-922e-dcda21d2b8b1\\3d_speaker_icon_1775910265565.png'
];

const destNames = ['student.png', 'job.png', 'pro.png', 'speaker.png'];
const targetDir = path.join(__dirname, 'public', '3d');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

srcFiles.forEach((src, index) => {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(targetDir, destNames[index]));
    console.log(`Copied ${destNames[index]}`);
  } else {
    console.log(`Failed to find ${src}`);
  }
});
