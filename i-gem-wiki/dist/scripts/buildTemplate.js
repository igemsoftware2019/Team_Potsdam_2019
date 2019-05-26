let fs = require('fs');
let path = require('path');

function getFile(relPath){
	return fs.readFileSync(path.join(__dirname, relPath));	
}

let templatePotsdam = getFile('../templatePotsdam/templatePotsdam.html').toString();
let indexHtml = getFile('../../build/index.html').toString();
let jsBundle = getFile('../build/bundle.min.js').toString();

//ADD? function runScript2(){
// eval(jsBundle);
// JSON.stringify(runScript2.toString())

let otherScript = indexHtml.substring(indexHtml.indexOf("<script>")+ "<script>".length,indexHtml.indexOf("</script>"));

let buildString = templatePotsdam.replace(new RegExp(/"!insertScript1!"/, 'g'), JSON.stringify(otherScript));
buildString = buildString.substring(0, buildString.indexOf("\"!insertScript2!\""))+ JSON.stringify(jsBundle)
			  + buildString.substring(buildString.indexOf("\"!insertScript2!\"")+"\"!insertScript2!\"".length);


fs.writeFile("../build/igemBuild.html", buildString, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("igemBuild.html saved!");
}); 