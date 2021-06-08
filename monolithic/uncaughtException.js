function func(callback){
	process.nextTick(callback, "callback!!");
}

try{
	func((param) => {
		a.a=0;
	});
} catch(e){
	console.log("exception!! : "+ e.getMessage);
}

process.on("uncaughtException", (error) => {
	console.log("uncaughtException!! " + error);
});