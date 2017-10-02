var api = {};

api.delay = 500;
api.sum = 0;
api.timer = null;
api.addend = 20;
api.array = [];
api.array20 = new Array(20);

api.result = function result(n) {
	console.log(' sum: ', n);
}

api.add = function add(max, callback) {
	//console.log(max);
	//console.log(callback);

	//api.sum += api.addend;
	api.array = api.array.concat(api.array20);
	console.log('api ', api.array);

    //console.log(api.sum);
	//var len = api.sum;
	var len = api.array.length;
	//console.log('api len: ', len);

    if (len < max) {
    	setTimeout(api.add, api.delay, max, callback);
    } else {
        //api.result(api.sum);
		//callback(api.sum);
		callback(api.array);

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

app.build = function build(array) {
	console.log(' len: ', array.length);
	console.log(' Build ', array.toString() );
}

app.size = 50;

app.getData(app.size, app.build);

