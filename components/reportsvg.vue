<template>
  <b-container class="m-0 p-0">
    <svg viewBox="0,0,1000,800">
      <rect x="0" y="0" width="100%" height="100px" class="diversity o25" />
      <rect
        x="0"
        y="0"
        :width="((result.MBD + result.MRD + result.BD + result.RD) * 250)"
        height="100px"
        class="diversity"
      />
      <text transform="matrix(1 0 0 1 15 55)" class="t20 hb white stroke">
        DIVERSITY:
        {{
          Math.round((result.MBD + result.MRD + result.BD + result.RD) * 25)
        }}%
      </text>
      <rect
        x="0"
        y="110"
        width="100%"
        height="100px"
        class="understanding o25"
      />
      <rect
        x="0"
        y="110"
        :width="(result.MBU + result.MRU + result.BU + result.RU) * 250"
        height="100px"
        class="understanding"
      />
      <text transform="matrix(1 0 0 1 15 165)" class="t20 hb white stroke">
        UNDERSTANDING:
        {{
          Math.round((result.MBU + result.MRU + result.BU + result.RU) * 25)
        }}%
      </text>
      <rect x="0" y="220" width="100%" height="100px" class="freedom o25" />
      <rect
        x="0"
        y="220"
        :width="((result.MBF + result.MRF + result.BF + result.RF) * 250)"
        height="100px"
        class="freedom"
      />
      <text transform="matrix(1 0 0 1 15 275)" class="t20 hb white stroke">
        FREEDOM:
        {{
          Math.round((result.MBF + result.MRF + result.BF + result.RF) * 25)
        }}%
      </text>
      <rect
        x="0"
        y="330"
        width="100%"
        height="100px"
        class="transparency o25"
      />
      <rect
        x="0"
        y="330"
        :width="
                      ((result.MBI + result.MRI + result.BI + result.RI) * 250)
                    "
        height="100px"
        class="transparency"
      />
      <text transform="matrix(1 0 0 1 15 385)" class="t20 hb white stroke">
        TRANSPARENCY:
        {{
          Math.round((result.MBI + result.MRI + result.BI + result.RI) * 25)
        }}%
      </text>
      <rect x="0" y="440" width="100%" height="100px" class="care o25" />
      <rect
        x="0"
        y="440"
        :width="
                      ((result.MBC + result.MRC + result.BC + result.RC) * 250)
                    "
        height="100px"
        class="care"
      />
      <text transform="matrix(1 0 0 1 15 495)" class="t20 hb white stroke">
        CARE:
        {{
          Math.round((result.MBC + result.MRC + result.BC + result.RC) * 25)
        }}%
      </text>
      <rect x="0" y="550" width="100%" height="100px" class="trust o25" />
      <rect
        x="0"
        y="550"
        :width="
                      ((result.MBT + result.MRT + result.BT + result.RT) * 250)
                    "
        height="100px"
        class="trust"
      />
      <text transform="matrix(1 0 0 1 15 605)" class="t20 hb white stroke">
        TRUST:
        {{
          Math.round((result.MBT + result.MRT + result.BT + result.RT) * 25)
        }}%
      </text>
      <rect x="0" y="660" width="100%" height="100px" class="equivalence o25" />
      <rect
        x="0"
        y="660"
        :width="
                      ((result.MBE + result.MRE + result.BE + result.RE) * 250)
                    "
        height="100px"
        class="equivalence"
      />
      <text transform="matrix(1 0 0 1 15 715)" class="t20 hb white stroke">
        EQUIVALENCE:
        {{
          Math.round((result.MBE + result.MRE + result.BE + result.RE) * 25)
        }}%
      </text>
    </svg>
  </b-container>
</template>

<script>
//cc stands for cooperation condition, proptype could be user, project or comment
export default {
  props: {
    result: { required: true },
  },
}
</script>