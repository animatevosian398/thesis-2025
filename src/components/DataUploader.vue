<script setup>
import { ref } from "vue";
import Papa from "papaparse";

// Reactive variables
const fileName = ref("");
const parsedData = ref([]);
const headers = ref([]);

// File upload handler
const handleFileUpload = (event) => {
  const file = event.target.files[0];

  console.log("File selected:", file); // Debugging log

  if (file) {
    // Store the file name
    fileName.value = file.name;

    // Parse the CSV file
    Papa.parse(file, {
      complete: (results) => {
        console.log("Parsing complete:", results); // Debugging log

        // Store parsed data
        parsedData.value = results.data.slice(1); // Remove header row from data
        headers.value = results.data[0]; // First row as headers

        // Log the data to console
        console.log("Parsed CSV Data:", results.data);
      },
      header: false, // We'll handle headers manually
      error: (error) => {
        console.error("Parsing error:", error); // Debugging log for errors
      },
    });
  }
};
</script>
