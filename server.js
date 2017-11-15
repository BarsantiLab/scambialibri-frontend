let express = require('express');
let path = require('path');
let http = require('http');

let app = express();
let argv = require('minimist')(process.argv.slice(2));
let port = process.env.PORT || argv.port || 8092;

app.use(express.static(path.join(__dirname, './dist')));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});