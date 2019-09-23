<template>
  <div class="votebar d-flex justify-content-center px-3 py-2 mb-2">
    <div
      class="single-vote-button"
      id="equivalence"
      @mouseenter="setVisibleVoteCount(projectId, 'equivalence')"
      @mouseleave="resetVisibleVoteCount"
    >
      <b
        v-if="
          visibleVoteCount.index == projectId &&
            visibleVoteCount.voteType == 'equivalence'
        "
      >
        5</b
      >
      <img
        v-else
        src="../assets/icons/equivalence.svg"
        class="img-fluid img-responsive"
      />
    </div>
    <div
      class="single-vote-button"
      id="care"
      @mouseenter="setVisibleVoteCount(projectId, 'care')"
      @mouseleave="resetVisibleVoteCount"
    >
      <b
        v-if="
          visibleVoteCount.index == projectId &&
            visibleVoteCount.voteType == 'care'
        "
      >
        5</b
      >
      <img
        v-else
        src="../assets/icons/care.svg"
        class="img-fluid img-responsive"
      />
    </div>
    <div
      class="single-vote-button"
      id="diversity"
      @mouseenter="setVisibleVoteCount(projectId, 'diversity')"
      @mouseleave="resetVisibleVoteCount"
    >
      <b
        v-if="
          visibleVoteCount.index == projectId &&
            visibleVoteCount.voteType == 'diversity'
        "
      >
        5</b
      >
      <img
        v-else
        src="../assets/icons/diversity.svg"
        class="img-fluid img-responsive"
      />
    </div>
    <div
      class="single-vote-button"
      id="understanding"
      @mouseenter="setVisibleVoteCount(projectId, 'understanding')"
      @mouseleave="resetVisibleVoteCount"
    >
      <b
        v-if="
          visibleVoteCount.index == projectId &&
            visibleVoteCount.voteType == 'understanding'
        "
      >
        5</b
      >
      <img
        v-else
        src="../assets/icons/understanding.svg"
        class="img-fluid img-responsive"
      />
    </div>
    <div
      class="single-vote-button"
      id="freedom"
      @mouseenter="setVisibleVoteCount(projectId, 'freedom')"
      @mouseleave="resetVisibleVoteCount"
    >
      <b
        v-if="
          visibleVoteCount.index == projectId &&
            visibleVoteCount.voteType == 'freedom'
        "
      >
        5</b
      >
      <img
        v-else
        src="../assets/icons/freedom.svg"
        class="img-fluid img-responsive"
      />
    </div>
    <div
      class="single-vote-button"
      id="transparency"
      @mouseenter="setVisibleVoteCount(projectId, 'transparency')"
      @mouseleave="resetVisibleVoteCount"
    >
      <b
        v-if="
          visibleVoteCount.index == projectId &&
            visibleVoteCount.voteType == 'transparency'
        "
      >
        5</b
      >
      <img
        v-else
        src="../assets/icons/transparency.svg"
        class="img-fluid img-responsive"
      />
    </div>
    <div
      class="single-vote-button"
      id="trust"
      @mouseenter="setVisibleVoteCount(projectId, 'trust')"
      @mouseleave="resetVisibleVoteCount"
    >
      <b
        v-if="
          visibleVoteCount.index == projectId &&
            visibleVoteCount.voteType == 'trust'
        "
      >
        5</b
      >
      <img
        v-else
        src="../assets/icons/trust.svg"
        class="img-fluid img-responsive"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['projectId'],
  data() {
    return {
      visibleVoteCount: {
        index: null,
        voteType: null
      }
    }
  },
  methods: {
    setVisibleVoteCount: function(index, voteType) {
      this.visibleVoteCount.index = index
      this.visibleVoteCount.voteType = voteType
    },
    resetVisibleVoteCount: function() {
      this.visibleVoteCount.index = null
      this.visibleVoteCount.voteType = null
    }
  }
}
</script>
