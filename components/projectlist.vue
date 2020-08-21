<template>
  <b-container fluid class="justify-content-center m-0 p-0">
    <b-container
      v-for="type in projectTypes"
      :key="type.id"
      class="justify-content-center m-0 p-0"
      fluid
    >
      <h2 v-if="projectlist[type.name].length > 0" class="text-center mb-3 up">
        {{ type.name }}
      </h2>
      <b-container
        v-for="project in projectlist[type.name]"
        :key="project.id"
        :class="projectbox(project)"
        class="m-0 p-0"
      >
        <b-row class="m-0 p-0 w-100 p-3">
          <b-col cols="12" class="m-0 p-0 w-100">
            <b-row class="m-0 p-0 w-100">
              <b-col cols="12" md="3">
                <img
                  :src="'/assets/image/project/' + project.id + '.png'"
                  class="img-100"
                />
              </b-col>
              <b-col cols="12 text-center" md="6">
                <span class="space subheading up">
                  <nuxt-link :to="'/project/' + project.id">
                    {{ project.name }}
                  </nuxt-link> </span
                ><br />
                <small class="mb-2 up t12">
                  <i>{{ project.brief }}</i>
                </small>
                <p v-if="$route.params.id">
                  {{ project.content }}
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
              <b-col cols="12" md="3">
                <b-container v-if="$route.params.id">
                  <small>
                    <strong>AFTF: </strong
                    >{{ project.anonymous ? 'ON' : 'OFF' }}
                  </small>
                  <br />
                  <small v-if="project.stage == '2'">
                    <strong>FEE: </strong> {{ Math.round(project.budget) }}
                    <br />
                  </small>
                  <br />
                  <small>
                    <strong>PARENT PROJECT: </strong> {{ project.parent }}
                  </small>
                  <br />
                </b-container>
                <b-container @click="babba(project)">
                  <small>
                    {{ category(project.category) }}
                    <i>{{ stage(project.stage) }} project</i> in
                    {{ location(project.place) }}
                  </small>
                </b-container>
                <br />
              </b-col>
            </b-row>
            <!-- BUDGET BAR -->
            <b-row class="m-0 p-0 w-100">
              <b-col cols="12">
                <b-progress
                  v-if="
                    (project.stage == 7 || project.stage == 2) &&
                    project.budget != 0
                  "
                  max="1"
                  class="mt-2"
                >
                  <b-progress-bar
                    :value="collected(project) / project.budget"
                    :label="
                      (collected(project) / project.budget).toFixed(3) * 100 +
                      '%'
                    "
                    class="btrust"
                  ></b-progress-bar>
                  <b-progress-bar
                    :value="1 - Math.round(collected(project) / project.budget)"
                    class="theytrust std"
                  ></b-progress-bar>
                </b-progress>
                <span v-if="project.stage == 7 && project.budget != 0">
                  BUDGET: €{{ collected(project).toFixed(7) }} of €{{
                    Math.round(project.budget)
                  }}
                  collected
                </span>
                <span v-if="project.stage == 2 && project.budget != 0">
                  BUDGET: €{{ collected(project).toFixed(0) }} of €{{
                    Math.round(project.budget)
                  }}
                  collected
                </span>
              </b-col>
            </b-row>
            <!-- HUDGET BAR -->
            <b-row class="m-0 p-0 w-100">
              <b-col cols="12">
                <b-progress
                  v-if="
                    project.category != 4 &&
                    project.hudget != 0 &&
                    project.stage != 1
                  "
                  max="1"
                  class="mt-2"
                >
                  <b-progress-bar
                    :value="project.professional / project.hudget"
                    :label="
                      Math.round(
                        (project.professional / project.hudget) * 100
                      ) + '%'
                    "
                    class="bfreedom"
                  ></b-progress-bar>
                  <b-progress-bar
                    :value="
                      negprogress(1 - project.professional / project.hudget)
                    "
                    class="theyfreedom"
                  ></b-progress-bar>
                </b-progress>
                <span
                  v-if="
                    project.category != 4 &&
                    project.hudget != 0 &&
                    project.stage != 1
                  "
                  >HUDGET: {{ project.professional }} of
                  {{ project.hudget }} professionals needed</span
                >
              </b-col>
            </b-row>
            <b-row class="m-0 p-0 w-100">
              <b-col cols="12">
                <b-row class="ml-0 mr-0 p-0 w-100">
                  <b-col cols="12" class="m-0 p-0 w-100 text-center">
                    <b-link v-b-modal.votemodal>
                      VOTE FOR THIS PROJECT (?):
                    </b-link>
                    <br />
                    <votebar
                      :voteprop="project"
                      :proptype="'project'"
                      :vote-id="project.id"
                    />
                  </b-col>
                </b-row>
                <b-row class="m-0 p-0 mt-3 w-100">
                  <b-col
                    cols="12"
                    class="mt4 m-0 p-0 text-center"
                    v-if="$auth.user && $route.params.id"
                  >
                    <span v-if="project.stage != 1 && $auth.user.role == 1">
                      <b-link class="ae" @click="archive(project)"
                        >Archive</b-link
                      >&nbsp;</span
                    >
                    <span v-if="project.stage == 1 && $auth.user.role == 1"
                      ><b-link class="ae" @click="unarchive()">Resume</b-link
                      >&nbsp;</span
                    >

                    <span
                      v-if="
                        (project.stage == 5 && improfessional) ||
                        $auth.user.role == 1
                      "
                    >
                      <b-link v-b-modal.budgetstepmodal class="at"
                        >Upload Budget Step Document</b-link
                      >&nbsp;</span
                    >

                    <span
                      ><b-link class="ai" @click="copy()">Copy</b-link
                      >&nbsp;</span
                    >

                    <span
                      v-if="
                        (project.stage != 1 && improfessional) ||
                        $auth.user.role == 1
                      "
                    >
                      <b-link v-b-modal.professionalmodal class="af"
                        >Add/Remove professionals</b-link
                      >&nbsp;</span
                    >

                    <span
                      v-if="
                        (project.stage != 1 && improfessional) ||
                        $auth.user.role == 1
                      "
                    >
                      <b-link class="au" @click="edit()">Edit</b-link
                      >&nbsp;</span
                    >

                    <span
                      v-if="
                        (project.budgetstep - project.fundingstep > 1 &&
                          improfessional) ||
                        (project.stage == 2 &&
                          project.fundingstep == 6 &&
                          improfessional) ||
                        $auth.user.role == 1
                      "
                    >
                      <b-link class="ad" @click="fundingstep(project)"
                        >Request funding step</b-link
                      >&nbsp;</span
                    >
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <tagmodal
          v-if="$route.params.id && $auth.user"
          :projectprop="project"
        />
        <professionalmodal
          v-if="$route.params.id && $auth.user"
          :projectprop="project"
          :userlistprop="$store.state.userlist"
        />
        <budgetstepmodal
          v-if="$route.params.id && $auth.user"
          :projectprop="project"
        />
        <votebarmodal :projectprop="project" />
      </b-container>
    </b-container>
    <votemodal />
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      isHover: null,
      projectTypes: [
        { id: 1, name: 'projects' },
        { id: 2, name: 'archived' },
      ],
      incremental: -1,
      updatesec: 1, //sets how frequently the collected budget is updated
      interval: null,
      collect: null,
      totalE: 0,
    }
  },
  computed: {
    projectlist() {
      if (this.$route.params.id) {
        return {
          projects: this.$store.state.project.filter(
            (project) => project.id == this.$route.params.id
          ),
          archived: [],
        }
      } else {
        return {
          projects: this.$store.state.project.filter(
            (project) => project.stage != 1
          ),
          archived: this.$store.state.project.filter(
            (project) => project.stage == 1
          ),
        }
      }
    },
  },
  mounted() {
    for (let i = 0; i < this.$store.state.project.length; i++) {
      this.totalE += this.$store.state.project[i].E
    }
    for (let i = 0; i < this.$store.state.userlist.length; i++) {
      if (this.$store.state.userlist[i].active) {
        this.collect += parseFloat(this.$store.state.userlist[i].fee)
      }
    }
    this.increment()
  },
  methods: {
    increment() {
      this.interval = setInterval(() => {
        this.incremental++
      }, this.updatesec * 1000)
    },
    collected(project) {
      if (project.stage == 2) {
        return project.E * project.collect
      } else {
        // here we add to project.collect (the amount collected so far) the increment of every second,
        // times the update seconds interval times the % of the project E-votes over the total of the E-votes
        return (
          parseFloat(project.collect) +
          this.incremental *
          this.collect *
          (0.000000380517504 + 0.00001) * //the x in (0.000000380517504 + x) balances the database response time 
          this.updatesec *
          (project.E / this.totalE)
        )
      }
    },
    improfessional() {
      let mypro = this.$store.state.professional.filter(
        (pro) =>
          pro.user == this.$auth.user && pro.project == this.$route.params.id
      )
      if (mypro.length > 0) return true
      else return false
    },
    projectbox(project) {
      let boxclass
      let categorycolor = ['e', 't', 'c', 'i', 'f', 'u', 'd'] //order these according categories
      for (let i = 0; i < 7; i++) {
        if (project.category == i + 1) {
          boxclass =
            'p-3 ml-0 mr-0 mb-3 w-100 ' + categorycolor[i] + 'projectbox'
        }
      }
      return boxclass
    },
    archive(project) {
      this.$store.dispatch('projectFormAction', {
        id: project.id,
        stage: 1,
        name: project.name,
        country: project.country,
        place: project.place,
        brief: project.brief,
        content: project.content,
        video: project.video,
        anonymous: project.anonymous,
        parent: project.parent,
        category: project.category,
        collect: project.collect,
        budget: project.budget,
        budgetstep: project.budgetstep,
        budgetstepdoc: project.budgetstepdoc,
        fundingstep: project.fundingstep,
        professional: project.professional,
        hudget: project.hudget,
        E: project.E,
        T: project.T,
        C: project.C,
        I: project.I,
        F: project.F,
        U: project.U,
        D: project.D,
        created: project.created,
      })
      this.$store.dispatch('getUserProjectAction', {
        userid: this.$auth.user.id,
      })
      return this.$router.push({ path: '/user' })
    },
    fundingstep(project) {
      project.fundingstep++
      let payload = {
        formName: this.$auth.user.name + ' ' + this.$auth.user.surname,
        formEmail: this.$auth.user.email,
        formSubject:
          'Funding Step #' +
          project.fundingstep +
          ' Request Notification from Project #' +
          project.id +
          ' ' +
          project.name,
        formBody:
          'In Project #' +
          project.id +
          ' ' +
          project.name +
          ' comember ' +
          this.$auth.user.name +
          ' ' +
          this.$auth.user.surname +
          ' has requested Funding Step #"' +
          project.fundingstep +
          '".',
      }
      this.$store.dispatch('contactEmailAction', payload)
      this.$store.dispatch('fundingstep', project)
    },
    professional() {
      this.store.dispatch('addprofessional', { id: this.formProfessional })
    },
    edit() {
      this.$store.dispatch('editSwitchAction', { id: this.$route.params.id })
      return this.$router.push({ path: '/project/form' })
    },
    unarchive() {
      this.$store.dispatch('editSwitchAction', { id: this.$route.params.id })
      return this.$router.push({ path: '/project/form' })
    },
    copy() {
      this.$store.dispatch('editSwitchAction', {
        id: this.$route.params.id,
        copy: true,
      })
      this.$store.dispatch('getUserProjectAction', {
        userid: this.$auth.user.id,
      })
      return this.$router.push({ path: '/project/form' })
    },
    negprogress(num) {
      num < 0 ? (num = 0) : (num = num)
      return num
    },
    stage(id) {
      return this.$store.state.stage.find((stage) => stage.id == id).name
    },
    category(id) {
      return this.$store.state.category.find((category) => category.id == id)
        .name
    },
    location(id) {
      let projectPlace = this.$store.state.place.find((place) => place.id == id)
      if (projectPlace) {
        let projectCountry = this.$store.state.country.find(
          (country) => country.id == projectPlace.country
        )
        if (projectCountry) {
          return projectPlace.name + ', ' + projectCountry.name
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
