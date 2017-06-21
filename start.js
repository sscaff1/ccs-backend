const app = require('./app');
require('dotenv').config({ path: 'variables.env' });

app.set('port', process.env.PORT || 7777);

const server = app.listent(app.get('port'), () => {
  console.log(`Express running on port ${server.address().port}`);
});
