
module.exports = {
    content: [
      "./*.html",           // Couvre les fichiers HTML dans le dossier racine
      "./**/*.html",         // Couvre les fichiers HTML dans les sous-dossiers
      "./*.js",              // Couvre les fichiers JavaScript dans le dossier racine
      "./**/*.js",           // Couvre les fichiers JavaScript dans les sous-dossiers
    ],
    theme: {
      extend: {
        borderRadius: {
            '30px': '30px', 
            '15px': '15px',
          },
        borderColor: {
            'dragging': '#5271ff', 
          },
        boxShadow: {
            'dragging': '5px 5px 0 #38b6ff', 
          }
      },
    },
    plugins: [],
  };
  