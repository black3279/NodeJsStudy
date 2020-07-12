var url = "http://jpub.tistory.com/";

var savepath ="test.html";

var http = require('http'); // HTTP 모듈
var fs = require('fs'); // 파일 처리 관련 모듈

var outfile = fs.createWriteStream(savepath);

http.get(url, function(res){
  res.pipe(outfile);
  res.on('end', function(){
    outfile.close();
    console.log("ok");
  });
});
