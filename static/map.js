var countries = (function() {
  var r,
    a = 0,
    l = {},
    o = function(e, t) {
      document.getElementById(e).innerHTML = t
    },
    i = function() {
      var e = new XMLHttpRequest()
      return (
        (e.onreadystatechange = function() {
          if (4 == e.readyState && 200 == e.status) {
            try {
              var t = e.responseText
              l = JSON.parse(t)
            } catch (e) {
              return e
            }
            r = [0, 0]
            for (var n in l)
              (a = document
                .getElementById('countries-map')
                .contentDocument.getElementById(n)) &&
                ((l[n].bg = a.getAttribute('fill')),
                a.addEventListener('click', countries.click),
                l[n].CCI < r[0] && (r[0] = l[n].CCI),
                l[n].CCI > r[1] && (r[1] = l[n].CCI))
            for (
              var a = document
                  .getElementById('countries-map')
                  .contentDocument.getElementsByClassName('country'),
                o = 0;
              o < a.length;
              ++o
            )
              if (void 0 !== l[a[o].id]) {
                console.log(' ' + JSON.stringify(l[a[o].id].CCI))
                var i =
                  127 +
                  Math.round(((l[a[o].id].CCI - r[0]) / (r[1] - r[0])) * 127)
                a[o].setAttribute('style', 'fill:rgb(70,' + i + ',0)')
              } else a[o].setAttribute('style', 'fill:#AAAAAA')
          }
        }),
        e.open('GET', '/api/map', !0),
        e.send(),
        !1
      )
    }
  return {
    ii_click: function() {
      if (
        (o('country-value', ''),
        o('CCI-value', ''),
        o('equivalence-value', ''),
        o('trust-value', ''),
        o('care-value', ''),
        o('transparency-value', ''),
        o('freedom-value', ''),
        o('understanding-value', ''),
        o('diversity-value', ''),
        a)
      ) {
        ;(a = 0),
          o(
            'map_btn',
            "<p class='subheading understanding center space'>CLICK HERE FOR THE COOPERATION CONTEXT INDEX</p>"
          )
        for (
          var e = document
              .getElementById('countries-map')
              .contentDocument.getElementsByClassName('country'),
            t = 0;
          t < e.length;
          ++t
        )
          if (void 0 !== l[e[t].id]) {
            for (
              var n = '#AAAAAA',
                r = [
                  {
                    value: Number(l[e[t].id].CARE),
                    color: '#88DD33'
                  },
                  {
                    value: Number(l[e[t].id].EQUIVALENCE),
                    color: '#FF9000'
                  },
                  {
                    value: Number(l[e[t].id].TRUST),
                    color: '#FFDD00'
                  },
                  {
                    value: Number(l[e[t].id].TRANSPARENCY),
                    color: '#22DDEE'
                  },
                  {
                    value: Number(l[e[t].id].FREEDOM),
                    color: '#4488EE'
                  },
                  {
                    value: Number(l[e[t].id].UNDERSTANDING),
                    color: '#AA66DD'
                  },
                  {
                    value: Number(l[e[t].id].DIVERSITY),
                    color: '#FF77CC'
                  }
                ],
                c = r[0].value,
                d = 0;
              d <= 6;
              d++
            )
              r[d].value >= c && ((c = r[d].value), (n = r[d].color))
            e[t].setAttribute('style', 'fill:' + n)
          } else e[t].setAttribute('style', 'fill:#AAAAAA')
        for (var v in l)
          (e = document
            .getElementById('countries-map')
            .contentDocument.getElementById(v)) &&
            e.removeEventListener('click', countries.click)
        return !1
      }
      return (
        (a = 1),
        o(
          'map_btn',
          "<p class='subheading understanding center space'>CLICK ON COUNTRIES TO GET THEIR DATA - OR HERE FOR PREVALENT CONDITION MAP</p>"
        ),
        i()
      )
    },
    click: function(e) {
      var t = (e.target || e.srcElement).id
      o('country-value', l[t].country),
        o('CCI-value', Math.round(1e4 * l[t].CCI) / 1e4),
        o('equivalence-value', l[t].EQUIVALENCE),
        o('trust-value', l[t].TRUST),
        o('care-value', l[t].CARE),
        o('transparency-value', l[t].TRANSPARENCY),
        o('freedom-value', l[t].FREEDOM),
        o('understanding-value', l[t].UNDERSTANDING),
        o('diversity-value', l[t].DIVERSITY)
    }
  }
})()
