const { exec } = require('child_process');

module.exports = (() => {
  const argv = process.argv.slice(2);
  if (!argv.length) {
    throw new Error('Name must be provided');
  }
  const skip = argv[1] && argv[1].slice(1) || '';
  const name = `${argv[0]}${skip}`;
  exec(`sequelize migration:create --name ${name}`, (err, stdout,) => {
    process.stdout.write(stdout);
  });
})();