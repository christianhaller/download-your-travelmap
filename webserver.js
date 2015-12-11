var connect = require('connect'),
    serveStatic = require('serve-static');
connect().use(serveStatic('./dist')).listen(8080);
