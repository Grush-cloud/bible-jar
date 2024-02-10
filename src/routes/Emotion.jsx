import { useParams, Link } from "react-router-dom";

export default function Emotion({
  happy,
  thankful,
  sad,
  lonely,
  anxious,
  angry,
}) {
  const { emotion } = useParams();

  const getRandomMessage = (emotion) => {
    switch (emotion) {
      case "happy":
        return getRandomItem(happy);
      case "thankful":
        return getRandomItem(thankful);
      case "sad":
        return getRandomItem(sad);
      case "lonely":
        return getRandomItem(lonely);
      case "anxious":
        return getRandomItem(anxious);
      case "angry":
        return getRandomItem(angry);
      default:
        return "";
    }
  };

  const getRandomItem = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  return (
    <>
      <Link to="/bible-jar" className="back-button">
        Go Back
      </Link>
      <div className="container">
        <div className="message-container">
          <p className="emotion-verse">{getRandomMessage(emotion).verse}</p>
        </div>
      </div>
    </>
  );
}
