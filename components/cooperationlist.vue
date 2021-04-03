<template>
  <b-container class="m-0 p-0" ref="cooperationlistcomponent">
    <voteinfomodal />
    <b-container
      v-for="type in cooperationType"
      :key="type.id"
      class="m-0 p-0"
      fluid
    >
      <h2
        v-if="cooperationlist[type.name].length > 0"
        class="text-center mb-3 up"
      >
        <span class="hb" v-if="$route.path == '/'">RECENT</span>
        <span class="hb" v-if="!$route.params.id">{{ type.name }}</span>
        <span class="hb" v-if="$route.path == '/user'"
          ><br />
          (YOU AUTHORED OR FOLLOW)
        </span>
      </h2>
      <b-container
        v-for="cooperation in cooperationlist[type.name]"
        :key="cooperation.id"
        :class="'m-0 p-0 mb-3 ' + cooperationbox(cooperation)"
      >
        <b-row class="m-0 p-0 w-100 p-0">
          <b-col cols="12" class="m-0 p-0 w-100">
            <b-row class="m-0 p-0 w-100" v-if="$route.params.id">
              <b-col cols="4"></b-col>
              <b-col cols="4">
                <img
                  :src="'/assets/image/cooperation/' + cooperation.id + '.png'"
                  class="img-100"
                />
              </b-col>
              <b-col cols="4"></b-col>
            </b-row>
            <b-row class="m-0 p-0 w-100">
              <b-col cols="12 text-center">
                <nuxt-link :to="'/cooperation/' + cooperation.id">
                  <span
                    class="space subheading up"
                    v-if="type.name == 'cooperations'"
                  >
                    {{ cooperation.title }}
                  </span>
                  <span
                    class="space subheading up o25"
                    v-if="type.name == 'deactivated'"
                  >
                    {{ cooperation.title }}
                  </span>
                </nuxt-link>
                <br />
                <small class="mb-2 up t12">
                  <i>{{ cooperation.brief }}</i>
                </small>
              </b-col>
              <b-col cols="12 text-center" v-if="$route.params.id">
                <p>
                  {{ cooperation.content }}
                </p>
                <p>
                  TAGS:
                  <span v-for="tag in $store.state.tag" :key="tag.id">
                    {{ tag.name }}
                  </span>
                  <span>
                    - <b-link v-b-modal.addtagmodal class="ac">Add</b-link> or
                    <b-link v-b-modal.removetagmodal class="au">remove</b-link>
                    a tag
                  </span>
                </p>
              </b-col>
            </b-row>
            <b-row class="m-0 p-0 w-100 text-center">
              <b-col cols="12" v-if="$route.params.id">
                <b-container>
                  <small>
                    <strong>AFTF: </strong
                    >{{ cooperation.anonymous ? 'ON' : 'OFF' }}
                  </small>
                  <small v-if="cooperation.mode == 20">
                    <strong>FEE: </strong> {{ Math.round(cooperation.budget) }}
                    <br />
                  </small>
                  <br />
                  <nuxt-link :to="'/cooperation/' + cooperation.parent"
                    ><small>
                      <strong>PARENT COOPERATION: </strong>
                      {{ cooperation.parent }}
                    </small>
                  </nuxt-link>
                  <br />
                </b-container>
                <b-container>
                  <small>
                    {{ category(cooperation.category) }} related cooperation
                    {{ mode(cooperation.mode) }} -
                    {{ location(cooperation.place) }}
                  </small>
                </b-container>
              </b-col>
            </b-row>
            <!-- BUDGET BAR -->
            <b-row class="m-0 p-0 w-100 t10">
              <b-col cols="12">
                <b-progress
                  v-if="cooperation.mode > 9 && cooperation.budget != 0"
                  max="1"
                  class="mt-2"
                >
                  <b-progress-bar
                    :value="
                      collected(cooperation) / Math.abs(cooperation.budget)
                    "
                    :label="
                      Math.round(
                        (collected(cooperation) /
                          Math.abs(cooperation.budget)) *
                          100
                      ) + '%'
                    "
                    :class="'b' + budgetbar(cooperation.mode)"
                  ></b-progress-bar>
                  <b-progress-bar
                    :value="
                      1 -
                      Math.round(
                        collected(cooperation) / Math.abs(cooperation.budget)
                      )
                    "
                    :class="'they' + budgetbar(cooperation.mode) + ' std'"
                  ></b-progress-bar>
                </b-progress>
                <span v-if="cooperation.mode > 0 && cooperation.budget > 0">
                  BUDGET: €{{ collected(cooperation).toFixed(7) }} of €{{
                    Math.round(cooperation.budget)
                  }}
                  collected
                </span>
                <span v-if="cooperation.mode == 20">
                  BUDGET: €{{ collected(cooperation).toFixed(0) }} of €{{
                    Math.round(cooperation.budget * -1)
                  }}
                  collected
                </span>
              </b-col>
            </b-row>
            <!-- HUDGET BAR -->
            <b-row class="m-0 p-0 w-100 t10">
              <b-col cols="12">
                <b-progress
                  v-if="cooperation.hudget != 0 && cooperation.mode > 0"
                  max="1"
                  class="mt-2"
                >
                  <b-progress-bar
                    :value="cooperation.professional / cooperation.hudget"
                    :label="
                      Math.round(
                        (cooperation.professional / cooperation.hudget) * 100
                      ) + '%'
                    "
                    class="bfreedom"
                  ></b-progress-bar>
                  <b-progress-bar
                    :value="
                      negprogress(
                        1 - cooperation.professional / cooperation.hudget
                      )
                    "
                    class="theyfreedom"
                  ></b-progress-bar>
                </b-progress>
                <span v-if="cooperation.hudget != 0 && cooperation.mode > 0"
                  >HUDGET: {{ cooperation.professional }} of
                  {{ cooperation.hudget }} professionals needed</span
                >
              </b-col>
            </b-row>
            <!-- VOTEBAR -->
            <b-row class="m-0 px-2 pb-1 w-100">
              <b-col cols="12" class="m-0 p-0 w-100 text-center">
                <votebar
                  :voteprop="cooperation"
                  :proptype="'cooperation'"
                  :vote-id="cooperation.id"
                />
              </b-col>
            </b-row>
            <!-- INFO -->
            <b-row class="m-0 p-0 w-100">
              <b-col cols="12">
                <b-row
                  class="m-0 p-0 w-100"
                  v-if="$auth.user && $route.params.id"
                >
                  <b-col cols="12" class="m-0 p-0 text-center">
                    <span v-if="cooperation.mode > 0 && $auth.user.role == 1">
                      <b-link class="ae" @click="dereactivate(cooperation)"
                        >Deactivate</b-link
                      >&nbsp;
                    </span>
                    <span v-if="cooperation.mode < 0 && $auth.user.role == 1"
                      ><b-link class="ae" @click="dereactivate(cooperation)"
                        >Reactivate</b-link
                      >&nbsp;
                    </span>
                    <span
                      v-if="
                        cooperation.collect >= cooperation.budget &&
                        cooperation.mode > 100 &&
                        (improfessional() || $auth.user.role == 1)
                      "
                    >
                      <b-link v-b-modal.budgetstepmodal class="at"
                        >Upload Budget Step Document</b-link
                      >&nbsp;
                    </span>
                    <span
                      ><b-link class="ai" @click="copy()">Copy</b-link>&nbsp;
                    </span>
                    <span
                      v-if="
                        (cooperation.mode > 0 && improfessional()) ||
                        $auth.user.role == 1
                      "
                    >
                      <b-link v-b-modal.professionalmodal class="af"
                        >Add/Remove professionals</b-link
                      >&nbsp;
                    </span>
                    <span
                      v-if="
                        (cooperation.mode > 0 && improfessional()) ||
                        $auth.user.role == 1
                      "
                    >
                      <b-link class="au" @click="edit()">Edit</b-link>&nbsp;
                    </span>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <tagmodal
          v-if="$route.params.id && $auth.user"
          :cooperationprop="cooperation"
        />
        <professionalmodal
          v-if="$route.params.id && $auth.user"
          :cooperationprop="cooperation"
          :userlistprop="$store.state.userlist"
        />
        <budgetstepmodal
          v-if="$route.params.id && $auth.user"
          :cooperationprop="cooperation"
        />
        <votebarmodal :cooperationprop="cooperation" />
      </b-container>
    </b-container>
    <p class="text-center none" @click="more($store.state.cooperation.length)">
      More...
    </p>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      isHover: null,
      cooperationnum: 7,
      cooperationcounter: 1,
      cooperationType: [
        { id: 1, name: 'cooperations' },
        { id: 2, name: 'deactivated' },
      ],
      incremental: -1,
      updatesec: 1, //sets how frequently the collected budget is updated
      interval: null,
    }
  },
  computed: {
    cooperationlist() {
      if (this.$route.params.id) {
        return {
          cooperations: this.$store.state.cooperation.filter(
            (cooperation) => cooperation.id == this.$route.params.id
          ),
          deactivated: [],
        }
      } else {
        return {
          cooperations: this.$store.state.cooperation.filter(
            (cooperation) => cooperation.mode > 0
          ),
          deactivated: this.$store.state.cooperation.filter(
            (cooperation) => cooperation.mode < 0
          ),
        }
      }
    },
  },
  mounted() {
    this.increment()
  },
  methods: {
    more(howmany) {
      alert(howmany)
    },
    increment() {
      this.interval = setInterval(() => {
        this.incremental++
      }, this.updatesec * 1000)
    },
    collected(cooperation) {
      if (parseFloat(cooperation.budget) < 0) {//if participation mode:
        return cooperation.E * parseFloat(cooperation.collect)
      }
      if (cooperation.E == 0) { return parseFloat(cooperation.collect) } // if E-votes are zero, there is no update to do
      else if (parseFloat(cooperation.collect) < parseFloat(cooperation.budget)) {//if funding mode:
        // here we add to cooperation.collect (the amount collected so far) the increment of every second,
        // times the update seconds interval times the % of the cooperation E-votes over the total of the E-votes
        return (
          parseFloat(cooperation.collect) +
          this.incremental *
          this.$store.state.fundingvar.totalfee *
          0.000000380517504 *
          this.updatesec *
          (cooperation.E / this.$store.state.fundingvar.totalE)
        )
      }
      return parseFloat(cooperation.collect)
    },
    budgetbar(mode) {
      let color
      mode == 20 ? color = 'trust' : color = 'equivalence'
      return color
    },
    improfessional() {
      let mepro = this.$store.state.professional.filter(
        pro =>
          pro.user == this.$auth.user && pro.cooperation == this.$route.params.id
      )
      if (mepro.length > 0) return true
      else return false
    },
    cooperationbox(cooperation) {
      let boxclass = 'gcooperationbox'
      let categorycolor = ['e', 't', 'c', 'i', 'f', 'u', 'd'] //order these according categories
      for (let i = 0; i < 7; i++) {
        if (cooperation.category == i + 1) {
          boxclass =
            categorycolor[i] + 'cooperationbox'
        }
      }
      return boxclass
    },
    dereactivate(cooperation) {
      let formBodyRequest = { ...cooperation }
      formBodyRequest.mode *= -1
      this.$store.dispatch('cooperationForm', formBodyRequest)
      this.$store.dispatch('getUserCooperation', {
        userid: this.$auth.user.id,
      })
      return this.$router.push({ path: '/user' })
    },
    professional() {
      this.store.dispatch('addprofessional', { id: this.formProfessional })
    },
    edit() {
      this.$store.dispatch('editSwitch', { id: this.$route.params.id })
      return this.$router.push({ path: '/cooperation/form' })
    },
    copy() {
      this.$store.dispatch('editSwitch', {
        id: this.$route.params.id,
        copy: true,
      })
      return this.$router.push({ path: '/cooperation/form' })
    },
    negprogress(num) {
      num < 0 ? (num = 0) : (num = num)
      return num
    },
    mode(id) {
      let modeinfo = 'in '
      if (id < 0) modeinfo += 'inactive '
      modeinfo += this.$store.state.mode.find((mode) => mode.id == Math.abs(id)).name + ' mode'
      return modeinfo
    },
    category(id) {
      return this.$store.state.category.find((category) => category.id == id)
        .name
    },
    location(id) {
      let cooperationPlace = this.$store.state.place.find((place) => place.id == id)
      if (cooperationPlace) {
        let cooperationCountry = this.$store.state.country.find(
          (country) => country.id == cooperationPlace.country
        )
        if (cooperationCountry) {
          return cooperationPlace.name + ', ' + cooperationCountry.name
        }
      } else {
        return 'Unknown'
      }
    },
  },
  destroyed() {
    clearInterval(this.interval)
  },
}
</script>
