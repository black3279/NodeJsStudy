var url = "httl://jpub.tistory.com";

var savepath = "test.html";

var aUrl = new java.net.URL(url);
var conn = aUrl.openConnection(); // URL 접속
var ins = conn.getInputStream(); // 입력스트림 획득
var file = new java.io.File(savepath); // 출력스트림 획득
var out = new java.io.FileoutputStream(file);

var b;

while((b = ins.read()) != -1){
  out.write(b);
}
 out.close();
 ins.close();
