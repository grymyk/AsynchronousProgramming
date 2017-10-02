var api = {};

api.delay = 500;
api.sum = 0;
api.timer = null;
api.addend = 20;

api.result = function result(n) {
	console.log(' sum: ', n);
}

api.add = function add(max, callback) {
	//console.log(max);
	//console.log(callback);

	api.sum += api.addend;

    console.log(api.sum);

    if (api.sum < max) {
    	setTimeout(api.add, api.delay, max, callback);
    } else {
        //api.result(api.sum);
		callback(api.sum);
		clearTimeout(api.timer);
    }
}

api.getSum = function getSum(max, callback) {
	api.timer = setTimeout(api.add, api.delay, max, callback);
}

var app = {};
 
app.getData = function getData(size, callback) {
	api.getSum(size, callback);
}

app.build = function build(data) {
	console.log(' Build ', data);
}

app.size = 50;

app.getData(app.size, app.build);

