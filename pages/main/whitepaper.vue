<template>
  <b-container class="m-0 p-0 pagecontainer">
    <br /><img
      class="page-header"
      src="~/assets/image/page/banners/main/whitepaper.png"
    />
    <p class="base understanding"></p>
    <p class="base">
      Cooperacy is a container of many cooperations co-owned by all its
      participants. The cooperations themselves can be containers of other
      cooperations, ideas or voting proposals that are relative to a single
      cooperation and not the whole Cooperacy platform. Some cooperations have
      no budget, others are in funding mode, that is, ask for cooperacy funds.
      The cooperations may also have a hudget (human resources budget),
      indicating the minimum number of professionals needed in order to work.<br />
    </p>
    <p class="base">Latest update: 2020 October 18th</p>
    <p class="subheading understanding center space margin mt-4">
      COOPERATION MODES
    </p>
    <p class="base">
      Each cooperation can be set in different modes that determine its behavior
      and effects.
      <br /><br />
      EVALUATION MODE AND VOTING MODE<br /><br />
      The <b>evaluation</b> mode is used in situations where different ideas
      need to be voted or compared before being put in practice. The evaluation
      mode will be available also for non members and it could be used for
      simple daily decisions. The <b>voting</b> mode is exactly the same, but
      has
      <nuxt-link to="/main/governance" class="af">governance</nuxt-link>
      effects. In order to issue a voting that has an effect over a cooperation,
      just create <i>inside</i> that cooperation another cooperation in voting
      mode.<br />
    </p>
    <p class="base">
      FREE AND PARTICIPATION MODE<br /><br />
      <b>Free</b> mode cooperations need no money from the collection fund and
      are just ideas that differ from the evaluation and voting modes in that
      they are action proposals.<br />The <b>participation</b> mode is like the
      free ones but there is a funding determined by the collection of a
      specific participation fee, like in events, courses and the like. When the
      needed number of fees is reached, the budget is directly released
      <b>by</b> the participants. So also in this cooperation mode no money is
      attained from the collection fund.<br /><br />

      FUNDING MODE<br /><br />
      <b>Funding</b> mode cooperations instead get money from the collection
      fund according to their requested budget. Once the budget is fulfilled,
      the cooperations in this mode follow seven budget release steps. The
      budget steps have a week time in which the process could be altered and
      the people in charge can be changed for corruption or security reasons.
      Only people who freedom-voted the cooperations will be notified of the
      steps. If for any reason someone doesn't want to support anymore the
      cooperation with its e-vote, unvoting will reduce the collected amount,
      which will remain in the collection fund. In that case, the cooperation
      turns back to collecting money until budget is fulfilled. When all the
      budget steps are concluded, the cooperation starts producing wealth for
      all the platform. Here's a list of the modes and their budget release:<br /><br />
    </p>
    <br />
    <div style="overflow-x: auto">
      <table style="width: 100%">
        <thead>
          <tr>
            <th class="baset">#</th>
            <th class="baset">Step</th>
            <th class="baset">Released</th>
            <th class="baset">Incremental</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mode in $store.state.mode" :key="mode.id">
            <td class="baset">{{ mode.id }}</td>
            <td class="baset">{{ mode.name }}</td>
            <td class="baset">{{ mode.percentage }}%</td>
            <td class="baset">{{ mode.incremental }}%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <br /><br />
    <p class="subheading understanding center space margin mt-4">
      DEACTIVATED MODE
    </p>
    <p class="base">
      Cooperations that do not want to be listed anymore, passed a deadline,
      have some transparency infringements, got the right amount of fees, are
      concluded, sold or in a similar state can be deactivated. Deactivation
      removes them from the search and stores them just for artificial
      intelligence learning.<br />
    </p>
    <br /><br />
    <p class="subheading understanding center space margin mt-4">
      ARTIFICIAL INTELLIGENCE
    </p>
    <p class="base">
      Active or deactivated cooperations contribute to the artificial
      intelligence of the whole platform, which will contribute to future
      suggestions in order to help the development of the participants ideas.<br />
    </p>
    <br /><br />
    <p class="subheading understanding center space margin mt-4">AFTF</p>
    <p class="base">
      Some cooperations may choose to be AFTF: Anonymous First, Transparent
      Forever-after. In that case, the comments and the voting authors are
      hidden. In funding and voting mode, when funding starts or voting is
      concluded, all the information will be transparent for checking purposes.
      The beginning anonymity allows to boost collective intelligence and
      transparency enhances cooperation afterwards. <br />
    </p>
    <br /><br />
    <p class="subheading understanding center space margin mt-4">
      MULTIDIMENSIONAL VOTING
    </p>
    <p class="base">
      In order to leverage more collective intelligence, different kinds of vote
      are possible:
    </p>
    <p class="base equivalence">Equivalence</p>
    <p class="base">
      It determines the proportional allocation of funds from the money pool.
      Technical: the proportions are calculated with the number of the
      equivalence votes the idea has (Ei), divided by the total (Et) of all the
      equivalence votes all the ideas have (Ei / Et ). If funds for a budget
      cooperation idea get to more than 50%, the cooperation gets to a boost
      bonus and its funding allocation will be as quick as if it had 80% of the
      votes. Equivalence votes in a participated cooperation indicate pre-buy as
      a client, that is, subscription to a course or pre-purchase to a concert.
      This vinculates the trustee to the payment of the relative pre-purchase or
      fee when the cooperation becomes active. The participant can change the
      vote anytime but not after the cooperation in participation mode reaches
      the needed fees or its deadline.
    </p>
    <br />

    <p class="base trust">Trust</p>
    <p class="base">
      Trust votes make the cooperation skip the human resources budget step.
      Technical: if the cooperation trust votes (Ti) are more than half of the
      cooperation equivalence votes (Ti > 50% Ei) the human resources budget
      step is automatically approved.
    </p>
    <br />

    <p class="base care">Care</p>
    <p class="base">
      When care-voted, the cooperation gains more visibility. Technical: Ideas
      visibility is enhanced by ordering them by Care. This emotional response
      in the future could also be generated thanks to biofeedback sensors.
    </p>
    <br />
    <p class="base transparency">Transparency</p>
    <p class="base">
      This is a downvote to declare hidden information, corruption, cheating or
      spamming. Technical: Transparency-voting triggers a message in which you
      communicate what others do not see. If a Transparency vote is "unvoted",
      after 90 days if nothing happens the idea may be split or removed and in
      case the budget is turned back to the money pool. During this period the
      participants can better explain to unvoters the cooperation idea
      development in order to restore transparency. If the idea is unblocked,
      the count of 90 days is canceled. Transparency voters are never anonymous.
      Highest transparency-unvoted cooperations may win the joke/trolling prize
      of the year.
    </p>
    <br />
    <p class="base freedom">Freedom</p>
    <p class="base">
      Freedom-voting means you would like to work for the idea or participate
      into the decision making. Every cooperation can instead be discussed and
      observed in full transparency anyways. Technical: if a hudget is
      requested, freedom-votes count for the requested hudget. Moreover,
      freedom-voters will be chosen automatically unless their number is higher
      than the requested hudget, in which case a selection will occur. If a
      hudget is not requested, the idea participants will first review the
      freedom-voters list for the budget "hudget" step. Freedom-voters
      automatically become participants when the cooperation becomes active.
    </p>
    <br />

    <p class="base understanding">Understanding</p>
    <p class="base">
      This vote refers to the idea comprehension or nerditude and automatically
      approves the Setup phase. Technical: if the cooperation understanding
      votes are more than the 70% of the top understanding voted cooperation (Ui
      > U(max)*70%) the Setup budget release step is automatically approved.
    </p>
    <br />
    <p class="base diversity">Diversity</p>
    <p class="base">
      When a funded cooperation has a strong “bizardry” (diversity-votes), it
      has more opportunities to be randomly approved. Technical: ideas has a
      diversity percentage ( Di / Dt ). Every idea, the first day of a season
      (equinoxes and solstices), is given a random percentage value between 0%
      and 10%, to which the diversity percentage is added and then randomly
      multiplied by -1. The idea that has the highest “Bizardry” has a virtual
      added equivalence-votes percentage of +50% [( Ei + 50% Et ) / Et ].
      Warning: 10 diversity votes lower the equivalence ones by 1.
    </p>
    <br /><br />
    <p class="subheading understanding center space margin mt-4">
      COOPERATION CATEGORIES
    </p>
    <p class="base">
      The cooperation categories are colors that help understanding visually
      what is the purpose of a cooperation.
    </p>
    <div style="overflow-x: auto">
      <table style="width: 100%">
        <thead>
          <tr>
            <th class="baset">CATEGORY</th>
            <th class="baset">COLOR</th>
            <th class="baset">DESCRIPTION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="baset">WEALTH</td>
            <td class="baset">Orange</td>
            <td class="baset">
              These cooperations are the most common, and represent cooperation
              ideas or proposals, funded or not by the platform, that generate
              wealth for both the people working in them and the whole
              Cooperacy.
            </td>
          </tr>
          <tr>
            <td class="baset">COORDINATION</td>
            <td class="baset">Yellow</td>
            <td class="baset">
              This cooperations are functional to the whole system and serve the
              purposes and the maintenance of Cooperacy itself.
            </td>
          </tr>
          <tr>
            <td class="baset">ECOSYSTEM</td>
            <td class="baset">Green</td>
            <td class="baset">
              This category is related to cooperations that take care of nature,
              animals and humans with an ecosystemic perspective.
            </td>
          </tr>
          <tr>
            <td class="baset">INFORMATIVE</td>
            <td class="baset">Turquoise</td>
            <td class="baset">
              This category is used for reporting purposes and informative ones.
            </td>
          </tr>
          <tr>
            <td class="baset">LOCATIONS</td>
            <td class="baset">Blue</td>
            <td class="baset">
              This category is dedicated to location related communities and
              their governance.
            </td>
          </tr>
          <tr>
            <td class="baset">SCIENCE</td>
            <td class="baset">Violet</td>
            <td class="baset">
              The science category is for research or educational purposes and
              has the peculiarity that it may be subject to testing by experts.
            </td>
          </tr>
          <tr>
            <td class="baset">CREATIVITY</td>
            <td class="baset">Pink</td>
            <td class="baset">
              This cooperation category is dedicated to creativity, arts, music,
              games, sports and entertainment.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="subheading understanding center space margin mt-4">NOTES</p>
    <li>
      <em
        >The preallocation of the budget cooperation ideas could be brought to 0
        if there is no more activity on it by more than two users after 90 days,
        the user is contacted and gives no response, unless it has more than 50%
        of the budget, in that case the pre-allocated budget is kept safe</em
      >
    </li>
    <li>
      <em
        >Any direct donation to a cooperation idea counts as donated budget.
        Donated budget and pre-allocated budget count as per the fulfilment of
        the idea budget to be turned into a cooperation, but donated budget
        cannot be returned to the collection fund unless the idea is rescinded
        or abandoned.</em
      >
    </li>
    <li>
      <em
        >Current minimum budget for funded ideas is 1000 euros or
        equivalent.</em
      >
    </li>
    <li>
      <em
        >Participants Gender (M / F / Other) will be in the future signal the
        cooperations composition.</em
      >
    </li>
    <br /><br /><br /><br />
    <!-- <p class="subheading understanding center space margin mt-4">CO-DONATIONS</p>
      <p class="base">
        Co-donation is an alternative way in which you can help an idea to find
        its budget. When you hit on co-donate, you choose a maximum amount you
        are willing to donate for filling up the idea budget, if all the other
        co-donators are willing to donate the same. The system periodically
        evaluates the lowest of all amounts promised and multiplies for the
        number of the co-donators in order to see if the total budget is
        reached. If not, the system evaluates other combination possibilities
        able to reach the budget, like excluding lower donation amounts. Once a
        possible co-donation is found, the idea is turned into a cooperation and the
        codonations are billed to your bank account, credit card or any other
        possibility the website allows.
                Any direct donation to an idea counts as dedicated donated budget.
        Donated budget and pre-allocated budget count for the idea budget to be
        turned into an approval cooperation, but donated budget cannot be
        returned to the collection fund unless the idea is rescinded or
        abandoned.<br />
                  <li><em>Co-donation amount indicates the maximum amount you are willing to donate for the realization of the idea, that will be the same for all the co-donators. The system periodically evaluates the lowest of all amounts promised and multiplies for the number of the codonators in order to evaluate if the budget is reached. If not reached, the system evaluates other combination possibilities (all the amounts multiplied by the people who can afford more) able to reach the budget. Once turned into a cooperation, the codonations are billed to your bank account, credit card or any other possibility the Site allows.</em></li>
      </p> -->
  </b-container>
</template>
<script>
export default {
  head() {
    return {
      title: 'Cooperacy - The White Paper'
    }
  }
}
</script>
