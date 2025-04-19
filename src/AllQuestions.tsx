import skyline from "./assets/img/skyline.png";
import waymo from "./assets/img/waymo-front.svg";
import iphone from "./assets/img/iphone.png";
import thunderstorm from "./assets/img/thunderstorm.png";
import waymoInsideBase from "./assets/question4/waymo-inside-base.png";
import waymoInsideScreen from "./assets/question4/waymo happy frame.svg";
import lightning1 from "./assets/question4/lightning-1.svg";
import lightning2 from "./assets/question4/lightning-2.svg";
import windowBase from "./assets/question4/window-base.svg";
import windowFlash from "./assets/question4/window-flash.svg";
import bye from "./assets/img/bye.png";
import muniShelter from "./assets/img/muni-shelter.svg";
import busPuddle from "./assets/question7/bus-puddle.svg";
import subtract from "./assets/question7/subtract.svg";
import tapIn from "./assets/img/taghere.png";
import clipper from "./assets/img/clipper.png";
import no from "./assets/img/no.png";
import passengers from "./assets/img/passengers.svg";
import manEyes from "./assets/img/man-eyes.svg";
import womanEyes from "./assets/img/woman-eyes.svg";
import Question from "./Question";
import "./AllQuestions.css";
import { AnimatePresence, motion } from "motion/react";
import FogSvg from "./complicated-svgs/Fog";
import AnimatedWater from "./complicated-svgs/PuddleRipples";

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

export function Question7() {
  return (
    <Question
      number={7}
      title={"Leap of faith"}
      paragraphs={[
        "A bus arrives, and the doors open with a familiar incandescent hue.",
        "The only thing between you and the bus is a monstrously sized puddle. The distance between you and the bus looks immeasurable",
      ]}
      option1={{
        text: "take the leap of faith and risk both shoes getting soaked",
        mbti: undefined,
      }}
      option2={{
        text: "put one foot into the puddle and accept your fate",
        mbti: undefined,
      }}
    >
      <AnimatePresence>
        <div className="question7-outer">
          <AnimatedWater />
          <img src={busPuddle} className="muni-puddle bus-zoom-in" />
          <img src={subtract} className="subtract-outer" />
          <div className="subtract-inner"></div>
          <img
            src={busPuddle}
            className="puddle-reflection bus-zoom-in-flipped"
          />
        </div>
      </AnimatePresence>
    </Question>
  );
}

export function Question8() {
  return (
    <Question
      number={8}
      title={"An important choice"}
      paragraphs={[
        "You stick the landing semi-soaked! Fishing through your pocket, you find your happy, familiar blue clipper card.",
        "Do you tap in and pay for the bus?",
      ]}
      option1={{
        text: "tap in",
        mbti: undefined,
      }}
      option2={{
        text: "normally i wouldn't...... but i'll do it for the plot",
        mbti: undefined,
      }}
    >
      <div>
        <img className="tap-in" src={tapIn} />
        <img className="clipper" src={clipper} />
      </div>
    </Question>
  );
}

export function Question9() {
  return (
    <Question
      number={9}
      title={"PAYMENT DENIED"}
      paragraphs={["PAYMENT DENIED!!!!!!!!!!!!!!"]}
      option1={{
        text: "hopelessly try again",
        mbti: undefined,
      }}
      option2={{
        text: "AAAAAAAAAAAA",
        mbti: undefined,
      }}
    >
      <div>
        <img src={no} className="no" />
      </div>
    </Question>
  );
}

export function Question10() {
  return (
    <Question
      number={10}
      title={"you're in!!"}
      paragraphs={[
        "On your second try, your $2.75 was happily accepted! The screen lights up in a joyful, green hue.",
        "Your next challenge -- there’s only one seat left, it’s between two strangers. Do you sit in the empty seat?",
      ]}
      option1={{
        text: "my legs are tired - let’s sit",
        mbti: undefined,
      }}
      option2={{
        text: "it’s ok.... i’ll stand",
        mbti: undefined,
      }}
    >
      <div className="passengers">
        <img src={passengers} />
        <img className="woman-eyes" src={womanEyes} />
        <img className="man-eyes" src={manEyes} />
      </div>
    </Question>
  );
}
