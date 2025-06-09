import "./App.css";
import { QuestionManager } from "./QuestionManager";

function App() {
  const showMobileNote = window.innerWidth > 550 && window.innerHeight > 800;
  return (
    <>
      <div className="actually-outer">
        {showMobileNote && (
          <p className="mobile-note">
            psstttt bestie!! this quiz works best on ur phone
          </p>
        )}
        <QuestionManager />
      </div>
    </>
  );
}

export default App;
