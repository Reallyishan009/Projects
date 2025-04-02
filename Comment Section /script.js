document.addEventListener("DOMContentLoaded", function () {
    const commentInput = document.querySelector("#commentInput");
    const submitCommentBtn = document.querySelector("#submitComment");
    const commentsContainer = document.querySelector("#commentsContainer");
  
    // Function to add a new comment
    function addComment(text) {
      if (!text.trim()) return; // Prevent empty comments
  
      const commentDiv = document.createElement("div");
      commentDiv.classList.add("comment");
      
      commentDiv.innerHTML = `
        <p>${text}</p>
        <button class="replyBtn">Reply</button>
        <button class="toggleReplies">Show/Hide Replies</button>
        <div class="repliesContainer collapsed"></div>
        <textarea class="replyInput" placeholder="Write a reply..."></textarea>
      `;
  
      commentsContainer.appendChild(commentDiv);
      commentInput.value = ""; // Clear input field
    }
  
    // Function to add a reply to a comment
    function addReply(replyText, repliesContainer) {
      if (!replyText.trim()) return;
  
      const replyDiv = document.createElement("div");
      replyDiv.classList.add("reply");
      replyDiv.innerHTML = `<p>${replyText}</p>`;
  
      repliesContainer.appendChild(replyDiv);
    }
  
    // Event listener for submitting a comment
    submitCommentBtn.addEventListener("click", function () {
      addComment(commentInput.value);
    });
  
    // Event delegation for handling replies and toggle functionality
    commentsContainer.addEventListener("click", function (event) {
      if (event.target.classList.contains("replyBtn")) {
        const commentDiv = event.target.closest(".comment");
        const replyInput = commentDiv.querySelector(".replyInput");
        const repliesContainer = commentDiv.querySelector(".repliesContainer");
        
        addReply(replyInput.value, repliesContainer);
        replyInput.value = ""; // Clear reply input
      }
  
      if (event.target.classList.contains("toggleReplies")) {
        const repliesContainer = event.target.closest(".comment").querySelector(".repliesContainer");
        repliesContainer.classList.toggle("collapsed");
      }
    });
  });
  