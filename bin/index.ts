import app from '../app';
import database from '../database';
import config from 'config';

database.initialize()
    .then(() => {
        const port = config.get('server.port');
        app.listen(port, () => {
            console.log(`App execute in port: ${port}`);
        });
    })
    .catch(console.error);