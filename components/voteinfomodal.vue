<template>
  <b-modal id="voteinfomodal" title="VOTING IN COOPERACY" hide-header-close>
    <p>
      The <span class="b equivalence">r</span><span class="b trust">a</span
      ><span class="b care">i</span><span class="b transparency">n</span
      ><span class="b freedom">b</span><span class="b understanding">o</span
      ><span class="b diversity">w</span> votebar is the main expression of
      Cooperacy members' distribution of power, resources and activities. Learn
      how to influence the whole platform with your personal choices.<br />
      In <strong>archived</strong> projects and proposals, it is used as a
      feedback.<br />
      In <strong>comments</strong> it influences your personal
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
      <i>The transparency vote works the opposite way</i>
    </p>
    <b>Equivalence:</b><i> do you think this project deserves your money?</i>
    <b-row class="px-4">
      <b-col class="vote mx-3 w-25 bequivalence">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 theyequivalence">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 baaagray">&nbsp;</b-col>
    </b-row>
    <p>
      It signals support, so in the projects influences the allocation of budget
      or buys a ticket for a course, concert, event.
    </p>
    <b>Trust:</b
    ><i> do you think this project will work (timetable, costs, risks..)?</i>
    <b-row class="px-4">
      <b-col class="vote mx-3 w-25 btrust">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 theytrust">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 baaagray">&nbsp;</b-col>
    </b-row>
    <p>
      It signals trust, so in the projects may lead to skip the human resources
      budget step.<br />
    </p>
    <b>Care:</b><i> do you like this project?</i>
    <b-row class="px-4">
      <b-col class="vote mx-3 w-25 bcare">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 theycare">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 baaagray">&nbsp;</b-col>
    </b-row>
    <p>
      It signals care, so in the projects leads to more visibility.
    </p>
    <b>Transparency:</b><i> do you think this project is transparent?</i>
    <b-row class="px-4">
      <b-col class="vote mx-3 w-25 baaagray">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 theytransparency">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 btransparency">&nbsp;</b-col>
    </b-row>
    <p>
      Attention: it signals hidden information, corruption or spamming so it can
      block the projects in a "pairing" stage.
      <br />Remember: transparency voters are never anonymous.
    </p>
    <b>Freedom:</b><i> do you want to follow or to work for this project?</i>
    <b-row class="px-4">
      <b-col class="vote mx-3 w-25 bfreedom">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 theyfreedom">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 baaagray">&nbsp;</b-col>
    </b-row>
    <p>
      It signals choice and coolness, so in the projects is for becoming a
      participant or future employee of the project.
    </p>
    <b>Understanding:</b><i> do you think this project is well explained?</i>
    <b-row class="px-4">
      <b-col class="vote mx-3 w-25 bunderstanding">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 theyunderstanding">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 baaagray">&nbsp;</b-col>
    </b-row>
    <p>
      This vote signals comprehension, so in the projects it may lead to skip
      the setup budget step.<br />
    </p>
    <b>Diversity:</b
    ><i> do you think this project is innovative, artistic or bizarre?</i>
    <b-row class="px-4">
      <b-col class="vote mx-3 w-25 bdiversity">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 theydiversity">&nbsp;</b-col>
      <b-col class="vote mx-3 w-25 baaagray">&nbsp;</b-col>
    </b-row>
    <p>
      It signals beauty, fun, “bizardry”, so in the projects it can randomly go
      into the approving stage, but every 7 diversity votes lower the
      equivalence ones by 1.
    </p>
    <template slot="modal-footer" slot-scope="{ ok, cancel }">
      <b-button size="sm" class="none" @click="cancel()">
        CANCEL
      </b-button>
      <b-button
        class="btn bhtransparency white btn-block border-0"
        @click="ok()"
      >
        OK
      </b-button>
    </template>
  </b-modal>
</template>
