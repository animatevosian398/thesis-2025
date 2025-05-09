<template>
  <div>
    <!-- <h3>{{ documentData.title }}</h3> -->
    <!-- <p class="source-note">
      Published by
      <a :href="documentData.sourceUrl" target="_blank">{{
        documentData.source
      }}</a>
    </p> -->

    <div class="government-text">
      <!-- Document content with highlighted sections -->
      <p>
        <span
          class="highlight highlight-procedural"
          :class="{
            'highlight-active':
              isHovered === 'Procedural_Deflection_Evidence_Archives',
            'highlight-selected':
              activeStance === 'Procedural_Deflection_Evidence_Archives',
          }"
          @click="toggleActiveStance('Procedural_Deflection_Evidence_Archives')"
        >
          Throughout recent debate on the Armenian Question one statement has
          characterized those who object to politicians' attempts to write
          history. "Let the Historians Decide." Few of us have stated what we
          mean by that statement. It is time to do so.
        </span>
      </p>

      <p>
        There is a vast difference between history written to defend one-sided
        nationalist convictions and what history should be. History intends to
        find the truth about the past. Historians recognize that the truth is
        illusive. They know they have prejudices that affect their judgement.
        They know that they never have all the facts. Yet they always try to
        find the truth, whatever that truth may be.
      </p>

      <p>
        <span
          class="highlight highlight-explicit-denial"
          :class="{
            'highlight-active': isHovered === 'Explicit_Denial',
            'highlight-selected': activeStance === 'Explicit_Denial',
          }"
          @click="toggleActiveStance('Explicit_Denial')"
        >
          Nationalists who use history have a different set of goals. They use
          events from the past as weapons in their nations' battles. They have a
          purpose the triumph of their cause and will use anything to succeed in
          their goal. While a historian tries to collect all relevant facts and
          put them in a coherent picture, the nationalist selects those pieces
          of history that fit his purpose, ignoring the others.
        </span>
      </p>

      <p>
        <span
          class="highlight highlight-justification"
          :class="{
            'highlight-active': isHovered === 'Justification_Narrative',
            'highlight-selected': activeStance === 'Justification_Narrative',
          }"
          @click="toggleActiveStance('Justification_Narrative')"
        >
          Like other men and women, historians have political goals and
          ideologies, but a true historian acknowledges his errors when the
          facts do support his belief. The nationalist apologist never does so.
          If the facts not fit his theories, the nationalist ignores those facts
          and looks for other ways to make his case. True historians can make
          intellectual mistakes. Nationalist apologists commit intellectual
          crimes.
        </span>
      </p>

      <p>
        The Armenian Question has long been plagued with nationalist studies.
        This has led to an inconsistent history that ignores the time-tested
        principles of historical research. Yet when the history of the Turks and
        Armenians is approached with the normal tools of history, a logical and
        consistent account results. "Let the historians decide" is a call for
        historical study like any other historical study, one that looks at all
        the facts, studies all the opinions, applies historical principles, and
        comes to logical conclusions. <br />Historians first ask the most basic
        question, "Was there an Armenia?" Was there a region within the Ottoman
        Empire where Armenians were a compact majority that might rightfully
        demand its own state?<br />To find the answer, historians look to
        government statistics for population figures, especially to archival
        statistics, because governments seldom deliberately lie to themselves.
        They want to know their populations so they can understand them, watch
        them, conscript them, and most important to a government, tax them. The
        Ottomans were no different than any other government in this. Like other
        governments, they made mistakes, particularly undercounts of women and
        children. These undercounts can be corrected through the use of
        statistical methods. What results is the most accurate possible picture
        of the number of the Ottoman Armenians." By the beginning of World War
        I, Armenians made up only 17% of the area they claimed as "Ottoman
        Armenia."
        <span
          class="highlight highlight-minimization"
          :class="{
            'highlight-active': isHovered === 'Minimization_Reframing',
            'highlight-selected': activeStance === 'Minimization_Reframing',
          }"
          @click="toggleActiveStance('Minimization_Reframing')"
          >In fact, if all the Armenians in the world had come to Eastern
          Anatolia, they still would not have been a majority there.</span
        ><span
          class="highlight highlight-minimization"
          :class="{
            'highlight-active': isHovered === 'Minimization_Reframing',
            'highlight-selected': activeStance === 'Minimization_Reframing',
          }"
          @click="toggleActiveStance('Minimization_Reframing')"
        >
          Two inferences can be drawn from the relatively small number of
          Armenians in the Ottoman East: The first is that by themselves, the
          Armenians of Anatolia would have been no great threat to the Ottoman
          State. Armenian rebels might have disrupted civil order, but there
          were too few of them to endanger Ottoman authority. Armenian rebels
          needed help from outside forces, help that could only be provided by
          the Russians.</span
        >
        <span
          class="highlight highlight-competitive-victimhood"
          :class="{
            'highlight-active':
              isHovered === 'Competitive_Victimhood_Historical_Inversion',
            'highlight-selected':
              activeStance === 'Competitive_Victimhood_Historical_Inversion',
          }"
          @click="
            toggleActiveStance('Competitive_Victimhood_Historical_Inversion')
          "
        >
          The second inference is that Armenian nationalists could have created
          a state that was truly theirs only if they first evicted the Muslims
          who lived there.
        </span>
        To understand the history of the development of Muslim-Armenian
        antagonism one must apply historical principles. In applying those
        principles, one can see that the history of the Armenians was a history
        like other histories. Some of that history was naturally unique, because
        of its environment, but much of it was strikingly similar to what was
        seen in other places and times. The principles: 1. Most ethnic conflicts
        develop over a long period. Germans and Poles, Finns and Russians,
        Hindus and Muslims in the Indian sub-continent, Irish and English,
        Europeans and Native Americans in North America-all these ethnic
        conflicts unfolded over generations, often over centuries. 2. Until very
        modem times, most mass mortality of ethnic groups and peoples was the
        result of warfare in which there were at least two warring sides. 3.
        When conflict erupted between nationalist revolutionaries and states it
        was the revolutionaries who began the confrontations. Internal peace was
        in the interest of settled states. Looked at charitably, states often
        wished tranquillity for the benefits it gave their citizens. With less
        charity, it can be seen that peace made it easier to collect taxes and
        use armies to fight foreign enemies, not internal foes. World history
        demonstrates this too well for examples from other regions to be needed
        here. In the Ottoman Empire, the examples of rebellions in Greece,
        Serbia, and Bulgaria demonstrate the truth of the principle. <br />On
        these principles, the history of the Turks and The Armenians was no
        different than other histories. Historical principles applied.<br /><span
          class="highlight highlight-minimization"
          :class="{
            'highlight-active': isHovered === 'Minimization_Reframing',
            'highlight-selected': activeStance === 'Minimization_Reframing',
          }"
          @click="toggleActiveStance('Minimization_Reframing')"
          >The conflict between the Turks and Armenians did indeed develop over
          a long time.</span
        >
        <span
          class="highlight highlight-justification"
          :class="{
            'highlight-active': isHovered === 'Justification_Narrative',
            'highlight-selected': activeStance === 'Justification_Narrative',
          }"
          @click="toggleActiveStance('Justification_Narrative')"
          >The primary imputes for what was to become the Armenian-Muslim
          conflict lay in Russian imperial expansion.</span
        >
        In the time of Ivan The Terrible, the sixteenth century, Russians began
        a policy of expelling Muslims from lands they conquered.
        <span
          class="highlight highlight-competitive-victimhood"
          :class="{
            'highlight-active':
              isHovered === 'Competitive_Victimhood_Historical_Inversion',
            'highlight-selected':
              activeStance === 'Competitive_Victimhood_Historical_Inversion',
          }"
          @click="
            toggleActiveStance('Competitive_Victimhood_Historical_Inversion')
          "
          >Over the next three hundred years, Muslim peoples, many of them
          Turks, were killed or driven from what today is the Ukraine, the
          Crimea, and the Caucasus. From the 1770s to the 1850s Russian attacks
          and Russian laws forced more than 400,000 Crimean Tatars to flee their
          land. In Caucasus Region, 1.2 million Circassians and Abhazians were
          either expelled or killed by the Russians. Of that number, one-third
          died-one of many mass murders of Muslims that most often has been
          ignored. The Tatars, Circassians, and Abhazians came to the Ottoman
          Empire. Their presence taught the Ottoman Muslims what they could
          expect from Russian conquest.</span
        >
      </p>
      <p>
        By the beginning of World War I, Armenians made up only 17% of the area
        they claimed as "Ottoman Armenia." In fact, if all the Armenians in the
        world had come to Eastern Anatolia, they still would not have been a
        majority there.<br /><span
          class="highlight highlight-justification"
          :class="{
            'highlight-active': isHovered === 'Justification_Narrative',
            'highlight-selected': activeStance === 'Justification_Narrative',
          }"
          @click="toggleActiveStance('Justification_Narrative')"
        >
          Members of the Armenian minority in the Caucasus Region began to rebel
          against Muslim rule and to ally themselves with Russian invaders in
          the 1790s. Armenian armed units joined the Russians. Armenian spies
          delivered plans to the Russians. In these wars, Muslims were massacred
          and forced into exile. Armenians in turn migrated into areas
          previously held by Muslims, such as Karabag. This was the beginning of
          the division of the peoples of the Southern Caucasus and then Eastern
          Anatolia into two conflicting sides-the Russian Empire and the
          Armenians on one side, the Muslim population and the Ottoman Empire on
          the other. Most Armenians and Muslims undoubtedly wanted nothing to do
          with this conflict, but events were to force them to take sides.</span
        ><br />
        The 1827 to 1829 wars between the Russians and the Persians and the
        Russians and Ottomans saw the beginning of a great population exchange
        in the East that was to last until 1920. When the Russians conquered the
        Erivan Khanete, today the Armenian Republic, the majority of its
        population of its population was Muslim. Approximately two-thirds,
        60,000 of these Muslims were forced out of Erivan by the Russians. The
        Russians went on to invade Anatolia, where large numbers of Armenians
        took up the Russian cause.
        <span
          class="highlight highlight-justification"
          :class="{
            'highlight-active': isHovered === 'Justification_Narrative',
            'highlight-selected': activeStance === 'Justification_Narrative',
          }"
          @click="toggleActiveStance('Justification_Narrative')"
          >At war's end, when the Russians left Eastern Anatolia, 50-90,000
          Armenians joined them. They took up the places of the exiled Muslims
          in Erivan and elsewhere, joined by 40,000 Armenians from Iran.</span
        ><br /><span
          class="highlight highlight-minimization"
          :class="{
            'highlight-active': isHovered === 'Minimization_Reframing',
            'highlight-selected': activeStance === 'Minimization_Reframing',
          }"
          @click="toggleActiveStance('Minimization_Reframing')"
          >The great population exchange had begun, and mutual distrust between
          Anatolia's Muslims and Armenians was result. </span
        >The Russians were to invade Anatolia twice more in the nineteenth
        century, during the Crimean War and the 1877-78 Russo-Turkish War. In
        both wars, significant numbers of Armenians joined the Russians, acting
        as spies and even occupation police. In Erzurum, for example, British
        consular officials reported that the Armenian police chief appointed by
        the Russians and his Armenian force "molested, ill-treated, and insulted
        the Mohammadan population," and that 6,000 Muslim families had been
        forced to flee the city.
        <span
          class="highlight highlight-competitive-victimhood"
          :class="{
            'highlight-active':
              isHovered === 'Competitive_Victimhood_Historical_Inversion',
            'highlight-selected':
              activeStance === 'Competitive_Victimhood_Historical_Inversion',
          }"
          @click="
            toggleActiveStance('Competitive_Victimhood_Historical_Inversion')
          "
          >When the Russians left part of their conquest, at least 25,000
          Armenians joined them, fearing the vengeance of the Muslims. The
          largest migration, though, was the forced flight of 70,000 Muslims,
          mainly Turks, from the lands conquered by the Russians and the exodus
          of 40,000 Laz by 1882.</span
        ><br />By 1900, approximately 1,400,000 Turkish and Caucasian Muslims
        had been forced out by the Russians. One-third of these had died, either
        murdered or the victims of starvation and disease. Between 125,000 and
        150,000 Armenians emigrated from Ottoman Anatolia to Erivan and other
        parts of the Russian Southern Caucasus.
      </p>
      <p>
        <br />This was the toll of Russian imperialism. Not only had one and
        one-half million people been exiled or killed, but ethnic peace had been
        destroyed.
        <span
          class="highlight highlight-justification"
          :class="{
            'highlight-active': isHovered === 'Justification_Narrative',
            'highlight-selected': activeStance === 'Justification_Narrative',
          }"
          @click="toggleActiveStance('Justification_Narrative')"
          >The Muslims had been taught that their nineteenth century's
          neighbors, the Armenians, with whom they had lived for more than 700
          years, might once again become their enemies when the Russians next
          advanced. The Russians had created the two sides that history teaches
          were to be expected in conflict and mass murder. The actions of
          Armenian rebels exacerbated the growing division and mutual fear
          between the Muslims and Armenians of the Ottoman East.
        </span>
      </p>
      <p>
        <span
          class="highlight highlight-justification"
          :class="{
            'highlight-active': isHovered === 'Justification_Narrative',
            'highlight-selected': activeStance === 'Justification_Narrative',
          }"
          @click="toggleActiveStance('Justification_Narrative')"
        >
          The Armenian rebellion began with the organization of guerilla bands
          made up of Armenians from both the Russian and Ottoman lands. Arms
          were smuggled in.
        </span>
      </p>
      <p>
        <span
          class="highlight highlight-competitive-victimhood"
          :class="{
            'highlight-active':
              isHovered === 'Competitive_Victimhood_Historical_Inversion',
            'highlight-selected':
              activeStance === 'Competitive_Victimhood_Historical_Inversion',
          }"
          @click="
            toggleActiveStance('Competitive_Victimhood_Historical_Inversion')
          "
          >The guerrillas assassinated Ottoman officials, attacked Muslim
          villages, and used bombs, the nineteenth century's terror weapon of
          choice. By 1894, the rebels were ready for open revolution. Revolts
          broke out in Sasun, Zeytun, Van and elsewhere in 1894 and 1895. As in
          Bulgaria, they began with the murder of innocent civilians. The leader
          of the Zeytun rebellion stated his forces had killed 20,000 Muslims. </span
        >As in Bulgaria, the Muslims retaliated. In Van, for example, 400
        Muslims and 1,700 Armenians died. Further rebellions followed.
        <span
          class="highlight highlight-minimization"
          :class="{
            'highlight-active': isHovered === 'Minimization_Reframing',
            'highlight-selected': activeStance === 'Minimization_Reframing',
          }"
          @click="toggleActiveStance('Minimization_Reframing')"
          >In Adana in 1909, The Armenian revolt turned out very badly for both
          the rebels and the innocent when the government lost control and
          17,000 to 20,000 died, mostly Armenians. Throughout the revolts, and
          especially in 1894 and 1897, the Armenians deliberately attacked
          Kurdish tribesmen, knowing that it was from them that great vengeance
          was most likely to be expected. Pitched battles between Kurds and
          Armenians resulted.</span
        >
      </p>
      <p>
        <br /><span
          class="highlight highlight-minimization"
          :class="{
            'highlight-active': isHovered === 'Minimization_Reframing',
            'highlight-selected': activeStance === 'Minimization_Reframing',
          }"
          @click="toggleActiveStance('Minimization_Reframing')"
          >But it all went wrong for the Armenian rebels. They had followed the
          Bulgarian plan, killing Muslims and initiating revenge attacks on
          Armenians. Their own people had suffered most.</span
        >
        Yet the Russians, the Europeans they depended upon, did not intervene.
        European politics and internal problems stayed the Russian hand.
        <br />What were the Armenian rebels trying to create? When the Serbs and
        Bulgarians rebelled against the Ottoman Empire they claimed lands where
        the majorities were Serbs or Bulgarians.
        <span
          class="highlight highlight-competitive-victimhood"
          :class="{
            'highlight-active':
              isHovered === 'Competitive_Victimhood_Historical_Inversion',
            'highlight-selected':
              activeStance === 'Competitive_Victimhood_Historical_Inversion',
          }"
          @click="
            toggleActiveStance('Competitive_Victimhood_Historical_Inversion')
          "
          >They expelled Turks and other Muslims from their lands, but these
          Muslims had not been a majority. This was not true for Armenians. The
          lands they coveted were overwhelmingly Muslim in population. The only
          way they could create an Armenia was to expel the Muslims.</span
        >
        Knowing this history is essential to understanding what was to come
        during World War I. There had been a long historical period in which two
        conflicting sides developed.
        <br />Russian imperialists and Armenian revolutionaries had begun a
        struggle that was in no way wanted by the Ottomans. Yet the Ottomans
        were forced to oppose the plans of both Russians and Armenians, if only
        to defend the majority of their subjects. History taught the Ottomans
        that if the Armenians triumphed not only would territory be lost, but
        mass expulsions and deaths would be the fate of the Muslim majority.
        This was the one absolutely necessary goal of the Armenian Rebellion.
        <br />...<br />
      </p>

      <p>
        <span
          class="highlight highlight-justification"
          :class="{
            'highlight-active': isHovered === 'Justification_Narrative',
            'highlight-selected': activeStance === 'Justification_Narrative',
          }"
          @click="toggleActiveStance('Justification_Narrative')"
        >
          Historical principles were once again at work. Rebels had begun the
          action, and the result was the creation of two warring sides. After
          the Armenian deeds in Van and elsewhere, Muslims could only have
          expected that Armenians were enemies who would kill them. Armenians
          could only have feared Muslim revenge. Most of these people had no
          wish for war, but they had been driven to it. It was to be a merciless
          conflict.
        </span>
      </p>
      <p>
        There were many other examples of forced migrations during this
        conflict, affecting both Armenians and Muslims throughout the region.
      </p>
      <p>
        <span
          class="highlight highlight-minimization"
          :class="{
            'highlight-active': isHovered === 'Minimization_Reframing',
            'highlight-selected': activeStance === 'Minimization_Reframing',
          }"
          @click="toggleActiveStance('Minimization_Reframing')"
          >Popular opinion today knows of only one set of deportations, more
          properly called forced migrations in Anatolia, the deportation of the
          Armenians. There were in fact many forced migrations. For the
          Armenians, the worst forced migrations came when they fled with their
          retreating armies, came when they fled with their retreating armies.
          They suffered just as the Muslims suffered when they accompanied their
          own armies in retreat. Starvation and disease killed great numbers of
          both, far more than fell to enemies' bullets. This is as should be
          expected from historical principles; starvation and disease are always
          the worst killers. It is also a historical principle that refugees
          suffer worst of all.
        </span>
        <span
          class="highlight highlight-minimization"
          :class="{
            'highlight-active': isHovered === 'Minimization_Reframing',
            'highlight-selected': activeStance === 'Minimization_Reframing',
          }"
          @click="toggleActiveStance('Minimization_Reframing')"
          >One of the many forced migration was the organized expulsion of
          Armenians from much of Anatolia by the Ottoman Government. In the
          light of the history and the events of this war, it is true that the
          Ottomans had obvious reason to fear Armenians, and that forced
          migration was an age-old tool in Middle Eastern and Balkan conflicts.
          It is also true that while its troops were fighting the Russians and
          Armenians, the Ottoman Government could not did not properly protect
          the Armenian migrants. Nevertheless, more than 200,000 of the deported
          Armenians reached Greater Syria and survived. (Some estimate that as
          many as two-thirds of the deportees survived.)</span
        ><br /><span
          class="highlight highlight-minimization"
          :class="{
            'highlight-active': isHovered === 'Minimization_Reframing',
            'highlight-selected': activeStance === 'Minimization_Reframing',
          }"
          @click="toggleActiveStance('Minimization_Reframing')"
        >
          Those who see the evil of genocide in the forced migrations of
          Armenians ignore the survival of so many of those who were deported.
          They also ignore the fact that the Armenians who were most under
          Ottoman control, those in Western cities such as Izmir, Istanbul, and
          Edirne, were neither deported nor molested, presumably because they
          were not a threat. </span
        ><span
          class="highlight highlight-explicit-denial"
          :class="{
            'highlight-active': isHovered === 'Explicit_Denial',
            'highlight-selected': activeStance === 'Explicit_Denial',
          }"
          @click="toggleActiveStance('Explicit_Denial')"
        >
          No claim of genocide can rationally stand in the light of these facts.
          If genocide is to be considered,</span
        >
        <span
          class="highlight highlight-competitive-victimhood"
          :class="{
            'highlight-active':
              isHovered === 'Competitive_Victimhood_Historical_Inversion',
            'highlight-selected':
              activeStance === 'Competitive_Victimhood_Historical_Inversion',
          }"
          @click="
            toggleActiveStance('Competitive_Victimhood_Historical_Inversion')
          "
          >however, then the murders of Turks and Kurds in 1915 and 1916 must be
          included in the calculation of blame. The Armenian murder of the
          innocent civilians of Erzincan, Bayburt, Tercan, Erzurum, and all the
          villages on the route of the Armenian retreat in 1918 must be taken
          into account. The Armenian molestation's and massacres in Cilicia,
          deplored even by their French and British allies, must be judged. And
          the exile or death of two-thirds of the Turks of Erivan Province, the
          Armenian Republic, during the war must be remembered.</span
        ><br />...<br /><span
          class="highlight highlight-explicit-denial"
          :class="{
            'highlight-active': isHovered === 'Explicit_Denial',
            'highlight-selected': activeStance === 'Explicit_Denial',
          }"
          @click="toggleActiveStance('Explicit_Denial')"
        >
          In examining the claims of Armenian nationalists, first to be
          considered should be outright lies.</span
        >
      </p>
      <p>
        One of the best examples of
        <span
          class="highlight highlight-explicit-denial"
          :class="{
            'highlight-active': isHovered === 'Explicit_Denial',
            'highlight-selected': activeStance === 'Explicit_Denial',
          }"
          @click="toggleActiveStance('Explicit_Denial')"
          >invented Ottoman admissions of guilt</span
        >
        may be that concocted by the American ambassador Morgenthau. Morgenthau
        asked his readers to believe that Talat Pasa offhandedly told the
        ambassador of his plans to eradicate the Armenians. Applying common
        sense and some knowledge of diplomatic practice helps to evaluate these
        supposed indiscretions.<span
          class="highlight highlight-explicit-denial"
          :class="{
            'highlight-active': isHovered === 'Explicit_Denial',
            'highlight-selected': activeStance === 'Explicit_Denial',
          }"
          @click="toggleActiveStance('Explicit_Denial')"
        >
          Can anyone believe that the Ottoman Interior Minister would actually
          have done such a thing? He knew that America invariably supported the
          Armenians, and had always done so. If he felt the need to unburden his
          soul, who would be last person to whom he would talk? The American
          ambassador. Yet to whom does he tell all? The American Ambassador!
          Talat Pasa was a practical politician. Like all politicians, he
          undoubtedly violated rules and made errors. But no one has ever
          alleged that Talat Pasa was an idiot. Perhaps Ambassador Morgenthau
          knew that the U.S. State Department would never believe his story,
          because he never reported it at the time to his masters, only writing
          it later in a popular book.</span
        >
        Population has also been a popular field for fabrication. Armenian
        nationalists had a particular difficulty.
        <span
          class="highlight highlight-minimization"
          :class="{
            'highlight-active': isHovered === 'Minimization_Reframing',
            'highlight-selected': activeStance === 'Minimization_Reframing',
          }"
          @click="toggleActiveStance('Minimization_Reframing')"
          >They were only a small part of the population of the land they
          planned to carve from the Ottoman Empire. The answer was false
          statistics. Figures appeared that claimed that Armenians were the
          largest group in Eastern Anatolia. These population statistics were
          supposedly the work of the Armenian Patriarch, but they were actually
          the work of an Armenian who assumed a French name, Marcel Leart,
          published them in Paris, and pretended they were the Patriarch's work.
          Naturally, he greatly exaggerated the number of Armenians and
          diminished the number of Turks. Once again, the amazing thing is that
          these were ever taken seriously. Yet they were used after World War I
          to justify granting Eastern Anatolia to the Armenians and are still
          routinely quoted today.</span
        ><br /><span
          class="highlight-procedural"
          :class="{
            'highlight-active':
              isHovered === 'Procedural_Deflection_Evidence_Archives',
            'highlight-selected':
              activeStance === 'Procedural_Deflection_Evidence_Archives',
          }"
          @click="toggleActiveStance('Procedural_Deflection_Evidence_Archives')"
        >
          The basic historical omission is never citing, never even looking at
          evidence that might contradict one's theories. Nationalist apologists
          refer to English propaganda, missionary reports, statements by
          Armenian revolutionaries, and like. They seldom refer to Ottoman
          documents, hundreds of which have been published in recent years,
          expect perhaps to claim that nothing written by the Ottomans can be
          trusted (although they trust completely the writings of Armenian
          partisans). These documents indicate that the Ottomans planned no
          genocide and were at least officially solicitous of the Armenians'
          welfare. The fact that these contradict the Armenian sources is all
          the more reason that they should be consulted. Good history can only
          be written when both sides of historical arguments are
          considered.</span
        ><span
          class="highlight highlight-competitive-victimhood"
          :class="{
            'highlight-active':
              isHovered === 'Competitive_Victimhood_Historical_Inversion',
            'highlight-selected':
              activeStance === 'Competitive_Victimhood_Historical_Inversion',
          }"
          @click="
            toggleActiveStance('Competitive_Victimhood_Historical_Inversion')
          "
        >
          Worst of all is the most basic omission: The Armenian apologists do
          not mention the Muslim dead. Any civil war will appear to be a
          genocide if only the dead of one side are counted. Their writings
          would be far more accurate, and would tell a very different story, if
          they included facts such as the deaths of nearly two-thirds of the
          Muslims of Van Vilayeti, deaths caused by the Russians and Armenians.
          Histories that strive for accuracy must include all the facts, and the
          deaths of millions of Muslims is surely a fact that deserves
          mention.</span
        >

        <span
          class="highlight highlight-explicit-denial"
          :class="{
            'highlight-active': isHovered === 'Explicit_Denial',
            'highlight-selected': activeStance === 'Explicit_Denial',
          }"
          @click="toggleActiveStance('Explicit_Denial')"
        >
          Finally, what is to be done? As might be expected from all I have said
          here today, I believe the only answer to false allegations of genocide
          is to study and proclaim the truths of history. Political actions such
          as the resolution recently passed by the French Parliament naturally
          and properly draw corresponding political actions from Turks, but
          political actions will never convince the world that Turks did not
          commit genocide. </span
        ><span
          class="highlight-procedural"
          :class="{
            'highlight-active':
              isHovered === 'Procedural_Deflection_Evidence_Archives',
            'highlight-selected':
              activeStance === 'Procedural_Deflection_Evidence_Archives',
          }"
          @click="toggleActiveStance('Procedural_Deflection_Evidence_Archives')"
        >
          >What is needed to convince the world is a great increase in
          scholarship. Archives must remain open and be easy to use for both
          Turks and foreigners. Graduate students should be encouraged to study
          the Armenian Question.</span
        >
        No student's advisers should tell him to avoid this subject because it
        is "too political," something I have heard in America and,
        unfortunately, in Turkey as well.
      </p>

      <p>
        <span
          class="highlight highlight-reconciliation"
          :class="{
            'highlight-active': isHovered === 'Reconciliation_Discourse',
            'highlight-selected': activeStance === 'Reconciliation_Discourse',
          }"
          @click="toggleActiveStance('Reconciliation_Discourse')"
        >
          I suggest, as I have suggested before, that the Turkish Republic
          propose to the Armenian Republic that a joint commission be
          established, its members selected by scholarly academies in both
          countries.
        </span>
        <span
          class="highlight-procedural"
          :class="{
            'highlight-active':
              isHovered === 'Procedural_Deflection_Evidence_Archives',
            'highlight-selected':
              activeStance === 'Procedural_Deflection_Evidence_Archives',
          }"
          @click="toggleActiveStance('Procedural_Deflection_Evidence_Archives')"
        >
          All archives should be opened to the commission - not only the Ottoman
          Archives, but the archives of Armenia and of the Armenian
          Revolutionary Federation.
        </span>
        Whatever or not such a commission is ever named, the study of the
        Armenian Question must continue. This is true not only because it is
        always right to discover accurate history. It is true because honor
        demands it. Honor is a word that is not often heard today, but a concept
        of honor is nonetheless sorely needed. I have been told by many that the
        Turks should adopt a political strategy to deal with the Armenian
        Problem. This strategy would have the Turkish Government lie about the
        past for present political gain. The Government would state that the
        Ottomans committed genocide, but that Modem Turkey cannot be blamed,
        because it is a different government. This, I have been told, would
        cause the world to think more kindly of the Turks. I do not believe this
        ultimately would satisfy anyone. I believe that calls for reparations
        and land would quickly follow such statement. But that is not the reason
        to reject such easy political lies.
        <span
          class="highlight highlight-explicit-denial"
          :class="{
            'highlight-active': isHovered === 'Explicit_Denial',
            'highlight-selected': activeStance === 'Explicit_Denial',
          }"
          @click="toggleActiveStance('Explicit_Denial')"
          >They should be rejected purely because they are wrong. </span
        >I believe the Turks are still men and women honor. They know that it
        can never be honorable to accept lies told of their ancestors, no matter
        the benefits. I also believe that some day, perhaps soon, perhaps far in
        the future, the truth will be recognized by the world. I believe that
        the accurate study of history and the honor of the Turks will bring this
        to pass. Professor Justin McCarthy
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "JustinMcCarthy",
  props: {
    documentData: {
      type: Object,
      required: true,
    },
    isHovered: String,
    activeStance: String,
  },
  methods: {
    onMouseEnter(stance) {
      this.$emit("showRelatedComments", stance);
    },
    onMouseLeave() {
      this.$emit("showAllComments");
    },
    toggleActiveStance(stance) {
      this.$emit("showRelatedComments", stance);
    },
  },
};
</script>

<style scoped>
@import "../../styles/shared.css";
</style>
