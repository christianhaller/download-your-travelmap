<!doctype html>
<html class="no-js" lang="en">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <link type="text/css" rel="stylesheet" href="/css/main.min.css"/>
    <title>Download Your TripAdvisor Travel Map</title>
</head>
<body>
<div class="content">
    <h1>Download Your TripAdvisor Travel Map //</h1>

    <p class="splash-subhead">
       Just enter your TripAdvisor Profile URL <span>e. g. http://www.tripadvisor.com/members/christianhaller (that's me)</span></p>

    <form class="pure-form" action="/magic">
        <label for="url">URL</label> <input type="text" id="url" value="" name="url">
        <button type="submit" class="pure-button pure-button-primary">submit</button>
        <div class="pure-alert-error pure-alert"></div>
    </form>
    <div id="response"><div id="map"></div>
    <strong id="thisIs">This is <span>your travelmap</span></strong>
    </div>
</div>
<script src="/js/main.min.js"></script>
</body>
</html>



