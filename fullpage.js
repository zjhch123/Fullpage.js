;(function() {
  var fullpage = (function() {
    var target,
        _config = {
          target: "body",
          baseWidth: 640,
          single: false
        };
    var _extends = function(parent, child) {
      for(var i in child) {
        if(child.hasOwnProperty(i)) {
          parent[i] = child[i]
        }
      }
      return parent;
    };
    var noSingle = function(config) {
      var calc = function(base) {
        return function() {
          var percent = (function() {
            if(document.documentElement.clientWidth > base) {
              var percent = 1/16 * 10000 + "%";
            } else {
              var percent = document.documentElement.clientWidth / base / 16 * 10000 + "%";
            }
            return percent;
          })();
          document.documentElement.style.fontSize = percent;
        }
      };
      setInterval(calc(config.baseWidth), 10);
      target.style.width = config.baseWidth / 100 + "rem";
      target.style.margin = "auto";
    };
    var single = function(config) {
      if(config.hasOwnProperty("baseWidth") && config.hasOwnProperty("baseHeight")) {
        var bw = config.baseWidth;
        var bh = config.baseHeight;
        var proportion = bw / bh;
        var cw = document.documentElement.clientWidth;
        var ch = document.documentElement.clientHeight;
        var _proportion = cw / ch;

        var calc = function(base, type) {
          switch(type) {
            case 1:
            return function() {
              var percent = document.documentElement.clientWidth / base / 16 * 10000 + "%";
              document.documentElement.style.fontSize = percent;
            }
            case 2:
            return function() {
              var percent = document.documentElement.clientHeight / base / 16 * 10000 + "%";
              document.documentElement.style.fontSize = percent;
            }
          }
        }
        if(proportion >= _proportion) {
          setInterval(calc(bw, 1), 10);
          target.style.width = config.baseWidth / 100 + "rem";
          target.style.height = config.baseWidth / 100 / proportion + "rem";
          target.style.position = "absolute";
          target.style.top = "0";
          target.style.bottom = "0";
        } else {
          setInterval(calc(bh, 2), 10);
          target.style.height = config.baseHeight / 100 + "rem";
          target.style.width = config.baseHeight / 100 * proportion + "rem";
        }
        target.style.margin = "auto";
      } else {
        throw "Config ERROR! Single page should give baseWidth and baseHeight";
      }
    };
    var init = function(config) {
      config = _extends(_config, config);
      target = document.querySelector(config.target);
      if(config.single) {
        single(config);
      } else {
        noSingle(config);
      }
      document.body.style.margin = "0";
    };
    return {
      init: init
    };
  })();
  window.fullpage = fullpage;
})()






