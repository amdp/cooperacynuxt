<template>
  <div>
    <div class="circle mb-5">
      <svg xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" x="0px" y="0px" viewBox="0 0 750 750">
        <g id="cocircle">
          <linearGradient id="gequivalence" gradientUnits="userSpaceOnUse" x1="219" y1="58" x2="530" y2="58">
            <stop  offset="0" style="stop-color:#FF8366"/><stop  offset="0.5" style="stop-color:#FF9000"/><stop  offset="1" style="stop-color:#FFB600"/>
          </linearGradient>
          <linearGradient id="gtrust" gradientUnits="userSpaceOnUse" x1="530" y1="58" x2="743" y2="260">
            <stop  offset="0" style="stop-color:#FFB600"/><stop  offset="0.6" style="stop-color:#FFDD00"/><stop  offset="1" style="stop-color:#C3DD19"/>
          </linearGradient>
          <linearGradient id="gcare" gradientUnits="userSpaceOnUse" x1="742" y1="290" x2="670" y2="590">
            <stop  offset="0" style="stop-color:#C3DD19"/><stop  offset="0.5" style="stop-color:#88DD33"/><stop  offset="1" style="stop-color:#55DD90"/>
          </linearGradient>
          <linearGradient id="gtransparency" gradientUnits="userSpaceOnUse" x1="700" y1="640" x2="400" y2="750">
            <stop  offset="0" style="stop-color:#55DD90"/><stop  offset="0.5" style="stop-color:#22DDEE"/><stop  offset="1" style="stop-color:#33B2EE"/>
          </linearGradient>
          <linearGradient id="gfreedom" gradientUnits="userSpaceOnUse" x1="350" y1="750" x2="100" y2="640">
            <stop  offset="0" style="stop-color:#33B2EE"/><stop  offset="0.5" style="stop-color:#4488EE"/><stop  offset="1" style="stop-color:#7777E5"/>
          </linearGradient>
          <linearGradient id="gunderstanding" gradientUnits="userSpaceOnUse" x1="100" y1="590" x2="20" y2="290">
            <stop  offset="0" style="stop-color:#7777E5"/><stop  offset="0.5" style="stop-color:#AA66DD"/><stop  offset="1" style="stop-color:#D46ED4"/>
          </linearGradient>
          <linearGradient id="gdiversity" gradientUnits="userSpaceOnUse" x1="20" y1="260" x2="219" y2="58">
            <stop  offset="0" style="stop-color:#D46ED4"/><stop  offset="0.5" style="stop-color:#FF77CC"/><stop  offset="1" style="stop-color:#FF8366"/>
          </linearGradient>
          <path id="equivalence" fill="none" stroke="url(#gequivalence)" stroke-width="24" stroke-miterlimit="10"
            d="M525.0481567,63.1570435  c-45.3894043-21.8797607-96.2866211-34.142334-150.0480957-34.142334   
              c-53.7633667,0-104.6621704,12.2634277-150.0527802,34.1446533" @mouseover="showvalue(1)"/>
          <path id="trust" fill="none" stroke="url(#gtrust)" stroke-width="24" stroke-miterlimit="10"
            d="M712.3186035,297.7496338 c-23.6291504-103.605957-93.7546997-189.5136719-187.2704468-234.5925903" @mouseover="showvalue(2)"/>
          <path id="care" fill="none" stroke="url(#gcare)" stroke-width="24" stroke-miterlimit="10" d="M645.6213379,590.5565796 
            c47.1600342-59.1289673,75.3640137-134.0441895,75.3640137-215.5565186c0-26.5563965-3.0014648-52.4103394-8.666748-77.2504272"
            @mouseover="showvalue(3)"/>
          <path id="transparency" fill="none" stroke="url(#gtransparency)" stroke-width="24" stroke-miterlimit="10"
            d="M375,720.9854126 c110,0,207.2280884-50.9467773,270.6212769-130.428833" @mouseover="showvalue(4)"/>
          <path id="freedom" fill="none" stroke="url(#gfreedom)" stroke-width="24" stroke-miterlimit="10"
            d="M104.3764725,590.5537109 C167.7696686,670.0374146,265,720.9854126,375,720.9854126" @mouseover="showvalue(5)"/>
          <path id="understanding" fill="none" stroke="url(#gunderstanding)" stroke-width="24" stroke-miterlimit="10"
            d="M37.68116,297.7509155 c-5.6650391,24.8396606-8.666441,50.6932373-8.666441,77.2491455c0,81.5109863,28.2031841,156.4251099,75.3618164,215.5536499"
            @mouseover="showvalue(6)"/>
          <path id="diversity" fill="none" stroke="url(#gdiversity)" stroke-width="24" stroke-miterlimit="10"
            d="M224.9472809,63.1593628 C131.433548,108.2390137,61.309639,194.1461182,37.68116,297.7509155" @mouseover="showvalue(7)"/>
        </g>

        <text class="font-weight-light" id="typo" x="0px" y="0px" transform="matrix(1 0 0 1 132 379)" opacity="0" fill="#555555" font-size="80">COOPERACY</text>
        <text id="payoff" x="0px" y="0px" textLength='475' transform="matrix(1 0 0 1 138 422)" opacity="0" stroke="#555555" fill="#555555" font-size="28">
          LET'S DO IT TOGETHER</text>

        <g id="equivalenceD" display="none">
          <a href="http://cooperacy.org/cooperation" class="noline finger">
            <text transform="matrix(1 0 0 1 157 360)" fill="#555555" font-size="65">EQUIVALENCE</text>
            <line style="display:inline;fill:#555555;stroke:#FF9000;stroke-width:6;stroke-miterlimit:10;" x1="150" y1="393" x2="600" y2="393"/>
            <text transform="matrix(1 0 0 1 225 440)" stroke="#555555" fill="#555555" font-size="25">EVERYONE IS IMPORTANT</text>
          </a>
        </g>

        <g id="trustD" display="none">
          <a href="http://cooperacy.org/cooperation" class="noline finger">
            <text transform="matrix(1 0 0 1 278 360)" fill="#555555" font-size="65">TRUST</text>
            <line style="display:inline;fill:#555555;stroke:#FFDD00;stroke-width:6;stroke-miterlimit:10;" x1="150" y1="393" x2="600" y2="393"/>
            <text transform="matrix(1 0 0 1 208 443)" stroke="#555555" fill="#555555" font-size="25">PEOPLE COUNT ON OTHERS</text>
          </a>
        </g>

        <g id="careD" display="none">
          <a href="http://cooperacy.org/cooperation" class="noline finger">
            <text transform="matrix(1 0 0 1 286 360)" fill="#555555" font-size="65">CARE</text>
            <line style="display:inline;fill:#555555;stroke:#88DD33;stroke-width:6;stroke-miterlimit:10;" x1="150" y1="393" x2="600" y2="393"/>
            <text transform="matrix(1 0 0 1 182 443)" stroke="#555555" fill="#555555" font-size="25">PEOPLE CARE FOR EACH OTHER</text>
          </a>
        </g>

        <g id="transparencyD" display="none">
          <a href="http://cooperacy.org/cooperation" class="noline finger">
            <text transform="matrix(1 0 0 1 132 360)" fill="#555555" font-size="65">TRANSPARENCY</text>
            <line style="display:inline;fill:#555555;stroke:#22DDEE;stroke-width:6;stroke-miterlimit:10;" x1="150" y1="393" x2="600" y2="393"/>
            <text transform="matrix(1 0 0 1 194 443)" stroke="#555555" fill="#555555" font-size="25">PEOPLE WANT TO BE HONEST</text>
          </a>
        </g>

        <g id="freedomD" display="none">
          <a href="http://cooperacy.org/cooperation" class="noline finger">
            <text transform="matrix(1 0 0 1 222 360)" fill="#555555" font-size="65">FREEDOM</text>
            <line style="display:inline;fill:#555555;stroke:#4488EE;stroke-width:6;stroke-miterlimit:10;" x1="150" y1="393" x2="600" y2="393"/>
            <text transform="matrix(1 0 0 1 184 443)" stroke="#555555" fill="#555555" font-size="25">PEOPLE FOLLOW THEIR DESIRES</text>
          </a>
        </g>

        <g id="understandingD" display="none">
          <a href="http://cooperacy.org/cooperation" class="noline finger">
            <text transform="matrix(1 0 0 1 118 360)" fill="#555555" font-size="65">UNDERSTANDING</text>
            <line style="display:inline;fill:#555555;stroke:#AA66DD;stroke-width:6;stroke-miterlimit:10;" x1="150" y1="393" x2="600" y2="393"/>
            <text transform="matrix(1 0 0 1 116 443)" stroke="#555555" fill="#555555" font-size="25">PEOPLE TRY TO UNDERSTAND EACH OTHER</text>
          </a>
        </g>

        <g id="diversityD" display="none">
          <a href="http://cooperacy.org/cooperation" class="noline finger">
            <text transform="matrix(1 0 0 1 218 360)" fill="#555555" font-size="65">DIVERSITY</text>
            <line style="display:inline;fill:#555555;stroke:#FF77CC;stroke-width:6;stroke-miterlimit:10;" x1="150" y1="393" x2="600" y2="393"/>
            <text transform="matrix(1 0 0 1 180 443)" fill="#555555" stroke="#555555" font-size="25">PEOPLE WANT TO BE INCLUDED</text>
          </a>
        </g>
      </svg>
    </div>
    <!--END CIRCLE-->

    <div id="homefade" style="opacity:0"><!--FADING AREA-->
          <div class="row mb-5 pt-2">
          <div class="col-lg-4 col-xs-12 subheading text-center"><a href="/platform" class="noline transparency space">DISCOVER</a></div>
          <div class="col-lg-4 col-xs-12 subheading text-center"><a href="/cooperation" class="noline understanding space">LEARN</a></div>
          <div class="col-lg-4 col-xs-12 subheading text-center"><a href="/register" class="noline equivalence space">JOIN</a></div>
          </div>
          <p class="base text-center">Cooperacy is a nonprofit scientific project aiming to spread cooperation amongst humans and in their ecosystem.</p>
          <p class="base text-center mb-2">We're setting up a <a href="/platform" class="ae">platform</a> in which, supported by money, people help each other 
            to realise what they want for their lives taking decisions together in a productive way.</p>
          <p class="base text-center mb-3"><a href="/register" class="ae">Joining</a> Cooperacy is entertaining and makes you learn how to develop
            enjoyable cooperations in your <a href="/aboutyou" class="ad">personal</a> relations, in the <a href="/coorporate" class="af">corporate</a>
            world and at the <a href="/cci" class="au">international</a> level.
          </p>
          <div class="base text-center"><p class="base text-center mb-3"><a class="ae" href="/register">Join</a> Cooperacy today, 
          or <a class="ai" href="https://www.cooperacy.org/contact">contact us</a> for more information.</p><br></div>
    </div> <!--END FADING AREA-->
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        values: ['all', 'equivalence', 'trust', 'care', 'transparency', 'freedom', 'understanding', 'diversity'],
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.randomtype()
      })
    },
    methods: { 
      randomtype() {
      var randomino = (Math.floor(Math.random() * 8))
      if (randomino == 0) {
        var i
        for (i = 1; i < 8; i++) {
          document.getElementById(this.values[i]).style['opacity'] = '1'
          }
      } else {
        document.getElementById(this.values[randomino]).style.opacity = '1'
        setTimeout(function () {
          var i
          for (i = 1; i < 8; i++) {if (i === randomino) {continue}
            document.getElementById(this.values[i]).style['animation'] = 'fade-in 4s cubic-bezier(.14,.65,.25,.98) forwards'}}, 2300)}
      },
      showvalue(v) {
        var i
        for (i = 1; i < 8; i++) {document.getElementById(this.values[i]+'D').style['display'] = 'none'}
            document.getElementById('typo').style['display'] = 'none'
            document.getElementById('payoff').style['display'] = 'none'
            document.getElementById(this.values[v]+'D').style['display'] = 'inline'},
      }
  }
</script>
