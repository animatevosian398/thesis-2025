<template>
  <div class="denial-view">
    <div class="comments-container">
      <div
        v-for="(comment, index) in sortedComments"
        :key="index"
        class="comment"
      >
        {{ comment }}
      </div>
      <div v-if="loading" class="loading">Loading comments...</div>
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import Papa from "papaparse";
import axios from "axios"; // Make sure axios is installed: npm install axios

export default {
  name: "DenialView",
  data() {
    return {
      allComments: [],
      denialComments: [],
      loading: true,
      error: null,
    };
  },
  computed: {
    sortedComments() {
      return [...this.denialComments].sort((a, b) => a.length - b.length);
    },
  },
  async mounted() {
    try {
      // Use the path in the publicassets folder
      const csvPath = "assets/Denial_comments_385_after10k.csv";
      console.log("Attempting to load CSV from:", csvPath);

      const response = await axios.get(csvPath);
      console.log("CSV file loaded successfully");

      // Parse the CSV data
      const results = Papa.parse(response.data, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
      });

      console.log("CSV parsed successfully, headers:", results.meta.fields);

      // Store all comments
      this.allComments = results.data;

      console.log(`Total comments loaded: ${this.allComments.length}`);

      // Check first record to understand structure
      if (this.allComments.length > 0) {
        console.log("First record example:", this.allComments[0]);
      }

      // Filter only the "Explicit_Denial" comments
      this.denialComments = this.allComments
        .filter((comment) => {
          // Check if we have the right field
          return comment.predicted_stance === "Explicit_Denial";
        })
        .map((comment) => comment.cleaned_text || comment.text);

      console.log(`Found ${this.denialComments.length} denial comments`);

      if (this.denialComments.length === 0 && this.allComments.length > 0) {
        // If no comments found, log available stances to help debug
        const availableStances = [
          ...new Set(
            this.allComments
              .map((comment) => comment.predicted_stance)
              .filter((stance) => stance)
          ),
        ];

        console.log("Available stances in the data:", availableStances);
      }

      this.loading = false;
    } catch (err) {
      console.error("Error loading or processing comments:", err);
      this.error = `Error: ${err.message}`;
      this.loading = false;
    }
  },
};
</script>

<style scoped>
.denial-view {
  background-color: rgb(0, 0, 0);
  min-height: 100vh;
  width: 100%;
  padding: 10px;
  margin: 0;
}

.comments-container {
  font-family: Arial, sans-serif;
  font-size: 12px;
  line-height: 0.8;
  color: rgb(214, 52, 52);
  text-align: left;
}

.comment {
  margin-bottom: 1px;
  text-align: left;
}

.loading,
.error {
  font-weight: bold;
  margin-top: 10px;
}

.error {
  color: red;
}
</style>
