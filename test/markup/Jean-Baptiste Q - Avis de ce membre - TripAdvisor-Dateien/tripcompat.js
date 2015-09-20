var popopsNone = "location=0,menubar=0,resizable=0,scrollbars=0,status=0,toolbar=0";
var popopsResize = "location=0,menubar=0,resizable=1,scrollbars=0,status=0,toolbar=0";
var popopsResizeScroll = "location=0,menubar=0,resizable=1,scrollbars=1,status=0,toolbar=0";

// func: setVendorStatus
function setVendorStatus(sVendor)
{
    if(sVendor == null || sVendor == "")
    {
        return ss("Click for details");
    }
    else
    {
        return ss(sVendor);
    }
}

// func: ss
function ss(w)
{
    window.status=w; return true;
}

// func: cs
function cs()
{
    window.status='';
}

// func: ga
function ga(o,e)
{
    if (document.getElementById)
    {
        a=o.id.substring(1);
        p = "";
        r = "";
        g = e.target;
        if (g)
        {
            t = g.id;
            f = g.parentNode;
            if (f)
            {
                p = f.id;
                h = f.parentNode;
                if (h) r = h.id;
            }
        }
        else
        {
            h = e.srcElement;
            f = h.parentNode;
            if (f) p = f.id;
            t = h.id;
        }
        if (t==a || p==a || r==a)
        return true;
        window.open(document.getElementById(a).href)
    }
}

function setPID(n) {
  var value = encodeURIComponent(n) + '; domain=' + cookieDomain;
  var date = new Date();
  date.setTime(date.getTime() + 5000);
  value += '; expires=' + date.toGMTString();
  document.cookie = 'NPID=' + value;
}

//func: destinationGuidePopup
function destinationGuidePopup(url)
{
    var winl = (screen.width - 600) / 2;
    var wint = (screen.height - 620 - 50) / 2;
    window.open(url, "destination_guide_popup", "toolbar=1,resizable=1,scrollbars=1,menubar=1,width=545,height=680,left=" + winl + ",wint" + wint);
}

function fillRates(currency)
{
   try
   {
      currency = (currency == null) ? "USD" : currency;
      var currencySelect = document.getElementById("l1currency");
      if (currencySelect)
      {
        currencySelect.value = currency;
      }
      var rateSelect = document.getElementById("l1price").options;
      rateSelect.length = 0;
      var levels = currencyLevel[currency];
      for (var i = 0 ; i < levels.length ; i += 2)
      {
         rateSelect[i/2] = new Option(levels[i], "0," + levels[i+1]);
        
         // if the current max rate is in the minmax value string, select it
         if ( levels[i+1].indexOf(maxRate) > 0)
         {
            rateSelect.selectedIndex = i/2;
         }
      }
   }
   catch(e)
   {
   // form not generated for this page
   }
}

// func: fillRatesAndClear
function fillRatesAndClear(currency)
{
    maxRate = '9999999';
    fillRates(currency);
}


function getCookie(name)
{
    var sCookies = document.cookie;
    var sPrefix = name + '=';
    if(sCookies == null)
    {
        return null;
    }
    var nBegin = sCookies.indexOf('; ' + sPrefix);
    if(nBegin == -1)
    {
        nBegin = sCookies.indexOf(sPrefix);
        if(nBegin == -1)
        {
            return null;
        }
    }
    else
    {
        nBegin += 2;
    }
    var nEnd = sCookies.indexOf(';', nBegin);
    if(nEnd == -1)
    {
        nEnd = sCookies.length;
    }
    return unescape(sCookies.substring(nBegin + sPrefix.length, nEnd));
}
//func: showVideoPopup
function showVideoPopup(url)
{
  var w = window.open( url, "VideoGallery", popopsResize + ",width=780,height=640" );
  if (w != null) w.focus();
  return false;
}
function showProfileGalleryPopup(url)
{
  var w = window.open( url, "VideoGallery", popopsNone + ",width=780,height=380" );
  if (w != null)    w.focus();
  return false;
}

// func: promoPopup
// Initially for FIG iPod Promotion official rules popup - hope to reuse
function promoPopup(url)
{
    window.open ( url, "promo_popup", "toolbar=0,resizable=1,menubar=0,location=0,status=0,scrollbars=3,width=600,height=700,screenX=30,screenY=25,left=30,top=25");
}

// func: showPricingTerms
function showPricingTerms()
{
    window.open( "/pages/pricing_terms.html", "PricingTermsAndConditions", popopsResizeScroll+",width=300,height=300,screenX=30,screenY=25,left=30,top=25");
}

function display(val,list) {
  for (var i = 0; i < list.length; i++) {
    var ele = $(list[i]);
    if (ele && ele.style) ele.style.display = val;
  }
}

function show() {display('block',arguments);}
function hide() {display('none',arguments);}
function inline() {display('inline',arguments);}

var menuNode = null;
var menuNodeP = null;
var menuDelay;
var menuOrigMouseMove = null;

function showMenu(id)
{
  menuNode = $(id);
  menuNodeP = $(id+'p');
  show(menuNode, menuNodeP);
  menuOrigMouseMove = document.body.onmousemove;
  if (!menuOrigMouseMove) {
    menuOrigMouseMove = null;
  }

  document.body.onmousemove = menuMouseMove;
}

function showPopupMenu(id)
{
  closeMenu();
  menuNode = $(id);
  menuNodeP = $(id+'p');
  show(menuNode, menuNodeP);
  menuOrigMouseClick = document.body.onclick;
  if (!menuOrigMouseClick) {
    menuOrigMouseClick = null;
  }

  document.body.onclick = menuMouseMove;
}

function menuMouseMove(e)
{
    if (!e && window.event) {
        var e = window.event;
    }

    hideMenu(e);
}

function rollOverMenu(id) {
  if ($(id) != menuNode) {
    hide(menuNode, menuNodeP);
    menuNode = menuNodeP = null;
  }
}

function closeMenu(id) {
  hide(menuNode, menuNodeP);
  menuNode = menuNodeP = null;
}

function hideMenu(e)
{
  if (menuNode == null) {
    return;
  }

  var pos = findPos(menuNode);
  var off = getScrollOffset();
  l = pos[0] - off[0];
  t = pos[1] - off[1];
  var r = l + menuNode.clientWidth;
  var b = t + menuNode.clientHeight;
  pos = getEventPosition(e);
  x = pos[0];
  y = pos[1];

  if (x <= l || x >= r || y <= t || y >= b) {
    hide(menuNode, menuNodeP);
    menuNode = menuNodeP = null;
    if(typeof(menuOrigMouseMove)!="undefined") {
      document.body.onmousemove = menuOrigMouseMove;
    }
    if(typeof(menuOrigMouseClick)!="undefined") {
      document.body.onclick = menuOrigMouseClick;
    }
  }
}

function cancelMenuDelay()
{
  clearTimeout(menuDelay);
}
function showNavMenu(arg)
{
  if (menuNode != $(arg)) {
    hide(menuNode, menuNodeP);
    menuDelay  = setTimeout(function(){showMenu(arg);},250);
  }
}

function OnSelectDestination ( newURL )
{
    if ( newURL != "" )
    if ( newURL != "none")
    location.href = newURL;
}

function openInParentOrNew(url) {
  if (window.opener) { window.opener.location=url;}
  else {window.open(url);}
  window.close();
}

function openInParent(url) {
  if (window.opener) { window.opener.location=url; window.close(); return true; }
  return false;
}

function openNewInParent(url)
{
  if (window.opener && !window.opener.closed)
  {
    window.opener.open(url);
    return true;
  }
  else
  {
	window.open(url);
	return true;
  }
  return false;
}

function popularityIndex()
{
    window.open ('/pages/hotel_popularity_popup.html', "hotel_popularity_popup", "toolbar=0,resizable=1,menubar=0,location=0,status=0,scrollbars=3,width=500,height=500,screenX=30,screenY=25,left=30,top=25");
}

// var: nCurrentWindowOffset
//   Offset for the previous popup window.
var nCurrentWindowOffset = 0;

function makeOptions()
{
    var nW = 475;
    var nH = 390;
    var nXI = 24;
    var nYI = 24;
    var nX = 210;
    var nY = 5;
    if(screen.width > 1024)
    {
        nW = 800;
        nH = 600;
        nX = 240;
    }
    else if(screen.width > 800)
    {
        nW = 620;
        nH = 500;
        nX = 240;
    }
    nCurrentWindowOffset ++;
    return 'toolbar=1,scrollbars=1,location=1,status=1,menubar=1,resizable=1,left=' + (nX + (nCurrentWindowOffset * nXI)) + ',top='+ (nY + (nCurrentWindowOffset * nYI)) + ',width=' + nW + ',height=' + nH;
}

// func: isIn
//   test if the mouse is inside the bounds of the given element
function isIn(eventPos, ele, bounds)
{
  var off = getScrollOffset();

  ele = $(ele);
  var pos = ele.getPosition();
  // calculate element bounts
  var l = pos.x - off[0];
  var t = pos.y - off[1];
  var r = l + ele.clientWidth;
  var b = t + ele.clientHeight;

  if (bounds) {
    if (typeof(bounds) == "number") {
      l = l - bounds;
      t = t - bounds;
      r = r + bounds;
      b = b + bounds;
    }
    else if (bounds instanceof Array && (bounds.length == 2 || bounds.length == 4)) {
      t = t - bounds[0];
      r = r + bounds[1];
      l = l - (bounds.length == 4 ? bounds[3] : bounds[1]);
      b = b + (bounds.length == 4 ? bounds[2] : bounds[0]);
    }
  }

  //alert("x="+eventPos[0]+", y="+eventPos[1]+", "+elem+" l="+l+", r="+r+", t="+t+", b="+b);
  return (eventPos[0] >= l && eventPos[0] <= r && eventPos[1] >= t && eventPos[1] <= b);
}

// func: hideIfNotIn
//   hide target element if the mouse in not within the bounds of target
//   or any other element given
function hideIfNotIn(e, tgt)
{
  e = new Event(e);
  var pos = [e.client.x, e.client.y];
  var inside = false;
  for (var i = 1; !inside && i < arguments.length; i++) {
    if (i + 1 < arguments.length && (typeof(arguments[i+1]) == "number" || arguments[i+1] instanceof Array)) {
      inside = isIn(pos, arguments[i], arguments[i+1]);
      i++;
    }
    else {
      inside = isIn(pos, arguments[i]);
    }
  }
  if (!inside) {hide(tgt);}
}

// func: sendPasswordEmail
function sendPasswordEmail(fName, eName)
{
  var form = document.getElementById(fName);
  var elt = document.getElementById(eName);
  if ((form != null) && (elt != null))
  {
    elt.value = 'true';
    form.submit();
  }
  return false;
}

// func: removePID
//   Remove the PID from a URL Reference - Used in GatedOffer forms to not get the PID
//   to be sent twice
function removePID(sRef)
{
  var iStart;
  var iEnd;
  var sNewRef = sRef;
  try
  {
	  if (sRef.indexOf('pid=') > 0)
	  {
	    iStart = sRef.indexOf('pid=');
	    sNewRef = sRef.substring(0, iStart);
	    iEnd = sRef.indexOf('&', iStart);
	    if (iEnd > 0)
	      sNewRef += sRef.substring(iEnd);
	  }
	  else if (sRef.indexOf('-p') > 0)
	  {
	    iStart = sRef.indexOf('-p')
	    sNewRef = sRef.substring(0, iStart);
	    iEnd = sRef.indexOf('-', iStart + 1);
	    if (iEnd < 0)
	      iEnd = sRef.indexOf('?', iStart + 1);
	    if (iEnd > 0)
	    {
	      sNewRef += sRef.substring(iEnd);
	    }
	  }
	}
	catch(e)
	{
	  sNewRef = sRef;
	}
	return sNewRef;
}

