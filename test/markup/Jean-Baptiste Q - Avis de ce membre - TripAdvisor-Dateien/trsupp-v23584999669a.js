(function () { /* ensure that console.log is a valid function */
    if (typeof console == "undefined") console = {};
    var funcs = ["log", "error", "warn"];
    for (var i = 0; i < funcs.length; i++) {
        if (console[funcs[i]] == undefined) {
            console[funcs[i]] = function () {};
        }
    }
})();

function StringBuffer(begText) {
    this.strings = new Array;
    if (begText) {
      this.append(begText);
    }
}

StringBuffer.prototype.append = function(str) {
    this.strings.push(str);
    return this;
}

StringBuffer.prototype.toString = function() {
    return this.strings.join('');
}

StringBuffer.prototype.isEmpty = function() {
    return this.strings.length == 0;
}
function UrlParams() {
    this.params = new StringBuffer();
}

UrlParams.prototype.add = function(name, value) {
    if(!this.params.isEmpty()) {
        this.params.append('&');
    }
    this.params.append(encodeURIComponent(name));
    this.params.append('=');
    this.params.append(encodeURIComponent(value));
}

UrlParams.prototype.toString = function() {
    return this.params.toString();
}
// file: HttpRpc.js

var ERROR_PREFIX = "ERROR:";

// class: HttpRpc

// constructor: HttpRpc
//
// Parameters:
//   url - url for request
//   errorFunc - function to handle error response
//   responseFunc - function to handle successful response
//   finalizerFunc - function to run after response regardless
//   method - request method (GET or POST)
//   bSync - if true, forces synchronous mode
//
function HttpRpc(url, errorFunc, responseFunc, finalizerFunc, method, bSync) {
    if(url.slice(0, 4) == 'http') {
    this.url = url;
    } else {
        if(url.charAt(0) != '/') {
            url = '/' + url;
        }
        this.url = window.location.protocol + '//' + window.location.host + url;
    }
    if(method) {
        this.method = method;
    } else {
        this.method = 'POST';
    }
    if(responseFunc) {
        this.responseFunc = responseFunc;
    } else {
        this.responseFunc = function(req) {};
    }
    if(errorFunc) {
        this.errorFunc = errorFunc;
    } else {
        this.errorFunc = function(req) {};
    }
    if(finalizerFunc) {
        this.finalizerFunc = finalizerFunc;
    } else {
        this.finalizerFunc = function(req) {};
    }
    this.bSync = bSync;
}

// func: getTransport
//   Gets the transport object for the request.
//
// Returns:
//   The transport object
//
HttpRpc.prototype.getTransport = function() {
    var xRequest = null;
    if(window.XMLHttpRequest) {
        xRequest = new XMLHttpRequest();
    } else if ( window.ActiveXObject ) {
        try {           
            xRequest = new ActiveXObject('Msxml2.XMLHTTP');
        } catch(err) {
            xRequest = new ActiveXObject('Microsoft.XMLHTTP');
        }
    }
    return xRequest;
}

// func: sendRequest
//   Sends the request.
// 
// Parameters:
//   paramStr - parameters for the request
//
HttpRpc.prototype.sendRequest = function(paramsStr) {
    if(!paramsStr) {
        paramsStr = '';
    }
    this.req = this.getTransport();
//    var req = this.getTransport();
    this.req.open(this.method, this.url, !this.bSync);
    this.req.setRequestHeader(
        "Content-Type","application/x-www-form-urlencoded; charset=utf-8");
    var oThis = this;
    this.req.onreadystatechange = function() { oThis.handleAjaxResponse() };
    this.req.send(paramsStr);
}

// func: handleAjaxResponse
//   Handles the response.
//
// Parameters:
//   req - the request
//
HttpRpc.prototype.handleAjaxResponse = function() {
    try {
        if(this.req.readyState == 4) {
            if(this.isSuccess(this.req)) {
                this.responseFunc(this.req);
            } else {
                this.errorFunc(this.req);
            }
        }
    }
    finally {
        if (this.req.readyState == 4) {
            this.finalizerFunc(this.req);
        }
    }
    if (this.req.readyState == 4) {
        // clears up memory leak in IE 6
        delete this.req;
        return;
    }
}

// func: isSuccess
//   Determines if the response was successful
//
// Parameters:
//   req - the request
//
// Returns:
//   true if the request was successful, false otherwise
//
HttpRpc.prototype.isSuccess = function(req) {
	try {
    	if (req == null || req.status == undefined) // safari bug, sometimes status is undefined
    	{
       		return true;
    	}
    	return ( (req.status >= 200 && req.status < 300)) && 
        	( (req.responseText == null) || req.responseText.slice(0, ERROR_PREFIX.length) != ERROR_PREFIX);
	} 
	catch (exception) {
		return false;
	}
}


var sUserAgent = navigator.userAgent;
var fAppVersion = parseFloat(navigator.appVersion);

function compareVersions(sVersion1, sVersion2) {

    var aVersion1 = sVersion1.split(".");
    var aVersion2 = sVersion2.split(".");
    
    if (aVersion1.length > aVersion2.length) {
        for (var i=0; i < aVersion1.length - aVersion2.length; i++) {
            aVersion2.push("0");
        }
    } else if (aVersion1.length < aVersion2.length) {
        for (var i=0; i < aVersion2.length - aVersion1.length; i++) {
            aVersion1.push("0");
        }    
    }
    
    for (var i=0; i < aVersion1.length; i++) {
 
        if (aVersion1[i] < aVersion2[i]) {
            return -1;
        } else if (aVersion1[i] > aVersion2[i]) {
            return 1;
        }    
    }
    
    return 0;

}

var isSafari = false;
if (navigator && navigator.vendor) {
  isSafari = navigator.vendor.indexOf("Apple") != -1;
}


var isOpera = sUserAgent.indexOf("Opera") > -1;
var isMinOpera4 = isMinOpera5 = isMinOpera6 = isMinOpera7 = isMinOpera7_5 = isMinOpera8 = false;

if (isOpera) {
    var fOperaVersion;
    if(navigator.appName == "Opera") {
        fOperaVersion = fAppVersion;
    } else {
        var reOperaVersion = new RegExp("Opera (\\d+\\.\\d+)");
        reOperaVersion.test(sUserAgent);
        fOperaVersion = parseFloat(RegExp["$1"]);
    }

    isMinOpera4 = fOperaVersion >= 4;
    isMinOpera5 = fOperaVersion >= 5;
    isMinOpera6 = fOperaVersion >= 6;
    isMinOpera7 = fOperaVersion >= 7;
    isMinOpera7_5 = fOperaVersion >= 7.5;
    isMinOpera8 = fOperaVersion >= 8;
}

var isKHTML = sUserAgent.indexOf("KHTML") > -1 
              || sUserAgent.indexOf("Konqueror") > -1 
              || sUserAgent.indexOf("AppleWebKit") > -1; 
              
var isMinSafari1 = isMinSafari1_2 = false;
var isMinKonq2_2 = isMinKonq3 = isMinKonq3_1 = isMinKonq3_2 = false;

if (isKHTML) {
    isSafari = sUserAgent.indexOf("AppleWebKit") > -1;
    isKonq = sUserAgent.indexOf("Konqueror") > -1;

    if (isSafari) {
        var reAppleWebKit = new RegExp("AppleWebKit\\/(\\d+(?:\\.\\d*)?)");
        reAppleWebKit.test(sUserAgent);
        var fAppleWebKitVersion = parseFloat(RegExp["$1"]);

        isMinSafari1 = fAppleWebKitVersion >= 85;
        isMinSafari1_2 = fAppleWebKitVersion >= 124;
    } else if (isKonq) {

        var reKonq = new RegExp("Konqueror\\/(\\d+(?:\\.\\d+(?:\\.\\d)?)?)");
        reKonq.test(sUserAgent);
        isMinKonq2_2 = compareVersions(RegExp["$1"], "2.2") >= 0;
        isMinKonq3 = compareVersions(RegExp["$1"], "3.0") >= 0;
        isMinKonq3_1 = compareVersions(RegExp["$1"], "3.1") >= 0;
        isMinKonq3_2 = compareVersions(RegExp["$1"], "3.2") >= 0;
    } 
    
}

var isIE = sUserAgent.indexOf("compatible") > -1 
           && sUserAgent.indexOf("MSIE") > -1
           && !isOpera;
           
var isMinIE4 = isMinIE5 = isMinIE5_5 = isMinIE6 = false;

if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(sUserAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);

    isMinIE4 = fIEVersion >= 4;
    isMinIE5 = fIEVersion >= 5;
    isMinIE5_5 = fIEVersion >= 5.5;
    isMinIE6 = fIEVersion >= 6.0;
}

var isMoz = sUserAgent.indexOf("Gecko") > -1
            && !isKHTML;

var isMinMoz1 = false;

if (isMoz) {
    var reMoz = new RegExp("rv:(\\d+\\.\\d+(?:\\.\\d+)?)");
    reMoz.test(sUserAgent);
    isMinMoz1 = compareVersions(RegExp["$1"], "1.0") >= 0;
}

var isFF = sUserAgent.indexOf("Firefox") > -1;

if (isFF) {
    var reFF = new RegExp("Firefox\/(\\d+\\.\\d+(?:\\.\\d+)?)");
    reFF.test(sUserAgent);
    isMinFF1_5 = compareVersions(RegExp["$1"], "1.5") >= 0;
}

var isNS4 = !isIE && !isOpera && !isMoz && !isKHTML 
            && (sUserAgent.indexOf("Mozilla") == 0) 
            && (navigator.appName == "Netscape") 
            && (fAppVersion >= 4.0 && fAppVersion < 5.0);

var isMinNS4 = isMinNS4_5 = isMinNS4_7 = isMinNS4_8 = false;

if (isNS4) {
    isMinNS4 = true;
    isMinNS4_5 = fAppVersion >= 4.5;
    isMinNS4_7 = fAppVersion >= 4.7;
    isMinNS4_8 = fAppVersion >= 4.8;
}

var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") 
            || (navigator.platform == "Macintosh");

var isUnix = (navigator.platform == "X11") && !isWin && !isMac;

var isWin95 = isWin98 = isWinNT4 = isWin2K = isWinME = isWinXP = false;
var isMac68K = isMacPPC = false;
var isSunOS = isMinSunOS4 = isMinSunOS5 = isMinSunOS5_5 = false;

if (isWin) {
    isWin95 = sUserAgent.indexOf("Win95") > -1 
              || sUserAgent.indexOf("Windows 95") > -1;
    isWin98 = sUserAgent.indexOf("Win98") > -1 
              || sUserAgent.indexOf("Windows 98") > -1;
    isWinME = sUserAgent.indexOf("Win 9x 4.90") > -1 
              || sUserAgent.indexOf("Windows ME") > -1;
    isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 
              || sUserAgent.indexOf("Windows 2000") > -1;
    isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 
              || sUserAgent.indexOf("Windows XP") > -1;
    isWinNT4 = sUserAgent.indexOf("WinNT") > -1 
              || sUserAgent.indexOf("Windows NT") > -1 
              || sUserAgent.indexOf("WinNT4.0") > -1 
              || sUserAgent.indexOf("Windows NT 4.0") > -1 
              && (!isWinME && !isWin2K && !isWinXP);
} 

if (isMac) {
    isMac68K = sUserAgent.indexOf("Mac_68000") > -1 
               || sUserAgent.indexOf("68K") > -1;
    isMacPPC = sUserAgent.indexOf("Mac_PowerPC") > -1 
               || sUserAgent.indexOf("PPC") > -1;  
}

if (isUnix) {
    isSunOS = sUserAgent.indexOf("SunOS") > -1;

    if (isSunOS) {
        var reSunOS = new RegExp("SunOS (\\d+\\.\\d+(?:\\.\\d+)?)");
        reSunOS.test(sUserAgent);
        isMinSunOS4 = compareVersions(RegExp["$1"], "4.0") >= 0;
        isMinSunOS5 = compareVersions(RegExp["$1"], "5.0") >= 0;
        isMinSunOS5_5 = compareVersions(RegExp["$1"], "5.5") >= 0;
    }
}
// Returns true if standard flow is needed, ie, the browser check FAILS
// Returns false if standard flow is not needed, ie, the broser check PASSES
// That way, the caller can set the onClick to "return login()" or "return migrate()"

function getIFrameHeight(doc) {
    var height = 0;
    if (doc.height) {
        height = doc.height - 20;
    }
    else {
        if (doc.body.scrollHeight) height = Math.max(height, doc.body.scrollHeight);
        if (doc.body.offsetHeight) height = Math.max(height, doc.body.offsetHeight);
    }
    return height;
}

function getIFrameWidth(doc)
{
  var width = 0;
  if (doc.width) {
    width = doc.width;
  } else {
    if (doc.body.scrollWidth) width = Math.max(width, doc.body.scrollWidth);
    if (doc.body.offsetWidth) width = Math.max(width, doc.body.offsetWidth);
  }
  return width;
}

function setIFrameHeight(doc)
{
  var node = document.getElementById('loginframe');
  node.style.height = "auto";
  var height = getIFrameHeight(doc);
  node.style.height = height + "px";
  return height;
}

function setIFrameWidth(doc)
{
  var node = document.getElementById('loginframe');
  node.style.width = "auto";
  var width = getIFrameWidth(doc);
  node.style.width = width + "px";
  return width;
}

function getIFrameDoc()
{
  var node = document.getElementById("loginframe");

  // get the iframe document
  var doc;
  if (node) {
    if (node.contentDocument) {
      // NS6
      doc = node.contentDocument;
    } else if (node.contentWindow) {
      // IE5.5+
      doc = node.contentWindow.document;
    } else if (node.document) {
      // IE5
      doc = node.document;
    }
  }

  return doc;
}

function centerIFrame(minW,minH,maxW,maxH)
{
  var node = document.getElementById("loginframe");
  var doc = getIFrameDoc();

  if (node && doc) {

    // calculate frame content height
    setIFrameHeight(doc);
    setIFrameWidth(doc);

    // resize if necessary
    var w = node.style.width.replace(/px/,'');
    var h = node.style.height.replace(/px/,'');
    if (minW && w < minW) {w = minW; node.style.width  = w + 'px';}
    if (minH && h < minH) {h = minH; node.style.height = h + 'px';}
    if (maxW && w > maxW) {w = maxW; node.style.width  = w + 'px';}
    if (maxH && h > maxH) {h = maxH; node.style.height = h + 'px';}

    // center the frame
    recenterIFrame();

  }

}

function recenterIFrame()
{
  var node = document.getElementById("loginframe");
  var doc = getIFrameDoc();
  var scrOff = getScrollOffset();
  var w = node.style.width.replace(/px/,'');
  var h = node.style.height.replace(/px/,'');

  // calculate and position the frame in the center of the display area
  var width = window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : document.body.offsetWidth);
  var height = window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : document.body.offsetHeight);
  var left = Math.max(5, Math.round(width / 2 - w / 2 + scrOff[0]));
  var top = Math.max(5, Math.round(height / 2 - h / 2 + scrOff[1]));
  node.style.left = left + 'px';
  node.style.top = top + 'px';
}

function adjustIFrame(top, left, width, height)
{
  var node = document.getElementById("loginframe");
  node.style.top = top + 'px';
  node.style.left = left + 'px';
  node.style.width = width + 'px';
  node.style.height = height + 'px';
}

function centerAndDisplayIFrame(width,height,maxW,maxH)
{
  centerIFrame(width,height,maxW,maxH);
  var node = document.getElementById("loginframe");
  node.style.display = 'inline';
}

function loadIFrame(url, paramList)
{
  if((isMinIE5_5 && isWin) || isMinMoz1 || isMinSafari1_2 || isMinOpera8 || isMinKonq3_2) {
    if(!url || url == '') {url = '/MemberSignIn';}
    var params = new UrlParams();
    params.add('skin', 'iframe');
    if(paramList) {
      for (var i=0; i<paramList.length-1; i+=2) {
        params.add(paramList[i], paramList[i+1]);
      }
    }
    if(url.match(/\?/)) url += '&'; else url += '?';
    url = url + params.toString();

    var div  = document.getElementById('iframediv');
    var node = document.getElementById('loginframe');
    if(node) {
      node.src = url;
      node.style.display='inline';
    } else {
        div.innerHTML += '<iframe id="loginframe" name="loginframe" src="' + url + '" frameborder="0" scrolling="no" width="590" height="600" style="position: absolute; z-index: 130;"></iframe>';
    }
    window.onresize = recenterIFrame;
    if(div) div.style.display='block';
    //window.onscroll = moveIFrame;
    return false;
  }
  return true;
}

/**
 * For backwards compatiblity, instead of opening an iframe in an overlay, redirect the 
 * user to /MemberSignIn and rely on the server-side redirect there (to /RegistrationPage) to handle the rest.
 */
function getLoginUrl(paramList)
{
  var url = getUrlPrefix() + '/MemberSignIn';
  var params = new UrlParams();
  if(paramList) {
    for (var i=0; i<paramList.length-1; i+=2) {
      params.add(paramList[i], paramList[i+1]);
    }
  }
  if(url.match(/\?/)) url += '&'; else url += '?';
  url = url + params.toString();
  return url;
}

// This is needed to prevent javascript security problems when subdomain pages open the
// iframe (e.g. click edit on a nexus page), a relative path is no good as it honors the <base href=""/>
function getUrlPrefix()
{
	var loc = document.location;
	var prefix = loc.protocol + "//" + loc.host;
	if (loc.port) prefix += ":" + loc.port;
	return prefix;
}

/**
 * Now redirects for unsecure pages rather than opening an iframe. See getLoginUrl() above.
 * @deprecated
 */
function login(paramList) {
  var urlPrefix = getUrlPrefix();
  if(urlPrefix.indexOf('https') == 0){
    return loadIFrame(urlPrefix + '/RegistrationPage', paramList);
  }
  else{
    window.location = getLoginUrl(paramList);
  }
}

function migrate(paramList) {
  return loadIFrame(getUrlPrefix() + '/MemberScreenName', paramList);
}

function hideIFrame()
{
  var node = parent.document.getElementById('loginframe');
  if(node) {
    node.style.display = 'none';
    node.src='';
  }
  node = document.getElementById('iframediv');
  if(node) node.style.display='none';
  if(parent.loginCancel) parent.loginCancel();
}
