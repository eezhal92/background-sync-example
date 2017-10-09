export function submitComment() {
  const commentForm = document.querySelector('#comment-form');

  commentForm.addEventListener('submit', function handler(event) {
    event.preventDefault();

    console.info('Comment submitted!');
  });
}
