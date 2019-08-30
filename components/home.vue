<template>
  <div>
    <div class="circle mb-5 mt-5">
      <svg
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="100%"
        height="100%"
        x="0px"
        y="0px"
        viewBox="0 0 750 750"
      >
        <!--ROTATING GROUP-->
        <g id="coocircle">
          <!--GRADIENTS LOOP-->
          <template v-for="gradient in this.gradients">
            <linearGradient
              :key="gradient.name"
              :id="gradient.name"
              gradientUnits="userSpaceOnUse"
              :x1="gradient.x1"
              :y1="gradient.y1"
              :x2="gradient.x2"
              :y2="gradient.y2"
            >
              <stop offset="0" :style="gradient.color1" />
              <stop :offset="gradient.offset" :style="gradient.color2" />
              <stop offset="1" :style="gradient.color3" />
            </linearGradient>
          </template>
          <!--PATHS POSITION LOOP, APPLIES GRADIENTS THROUGH STROKE AND 'URL#..'-->
          <path
            v-for="value in this.values"
            :key="value.name"
            :id="value.name"
            :class="value.animation"
            :style="{ opacity: value.opacity, 'z-index': '2' }"
            fill="none"
            :stroke="value.stroke"
            stroke-width="24"
            stroke-miterlimit="10"
            :d="value.d"
            @mouseover="showvalue(values.indexOf(value))"
          />
        </g>
        <!--VALUES DESCRIPTION LOOP, HIDDEN AND TRIGGERED VIA MOUSEOVER ON PATHS-->
        <template v-for="description in this.descriptions">
          <g
            :key="description.name"
            :id="description.name"
            :style="{ display: description.display }"
          >
            <a :href="description.href" class="noline finger">
              <text
                :transform="description.matrix1"
                fill="#555555"
                font-size="65"
              >
                {{ description.value }}
              </text>
              <line
                :style="description.style"
                :x1="description.x1"
                :y1="description.y1"
                :x2="description.x2"
                :y2="description.y2"
              />
              <text
                :transform="description.matrix2"
                stroke="#555555"
                fill="#555555"
                font-size="25"
              >
                {{ description.text }}
              </text>
            </a>
          </g>
        </template>
        <!--PAYOFF, DISAPPEARS VIA MOUSEOVER ON PATHS-->
        <text
          id="typo"
          x="0px"
          y="0px"
          transform="matrix(1 0 0 1 132 379)"
          opacity="0"
          :display="this.dtypo"
          style="animation: fade-in 3s forwards;"
          fill="#555555"
          font-size="80"
          class="font-weight-light"
        >
          COOPERACY
        </text>
        <text
          id="payoff"
          x="0px"
          y="0px"
          transform="matrix(1 0 0 1 138 422)"
          opacity="0"
          :display="this.dpayoff"
          style="animation: fade-in 3s 1s forwards;"
          fill="#555555"
          font-size="28"
          stroke="#555555"
          textLength="475"
        >
          ENTER THE JOURNEY
        </text>
      </svg>
    </div>
    <!--END CIRCLE-->
    <!--FADE IN AREA-->
    <div id="homefade" style="opacity:0">
      <div class="row mb-4 p-2">
        <div class="col-lg-4 col-xs-12 subheading text-center">
          <a href="/platform" class="noline transparency space">DISCOVER</a>
        </div>
        <div class="col-lg-4 col-xs-12 subheading text-center">
          <a href="/cooperation" class="noline understanding space">LEARN</a>
        </div>
        <div class="col-lg-4 col-xs-12 subheading text-center">
          <a href="/login" class="noline equivalence space">JOIN</a>
        </div>
      </div>
      <p class="base text-center">
        Cooperacy is a nonprofit scientific project aiming to spread cooperation
        amongst humans and in their ecosystem.
      </p>
      <p class="base text-center mb-2">
        We're setting up a
        <a href="/platform" class="ae">platform</a> in which, supported by
        money, people help each other to realise what they want for their lives
        taking decisions together in a productive way.
      </p>
      <p class="base text-center mb-3">
        <a href="/login" class="ae">Joining</a> Cooperacy is entertaining and
        makes you learn how to develop enjoyable cooperations in your
        <a href="/aboutyou" class="ad">personal</a> relations, in the
        <a href="/coorporate" class="af">corporate</a>
        world and at the
        <a href="/cci" class="au">international</a> level.
      </p>
      <div class="base text-center">
        <p class="base text-center mb-3">
          <a class="ae" href="/login">Join</a> Cooperacy today, or
          <nuxt-link class="ai" to="/contact">contact us</nuxt-link> for more
          information.
        </p>
        <br />
      </div>
    </div>
  </div>
</template>

<style>
/* HOME PAGE CIRCLE AND FADING ANIMATIONS, SEE ALSO STYLE SPECIFICATION IN SINGLE PREVIOUS ELEMENTS */
.circle {
  margin: 0 auto;
  height: 28vw;
  position: relative;
}
#coocircle {
  transform-origin: center center;
  -webkit-transform-origin: center center;
  animation: wheel 5s ease-out;
}
@keyframes wheel {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(1080deg);
  }
}
/* ACTIVADED AT THE END OF ROTATION */
.allin {
  animation: fade-in 4s cubic-bezier(0.14, 0.65, 0.25, 0.98) forwards;
  animation-delay: 2300ms;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
/* FADE IN AREA, ALSO ACTIVADED AT THE END OF ROTATION */
#homefade {
  animation: fadeino 3s forwards;
  animation-delay: 1s;
}
@keyframes fadeino {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>

<script>
export default {
  data() {
    return {
      dtypo: '',
      dpayoff: '', // TYPO AND PAYOFF DISAPPEAR WHEN HOVERING ON CIRCLE PATHS
      values: [
        {
          name: 'equivalence',
          opacity: 0,
          animation: '',
          stroke: 'url(#gequivalence)',
          d:
            'M525.0481567,63.1570435  c-45.3894043-21.8797607-96.2866211-34.142334-150.0480957-34.142334 c-53.7633667,0-104.6621704,12.2634277-150.0527802,34.1446533'
        },
        {
          name: 'trust',
          opacity: 0,
          animation: '',
          stroke: 'url(#gtrust)',
          d:
            'M712.3186035,297.7496338 c-23.6291504-103.605957-93.7546997-189.5136719-187.2704468-234.5925903'
        },
        {
          name: 'care',
          opacity: 0,
          animation: '',
          stroke: 'url(#gcare)',
          d:
            'M645.6213379,590.5565796 c47.1600342-59.1289673,75.3640137-134.0441895,75.3640137-215.5565186c0-26.5563965-3.0014648-52.4103394-8.666748-77.2504272'
        },
        {
          name: 'transparency',
          opacity: 0,
          animation: '',
          stroke: 'url(#gtransparency)',
          d:
            'M375,720.9854126 c110,0,207.2280884-50.9467773,270.6212769-130.428833'
        },
        {
          name: 'freedom',
          opacity: 0,
          animation: '',
          stroke: 'url(#gfreedom)',
          d:
            'M104.3764725,590.5537109 C167.7696686,670.0374146,265,720.9854126,375,720.9854126'
        },
        {
          name: 'understanding',
          opacity: 0,
          animation: '',
          stroke: 'url(#gunderstanding)',
          d:
            'M37.68116,297.7509155 c-5.6650391,24.8396606-8.666441,50.6932373-8.666441,77.2491455c0,81.5109863,28.2031841,156.4251099,75.3618164,215.5536499'
        },
        {
          name: 'diversity',
          opacity: 0,
          animation: '',
          stroke: 'url(#gdiversity)',
          d:
            'M224.9472809,63.1593628 C131.433548,108.2390137,61.309639,194.1461182,37.68116,297.7509155'
        }
      ],
      descriptions: [
        {
          name: 'equivalenceD',
          display: 'none',
          href: 'http://cooperacy.org/cooperation#equivalence',
          matrix1: 'matrix(1 0 0 1 157 360)',
          matrix2: 'matrix(1 0 0 1 225 440)',
          style:
            'display:inline;fill:#555555;stroke:#FF8800;stroke-width:6;stroke-miterlimit:10;',
          x1: '150',
          y1: '393',
          x2: '600',
          y2: '393',
          text: 'EVERYONE IS IMPORTANT',
          value: 'EQUIVALENCE'
        },
        {
          name: 'trustD',
          display: 'none',
          href: 'http://cooperacy.org/cooperation#trust',
          matrix1: 'matrix(1 0 0 1 278 360)',
          matrix2: 'matrix(1 0 0 1 208 443)',
          style:
            'display:inline;fill:#555555;stroke:#FFCC00;stroke-width:6;stroke-miterlimit:10;',
          x1: '150',
          y1: '393',
          x2: '600',
          y2: '393',
          text: 'PEOPLE COUNT ON OTHERS',
          value: 'TRUST'
        },
        {
          name: 'careD',
          display: 'none',
          href: 'http://cooperacy.org/cooperation#care',
          matrix1: 'matrix(1 0 0 1 286 360)',
          matrix2: 'matrix(1 0 0 1 182 443)',
          style:
            'display:inline;fill:#555555;stroke:#88DD33;stroke-width:6;stroke-miterlimit:10;',
          x1: '150',
          y1: '393',
          x2: '600',
          y2: '393',
          text: 'PEOPLE CARE FOR EACH OTHER',
          value: 'CARE'
        },
        {
          name: 'transparencyD',
          display: 'none',
          href: 'http://cooperacy.org/cooperation#transparency',
          matrix1: 'matrix(1 0 0 1 132 360)',
          matrix2: 'matrix(1 0 0 1 194 443)',
          style:
            'display:inline;fill:#555555;stroke:#22DDEE;stroke-width:6;stroke-miterlimit:10;',
          x1: '150',
          y1: '393',
          x2: '600',
          y2: '393',
          text: 'PEOPLE WANT TO BE HONEST',
          value: 'TRANSPARENCY'
        },
        {
          name: 'freedomD',
          display: 'none',
          href: 'http://cooperacy.org/cooperation#freedom',
          matrix1: 'matrix(1 0 0 1 222 360)',
          matrix2: 'matrix(1 0 0 1 184 443)',
          style:
            'display:inline;fill:#555555;stroke:#4488EE;stroke-width:6;stroke-miterlimit:10;',
          x1: '150',
          y1: '393',
          x2: '600',
          y2: '393',
          text: 'PEOPLE FOLLOW THEIR DESIRES',
          value: 'FREEDOM'
        },
        {
          name: 'understandingD',
          display: 'none',
          href: 'http://cooperacy.org/cooperation#understanding',
          matrix1: 'matrix(1 0 0 1 118 360)',
          matrix2: 'matrix(1 0 0 1 116 443)',
          style:
            'display:inline;fill:#555555;stroke:#AA66DD;stroke-width:6;stroke-miterlimit:10;',
          x1: '150',
          y1: '393',
          x2: '600',
          y2: '393',
          text: 'PEOPLE TRY TO UNDERSTAND EACH OTHER',
          value: 'UNDERSTANDING'
        },
        {
          name: 'diversityD',
          display: 'none',
          href: 'http://cooperacy.org/cooperation#diversity',
          matrix1: 'matrix(1 0 0 1 218 360)',
          matrix2: 'matrix(1 0 0 1 180 443)',
          style:
            'display:inline;fill:#555555;stroke:#FF77CC;stroke-width:6;stroke-miterlimit:10;',
          x1: '150',
          y1: '393',
          x2: '600',
          y2: '393',
          text: 'PEOPLE WANT TO BE INCLUDED',
          value: 'DIVERSITY'
        }
      ],
      gradients: [
        {
          name: 'gequivalence',
          x1: '219',
          y1: '58',
          x2: '530',
          y2: '58',
          color1: 'stop-color:#FF8366',
          offset: '0.5',
          color2: 'stop-color:#FF8800',
          color3: 'stop-color:#FFC000'
        },
        {
          name: 'gtrust',
          x1: '530',
          y1: '58',
          x2: '743',
          y2: '260',
          color1: 'stop-color:#FFC000',
          offset: '0.5',
          color2: 'stop-color:#FFCC00',
          color3: 'stop-color:#C3DD19'
        },
        {
          name: 'gcare',
          x1: '742',
          y1: '290',
          x2: '670',
          y2: '590',
          color1: 'stop-color:#C3DD19',
          offset: '0.5',
          color2: 'stop-color:#88DD33',
          color3: 'stop-color:#55DD90'
        },
        {
          name: 'gtransparency',
          x1: '700',
          y1: '640',
          x2: '400',
          y2: '750',
          color1: 'stop-color:#55DD90',
          offset: '0.5',
          color2: 'stop-color:#22DDEE',
          color3: 'stop-color:#33B2EE'
        },
        {
          name: 'gfreedom',
          x1: '350',
          y1: '750',
          x2: '100',
          y2: '640',
          color1: 'stop-color:#33B2EE',
          offset: '0.5',
          color2: 'stop-color:#4488EE',
          color3: 'stop-color:#7777E5'
        },
        {
          name: 'gunderstanding',
          x1: '100',
          y1: '590',
          x2: '20',
          y2: '290',
          color1: 'stop-color:#7777E5',
          offset: '0.5',
          color2: 'stop-color:#AA66DD',
          color3: 'stop-color:#D46ED4'
        },
        {
          name: 'gdiversity',
          x1: '20',
          y1: '260',
          x2: '219',
          y2: '58',
          color1: 'stop-color:#D46ED4',
          offset: '0.5',
          color2: 'stop-color:#FF77CC',
          color3: 'stop-color:#FF8366'
        }
      ]
    }
  },
  mounted() {
    this.randomtype()
  },
  methods: {
    randomtype() {
      var i
      var randomino = Math.round(Math.random() * 7) //random selection of path/color, biased against all colors (7)
      if (randomino == 7) {
        for (i = 0; i < 7; i++) {
          this.values[i].opacity = '1'
        } //7! all colors in!
      } else {
        this.values[randomino].opacity = '1' // if previous fails, just one path/color is visible in the rotation
        for (i = 0; i < 7; i++) {
          if (i == randomino) {
            continue
          }
          this.values[i].animation = 'allin'
        } // at the end all the paths/colors fade in
      }
    },
    showvalue(v) {
      var i
      for (i = 0; i < 7; i++) {
        this.descriptions[i].display = 'none'
      } // turns off all descriptions before showing the current, avoiding overlaps
      this.dtypo = 'none'
      this.dpayoff = 'none' // main payoff disappears
      this.descriptions[v].display = 'inline' // right description appears
    }
  }
}
</script>
