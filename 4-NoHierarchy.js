// Back to order, callback hierarchy

let data = {};

readConfig();

// Emulate Asynchronous calls

function wrapAsync(callback) {
  setTimeout(callback, Math.floor((Math.random() * 1000)));
}

// Asynchronous functions

function readConfig() {
  wrapAsync(() => {
    console.log('(1) config loaded');
    data.config = { name: 'name' };
    selectFromDb();
  });
}

function selectFromDb(query, callback) {
  wrapAsync(() => {
    console.log('(2) SQL query executed');
    data.cities = [ { name: 'Kiev' } , { name: 'Roma' } ];
    getHttpPage();
  });
}

function getHttpPage(url, callback) {
  wrapAsync(() => {
    console.log('(3) Page retrieved');
    data.html = '<html>Some archaic web here</html>';
    readFile();
  });
}

function readFile(path, callback) {
  wrapAsync(() => {
    console.log('(4) Readme file loaded');
    data.readme = 'file content';
    console.dir(data);
  });
}
