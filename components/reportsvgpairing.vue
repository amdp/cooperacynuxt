<template>
  <b-container class="m-0 p-0">
    <svg viewBox="0,0,1000,500">
      <rect x="0" y="0" width="100%" height="50px" class="trust o25" />
      <rect
        x="0"
        y="0"
        :width="Math.round(result.P * 1000)"
        height="50px"
        class="trust"
      />
      <text transform="matrix(1 0 0 1 15 30)" class="t20 hb white it stroke">
        GENERAL PAIRING:
        {{ Math.round(result.P * 100) }}%
      </text>
      <rect x="0" y="54" width="100%" height="50px" class="diversity o25" />
      <rect
        x="0"
        y="54"
        :width="Math.round(result.PD * 1000)"
        height="50px"
        class="diversity"
      />
      <text transform="matrix(1 0 0 1 15 84)" class="t20 hb white it stroke">
        PAIRING DIVERSITY:
        {{ Math.round(result.PD * 100) }}%
      </text>
      <rect
        x="0"
        y="108"
        width="100%"
        height="50px"
        class="understanding o25"
      />
      <rect
        x="0"
        y="108"
        :width="Math.round(result.PU * 1000)"
        height="50px"
        class="understanding"
      />
      <text transform="matrix(1 0 0 1 15 142)" class="t20 hb white it stroke">
        PAIRING UNDERSTANDING:
        {{ Math.round(result.PU * 100) }}%
      </text>
      <rect x="0" y="162" width="100%" height="50px" class="freedom o25" />
      <rect
        x="0"
        y="162"
        :width="Math.round(result.PF * 1000)"
        height="50px"
        class="freedom"
      />
      <text transform="matrix(1 0 0 1 15 196)" class="t20 hb white it stroke">
        PAIRING FREEDOM:
        {{ Math.round(result.PF * 100) }}%
      </text>
      <rect x="0" y="216" width="100%" height="50px" class="transparency o25" />
      <rect
        x="0"
        y="216"
        :width="Math.round(result.PI * 1000)"
        height="50px"
        class="transparency"
      />
      <text transform="matrix(1 0 0 1 15 250)" class="t20 hb white it stroke">
        PAIRING TRANSPARENCY:
        {{ Math.round(result.PI * 100) }}%
      </text>
      <rect x="0" y="270" width="100%" height="50px" class="care o25" />
      <rect
        x="0"
        y="270"
        :width="Math.round(result.PC * 1000)"
        height="50px"
        class="care"
      />
      <text transform="matrix(1 0 0 1 15 304)" class="t20 hb white it stroke">
        PAIRING CARE:
        {{ Math.round(result.PC * 100) }}%
      </text>
      <rect x="0" y="324" width="100%" height="50px" class="trust o25" />
      <rect
        x="0"
        y="324"
        :width="Math.round(result.PT * 1000)"
        height="50px"
        class="trust"
      />
      <text transform="matrix(1 0 0 1 15 358)" class="t20 hb white it stroke">
        PAIRING TRUST:
        {{ Math.round(result.PT * 100) }}%
      </text>
      <rect x="0" y="378" width="100%" height="50px" class="equivalence o25" />
      <rect
        x="0"
        y="378"
        :width="Math.round(result.P * 1000)"
        height="50px"
        class="equivalence"
      />
      <text transform="matrix(1 0 0 1 15 412)" class="t20 hb white it stroke">
        PAIRING EQUIVALENCE:
        {{ Math.round(result.PE * 100) }}%
      </text>
      <rect x="0" y="432" width="100%" height="50px" class="trust o25" />
      <rect
        x="0"
        y="432"
        :width="Math.round(result.PFinal * 1000)"
        height="50px"
        class="trust"
      />
      <text transform="matrix(1 0 0 1 15 466)" class="t20 hb white it stroke">
        PAIRING FINAL:
        {{ Math.round(result.PFinal * 100) }}%
      </text>
    </svg>
  </b-container>
</template>

<script>
//cc stands for cooperation condition, proptype could be user, cooperation or comment
export default {
  props: {
    result: { required: true },
  },
}
</script>