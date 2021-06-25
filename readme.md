NOTION URL : https://www.notion.so/Node-js-cf8f09f3b9234553ac3ece7d4efd2dc5

## 모놀리식 아키텍처란
- 모놀리식 아키텍처는 널리 활용하는 전통적인 아키텍처로 하나의 애플리케이션 안에 모든 컴포넌트를 포함하는 구조이다. 구조가 단순해 개발과 배포가 간편하다는 장점이 있다.
- 반면에 분산 처리가 비효율적이며 코드를 관리하기 어렵고 코드 구조가 갈수록 복잡해지며 새로운 기술을 적용하기가 어렵다는 단점이 있다.

### 분산 아키텍처의 필요성
- 코드 수정에 부담이 없고 기존 코드에 영향을 주지 않으며, 필요한 기능만 분산 처리할 수 있는, 유기적으로 동작하는 아키텍처가 필요했다.

## 마이크로 서비스란
- 모놀리식 아키텍처를 단독으로 실행 가능한 다수의 모듈로 분해한 아키텍처를 마이크로서비스 아키텍처라고 한다. 이때 실행 가능한 하나의 모듈을 마이크로서비스 라고 한다.
- 각각의 마이크로서비스는 독립적인 프로세스 형태로 각기 배포할 수 있어야 하고, 개별적으로도 개발할 수 있는 상호 독립적인 구조이다.
- 그렇기 때문에 프로그래밍 언어나 프레임워크가 같을 필요는 없으며, 서로 독리벚ㄱ인 데이터 저장소와 네트워크 통신 기능을 가질 수 있다.
- 단점은 공유 자원 접근이 어렵고, 배포와 실행이 복잡해지며, 분산 시스템을 구현하기가 어렵다.
- Node js 를 이용하면 메시지-큐 처리 프로세스 메커니즘을 처리해주며 스레드 동기화와 교착 상태 등을 고려할 필요가 없기 때문에 마이크로서비스를 구현하는데 좋은 선택이 될 수 있다.

## 비동기 프로그래밍
- Node js 는 모든 함수와 모듈이 비동기 프로그래밍을 기본으로 한다.

<pre>
<code>
function func(callback){
	callback("callback!!");
}

func((param) => {
	console.log(param);
});
</code>
</pre>
 
 - 위 코드는 동일한 스레드 위에서 동기적으로 동작한다. func 함수 내부에서 비동기적으로 콜백하려면 process.nextTick 함수를 이용해야한다.
 
 <pre>
 <code>
 function func(callback){
	process.nextTick(callback, "callback!");
}

try{
	func((param)=>{
		a.a = 0;
	});
} catch(e){
	console.log("exception !!");
}
 </code>
 </pre>
 
 - 위 코드의 경우, try catch문의 실행되지 않고 프로세스 실행 에러가 발생한다. process.nextTick 함수는 비동기 처리를 위해 Node.js 내부의 스레드 풀로 다른 스레드 위에서 콜백 함수를 동작하게 된다. try catch 문은 같은 스레드 위에서만 동작하기 때문에 서로 다른 스레드 간의 예외 처리가 불가능하다. 이처럼 process.nextTick 함수를 이용하면 Node js 가 CPU 를 효율적으로 사용하는 대신 try catch 문만으로는 예외 처리가 불가능하다.

## 싱글 스레드 프로그래밍
- Node js 는 싱글 스레드 기반으로 동작한다. 하지만 싱글 스레드라고 해서 모두 같은 스레드 위에서 동작하지는 않는다.
- 비동기 호출을 할 경우, 함수를 호출한 영역과 콜백을 처리하는 영역이 각기 다른 스레드 위에서 동작한다. 이때 try catch 문으로 모든 예외를 처리하기에는 무리가 있다.
- Node js 는 모든 스레드에서 예외 처리를 할 수 있도록 uncaughtException 이벤트를 제공한다.

<pre>
<code>
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
</code>
</pre>

### HTTP 서버
- HTTP 는 전 세계에서 가장 인기 있는 네트워크 프로토콜 이다. 월드와이드웹으로 이미 많은 시스템에서 활용 중이며 HTML 뿐만 아니라 JSON, XML 등 다양한 문서 포맷을 사용하기에도 편리하다.
- 대용량 패킷 전달, 상태 관리, 보안 처리 등 각종 네트워크 이슈에 대한 대비책도 마련되어 있으며 요즘에는 RESTful 설계 방식이 널리 활용된다.
- Node.js 에서는 기본 모듈로 http 모듈을 제공하는데 이를 이용하면 매우 쉽게 HTTP 서버를 만들 수 있다.

<pre>
<code>
const http = require('http');
var server = http.createServer((req, res) =>{
  res.end("hello world");
});

server.listen(8000);
</code>
</pre>

- 복잡한 웹 어플리케이션을 개발할 때는 UI 템플릿, 쿠키 처리, 라우팅 처리 등 웹 애플리케이션을 개발하는 데 필요한 일련의 기능을 제공하는 Express 라는 유명한 확장 모듈을 이용할 수 있다.


### HTTP 클라이언트
- Node.js 에서는 http 모듈을 이용해 HTTP 서버와 HTTP 클라이언트 개발에 필요한 모든 API 를 제공한다.
- 하기와 같이 간단하게 클라이언트를 구성가능하다.

<pre>
<code>
var http = require('http');

var options = {
  host : "127.0.0.1",
  port: 8000,
  path: "/"
};

var req = http.request(options, (res) => {
  var data = "";
  res.on('data', (chunk)=>{
    data+=chunk;
  });

  res.on('end', ()=>{
    console.log(data);
  });
});
req.end();
</code>
</pre>
