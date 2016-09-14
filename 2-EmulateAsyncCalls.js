// See new order

readConfig('myConfig', console.log);

selectFromDb('select * from cities', (data) => {
	data.forEach( (value) => {
		console.log(value);
	});
});

getHttpPage('http://kpi.ua', console.log);

readFile('README.md', console.log);

// Emulate Asynchronous calls

function wrapAsync(callback) {
	setTimeout(
		callback, Math.floor( (Math.random() * 1000) )
	);
}

// Asynchronous functions

function readConfig(name, callback) {
	wrapAsync(() => {
		console.log('(1) config loaded');
		callback({ name });
	});
}

function selectFromDb(query, callback) {
	wrapAsync(() => {
		console.log('(2) SQL query executed');
		callback([ { name: 'Kiev' } , { name: 'Roma' } ]);
	});
}

function getHttpPage(url, callback) {
	wrapAsync(() => {
		console.log('(3) Page retrieved');
		callback('<html>Some archaic web here</html>');
	});
}

function readFile(path, callback) {
	wrapAsync(() => {
		console.log('(4) Readme file loaded');
		callback('file content');
	});
}

