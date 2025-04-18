<template>
  <div id="comments-section" class="comments-section" ref="commentsSection">
    <h1 class="commentsTitle" ref="title">Public Discourse*</h1>
    <p>*Real comments found on Youtube.</p>

    <div class="comments-container">
      <div
        class="comment"
        v-for="(comment, index) in visibleComments"
        :key="index"
      >
        <div class="comment-header">
          <span class="username">{{ comment.username }}</span>
          <span class="timestamp">{{ comment.timestamp }}</span>
        </div>
        <p class="comment-text">{{ comment.displayText }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: "Type",
  setup() {
    const commentsSection = ref(null);
    const title = ref(null);
    const visibleComments = ref([]);

    // Sample comments data
    const allComments = [
      {
        username: "HistoryBuff89",
        timestamp: "2 hours ago",
        text: "This event is clearly documented with photographic evidence and eyewitness accounts. How can anyone deny it happened?",
        displayText: "",
      },
      {
        username: "TurkishPatriot",
        timestamp: "1 hour ago",
        text: "It was wartime, and relocations were necessary for security. The number of casualties is greatly exaggerated.",
        displayText: "",
      },
      {
        username: "ArmenianDiaspora",
        timestamp: "45 minutes ago",
        text: "My great-grandfather escaped to Syria after his entire village was massacred. Our family history is not 'propaganda'.",
        displayText: "",
      },
      {
        username: "NeutralObserver",
        timestamp: "30 minutes ago",
        text: "Why is acknowledging historical atrocities still so politically charged in 2025? We should be able to face the past honestly.",
        displayText: "",
      },
    ];

    const triggerAnimation = () => {
      // Animate title
      gsap.to(title.value, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          // Start adding comments after title animation is done
          addCommentsSequentially();
        },
      });
    };

    // Function to type text character by character
    const typeOutText = (comment, onComplete) => {
      const fullText = comment.text;
      let index = 0;

      // Start with empty text
      comment.displayText = "";

      // Type out character by character
      const interval = setInterval(() => {
        if (index < fullText.length) {
          comment.displayText += fullText.charAt(index);
          index++;
        } else {
          clearInterval(interval);
          if (onComplete) {
            setTimeout(onComplete, 800); // Wait before showing next comment
          }
        }
      }, 30); // Speed of typing, adjust as needed
    };

    // Function to add comments one by one
    const addCommentsSequentially = () => {
      let currentIndex = 0;

      function addNextComment() {
        if (currentIndex >= allComments.length) return;

        // Create a copy of the comment
        const commentCopy = JSON.parse(
          JSON.stringify(allComments[currentIndex])
        );
        commentCopy.displayText = "";

        // Add comment to visible list
        visibleComments.value.push(commentCopy);

        // Type out the text for this comment
        typeOutText(visibleComments.value[currentIndex], () => {
          currentIndex++;
          addNextComment();
        });
      }

      addNextComment();
    };

    onMounted(() => {
      // Set initial title state
      gsap.set(title.value, { opacity: 0, y: 30 });

      // Create scroll trigger
      ScrollTrigger.create({
        trigger: commentsSection.value,
        start: "top 70%",
        onEnter: triggerAnimation,
        once: true,
      });
    });

    return {
      commentsSection,
      title,
      visibleComments,
      triggerAnimation,
    };
  },
};
</script>

<style scoped>
.comments-section {
  min-height: 100vh;
  background: #1a1a1a;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 8% 10%;
  justify-content: flex-start;
  align-items: center;
}

.commentsTitle {
  font-family: "Helvetica";
  font-size: 2em;
  margin-bottom: 50px;
  align-self: flex-start;
}

.comments-container {
  width: 100%;
  max-width: 800px;
}

.comment {
  background: #33333322;
  border-radius: 8px;
  border: rgba(255, 255, 255, 0.719) 1px solid;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.username {
  font-weight: bold;
  color: #e0e0e0;
}

.timestamp {
  color: #999;
  font-size: 0.9em;
}

.comment-text {
  line-height: 1.5;
  min-height: 1.5em;
}
p {
  align-self: flex-start;
  margin-left: 0;
}
</style>
