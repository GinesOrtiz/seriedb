class pixelsController {
  constructor($timeout) {

    let scripts = [
      '//www.googleadservices.com/pagead/conversion_async.js',
      '//platform.twitter.com/oct.js',
      '//static.intercomcdn.com/intercom.v1.js'
    ];
    let styles = [
      'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
      'https://fonts.googleapis.com/css?family=Open+Sans:300,400,500',
      'https://fonts.googleapis.com/icon?family=Material+Icons'
    ];

    styles.forEach((style) => {
      this.externalStyleCreator(style);
    });

    $timeout(() => {
      scripts.forEach((script) => {
        this.externalScriptCreator(script);

      });
      this.facebookPixel();
      this.twitterPixel();
      this.mixpanel();
    }, 4000);

  }

  facebookPixel() {
    /* jshint ignore:start */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) {
        return;
      }
      n = f.fbq = function () {
        n.callMethod ?
          n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) {
        f._fbq = n;
      }
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
    }(window,
      document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1261824240496816');
    fbq('track', 'PageView');
    /* jshint ignore:end */
  }

  twitterPixel() {
    /* jshint ignore:start */
    !function (e, t, n, s, u, a) {
      e.twq || (s = e.twq = function () {
        s.exe ? s.exe.apply(s, arguments) : s.queue.push(arguments);
      }, s.version = '1.1', s.queue = [], u = t.createElement(n), u.async = !0, u.src =
        '//static.ads-twitter.com/uwt.js',
        a = t.getElementsByTagName(n)[0], a.parentNode.insertBefore(u, a))
    }(window, document, 'script');
    // Insert Twitter Pixel ID and Standard Event data below
    twq('init', 'nvp1f');
    twq('track', 'PageView');
    /* jshint ignore:end */
  }

  mixpanel() {
    /* jshint ignore:start */
    (function (e, a) {
      if (!a.__SV) {
        var b = window;
        try {
          var c, l, i, j = b.location, g = j.hash;
          c = function (a, b) {
            return (l = a.match(RegExp(b + "=([^&]*)"))) ? l[1] : null
          };
          g && c(g, "state") &&
          (i = JSON.parse(decodeURIComponent(c(g, "state"))), "mpeditor" === i.action &&
          (b.sessionStorage.setItem("_mpcehash", g), history.replaceState(i.desiredHash || "",
            e.title,
            j.pathname + j.search)))
        } catch (m) {
        }
        var k, h;
        window.mixpanel = a;
        a._i = [];
        a.init = function (b, c, f) {
          function e(b, a) {
            var c = a.split(".");
            2 == c.length && (b = b[c[0]], a = c[1]);
            b[a] = function () {
              b.push([a].concat(Array.prototype.slice.call(arguments,
                0)))
            }
          }

          var d = a;
          "undefined" !== typeof f ? d = a[f] = [] : f = "mixpanel";
          d.people = d.people || [];
          d.toString = function (b) {
            var a = "mixpanel";
            "mixpanel" !== f && (a += "." + f);
            b || (a += " (stub)");
            return a
          };
          d.people.toString = function () {
            return d.toString(1) + ".people (stub)"
          };
          k =
            "disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(
              " ");
          for (h = 0; h < k.length; h++) {
            e(d, k[h]);
          }
          a._i.push([
            b,
            c,
            f
          ])
        };
        a.__SV = 1.2;
        b = e.createElement("script");
        b.type = "text/javascript";
        b.async = !0;
        b.src = "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL ? MIXPANEL_CUSTOM_LIB_URL :
          "file:" === e.location.protocol &&
          "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//) ?
            "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" :
            "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";
        c = e.getElementsByTagName("script")[0];
        c.parentNode.insertBefore(b, c)
      }
    })(document, window.mixpanel || []);
    /* jshint ignore:end */
  }

  externalStyleCreator(src) {
    let element = document.createElement('link');
    element.href = src;
    element.rel = 'stylesheet';
    element.type = 'text/css';

    document.body.appendChild(element);
  }

  externalScriptCreator(src) {
    let element = document.createElement('script');
    element.src = src;
    element.type = 'text/javascript';
    element.setAttribute('async', true);

    document.body.appendChild(element);
  }
}

export default /*@ngInject*/ pixelsController;
