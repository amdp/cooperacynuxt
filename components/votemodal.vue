<template>
  <b-modal id="votemodal" title="VOTING IN COOPERACY" hide-header-close>
    <p>
      The <span class="b equivalence">r</span><span class="b trust">a</span
      ><span class="b care">i</span><span class="b transparency">n</span
      ><span class="b freedom">b</span><span class="b understanding">o</span
      ><span class="b diversity">w</span> votebar is the main expression of
      Cooperacy members' distribution of power, resources and activities. Learn
      how to influence the whole platform with your personal choices.<br />
      In historical projects and proposals, it is used as a feedback.<br />
      In comments it influences your personal
      <span class="b equivalence">r</span><span class="b trust">a</span
      ><span class="b care">i</span><span class="b transparency">n</span
      ><span class="b freedom">b</span><span class="b understanding">o</span
      ><span class="b diversity">w</span> code through the reaction of the other
      users.<br />
    </p>
    <p>
      Gray = nobody voted<br />
      Light color = someone else voted<br />
      Full color = You voted<br />
      <i>The transparency vote works the opposite way (see below)</i>
    </p>
    <b>Equivalence:</b>
    <b-row class="px-4">
      <b-col class="vote mx-3 w-25 bequivalence">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 theyequivalence">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 aaagray">&nbsp;</b-col>
    </b-row>
    <p>
      Influences the allocation of budget or buys a ticket for a course,
      concert, event.
      <br />COMMENTS: it works as a like button.
    </p>
    <b>Trust:</b>
    <b-row class="px-4">
      <b-col class="vote mx-3 w-25 btrust">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 theytrust">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 aaagray">&nbsp;</b-col>
    </b-row>
    <p>
      It signals trust so the project may skip the business plan budget step.<br />
      It can be used for co-donations, a form of crowdfunding that sets equal
      shares for financing a project.
      <br />COMMENTS: it is a trust feedback in the comment/member.
    </p>
    <b>Care:</b>
    <b-row class="px-4">
      <b-col class="vote mx-3 w-25 bcare">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 theycare">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 aaagray">&nbsp;</b-col>
    </b-row>
    <p>
      It’s a signal that the project needs attention: the project gains more
      visibility in search results.
      <br />COMMENTS: it is an affectionate and caring feedback.
    </p>
    <b>Transparency:</b>
    <b-row class="px-4">
      <b-col class="vote mx-3 w-25 aaagray">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 theytransparency">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 btransparency">&nbsp;</b-col>
    </b-row>
    <p>
      Attention: this vote signals hidden information, corruption or spamming
      and darkens when voted.
      <br />COMMENTS: it can signal misinformation or.. a joke :)
      <br />Remember: transparency voters are never anonymous.
    </p>
    <b>Freedom:</b>
    <b-row class="px-4">
      <b-col class="vote mx-3 w-25 bfreedom">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 theyfreedom">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 aaagray">&nbsp;</b-col>
    </b-row>
    <p>
      Follow button, used for becoming a participant/contributor/future employee
      of the project.
      <br />COMMENTS: Signals free-spirit in the comment/member.
    </p>
    <b>Understanding:</b>
    <b-row class="px-4">
      <b-col class="vote mx-3 w-25 bunderstanding">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 theyunderstanding">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 aaagray">&nbsp;</b-col>
    </b-row>
    <p>
      This vote signals comprehension, the project may skip the fine tuning
      phase.<br />
      Understanding votes can also be raised up by the Cooperacy AI.
      <br />COMMENTS: it signals comprehension.
    </p>
    <b>Diversity:</b>
    <b-row class="px-4">
      <b-col class="vote mx-3 w-25 bdiversity">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 theydiversity">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 aaagray">&nbsp;</b-col>
    </b-row>
    <p>
      When a project has a strong “bizardry” it can randomly go into the
      approving stage.
      <br />COMMENTS: it is something fun, crazy, artistic, bizarre!
    </p>
    <template slot="modal-footer" slot-scope="{ ok }">
      <b-button class="btn bhtransparency white btn-block border-0" @click="ok">
        OK
      </b-button>
    </template>
  </b-modal>
</template>
