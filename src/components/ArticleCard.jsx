function ArticleCard(props) {
  return (
    <div className="article-card">
      <div className="card-header">
        <h3 className="title">{props.article.title}</h3>
        <div className="time">{props.article.timestamp}</div>
      </div>
      <div className="text">
        {props.article.text.length <= 150
          ? props.article.text
          : props.article.text.slice(0, 150)}
        ...
      </div>
    </div>
  );
}

export default ArticleCard;
