<template>
  <div class="background-section" ref="mediaSection">
    <div class="content-container">
      <h1 class="backgroundTitle">Media Coverage at the Time</h1>
      <div class="content-text">
        <p>
          Turkey's government and some historians claim a lack of evidence for
          the event's qualification of genocide.
        </p>
        <p>
          However, "The New York Times covered the issue extensively — 145
          articles in 1915 alone by one count — with headlines like "Appeal to
          Turkey to Stop Massacres." The Times described the actions against the
          Armenians as "systematic," "authorized, and "organized by the
          government.
          <a
            href="https://archive.nytimes.com/www.nytimes.com/ref/timestopics/topics_armeniangenocide.html"
            >(Source: NYT)</a
          >
        </p>
        <h3>Now let's look at their framing</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background-section {
  height: 110vh;
  background-color: black;
  color: white;
  position: relative;
  padding: 80px 0 0 8%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  scroll-margin-top: 0;
  align-items: flex-start;
}

.backgroundTitle {
  position: relative;
  z-index: 2;
  margin-top: 60px;
  margin-bottom: 20px;
  margin-left: 2%;
  font-size: calc(3.6rem + 1vw);
  width: 50%;
  text-align: left;
  font-family: "aktiv-grotesk", sans-serif;
}

.content-text {
  position: relative;
  z-index: 2;
  max-width: 65%;
  margin-top: 20px;
  color: rgb(255, 255, 255);
  display: flex;
  margin-left: 20%;
  font-family: aktiv-grotesk, sans-serif;
  flex-direction: column;
  gap: 20px;
}

a {
  color: #919090;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
