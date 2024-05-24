const fs = require('fs');
const path = require('path');
const terser = require('terser');

// Fonction pour minifier un fichier unique
const minifyFile = (filePath) => {
  const code = fs.readFileSync(filePath, 'utf8');
  const result = terser.minify(code);

  if (result.error) {
    console.error(`Erreur lors de la minification de ${filePath}:`, result.error);
    return;
  }

  if (!result.code) {
    console.error(`Erreur: Aucun code minifié généré pour ${filePath}`);
    return;
  }

  const minifiedPath = filePath.replace('.js', '.min.js');
  fs.writeFileSync(minifiedPath, result.code, 'utf8');
  console.log(`Minifié ${filePath} en ${minifiedPath}`);
};

// Fonction pour minifier tous les fichiers dans un répertoire
const minifyDirectory = (dirPath) => {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      minifyDirectory(filePath);
    } else if (file.endsWith('.js')) {
      minifyFile(filePath);
    }
  });
};

// Dossiers à minifier
const directoriesToMinify = ['controller', 'models', 'routes'];

directoriesToMinify.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (fs.existsSync(dirPath)) {
    minifyDirectory(dirPath);
  } else {
    console.warn(`Le répertoire ${dir} n'existe pas.`);
  }
});
