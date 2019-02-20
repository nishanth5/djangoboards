   �         Phttps://www.gstatic.com/support/content/local-assets/earth_inproduct/local.1.css     %���p?      %|�;�              �      
     O K      Accept-Ranges   bytes   Vary   Accept-Encoding   Content-Encoding   gzip   Content-Type   text/css   Access-Control-Allow-Origin   *   Date   Wed, 02 Jan 2019 23:38:16 GMT   Expires   Thu, 02 Jan 2020 23:38:16 GMT   Last-Modified   Tue, 18 Feb 2014 23:21:38 GMT   X-Content-Type-Options   nosniff   Server   sffe   X-XSS-Protection   1; mode=block   Cache-Control   public, max-age=31536000   Age   1860354   Alt-Svc   %quic=":443"; ma=2592000; v="44,43,39" /**
 * These styles are not applied within the Earth Help Center.
 * Earth has a "start up" pane that launches when the application is run and
 * contains tooltips which are loaded from the Help Center. Those tips are
 * formatted using the styles below, which are imported directly via the Earth
 * client, and shown in a fixed-sized popup (674px x 375px). Tips are only ever
 * shown in English, so RTL styles aren't needed.
 *
 * Background:
 * https://b.corp.google.com/issue?id=8283966
 */

.embedded .page-width-container {
  padding-top: 0;
}

div.earth-start-up-tips {
  overflow: hidden;
  margin-top: 0;
}

.earth-start-up-tips .container {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  height: 375px;
  width: 674px;
}

.earth-start-up-tips .footer-top {
  float: left;
  width: 100%;
  color: #666;
}

.earth-start-up-tips .footer-bottom {
  float: left;
  width: 100%;
  background-color: #efefef;
  height: 32px;
}

.earth-start-up-tips .right-col {
  color: #222;
  float: right;
  padding: 0 50px 0 10px;
  width: 414px;
}

.earth-start-up-tips .left-col {
  float: left;
  width: 200px;
}

.earth-start-up-tips .left-col ul {
  margin: 10px 0;
  padding: 0;
}

.earth-start-up-tips .left-col li {
  list-style: none;
}

.earth-start-up-tips .left-col a {
  border-left: 4px solid transparent;
  color: #666;
  display: block;
  padding: 7px 16px 7px 20px;
  text-decoration: none;
}

.earth-start-up-tips .left-col a:hover {
  background-color: #f5f5f5;
}

.earth-start-up-tips .left-col .selected {
  border-left-color: #dd4b39;
  color: #d14836;
  font-weight: bold;
}

.earth-start-up-tips .left-col .selected:hover {
  background-color: transparent;
  cursor: text;
}

.earth-start-up-tips h1 {
  font-size: 1.5em;
}
