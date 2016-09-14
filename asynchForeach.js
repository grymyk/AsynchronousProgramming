// source:
// https://github.com/metarhia/MetaSync/blob/master/metasync.js


let fns = [readConfig, selectFromDb, getHttpPage, readFile];

sequentalAsync(fns, (results) => {
	console.log('Done');
	console.log(results);
});

function parallelAsync(fns, done, data = {}, and) {
	let counter = 0;
	let len = fns.length;
	let finished = false;

	if (len < 1) {
		if (done) {
			done(data);
		}
	} else {
		fns.forEach( (fn) => {
			let finish = function finish(result) {
				if (fn.name && result) {
					data[fn.name] = result;
				}
				
				if (result instanceof Error && !and) {
					if (!finished) {
						if (done) {
							done(result);
						}
					}

					finished = true;
				} else {
					if (++counter >= len) {
						if (done) {
							done(data);
						}
					}
				}
			};

			if (fn.length === 2) {
				fn(data, finish);
			} else {
				fn(finish);
			}
		});
	}
}

function sequentalAsync(fns, done, data = {} ) {
	let i = -1;
	let len = fns.length;

	function next() {
		let fn = null;

		let finish = function finish(result) {
			if (fn.name && result) { 
				data[fn.name] = result;
			}

			if (result instanceof Error) {
				if (done) {
					done(result);
				}
			} else {
				next();
			}
		};

		if (++i >= len) {
			if (done) {
				done(data);
			}
		} else {
			fn = fns[i];

			if (fn.length === 2) {
				fn(data, finish);
			} else {
				fn(finish);
			}
		}
	}

	if (len > 0) {
		next();	
	} else {
		if (done) {
			done(data);
		}
	}
}

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
		//callback( new Error('Load Error') );
	});
}

