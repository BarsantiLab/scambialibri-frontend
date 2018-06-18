let express = require('express');
let path = require('path');

let app = express();
let argv = require('minimist')(process.argv.slice(2));
let port = process.env.PORT || argv.port || 8092;

app.use(express.static(path.join(__dirname, './dist')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './dist/index.html')));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});