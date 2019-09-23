<template>
  <div class="votebar d-flex justify-content-center px-3 py-2 mb-2">
    <div
      class="single-vote-button"
      id="equivalence"
      @mouseenter="setVisibleVoteCount(projectId, 'equivalence')"
      @mouseleave="resetVisibleVoteCount"
    >
      <small
        v-if="
          visibleVoteCount.index == projectId &&
            visibleVoteCount.voteType == 'equivalence'
        "
      >
        5</small
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
      <small
        v-if="
          visibleVoteCount.index == projectId &&
            visibleVoteCount.voteType == 'care'
        "
      >
        5</small
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
      <small
        v-if="
          visibleVoteCount.index == projectId &&
            visibleVoteCount.voteType == 'diversity'
        "
      >
        5</small
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
      <small
        v-if="
          visibleVoteCount.index == projectId &&
            visibleVoteCount.voteType == 'understanding'
        "
      >
        5</small
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
      <small
        v-if="
          visibleVoteCount.index == projectId &&
            visibleVoteCount.voteType == 'freedom'
        "
      >
        5</small
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
      <small
        v-if="
          visibleVoteCount.index == projectId &&
            visibleVoteCount.voteType == 'transparency'
        "
      >
        5</small
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
      <small
        v-if="
          visibleVoteCount.index == projectId &&
            visibleVoteCount.voteType == 'trust'
        "
      >
        5</small
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
<style scoped>
.votebar {
  border-top: 1px solid black;
}

.single-vote-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: 50px;
  margin: 0.13rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition-duration: 0.2s;
  padding: 0.35rem;
}
.single-vote-button small {
  font-weight: 500;
}
@media (max-width: 768px) {
  .single-vote-button {
    margin: 0.15rem;
  }
}
/* colors */
.single-vote-button#equivalence:hover {
  box-shadow: 0px 1px 1px var(--equivalence);
}
.single-vote-button#care:hover {
  box-shadow: 0px 1px 1px var(--care);
}
.single-vote-button#transparency:hover {
  box-shadow: 0px 1px 1px var(--transparency);
}
.single-vote-button#freedom:hover {
  box-shadow: 0px 1px 1px var(--freedom);
}
.single-vote-button#diversity:hover {
  box-shadow: 0px 1px 1px var(--diversity);
}
.single-vote-button#trust:hover {
  box-shadow: 0px 1px 1px var(--trust);
}
.single-vote-button#understanding:hover {
  box-shadow: 0px 1px 1px var(--understanding);
}
</style>
