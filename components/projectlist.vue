<template>
  <b-container fluid class="justify-content-center m-0 p-0">
    <div
      fluid
      class="justify-content-center m-0 p-0"
      v-for="type in projectTypes"
      :key="type"
    >
      <h2 class="text-center mb-3 up" v-if="projectlist(type).length > 0">
        {{ type }}
      </h2>
      <div
        class="p-3 ml-0 mr-0 mb-3 w-100 projectbox"
        v-for="project in projectlist(type)"
        :key="project.id"
      >
        <b-row class="m-0 p-0 w-100">
          <b-col cols="12" class="m-0 p-0 w-100">
            <!-- project-title -->
            <b-row class="m-0 p-0">
              <b-col cols="3" class="m-0 pt-2 px-1 p-lg-0 text-center">
                <b-img
                  :src="projectImage(project.id)"
                  fluid
                  block
                  class="m-0 m-lg-n5 p-lg-5"
                />
              </b-col>
              <b-col cols="9" lg="6" class="m-0 pl-2 text-center">
                <span class="space subheading up"
                  ><nuxt-link :to="'/project/' + project.id">{{
                    project.name
                  }}</nuxt-link></span
                >
                <br />
                <span>{{ project.brief }}</span>
              </b-col>
              <b-col cols="12" lg="3" class="m-0 pl-2">
                <p class="text-left mt-2">
                  &#127757;
                  <small class="up"
                    >{{ category(project.category) }}
                    {{ stage(project.stage) }}-PROJECT IN
                    {{ location(project.place) }}
                  </small>
                </p>
              </b-col>
            </b-row>
            <!-- details -->
            <b-row class="mt-3 ml-0 mr-0 p-0 w-100">
              <b-col cols="12" class="m-0 p-0 w-100">
                <div v-if="project.stage == 7">
                  <div
                    class="progress-bar btrust coogray"
                    :class="{
                      'progress-zero': progress(project) == 0
                    }"
                    role="progressbar"
                    :style="{
                      width: progress(project) + '%'
                    }"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    BUDGET: &nbsp;&nbsp;{{ progress(project) }}% of €{{
                      Math.round(project.budget)
                    }}
                  </div>
                </div>
                <div
                  class="progress-bar bfreedom"
                  :class="{
                    'progress-zero': progress(project, 'h') == 0
                  }"
                  role="progressbar"
                  :style="{
                    width: progress(project, 'h') + '%'
                  }"
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  HUDGET: &nbsp;&nbsp;{{ progress(project, 'h') }}% of
                  {{ Math.round(project.hudget) }}
                </div>
              </b-col>
            </b-row>
            <!-- votebar -->
            <b-row class="ml-0 mr-0 p-0 w-100">
              <b-col cols="12" class="m-0 p-0 w-100 text-center">
                <b-link v-b-modal.votemodal>
                  VOTE FOR THIS PROJECT (?):
                </b-link>
                <br />
                <votebar :voteprop="project" :proptype="'project'" />
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </div>
    <!-- votes modal -->
    <b-modal id="votemodal" title="VOTING IN COOPERACY" hide-header-close>
      <p>
        The <span class="equivalence">r</span><span class="trust">a</span
        ><span class="care">i</span><span class="transparency">n</span
        ><span class="freedom">b</span><span class="understanding">o</span
        ><span class="diversity">w</span> votebar is the main expression of
        Cooperacy members' distribution of power, resources and activities.
        Learn how to influence the whole platform with your personal choices.
      </p>
      <p>
        Note: The votes are gray when nobody voted, slightly in color when
        someone else voted and in full color when You voted them. The
        transparency vote is supposed to be always on, so it works in the
        opposite way and it becomes gray when someone votes it (see below).
      </p>
      <b>Equivalence:</b>
      <b-row class="px-4">
        <b-col class="vote mx-3 w-25 bequivalence">&nbsp;</b-col>
        <b-col class="vote mx-3 w-25 theyequivalence">&nbsp;</b-col>
        <b-col class="vote mx-3 w-25 aaagray">&nbsp;</b-col>
      </b-row>
      <p>
        It is the most basic vote. It determines the proportional allocation of
        funds from the money pool in funded ideas, a favorable vote in proposals
        (ideas proposed to make changes) and a vinculating pre-purchase to a
        course, concert, ticket-based event.
      </p>
      <b>Trust:</b>
      <b-row class="px-4">
        <b-col class="vote mx-3 w-25 btrust">&nbsp;</b-col>
        <b-col class="vote mx-3 w-25 theytrust">&nbsp;</b-col>
        <b-col class="vote mx-3 w-25 aaagray">&nbsp;</b-col>
      </b-row>
      <p>
        Trust votes make the project skip the business plan budget step and be
        used for co-donations, a form of crowdfunding that sets equal shares for
        financing a project.
      </p>
      <b>Care:</b>
      <b-row class="px-4">
        <b-col class="vote mx-3 w-25 bcare">&nbsp;</b-col>
        <b-col class="vote mx-3 w-25 theycare">&nbsp;</b-col>
        <b-col class="vote mx-3 w-25 aaagray">&nbsp;</b-col>
      </b-row>
      <p>
        It’s a like, the project gains more visibility in search results and
        influences the viewer to support it.
      </p>
      <b>Transparency:</b>
      <b-row class="px-4">
        <b-col class="vote mx-3 w-25 aaagray">&nbsp;</b-col>
        <b-col class="vote mx-3 w-25 theytransparency">&nbsp;</b-col>
        <b-col class="vote mx-3 w-25 btransparency">&nbsp;</b-col>
      </b-row>
      <p>
        This vote is a very delicate one and it must be used with caution. It
        states hidden information, corruption or spamming. You must write what
        you think it's wrong or a solution to the issue. Beware, the project may
        go into a testing state (see state). When nobody voted Transparency, the
        user sees the color vivid, if somebody voted Transparency, the color
        darkens.
        <br />Remember: transparency voters are never anonymous.
      </p>
      <b>Freedom:</b>
      <b-row class="px-4">
        <b-col class="vote mx-3 w-25 bfreedom">&nbsp;</b-col>
        <b-col class="vote mx-3 w-25 theyfreedom">&nbsp;</b-col>
        <b-col class="vote mx-3 w-25 aaagray">&nbsp;</b-col>
      </b-row>
      <p>
        Freedom-voting means you would like to work for the idea or participate
        into the organization and the decision making. Clicking on the Freedom
        vote makes you become a member, you can see it in your dashboard project
        list, and your participation contributes to the project hudget level.
      </p>
      <b>Understanding:</b>
      <b-row class="px-4">
        <b-col class="vote mx-3 w-25 bunderstanding">&nbsp;</b-col>
        <b-col class="vote mx-3 w-25 theyunderstanding">&nbsp;</b-col>
        <b-col class="vote mx-3 w-25 aaagray">&nbsp;</b-col>
      </b-row>
      <p>
        This vote refers to the idea comprehension, gives more visibility and
        skips the fine tuning phase. Understanding votes can also be raised up
        by the Cooperacy AI.
      </p>
      <b>Diversity:</b>
      <b-row class="px-4">
        <b-col class="vote mx-3 w-25 bdiversity">&nbsp;</b-col>
        <b-col class="vote mx-3 w-25 theydiversity">&nbsp;</b-col>
        <b-col class="vote mx-3 w-25 aaagray">&nbsp;</b-col>
      </b-row>
      <p>
        When a project has a strong “bizardry” or diversity-votes, it has more
        opportunities to go randomly in the approving stage. Moreover, the idea
        with the highest “Bizardry” has equivalence-votes percentage raised by
        50%.
      </p>
      <template slot="modal-footer" slot-scope="{ ok }">
        <b-button
          class="btn bhtransparency white btn-block border-0"
          @click="ok"
        >
          OK
        </b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import votebar from './votebar'
export default {
  components: { votebar: votebar },
  data() {
    return {
      isHover: null,
      projectTypes: ['projects', 'archived']
    }
  },
  methods: {
    projectlist(type) {
      if (type == 'projects') {
        return this.$store.state.project.filter(project => project.stage != 1)
      } else {
        return this.$store.state.project.filter(project => project.stage == 1)
      }
    },
    projectImage(id) {
      try {
        return require('../assets/image/project/' + id + '.png')
      } catch (e) {
        return require('../assets/image/project/0.png')
      }
    },
    progress(project, hudget) {
      let projectProgress
      if (hudget) {
        projectProgress = Math.round(
          (project.participants / project.hudget) * 100
        )
      } else {
        projectProgress = Math.round((project.collected / project.budget) * 100)
      }
      return isNaN(projectProgress) ? 0 : projectProgress //add infinity or remove budget 0 ideas
    },
    stage(id) {
      return this.$store.state.stage.find(stage => stage.id == id).name
    },
    category(id) {
      return this.$store.state.category.find(category => category.id == id).name
    },
    location(id) {
      let projectPlace = this.$store.state.place.find(place => place.id == id)
      if (projectPlace) {
        let projectCountry = this.$store.state.country.find(
          country => country.id == projectPlace.country
        )
        if (projectCountry) {
          return projectPlace.name + ', ' + projectCountry.name
        }
      } else {
        return 'Unknown'
      }
    }
  }
}
</script>
