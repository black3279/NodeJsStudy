var parseString = require('xml2js').parseString;

var xml = "<fruits shop='AAA'>"+
          "<item price='140'>Banana</item>"+
          "<item price='200'>Apple</item>"+
          "</fruits>";

parseString(xml, function(err,result){
  console.log(JSON.stringify(result));
});
