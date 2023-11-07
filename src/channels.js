module.exports = async function (app) {
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', connection => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection);
  });

  app.on('disconnect', async connection => {
    // On a new real-time connection, add it to the anonymous channel
    // app.channel('anonymous').join(connection);
    try {
      const { user } = connection;
      if (user) {
        await app.service('users').patch(user.id, { online: false });
      }
    } catch (err) {
      console.log(err);
    }
  });

  app.on('login', async (authResult, { connection }) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      // Obtain the logged in user from the connection
      // const user = connection.user;
      const { user } = authResult;
      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);
      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection);
      app.channel(`notifications/${user.id}`).join(connection);
      await app.service('users').patch(user.id, { online: true });
    }
  });
};
