function CommentCard(props) {
  return (
    <div className="comment-card">
      <div className="card-header">
        <div className="title">{props.comment.author}</div>
        <div className="time">{props.comment.timestamp}</div>
      </div>
      <div className="text">{props.comment.text}</div>
    </div>
  );
}

export default CommentCard;
