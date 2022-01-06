<template>
  <b-container class="m-0 p-0 pagecontainer">
    <br /><img
      class="page-header"
      src="~/assets/image/page/banners/main/aboutyou.png"
    />
    <p class="base" style="margin-right: auto">
      {{ $t('aboutyou.1') }}
      <span v-html="$t('aboutyou.2')"></span>
      <nuxt-link to="/main/cooperation" class="ae">{{
        $t('aboutyou.3')
      }}</nuxt-link
      >.
    </p>
    <br />

    <p class="base">
      {{ $t('aboutyou.4')
      }}<nuxt-link to="/main/cooperation#freedom" class="af">{{
        $t('aboutyou.5')
      }}</nuxt-link
      >.<br /><br />
    </p>
    <p class="base">
      {{ $t('aboutyou.6')
      }}<nuxt-link to="/main/platform" class="ae"
        >{{ $t('aboutyou.7') }}
      </nuxt-link>
      <span class="base" v-html="$t('aboutyou.8')"></span>
      <nuxt-link to="/main/cooperation" class="au">{{
        $t('aboutyou.9')
      }}</nuxt-link
      >.<br /><br />
      <span class="base" v-html="$t('aboutyou.10')"></span>
      <nuxt-link to="/main/research" class="au">{{
        $t('aboutyou.11')
      }}</nuxt-link>
      <span class="base" v-html="$t('aboutyou.12')"></span>
      <nuxt-link to="/main/cooperation#care" class="ac">{{
        $t('aboutyou.13')
      }}</nuxt-link
      >.<br /><br />

      <span class="base" v-html="$t('aboutyou.14')"></span>
      <nuxt-link to="/main/governance" class="af">{{
        $t('aboutyou.15')
      }}</nuxt-link
      >.
      <span class="base" v-html="$t('aboutyou.16')"></span>
      <nuxt-link to="/main/cooperation#freedom" class="af">{{
        $t('aboutyou.17')
      }}</nuxt-link
      >.
      <span class="base" v-html="$t('aboutyou.18')"></span>
      <nuxt-link to="/main/integration" class="ad">{{
        $t('aboutyou.19')
      }}</nuxt-link>
      <span class="base" v-html="$t('aboutyou.20')"></span>.<br /><br />
      <span class="base" v-html="$t('aboutyou.21')"></span>
      <nuxt-link to="/main/cooperation#transparency" class="ai">{{
        $t('aboutyou.22')
      }}</nuxt-link>
      <span class="base" v-html="$t('aboutyou.23')"></span>
      <nuxt-link to="/main/cooperation#transparency" class="ai">{{
        $t('aboutyou.24')
      }}</nuxt-link
      ><span class="base">{{ $t('aboutyou.25') }}</span
      >.<br /><br />
    </p>

    <p class="base" v-html="$t('aboutyou.26')"></p>
    <br />

    <p class="base">
      <span class="base" v-html="$t('aboutyou.27')"></span>
      <nuxt-link to="/main/cooperation#care" class="ac">{{
        $t('aboutyou.28')
      }}</nuxt-link>
      <span class="base" v-html="$t('aboutyou.29')"></span>
      <nuxt-link to="/main/cooperation#diversity" class="ad">{{
        $t('aboutyou.30')
      }}</nuxt-link>
      <span class="base" v-html="$t('aboutyou.31')"></span>
      <nuxt-link to="/main/cooperation#equivalence" class="ae">{{
        $t('aboutyou.32')
      }}</nuxt-link>
      <span class="base" v-html="$t('aboutyou.33')"></span>.<br /><br />
      <span class="base" v-html="$t('aboutyou.34')"></span>
      <nuxt-link to="/main/platform" class="ae">{{
        $t('aboutyou.35')
      }}</nuxt-link
      ><span class="base" v-html="$t('aboutyou.36')"></span>
      <nuxt-link to="/main/cooperation#care" class="ac">{{
        $t('aboutyou.37')
      }}</nuxt-link
      ><span class="base" v-html="$t('aboutyou.38')"></span>
      <nuxt-link to="/main/cooperation#diversity" class="ad">{{
        $t('aboutyou.39')
      }}</nuxt-link
      >.<br /><br />
      <span class="base" v-html="$t('aboutyou.40')"></span>
      <nuxt-link to="/main/participate" class="ae"
        >{{ $t('aboutyou.41') }}
      </nuxt-link>
      <span class="base" v-html="$t('aboutyou.42')"></span><br /><br />
      <span class="base" v-html="$t('aboutyou.43')"></span><br /><br />
      <nuxt-link to="/login" class="ae">{{ $t('aboutyou.44') }}</nuxt-link>
      <span class="base" v-html="$t('aboutyou.45')"></span>
    </p>
    <br />
  </b-container>
</template>
<script>
export default {
  head() {
    return {
      title: 'Cooperacy - About You'
    }
  }
}
</script>
