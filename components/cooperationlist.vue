<template>
  <b-container
    fluid
    class="justify-content-center m-0 p-0"
    ref="cooperationlistcomponent"
  >
    <voteinfomodal />
    <b-container
      v-for="type in cooperationTypes"
      :key="type.id"
      class="justify-content-center m-0 p-0"
      fluid
    >
      <h2
        v-if="cooperationlist[type.type].length > 0"
        class="text-center mb-3 up"
      >
        <span class="hb" v-if="$route.path == '/'">RECENT</span>
        <span class="hb" v-if="!$route.params.id">{{ type.type }}</span>
        <span class="hb" v-if="$route.path == '/user'"
          ><br />
          (YOU AUTHORED OR FOLLOW)
        </span>
      </h2>
      <b-container
        v-for="cooperation in cooperationlist[type.type]"
        :key="cooperation.id"
        :class="'p-1 mx-auto mb-3 w-100 ' + cooperationbox(cooperation)"
        class="m-0 p-0"
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
                    v-if="type.type == 'cooperations'"
                  >
                    {{ cooperation.title }}
                  </span>
                  <span
                    class="space subheading up o25"
                    v-if="type.type == 'deactivated'"
                  >
                    {{ cooperation.title }}
                  </span> </nuxt-link
                ><br />
                <small class="mb-2 up t12">
                  <i>{{ cooperation.brief }}</i>
                </small>
                <p v-if="$route.params.id">
                  {{ cooperation.content }}
                </p>
                <p v-if="$route.params.id">
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
              <b-col cols="12">
                <b-container v-if="$route.params.id">
                  <small>
                    <strong>AFTF: </strong
                    >{{ cooperation.anonymous ? 'ON' : 'OFF' }}
                  </small>
                  <small v-if="cooperation.mode == 20">
                    <strong>FEE: </strong> {{ Math.round(cooperation.budget) }}
                    <br />
                  </small>
                  <br />
                  <small>
                    <strong>PARENT COOPERATION: </strong>
                    {{ cooperation.parent }}
                  </small>
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
            <b-row class="m-0 p-0 w-100">
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
            <b-row class="m-0 p-0 w-100">
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
            <b-row class="m-0 p-2 w-100">
              <b-col cols="12" class="m-0 p-0 w-100 text-center">
                <b-link v-b-modal.voteinfomodal>
                  <span v-if="cooperation.mode > 9">
                    VOTE FOR THIS COOPERATION (<span class="underline"
                      >INFO</span
                    >):
                  </span>
                  <span v-if="cooperation.mode <= 9">
                    PROVIDE YOUR FEEDBACK (?):
                  </span>
                </b-link>
                <br />
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
                      <b-link class="ae" @click="deactivate(cooperation)"
                        >Deactivate</b-link
                      >&nbsp;
                    </span>
                    <span v-if="cooperation.mode < 0 && $auth.user.role == 1"
                      ><b-link class="ae" @click="activate()">Resume</b-link
                      >&nbsp;
                    </span>
                    <span
                      v-if="
                        (cooperation.collected > cooperation.budget &&
                          cooperation.mode >= 101 &&
                          improfessional) ||
                        $auth.user.role == 1
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
                        (cooperation.mode > 0 && improfessional) ||
                        $auth.user.role == 1
                      "
                    >
                      <b-link v-b-modal.professionalmodal class="af"
                        >Add/Remove professionals</b-link
                      >&nbsp;
                    </span>
                    <span
                      v-if="
                        (cooperation.mode > 0 && improfessional) ||
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
      cooperationTypes: [
        { id: 1, type: 'cooperations' },
        { id: 2, type: 'deactivated' },
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
    collected(cooperation) {//if participation mode:
      if (cooperation.budget < 0) {
        return cooperation.E * cooperation.collect
      } else {//if funding mode:
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
    },
    budgetbar(mode) {
      let color
      mode == 20 ? color = 'trust' : color = 'equivalence'
      return color
    },
    improfessional() {
      let mypro = this.$store.state.professional.filter(
        (pro) =>
          pro.user == this.$auth.user && pro.cooperation == this.$route.params.id
      )
      if (mypro.length > 0) return true
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
    deactivate(cooperation) {
      this.$store.dispatch('cooperationForm', {
        id: cooperation.id,
        mode: cooperation.mode * -1,
        title: cooperation.title,
        country: cooperation.country,
        place: cooperation.place,
        brief: cooperation.brief,
        content: cooperation.content,
        video: cooperation.video,
        anonymous: cooperation.anonymous,
        parent: cooperation.parent,
        category: cooperation.category,
        collect: cooperation.collect,
        budget: cooperation.budget,
        budgetstep: cooperation.budgetstep,
        fundingstep: cooperation.fundingstep,
        professional: cooperation.professional,
        hudget: cooperation.hudget,
        E: cooperation.E,
        T: cooperation.T,
        C: cooperation.C,
        I: cooperation.I,
        F: cooperation.F,
        U: cooperation.U,
        D: cooperation.D,
        created: cooperation.created,
      })
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
    activate() {
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
