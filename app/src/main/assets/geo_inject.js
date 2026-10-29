/* 定位浏览器：替换网页的 navigator.geolocation，由 App 决定返回什么位置 */
(function () {
  try {
    if (window.__gbGeoInstalled) return;
    window.__gbGeoInstalled = true;
    var geo = navigator.geolocation;
    if (!geo) return;
    var real = {
      getCurrentPosition: geo.getCurrentPosition.bind(geo),
      watchPosition: geo.watchPosition.bind(geo),
      clearWatch: geo.clearWatch.bind(geo)
    };
    var nextId = 1;
    var watches = {};
    function send(msg) {
      if (window.Android && window.Android.post) {
        window.Android.post(JSON.stringify(msg));
      } else if (window.__gbGeoMsg) {
        window.__gbGeoMsg(JSON.stringify(msg));
      }
    }
    window.__gbGeoMsg = function (json) {
      try {
        var m = JSON.parse(json);
        if (m.id && watches[m.id]) {
          var w = watches[m.id];
          if (m.ok) w.success && w.success(m.pos);
          else w.error && w.error(m.err);
          if (!m.watch) delete watches[m.id];
        }
      } catch (e) {}
    };
    navigator.geolocation.getCurrentPosition = function (success, error, options) {
      var id = nextId++;
      watches[id] = { success: success, error: error };
      send({ type: 'get', id: id, options: options || {} });
    };
    navigator.geolocation.watchPosition = function (success, error, options) {
      var id = nextId++;
      watches[id] = { success: success, error: error, watch: true };
      send({ type: 'watch', id: id, options: options || {} });
      return id;
    };
    navigator.geolocation.clearWatch = function (id) {
      delete watches[id];
      send({ type: 'clear', id: id });
    };
  } catch (e) {}
})();
