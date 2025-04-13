import TopBarSvg from "./assets/topBar";
import "./Question.css";
import skyline from "./assets/img/skyline.svg";
import questionBox from "./assets/question-box-no-border.svg";
import muni from "./assets/img/muni.png";
import TransitBottom from "./assets/transit";
import DrawnLine from "./assets/Line";

function TopBar({ number, title }: { number: number; title: string }) {
  return (
    <div className="header-container">
      <div className="container-outer">
        <p className="header-number">{number}</p>
        <p className="header-title">{title}</p>
      </div>
      <TopBarSvg />
    </div>
  );
}

function QuestionBox({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="question-container">
      {paragraphs.map((paragraph) => (
        <p>{paragraph}</p>
      ))}
      <img src={questionBox} />
    </div>
  );
}

export default function Question() {
  return (
    <div className="app-container">
      {/* Card Container */}
      {/* Header */}
      <TopBar number={1} title={"The journey back"} />

      {/* City Skyline Image Placeholder */}
      <img className="big-image" src={skyline} />

      {/* Text Box */}
      <QuestionBox
        paragraphs={[
          "You’re in an unfamiliar SF neighborhood. Your stomach is satisfied after a delicious meal with your friends.",
          "While the vibes are high, the sun is far down. It’s time to say goodbye and grab a ride back home.",
        ]}
      />

      <div className="bottom-aligned">
        <div className="transit-bottom-outer">
          <TransitBottom />
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button className="option-button">
            <p>lemme know the next time yall hang out</p>
            <div className="drawn-line">
              <DrawnLine />
            </div>
          </button>
          <button className="option-button">
            <p>let’s see each other next week!</p>
            <div className="drawn-line">
              <DrawnLine />
            </div>
          </button>
        </div>

        <img src={muni} className="muni" />
      </div>
    </div>
  );
}
