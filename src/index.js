const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>{
  try{
    console.log(p);
    console.log(reason);

    return logger.error('Unhandled Rejection at: Promise ', p, reason);
  }catch(e){
    console.log(e);
  }
});
  
server.on('listening', () =>{
  try{
    return logger.info(
      `Feathers application started on http://${app.get('host')}:${port}`
    );
  }catch(e){
    console.log(e);
  }
});
