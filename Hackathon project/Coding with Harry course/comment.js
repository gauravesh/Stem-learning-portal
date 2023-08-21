const commentForm = document.getElementById("comment-form");
const commentText = document.getElementById("comment-text");
const commentList = document.getElementById("comment-list");

commentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const comment = commentText.value;

  if (comment.trim() !== "") {
    const commentElement = createCommentElement(comment);
    commentList.appendChild(commentElement);
    commentText.value = "";
  }
});

function createCommentElement(text) {
  const commentElement = document.createElement("div");
  commentElement.classList.add("comment");
  commentElement.textContent = text;

  const replyForm = document.createElement("form");
  replyForm.classList.add("comment-reply");

  const replyText = document.createElement("textarea");
  replyText.placeholder = "Reply to this comment";

  const replyButton = document.createElement("button");
  replyButton.textContent = "Reply";

  replyForm.appendChild(replyText);
  replyForm.appendChild(replyButton);

  commentElement.appendChild(replyForm);

  replyForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const reply = replyText.value;

    if (reply.trim() !== "") {
      const replyElement = createReplyElement(reply);
      commentElement.appendChild(replyElement);
      replyText.value = "";
    }
  });

  return commentElement;
}

function createReplyElement(text) {
  const replyElement = document.createElement("div");
  replyElement.classList.add("comment-reply");
  replyElement.textContent = text;

  return replyElement;
}
