<template>
  <div>
    <br /><img class="page-header" src="~/assets/image/page/banners/cci.png" />

    <div style="text-align:center;">
      <p class="center" style="margin-top:10px;text-align:center">
        <object
          id="countries-map"
          type="image/svg+xml"
          style="width:80%; height:80%"
          data="/map.svg"
        >
          <param name="wmode" value="transparent"
        /></object>

        <br />
      </p>
    </div>

    <div
      id="map_btn"
      style="display:block; text-align:center; color:#aa66dd; font-size:24px"
      onclick="return countries.ii_click();"
    >
      <p class="subheading understanding center space">
        CLICK HERE FOR THE COOPERATION CONTEXT INDEX
      </p>
    </div>

    <div class="country-details">
      <div class="row">
        <div class="col-lg-12 col-xs-12 text-center">
          <span id="country-value"></span>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-3 col-xs-12">
          <span class="detail country" style="font-weight:lighter;">
            CCI <span id="CCI-value"></span
          ></span>
        </div>
        <div class="col-lg-3 col-xs-12">
          <span
            class="detail equivalence"
            style="font-weight:lighter; color: #ff9900;"
            >EQUIVALENCE <span id="equivalence-value"></span
          ></span>
        </div>
        <div class="col-lg-3 col-xs-12">
          <span
            class="detail trust"
            style="font-weight:lighter; color: #ffdd00;"
            >TRUST <span id="trust-value"></span
          ></span>
        </div>
        <div class="col-lg-3 col-xs-12">
          <span class="detail care" style="font-weight:lighter; color: #99ff55;"
            >CARE <span id="care-value"></span
          ></span>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-3 col-xs-12">
          <span
            class="detail transparency"
            style="font-weight:lighter; color: #55ffff;"
            >TRANSPARENCY <span id="transparency-value"></span
          ></span>
        </div>
        <div class="col-lg-3 col-xs-12">
          <span
            class="detail freedom"
            style="font-weight:lighter; color: #0077ee;"
            >FREEDOM <span id="freedom-value"></span
          ></span>
        </div>
        <div class="col-lg-3 col-xs-12">
          <span
            class="detail understanding"
            style="font-weight:lighter; color: #aa77dd;"
            >UNDERSTANDING <span id="understanding-value"></span
          ></span>
        </div>
        <div class="col-lg-3 col-xs-12">
          <span
            class="detail diversity"
            style="font-weight:lighter; color: #ff00ff;"
            >DIVERSITY <span id="diversity-value"></span
          ></span>
        </div>
      </div>
    </div>

    <p class="subheading understanding center space margin mt-5">
      THE COOPERATION CONTEXT INDEX BY COUNTRY
    </p>
    <p class="base">
      The Cooperation Context Index is a measure of the <i>possibility</i> of
      <a class="ae" href="/cooperation">cooperation</a> in a country, by
      analyzing and cross-checking more than 150 international official
      indexes.<br /><br />

      It is based on the Cooperation Science
      <a class="au" href="/coscience">framework</a> and shows a non-performative
      map of the prevalent condition of cooperation over the seven others:
      <a class="ae" href="/cooperation#equivalence">equivalence</a>,
      <a class="at" href="/cooperation#trust">trust</a>,
      <a class="ac" href="/cooperation#care">care</a>,
      <a class="ai" href="/cooperation#transparency">transparency</a>,
      <a class="af" href="/cooperation#freedom">freedom</a>,
      <a class="au" href="/cooperation#understanding">understanding</a>,
      <a class="ad" href="/cooperation#diversity">diversity</a>; and a level of
      the possibility to establish cooperations in each country analyzed. The
      results can be consulted in the interactive map, that shows 139 countries
      with 2017 CCI index data and 39 with the 2016 one, with a total of 178
      countries. The impact of every condition of cooperation over the whole
      index is similar, with the exception of the diversity condition which is
      currently irrelevant, as its effect depends on the other conditions.
      Usually high diversity becomes a plus when the CCI index is higher than
      one. Countries with a CCI value of more than two leverage over the
      diversity, while countries close to 0 and lower with a high diversity have
      high risks to generate conflicts. <br /><br />
    </p>

    <p class="subheading understanding center space margin">THE INDEXES</p>
    <p class="base">
      The list of indexes spans through 2014-2016 data retrieved from online
      public sources: BTI-Project; EIU - Democracy Index; Ethnologue linguistic
      diversity by country; Freedom house; Global Corruption Barometer -
      Transparency International; Global Food Security Index; The World Bank;
      ipu.org; UNHCR; SE4ALL; OECD National Accounts data files; Internal
      Displacement Monitoring Centre; UN Inter-agency Group for Child Mortality
      Estimation; UN Office on Drugs and Crime's International Homicide
      Statistics database; UNESCO; UNICEF; WHO; JMP; FAO; U.N. Population
      Division; Eurostat; Human Trafficking Report; Infoplease refined by
      internal research; International Budget Partnership; International
      consortium of investigative journalists; Internet live stats; Pew Research
      Center RDI; Transparency International; Wikileaks; World Economic Forum;
      World Press Freedom Index. We will soon openly release the CCI data files.
    </p>
    <br /><br />
    <p class="subheading understanding center space margin">LIMITATIONS</p>
    <p class="base">
      The CCI is an index based on other indexes. We tried to use as much as we
      could native indexes, that is, not based on other indexes. This is because
      it happens sometimes to have composite indexes based on other composite
      ones, doubling the effect of their internal native components when they
      are the same. A few of the indexes we used, though, even if primitive,
      could have been influenced by other indexes, political pressures or wrong
      procedures. The many indexes used in our analysis should counterbalance
      with their variety part of the error generated by these bias.
    </p>
    <br /><br />
  </div>
</template>

<script>
import ccimap from '@/components/ccimap'

export default {
  components: { ccimap: ccimap },
  async fetch({ store, params }) {
    await store.dispatch('getCCIAction', { cciyear: '2017' })
    await store.dispatch('getCCIAction', { cciyear: '2016' })
    await store.dispatch('getCCIAction', { cciyear: '2015' })
  },
  head: {
    title: 'Cooperation Context Index',
    script: [
      {
        src: '/map.js'
      }
    ]
  },
  data() {
    return {
      cacca: 'fill:#FF0000'
    }
  }
}
</script>
