import skyline from "./assets/img/skyline.svg";
import waymo from "./assets/img/waymo-front.svg";
import iphone from "./assets/img/iphone.svg";
import thunderstorm from "./assets/img/thunderstorm.png";
import waymoInsideBase from "./assets/question4/waymo-inside-base.png";
import waymoInsideScreen from "./assets/question4/waymo happy frame.svg";
import lightning1 from "./assets/question4/lightning-1.svg";
import lightning2 from "./assets/question4/lightning-2.svg";
import windowBase from "./assets/question4/window-base.svg";
import windowFlash from "./assets/question4/window-flash.svg";
import bye from "./assets/img/bye.png";
import muniShelter from "./assets/img/muni-shelter.svg";
import Question from "./Question";
import "./AllQuestions.css";
import { AnimatePresence, motion } from "motion/react";
import FogSvg from "./complicated-svgs/Fog";

export function Question1() {
  return (
    <Question
      number={1}
      title={"The journey back"}
      paragraphs={[
        "You’re in an unfamiliar SF neighborhood. Your stomach is satisfied after a delicious meal with your friends.",
        "While the vibes are high, the sun is far down. It’s time to say goodbye and grab a ride back home.",
      ]}
      option1={{
        text: "lemme know the next time yall hang out",
        mbti: undefined,
      }}
      option2={{
        text: "let’s see each other next week!",
        mbti: undefined,
      }}
    >
      <img className="big-image" src={skyline} />
    </Question>
  );
}

export function Question2() {
  return (
    <Question
      number={2}
      title={"Battery low"}
      paragraphs={[
        "You notice your phone is at 2% — just enough to order your favorite robotaxi back to your home address.",
        "Your ride soon arrives. Where do you sit?",
      ]}
      option1={{
        text: "front seat",
        mbti: undefined,
      }}
      option2={{
        text: "back seat",
        mbti: undefined,
      }}
    >
      <AnimatePresence>
        <div className="waymo-container">
          <motion.img
            initial={{ x: 100, opacity: 0, rotate: "10deg" }}
            animate={{ x: 0, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
            className="waymo-front"
            src={waymo}
          />
          <img className="iphone" src={iphone} />
        </div>
      </AnimatePresence>
    </Question>
  );
}

export function Question3() {
  return (
    <Question
      number={3}
      title={"OH SHIT!!!"}
      paragraphs={[
        "Your phone buzzes alive. There’s an imminent thunderstorm warning for San Francisco. You gaze outside as the rain pounds on the robotaxi’s windows. You’re a little nervous.",
      ]}
      option1={{
        text: "check the weather and radar on your phone",
        mbti: undefined,
      }}
      option2={{
        text: "see if your friends texted you about the weather or not",
        mbti: undefined,
      }}
    >
      <AnimatePresence>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
        >
          <img className="thunderstorm" src={thunderstorm} />
        </motion.div>
      </AnimatePresence>
    </Question>
  );
}

export function Question4() {
  return (
    <Question
      number={4}
      title={"CRASHSHHSHS"}
      paragraphs={[
        "The world around you explodes with a flash of light.",
        "The robotaxi screens glitch, then turn black. Your phone sputters and shuts off. The robotaxi starts accelerating.",
      ]}
      option1={{
        text: "aggressively tap the screen",
        mbti: undefined,
      }}
      option2={{
        text: "furiously pry open the door",
        mbti: undefined,
      }}
    >
      <AnimatePresence>
        <div className="question4-outer">
          <img src={windowBase} />
          <img className="window-flash" src={windowFlash} />
          <img className="lightning1" src={lightning1} />
          <img className="lightning2" src={lightning2} />
          <img src={waymoInsideBase} />
          <img className="waymo-inside-screen" src={waymoInsideScreen} />
        </div>
      </AnimatePresence>
    </Question>
  );
}

export function Question5() {
  return (
    <Question
      number={5}
      title={"You have arrived"}
      paragraphs={[
        "After five agonizing minutes, the robotaxi finally comes to a screeching halt. But you’re not.... at your house?",
        "You jump out of the robotaxi and it drives away. Your phone is dead and it’s pouring rain outside.",
      ]}
      option1={{
        text: "sob or shout into the void",
        mbti: undefined,
      }}
      option2={{
        text: "try to power on your phone with no success",
        mbti: undefined,
      }}
    >
      <AnimatePresence>
        <div className="question5-outer">
          <img src={bye} className="drive-away" />
          <div className="fogContainer">
            <FogSvg />
          </div>
        </div>
      </AnimatePresence>
    </Question>
  );
}

export function Question6() {
  return (
    <Question
      number={6}
      title={"Shelter? At last?"}
      paragraphs={[
        "You notice a nearby muni shelter and scurry your wet feet over. At last, a relief from the downpour.",
        "What do you do?",
      ]}
      option1={{
        text: "check the map to determine where you are",
        mbti: undefined,
      }}
      option2={{
        text: "look outside to see if a bus is coming soon",
        mbti: undefined,
      }}
    >
      <AnimatePresence>
        <div className="question6-outer">
          <img src={muniShelter} className="muni-shelter" />
          <div className="fogContainer">
            <FogSvg backwards={true} />
          </div>
        </div>
      </AnimatePresence>
    </Question>
  );
}
