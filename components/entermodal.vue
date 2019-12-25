<template>
  <b-modal id="entermodal" hide-header hide-footer>
    <b-link class="finger noline" @click="move('forward')">&gt;</b-link>
    <p v-html="journey[message].q"></p>
    <p v-html="journey[message].a"></p>
    <b-link class="finger noline" @click="move()">&lt;</b-link>
    <nuxt-link to="/login">JOIN</nuxt-link>
    <nuxt-link to="/main/aboutyou">DISCOVER MORE</nuxt-link>
  </b-modal>

  <!-- People should see the projects but not vote!! -->
</template>

<script>
export default {
  methods: {
    move(dir) {
      let l = this.journey.length
      if (dir == 'forward') {
        if (this.message == l - 1) {
          this.message = 0
        } else {
          this.message++
        }
      } else {
        if (this.message != 0) {
          this.message--
        }
      }
    }
  },
  data() {
    return {
      message: 0,
      journey: [
        {
          q: 'What is Cooperacy?',
          a: 'Cooperacy is an open project based on Cooperation Science.'
        },

        {
          q: 'How does it work?',
          a:
            'If you join Cooperacy you will donate 1 euro per month to a money pool.'
        },

        {
          q: 'What is the money pool for?',
          a:
            'A Human Artificial Intelligence ethically distributes the money to the members projects.'
        },

        {
          q: 'Can I propose a project of mine?',
          a: 'You can propose your own Cooperacy project.'
        },

        {
          q: 'Why is the Cooperacy Artificial Intelligence ethical and human?',
          a:
            'Every human member can influence the Human Artificial Intelligence with a Diversity, Understanding, Freedom, Transparency, Care, Trust or Equivalence voluntary, non-passive feedback.'
        },

        {
          q: 'What is the business model?',
          a:
            'The active projects will be owned by Cooperacy itself and the members will earn money deciding their salary autonomously, sending the margins back to Cooperacy in order to make other members start new projects.'
        },

        {
          q: 'What is Cooperation Science?',
          a:
            'If you are interested in Cooperation Science research there is a dedicated section you can explore, starting from the divulgative basics of Cooperation.'
        },

        {
          q: 'What can Cooperacy do for me on a personal level?',
          a:
            'As a member you can participate to Cooperacy online webinars or organize divulgative Cooperation Science workshops to learn how to make yourself and the people you work with better understand and support each other.'
        },

        {
          q: 'What if I own a company or if I come from the corporate world?',
          a:
            'In case you are an entrepreneur or a leader in the corporate world, Cooperacy provides Cooperation Science services that enhance your company level of Cooperation, that in turn develops and predicts your company growth.'
        },

        {
          q: 'What if I am profoundly competitive?',
          a:
            'For competition lovers, Cooperacy develops a non-violent form of coordinated, impersonal competition: while the challenge is amongst ideas, all the community receives the benefits of that competition.'
        },

        {
          q: 'Is this a win-win scheme?',
          a:
            'Cooperacy extends the concept of win-win to a whole ecosystem and community win. Win-Win-CommunityWin.'
        }
      ]
    }
  }
}
</script>
