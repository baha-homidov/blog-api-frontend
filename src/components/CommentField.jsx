function CommentField() {
  return (
    <div className="comment-field">
      <div className="label">Write a comment</div>
      <form action="">
        <textarea resiz type="text" id="comment" name="comment"></textarea>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CommentField;
