// Sequentian calls and sequentian execution

readConfig('myConfig', console.log);

selectFromDb('select * from cities', (data) => {
	data.forEach( (value) => {
		console.log(value)
	});
});

getHttpPage('http://kpi.ua', console.log);

readFile('README.md', console.log);

// Pseudo-Asynchronous Functions
// having just callbacks but working synchronously

function readConfig(name, callback) {
  console.log('(1) config loaded');
  callback({ name });
}

function selectFromDb(query, callback) {
  console.log('(2) SQL query executed');
  callback([ { name: 'Kiev' } , { name: 'Roma' } ]);
}

function getHttpPage(url, callback) {
  console.log('(3) Page retrieved');
  callback('<html>Some archaic web here</html>');
}

function readFile(path, callback) {
  console.log('(4) Readme file loaded');
  callback('file content');
}

