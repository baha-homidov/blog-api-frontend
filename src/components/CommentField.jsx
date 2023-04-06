function CommentField() {
  return (
    <div className="comment-field">
      <div className="label">Write a comment</div>
      <form action="">
        <input type="text" id="comment" name="comment"></input>
      </form>
    </div>
  );
}

export default CommentField;
