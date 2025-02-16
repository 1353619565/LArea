/**
 * LArea移动端省市区联级选择器
 *
 * version: 2.0.0
 *
 * author: 李轻舟
 *
 * git: https://github.com/1353619565/LArea
 *
 * Licensed under MIT
 *
 * 最近修改于: 2019-09-09 09:47:51
 */
window.LArea = (function() {
  var e = function() {
    this.gearArea, this.data, (this.index = 0), (this.value = [0, 0, 0]);
  };
  return (
    (e.prototype = {
      init: function(e) {
        switch (
          ((this.params = e),
          (this.trigger = document.querySelector(e.trigger)),
          e.valueTo && (this.valueTo = document.querySelector(e.valueTo)),
          (this.keys = e.keys),
          (this.type = e.type || 1),
          this.type)
        ) {
          case 1:
          case 2:
            break;
          default:
            throw new Error('错误提示: 没有这种数据源类型');
        }
        this.bindEvent();
      },
      getData: function(e) {
        var t = this;
        if ('object' == typeof t.params.data) (t.data = t.params.data), e();
        else {
          var a = new XMLHttpRequest();
          a.open('get', t.params.data),
            (a.onload = function(r) {
              if ((a.status >= 200 && a.status < 300) || 0 === a.status) {
                var i = JSON.parse(a.responseText);
                (t.data = i.data), e && e();
              }
            }),
            a.send();
        }
      },
      bindEvent: function() {
        function e(e) {
          (d.gearArea = document.createElement('div')),
            (d.gearArea.className = 'gearArea'),
            (d.gearArea.innerHTML =
              '<div class="area_ctrl slideInUp"><div class="area_btn_box"><div class="area_btn larea_cancel">取消</div><div class="area_btn larea_finish">确定</div></div><div class="area_roll_mask"><div class="area_roll"><div><div class="gear area_province" data-areatype="area_province"></div><div class="area_grid"></div></div><div><div class="gear area_city" data-areatype="area_city"></div><div class="area_grid"></div></div><div><div class="gear area_county" data-areatype="area_county"></div><div class="area_grid"></div></div></div></div></div>'),
            document.body.appendChild(d.gearArea),
            t();
          var n = d.gearArea.querySelector('.larea_cancel');
          n.addEventListener('touchstart', function(e) {
            d.close(e);
          });
          var s = d.gearArea.querySelector('.larea_finish');
          s.addEventListener('touchstart', function(e) {
            d.finish(e);
          });
          var o = d.gearArea.querySelector('.area_province'),
            c = d.gearArea.querySelector('.area_city'),
            v = d.gearArea.querySelector('.area_county');
          o.addEventListener('touchstart', a),
            c.addEventListener('touchstart', a),
            v.addEventListener('touchstart', a),
            o.addEventListener('touchmove', r),
            c.addEventListener('touchmove', r),
            v.addEventListener('touchmove', r),
            o.addEventListener('touchend', i),
            c.addEventListener('touchend', i),
            v.addEventListener('touchend', i);
        }
        function t() {
          switch (
            (d.gearArea
              .querySelector('.area_province')
              .setAttribute('val', d.value[0]),
            d.gearArea
              .querySelector('.area_city')
              .setAttribute('val', d.value[1]),
            d.gearArea
              .querySelector('.area_county')
              .setAttribute('val', d.value[2]),
            d.type)
          ) {
            case 1:
              d.setGearTooth(d.data);
              break;
            case 2:
              d.setGearTooth(d.data[0]);
          }
        }
        function a(e) {
          e.preventDefault();
          for (var t = e.target; !t.classList.contains('gear'); )
            t = t.parentElement;
          clearInterval(t['int_' + t.id]),
            (t['old_' + t.id] = e.targetTouches[0].screenY),
            (t['o_t_' + t.id] = new Date().getTime());
          var a = t.getAttribute('top');
          (t['o_d_' + t.id] = a ? parseFloat(a.replace(/em/g, '')) : 0),
            (t.style.webkitTransitionDuration = t.style.transitionDuration =
              '0ms');
        }
        function r(e) {
          e.preventDefault();
          for (var t = e.target; !t.classList.contains('gear'); )
            t = t.parentElement;
          (t['new_' + t.id] = e.targetTouches[0].screenY),
            (t['n_t_' + t.id] = new Date().getTime());
          var a =
            (30 * (t['new_' + t.id] - t['old_' + t.id])) / window.innerHeight;
          (t['pos_' + t.id] = t['o_d_' + t.id] + a),
            (t.style['-webkit-transform'] =
              'translate3d(0,' + t['pos_' + t.id] + 'em,0)'),
            t.setAttribute('top', t['pos_' + t.id] + 'em'),
            e.targetTouches[0].screenY < 1 && i(e);
        }
        function i(e) {
          e.preventDefault();
          for (var t = e.target; !t.classList.contains('gear'); )
            t = t.parentElement;
          var a =
            (t['new_' + t.id] - t['old_' + t.id]) /
            (t['n_t_' + t.id] - t['o_t_' + t.id]);
          Math.abs(a) <= 0.2
            ? (t['spd_' + t.id] = 0 > a ? -0.08 : 0.08)
            : Math.abs(a) <= 0.5
            ? (t['spd_' + t.id] = 0 > a ? -0.16 : 0.16)
            : (t['spd_' + t.id] = a / 2),
            t['pos_' + t.id] || (t['pos_' + t.id] = 0),
            n(t);
        }
        function n(e) {
          function t() {
            (e.style.webkitTransitionDuration = e.style.transitionDuration =
              '200ms'),
              (r = !0);
          }
          var a = 0,
            r = !1;
          clearInterval(e['int_' + e.id]),
            (e['int_' + e.id] = setInterval(function() {
              var i = e['pos_' + e.id],
                n = e['spd_' + e.id] * Math.exp(-0.03 * a);
              if (((i += n), Math.abs(n) > 0.1));
              else {
                var d = 2 * Math.round(i / 2);
                (i = d), t();
              }
              i > 0 && ((i = 0), t());
              var o = 2 * -(e.dataset.len - 1);
              if ((o > i && ((i = o), t()), r)) {
                var c = Math.abs(i) / 2;
                s(e, c), clearInterval(e['int_' + e.id]);
              }
              (e['pos_' + e.id] = i),
                (e.style['-webkit-transform'] = 'translate3d(0,' + i + 'em,0)'),
                e.setAttribute('top', i + 'em'),
                a++;
            }, 30));
        }
        function s(e, t) {
          switch (((t = Math.round(t)), e.setAttribute('val', t), d.type)) {
            case 1:
              d.setGearTooth(d.data);
              break;
            case 2:
              switch (e.dataset.areatype) {
                case 'area_province':
                  d.setGearTooth(d.data[0]);
                  break;
                case 'area_city':
                  var a = e.childNodes[t].getAttribute('ref'),
                    r = [],
                    i = d.data[2];
                  for (var n in i)
                    if (n == a) {
                      r = i[n];
                      break;
                    }
                  (d.index = 2), d.setGearTooth(r);
              }
          }
        }
        var d = this;
        d.getData(function() {
          d.trigger.addEventListener('click', e);
        });
      },
      setGearTooth: function(e) {
        var t = this,
          a = e || [],
          r = a.length,
          i = t.gearArea.querySelectorAll('.gear'),
          n = i[t.index].getAttribute('val'),
          s = r - 1;
        if ((n > s && (n = s), i[t.index].setAttribute('data-len', r), r > 0)) {
          var d,
            o = a[n][this.keys.id];
          switch (t.type) {
            case 1:
              d = a[n].child;
              break;
            case 2:
              var c = t.data[t.index + 1];
              for (var v in c)
                if (v == o) {
                  d = c[v];
                  break;
                }
          }
          var l = '';
          for (v = 0; r > v; v++)
            l +=
              "<div class='tooth'  ref='" +
              a[v][this.keys.id] +
              "'>" +
              a[v][this.keys.name] +
              '</div>';
          if (
            ((i[t.index].innerHTML = l),
            (i[t.index].style['-webkit-transform'] =
              'translate3d(0,' + 2 * -n + 'em,0)'),
            i[t.index].setAttribute('top', 2 * -n + 'em'),
            i[t.index].setAttribute('val', n),
            t.index++,
            t.index > 2)
          )
            return void (t.index = 0);
          t.setGearTooth(d);
        } else
          (i[t.index].innerHTML = "<div class='tooth'></div>"),
            i[t.index].setAttribute('val', 0),
            1 == t.index &&
              ((i[2].innerHTML = "<div class='tooth'></div>"),
              i[2].setAttribute('val', 0)),
            (t.index = 0);
      },
      finish: function(e) {
        var t = this,
          a = t.gearArea.querySelector('.area_province'),
          r = t.gearArea.querySelector('.area_city'),
          i = t.gearArea.querySelector('.area_county'),
          n = parseInt(a.getAttribute('val')),
          s = a.childNodes[n].textContent,
          d = a.childNodes[n].getAttribute('ref'),
          o = parseInt(r.getAttribute('val')),
          c = r.childNodes[o].textContent,
          v = r.childNodes[o].getAttribute('ref'),
          l = parseInt(i.getAttribute('val')),
          u = i.childNodes[l].textContent,
          h = i.childNodes[l].getAttribute('ref');
        (t.trigger.value = s + (c ? '-' + c : '') + (u ? '-' + u : '')),
          (t.value = [n, o, l]),
          this.valueTo &&
            (this.valueTo.value = d + (v ? '-' + v : '') + (h ? '-' + h : '')),
          t.close(e);
      },
      close: function(e) {
        e.preventDefault();
        var t = this,
          a = new CustomEvent('input');
        t.trigger.dispatchEvent(a), document.body.removeChild(t.gearArea);
      },
    }),
    e
  );
})();
