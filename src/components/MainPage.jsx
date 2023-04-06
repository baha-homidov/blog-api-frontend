import Welcome from "./Welcome";
import Title from "./Title";
import ArticleCard from "./ArticleCard";
import "../assets/styles/MainPage.css";

function MainPage() {
  return (
    <div className="main-page">
      <Welcome />
      <div className="content">
        <Title title="Latest Posts" />
        <a href="article/123">
          <ArticleCard
            article={{
              title: "Title",
              text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              timestamp: "March 4, 2023",
            }}
          />
        </a>
        <a href="article/123">
          <ArticleCard
            article={{
              title: "Title",
              text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              timestamp: "March 4, 2023",
            }}
          />
        </a>
        <a href="article/123">
          <ArticleCard
            article={{
              title: "Title",
              text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
              timestamp: "March 4, 2023",
            }}
          />
        </a>
      </div>
    </div>
  );
}

export default MainPage;
