import { Card, Spin, Image, Typography } from "antd";
import { getTop10BusinessNews } from "./apis";
import mockData from "./mock.json";
import { useRequest } from "ahooks";
const { Meta } = Card;
const News = () => {
  const { data, error, loading } = useRequest(getTop10BusinessNews);
  const cards = (data?.articles || mockData.articles).filter(
    (a) => a?.urlToImage,
  );
  return loading ? (
    <Spin></Spin>
  ) : (
    <div>
      <Typography.Title>Global Live Business News</Typography.Title>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {cards.map((card, idx) => (
          <Card
            key={idx}
            hoverable
            loading={loading}
            style={{ width: 300 }}
            cover={<Image alt={idx} src={card?.urlToImage} />}
          >
            <Meta
              onClick={() => window.open(card?.url, "_blanket")}
              title={card?.author}
              description={card?.title}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};
export default News;
