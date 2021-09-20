import "./TestFinished.scss";

interface iProps {
  toggleResults: () => void
}

export const testFinished = (props: iProps) => {
  return (
    <div className="testFinished">
      <div className="testFinished-results">You have completed the test!</div>
      <div className="testFinished-button" onClick={() => props.toggleResults()}>
        Check results
      </div>
    </div>
  );
};

export default testFinished;
