var result = {};
//---------------------- 1.  IP Address  ----------------------

const urlParams = new URLSearchParams(window.location.search);
const url = urlParams.get('param');

//var url = window.location.href;
//alert(url);
var urlDomain = url.split("://")[1].split("/")[0]
//alert(urlDomain);

//url="0x58.0xCC.0xCA.0x62"

var patt = /(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]?[0-9])(\.|$){4}/;
var patt2 = /(0x([0-9][0-9]|[A-F][A-F]|[A-F][0-9]|[0-9][A-F]))(\.|$){4}/;
var ip = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;


if(ip.test(urlDomain)||patt.test(urlDomain)||patt2.test(urlDomain)){ 
    result["IP Address in URL Domain"]="1";
}else{
    result["IP Address in URL Domain"]="-1";
}

//---------------------- 2.  URL Length  ----------------------


//alert(url.length);
if(url.length<54){
    result["URL Length"]="-1";
}else if(url.length>=54&&url.length<=75){
    result["URL Length"]="0";
}else{
    result["URL Length"]="1";
}
//alert(result);


//---------------------- 3.  Tiny URL  ----------------------

var onlyDomain = urlDomain.replace('www.','');
var path = url.split("://")[1].split("/")[1];

if(onlyDomain.length<7){
    result["Tiny URL"]="1";
}else{
    result["Tiny URL"]="-1";
}
//alert(result);

//---------------------- 4.  @ Symbol  ----------------------

patt=/@/;
if(patt.test(url)){ 
    result["Heavy use of special characters"]="1";
}else{
    result["Heavy use of special characters"]="-1";
}

//---------------------- 5.  Redirecting using //  ----------------------

if(url.lastIndexOf("//")>7){
    result["URL Redirecting used"]="1";
}else{
    result["URL Redirecting used"]="-1";
}

//---------------------- 6. (-) Prefix/Suffix in domain  ----------------------

patt=/-/;
if(patt.test(urlDomain)){ 
    result["(-) Prefix/Suffix in domain"]="1";
}else{
    result["(-) Prefix/Suffix in domain"]="-1";
}

//---------------------- 7.  No. of Sub Domains  ----------------------

//patt=".";

console.log(onlyDomain) ;
//console.log(onlyDomain.match(RegExp('\\.','g'))||[]).length);

var urlDomaincount = onlyDomain.split(".").length

if(urlDomaincount <= 1){ 
	alert("-1");
    result["Suspicious No. of Sub Domains"]="-1";
}else if(urlDomaincount==4){ 
	//alert("0");
    result["Suspicious No. of Sub Domains"]="0";    
}else{
	//alert("1");
    result["Suspicious No. of Sub Domains"]="1";
}

//---------------------- 8.  HTTPS  ----------------------


patt=/https:\/\//;
if(patt.test(url)){
    result["HTTPS"]="-1";
}else{
    result["HTTPS"]="1";
}

//---------------------- 9.  Domain Registration Length  ----------------------

//---------------------- 10. Favicon  ----------------------

var favicon = undefined;
var nodeList = document.getElementsByTagName("link");
for (var i = 0; i < nodeList.length; i++)
{
    if((nodeList[i].getAttribute("rel") == "icon")||(nodeList[i].getAttribute("rel") == "shortcut icon"))
    {
        favicon = nodeList[i].getAttribute("href");
    }
}
if(!favicon) {
    result["Character Repeat"]="-1";
}else if(favicon.length==12){
    result["Character Repeat"]="-1";
}else{
    patt=RegExp(urlDomain,'g');
    if(patt.test(favicon)){
        result["Character Repeat"]="-1";
    }else{
        result["Character Repeat"]="1";
    }
}


//---------------------- 11. Using Non-Standard Port  ----------------------

result["Non-Standard Port"]="-1";

//---------------------- 12.  HTTPS in URL's domain and path part  ----------------------


patt=/https/;
if(patt.test(onlyDomain)){
    result["HTTPS in URL's domain part"]="1";
}else{
    result["HTTPS in URL's domain part"]="-1";
}

patt=/https/;
if(patt.test(path)){
    result["HTTPS in URL's path part"]="1";
}else{
    result["HTTPS in URL's path part"]="-1";
}

// alert(result);

//---------------------- 13.  Request URL  ----------------------

var imgTags = document.getElementsByTagName("img");

var phishCount=0;
var legitCount=0;

patt=RegExp(onlyDomain,'g');

for(var i = 0; i < imgTags.length; i++){
    var src = imgTags[i].getAttribute("src");
    if(!src) continue;
    if(patt.test(src)){
        legitCount++;
    }else if(src.charAt(0)=='/'&&src.charAt(1)!='/'){
        legitCount++;
    }else{
        phishCount++;
    }
}
var totalCount=phishCount+legitCount;
var outRequest=(phishCount/totalCount)*100;
//alert(outRequest);

if(outRequest<22){
    result["Request URL"]="-1";
}else if(outRequest>=22&&outRequest<61){
    result["Request URL"]="0";
}else{
    result["Request URL"]="1";
}

// //---------------------- 14.  Scripto Continua  ----------------------
// // let words = tokenizer.tokenize(urlDomain);
// // let scriptioContinua = 0;
// // let previousWord = "";
// // for (let i = 0; i < words.length; i++) {
// //     let word = words[i];
// //     if (previousWord !== "" && previousWord[previousWord.length - 1] !== "-" && word[0] !== "-") {
// //         scriptioContinua++;
// //     }
// //     previousWord = word;
// // }

// let scriptioContinua = 0;
// for (let i = 0; i < urlDomain.length - 1; i++) {
//     if (urlDomain.charCodeAt(i) === urlDomain.charCodeAt(i + 1) - 1) {
//         scriptioContinua++;
//     }
// }
// if (scriptioContinua > 10) {
//     result["Suspicious continuous words in domain"] = "1";
// } else {
//     result["Suspicious continuous words in domain"] = "-1";
// }

//---------------------- 14.  Use cloud file share  ----------------------

const known_fileshare = ['box', 'citrix', 'dropbox', 'google', 'icloud', 'mediafire', 'microsoft', 'onedrive', 'opentexthightail', 'wire', 'efilecabinet', 'onehub', 'efilecabinet', 'masv', 'wetransfer', 'filecloud', 'pcloud', 'amazon', 'mega', 'degoo', 'sync', 'jumpshare'];
if (known_fileshare.includes(urlDomain.toLowerCase())) {
    result["Use cloud file share"] = "1";
} else {
    result["Use cloud file share"] = "-1";
}

//alert(allhrefs);

//---------------------- 15. Links in script and link  ----------------------

var mTags = document.getElementsByTagName("meta");
var sTags = document.getElementsByTagName("script");
var lTags = document.getElementsByTagName("link");

phishCount=0;
legitCount=0;

allhrefs="sTags  ";

for(var i = 0; i < sTags.length; i++){
    var sTag = sTags[i].getAttribute("src");
    if(sTag!=null){
        allhrefs+=sTag+"      ";
        if(patt.test(sTag)){
            legitCount++;
        }else if(sTag.charAt(0)=='/'&&sTag.charAt(1)!='/'){
            legitCount++;
        }else{
            phishCount++;
        }
    }
}

allhrefs+="      lTags   ";
for(var i = 0; i < lTags.length; i++){
    var lTag = lTags[i].getAttribute("href");
    if(!lTag) continue;
    allhrefs+=lTag+"       ";
    if(patt.test(lTag)){
        legitCount++;
    }else if(lTag.charAt(0)=='/'&&lTag.charAt(1)!='/'){
        legitCount++;
    }else{
        phishCount++;
    }
}

totalCount=phishCount+legitCount;
outRequest=(phishCount/totalCount)*100;

if(outRequest<17){
    result["Script & Link"]="-1";
}else if(outRequest>=17&&outRequest<=81){
    result["Script & Link"]="0";
}else{
    result["Script & Link"]="1";
}

//alert(allhrefs);

//---------------------- 16.Server Form Handler ----------------------

var forms = document.getElementsByTagName("form");
var res = "-1";

for(var i = 0; i < forms.length; i++) {
    var action = forms[i].getAttribute("action");
    if(!action || action == "") {
        res = "1";
        break;
    } else if(!(action.charAt(0)=="/" || patt.test(action))) {
        res = "0";
    }
}
result["SFH"] = res;

//---------------------- 16.Email in URL ----------------------
const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
const emailMatches = url.match(emailRegex);
if (emailMatches != null && emailMatches.length > 0) {
    result["Email in URL"] = "1";
} else { 
    result["Email in URL"] = "-1";
}

// //---------------------- 17.Submitting to mail ----------------------

// var forms = document.getElementsByTagName("form");
// var res = "-1";

// for(var i = 0; i < forms.length; i++) {
//     var action = forms[i].getAttribute("action");
//     if(!action) continue;
//     if(action.startsWith("mailto")) {
//         res = "1";
//         break;
//     }
// }
// result["Email in URL"] = res;

//---------------------- 17. Use free hosting ----------------------
const knownFree = ['firebaseapp', 'bluehost', 'hostinger', 'wix', 'wordpress', 'weebly', 'google', 'bravenet', '000webhost', 'infinityfree.net', 'awardspace.com', 'host4geeks', 'freehosting.com', '50webs.com', 'freehostia.com', '5gbfree.com', 'byet.host', 'freehostingeu', 'x10hosting', 'godaddy', 'squarespace'];
if (knownFree.includes(urlDomain.toLowerCase())) {
  result["Use free hosting"] = "1";
} else {
  result["Use free hosting"] = "-1";
}

// //---------------------- 23.Using iFrame ----------------------

// var iframes = document.getElementsByTagName("iframe");

// if(iframes.length == 0) {
//     result["Random words in Domain"] = "-1";
// } else {
//     result["Random words in Domain"] = "1";
// }
