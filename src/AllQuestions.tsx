import skyline from "./assets/img/skyline.png";
import waymo from "./assets/img/waymo-front.svg";
import iphone from "./assets/img/iphone.png";
import thunderstorm from "./assets/img/thunderstorm.png";
import waymoInsideBase from "./assets/img/question4/waymo-inside-base.png";
import waymoInsideScreen from "./assets/img/question4/waymo happy frame.svg";
import lightning1 from "./assets/img/question4/lightning-1.svg";
import lightning2 from "./assets/img/question4/lightning-2.svg";
import windowBase from "./assets/img/question4/window-base.svg";
import windowFlash from "./assets/img/question4/window-flash.svg";
import bye from "./assets/img/bye.png";
import muniShelter from "./assets/img/muni-shelter.svg";
import busPuddle from "./assets/img/question7/bus-puddle.svg";
import subtract from "./assets/img/question7/subtract.svg";
import tapIn from "./assets/img/taghere.png";
import clipper from "./assets/img/clipper.png";
import no from "./assets/img/no.png";
import passengers from "./assets/img/passengers.svg";
import manEyes from "./assets/img/man-eyes.svg";
import womanEyes from "./assets/img/woman-eyes.svg";
import busWindow from "./assets/img/question11/window.png";
import houses from "./assets/img/question11/houses.png";
import stars from "./assets/img/question11/stars.png";
import oldManEyes from "./assets/old-man.png";
import oldManEyesClosed from "./assets/old-man-blink.png";
import questions from "./assets/questions.png";
import meme from "./assets/meme.png";
import p2p from "./assets/p2p.png";
import endDark from "./assets/img/end-dark.png";
import endLight from "./assets/img/end-light.png";
import fullBus from "./assets/img/full-bus.png";
import Question from "./Question";
import "./AllQuestions.css";
import { AnimatePresence, motion } from "motion/react";
import FogSvg from "./complicated-svgs/Fog";
import AnimatedWater from "./complicated-svgs/PuddleRipples";
import { useAnimatedValue } from "./hooks";

export function Question1() {
  return (
    <Question
      number={1}
      title={"The journey back"}
      paragraphs={[
        "You’re in an unfamiliar SF neighborhood. Your stomach is satisfied after a delicious meal with your friends.",
        "While the vibes are high, the sun is far down. It’s time to grab a ride back home. How do you say goodbye?",
      ]}
      option1={{
        text: "“lemme know the next time yall hang out”",
        mbti: "J",
      }}
      option2={{
        text: "“same time next week?”",
        mbti: "J",
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
        mbti: "S",
      }}
      option2={{
        text: "back seat",
        mbti: "N",
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
        text: "check the forecast to see how long this will last",
        mbti: "T",
      }}
      option2={{
        text: "scroll the social feeds to see how others are feeling",
        mbti: "F",
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
        text: "investigate the screen for a power button, maybe something can restart it",
        mbti: "S",
      }}
      option2={{
        text: "get out NOW! furiously pry the door handle",
        mbti: "N",
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
        text: "softly say your favorite swear word",
        mbti: "F",
      }}
      option2={{
        text: "press buttons on your phone and hope for a miracle",
        mbti: "T",
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
        text: "investigate the shelter for a soggy map or schedule",
        mbti: "T",
      }}
      option2={{
        text: "scan the road for headlights or loud noises",
        mbti: "F",
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
        "A bus arrives, however between you and the door is a monstrously sized puddle. The gap seems juuuust reachable.",
      ]}
      option1={{
        text: "take the leap of faith and risk soaking your shoes",
        mbti: "P",
      }}
      option2={{
        text: "walk around the puddle to the back of the bus",
        mbti: "J",
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
        "You are on the warm, dry bus! Fishing through your pocket, you find your happy, familiar blue clipper card.",
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
        text: "give them a light nod and sit between",
        mbti: "E",
      }}
      option2={{
        text: "stand and enjoy your extra space",
        mbti: "I",
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

export function Question11() {
  return (
    <Question
      number={11}
      title={"adventuring out"}
      paragraphs={[
        "Your phone is dead and you can’t doomscroll or watch endless videos on your phone, your normal routine.",
        "You instead choose to look out the window as the lights of endless houses dance by.",
      ]}
      option1={{
        text: "scan for a street name that sounds familiar",
        mbti: "S",
      }}
      option2={{
        text: "soak in how much of the city you haven't explored yet",
        mbti: "N",
      }}
    >
      <div className="question11-outer">
        <img className="stars driving-background" src={stars} />
        <img className="houses driving-background" src={houses} />
        <img className="window" src={busWindow} />
      </div>
    </Question>
  );
}

function OldManEyes() {
  const randomNumber = useAnimatedValue(20, 300);
  let blinking = false;
  if (randomNumber === 11 || randomNumber === 19) {
    blinking = true;
  }
  return (
    <div className="eyeballs">
      <img src={oldManEyes} className={blinking ? "hidden" : ""} />
      <img src={oldManEyesClosed} className={!blinking ? "hidden" : ""} />
    </div>
  );
}

export function Question12() {
  return (
    <Question
      number={12}
      title={"Eye contact"}
      paragraphs={[
        "As you take a break from gazing outside and look around inside the bus, you make eye contact with another rider’s old, wise, grey eyes.",
        "They warmly look back at you.",
      ]}
      option1={{
        text: "give a light smile",
        mbti: undefined,
      }}
      option2={{
        text: "glance back out the window",
        mbti: undefined,
      }}
    >
      <OldManEyes />
    </Question>
  );
}

export function Question13() {
  return (
    <Question
      number={13}
      title={"The riddle"}
      paragraphs={[
        "“You!” says the rider, “Can you answer a riddle for me?”",
        "The rider waits attentively.",
      ]}
      option1={{
        text: "sure i’ll take a stab",
        mbti: undefined,
      }}
      option2={{
        text: "uhhhmh...",
        mbti: undefined,
      }}
    >
      <img className="questions-riddle-image" src={questions} />
    </Question>
  );
}

export function Question14() {
  return (
    <Question
      number={14}
      title={"pants"}
      option1={{
        text: "the top one",
        mbti: undefined,
      }}
      option2={{
        text: "the bottom one",
        mbti: undefined,
      }}
    >
      <img className="pants-meme" src={meme} />
    </Question>
  );
}

export function Question15() {
  return (
    <Question
      number={15}
      title={"an opportunity"}
      paragraphs={[
        "“Thanks, I’m collecting training data for my P2P (pants to pants) startup. Let me know if you ever want some more pants.”",
        "The stranger hands you a business card and leaves.",
      ]}
      option1={{
        text: "neatly tuck it into your wallet",
        mbti: "J",
      }}
      option2={{
        text: "snap a quick photo of it",
        mbti: "P",
      }}
    >
      <AnimatePresence>
        <motion.img
          initial={{ y: 20, opacity: 0, rotate: "-10deg" }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{
            duration: 1.5,
            delay: 0.5,
            type: "spring",
            bounce: 0.5,
          }}
          className="pants-card"
          src={p2p}
        />
      </AnimatePresence>
    </Question>
  );
}
export function Question16() {
  return (
    <Question
      number={16}
      title={"your stop"}
      paragraphs={[
        "Eventually, it’s time for your stop. You pull the yellow wire, and as the bus comes to a halt, you stand up and move towards the door.",
        "Do you thank the bus driver?",
      ]}
      option1={{
        text: "say “thank you!“ out loud",
        mbti: "E",
      }}
      option2={{
        text: "thank the bus driver in your head",
        mbti: "I",
      }}
    >
      <AnimatePresence>
        <img src={endLight} style={{ opacity: 0 }} />
        <img src={endDark} className="ending-image" />
        <motion.img
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          transition={{
            duration: 5,
            delay: 1,
            type: "spring",
            bounce: 0.1,
          }}
          className="full-bus"
          src={fullBus}
        />
      </AnimatePresence>
    </Question>
  );
}
export function Question17() {
  return (
    <Question
      number={17}
      title={"Back home"}
      paragraphs={[
        "You get off the bus and are greeted with a beautiful view of endless lights, houses, and hills.",
        "You had no idea this view was just two blocks from your house, what an amazing discovery!",
      ]}
      option1={{
        text: "let the view and the peace slowly overtake you",
        mbti: "I",
      }}
      option2={{
        text: "think of a friend you wish could be here",
        mbti: "E",
      }}
    >
      <AnimatePresence>
        <img src={endLight} className="ending-image" />
        <motion.img
          initial={{ x: 0 }}
          animate={{ x: "100%" }}
          transition={{
            duration: 3,
            delay: 1,
            type: "spring",
            bounce: 0.1,
          }}
          className="full-bus"
          src={fullBus}
        />
      </AnimatePresence>
    </Question>
  );
}
