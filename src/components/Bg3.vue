<template>
  <div class="article-container">
    <div class="article-header">
      <h1 class="article-title">What Is Genocide?</h1>
      <div class="article-meta">
        <span class="meta-text">United Nations Convention, 1948</span>
      </div>
    </div>

    <div class="article-content">
      <p>
        When Raphael Lemkin coined the term "genocide" in 1944, he sought to
        name something that had long existed but never been properly defined:
        the deliberate destruction of a people.
      </p>

      <p>
        The United Nations Convention on the Prevention and Punishment of the
        Crime of Genocide, adopted in 1948, defines genocide as any of the
        following acts committed with intent to destroy, in whole or in part, a
        national, ethnical, racial, or religious group:
      </p>

      <div class="definition-list">
        <ol>
          <li>Killing members of the group;</li>
          <li>
            Causing serious bodily or mental harm to members of the group;
          </li>
          <li>
            Deliberately inflicting on the group conditions of life calculated
            to bring about its physical destruction in whole or in part;
          </li>
          <li>
            Imposing measures intended to prevent births within the group;
          </li>
          <li>Forcibly transferring children of the group to another group.</li>
        </ol>
      </div>
      <!-- 
      <p>
        What distinguishes genocide from other crimes against humanity is the
        <em>specific intent</em> to destroy a group—in whole or in part. This
        element of intent, what legal scholars call <em>dolus specialis</em>, is
        the crucial factor that transforms mass violence into genocide.
      </p> -->

      <div class="pullquote">
        <p>
          "The intent to destroy, in whole or in part, a national, ethnical,
          racial or religious group, as such"
        </p>
        <span class="pullquote-source"
          >—UN Genocide Convention, Article II</span
        >
      </div>

      <p>
        The definition is deliberately narrow. Not all mass killings are
        genocide. Not all ethnic violence qualifies. The perpetrators must
        demonstrate, through their actions or statements, the specific intent to
        destroy a protected group. This high threshold has made genocide
        notoriously difficult to prove in international courts, yet it remains
        the "crime of crimes" in international law.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditorialGenocideDefinition",
};
</script>

<style scoped>
.article-container {
  max-width: 680px;
  margin: 0 auto;
  padding: 60px 20px;
  font-family: "Georgia", serif;
  color: #1a1a1a;
  line-height: 1.6;
}

.article-header {
  margin-bottom: 40px;
  text-align: center;
}

.article-title {
  font-family: "Tiempos Headline", "Times New Roman", serif;
  font-size: 3rem;
  font-weight: 400;
  margin-bottom: 16px;
  line-height: 1.1;
}

.article-meta {
  font-family: "Aktiv Grotesk", -apple-system, sans-serif;
  color: #666;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.article-content {
  font-size: 1.2rem;
  line-height: 1.75;
}

.article-content p {
  margin-bottom: 28px;
}

.drop-cap {
  position: relative;
}

.first-letter {
  float: left;
  font-size: 4.2rem;
  line-height: 0.8;
  padding: 0 8px 0 0;
  font-weight: 700;
  position: relative;
  top: 8px;
}

.definition-list {
  margin: 32px 0;
  padding-left: 40px;
}

.definition-list ol {
  margin: 0;
  padding-left: 24px;
}

.definition-list li {
  margin-bottom: 12px;
  font-size: 1.1rem;
  line-height: 1.6;
}

.pullquote {
  margin: 48px 0;
  padding: 24px 0;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
}

.pullquote p {
  font-size: 1.5rem;
  font-style: italic;
  font-weight: 300;
  margin-bottom: 12px;
  color: #333;
}

.pullquote-source {
  font-family: "Aktiv Grotesk", -apple-system, sans-serif;
  font-size: 0.9rem;
  color: #666;
  display: block;
  margin-top: 8px;
}

em {
  font-style: italic;
}

@media (max-width: 768px) {
  .article-container {
    padding: 40px 20px;
  }

  .article-title {
    font-size: 2.2rem;
  }

  .article-content {
    font-size: 1.1rem;
  }

  .first-letter {
    font-size: 3.5rem;
  }

  .pullquote p {
    font-size: 1.3rem;
  }
}
</style>
