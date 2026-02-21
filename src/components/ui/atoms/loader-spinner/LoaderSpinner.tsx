import { LineWave } from "react-loader-spinner";

function LoaderSpinner() {
  return (
    <div className="flex justify-center items-center flex-1">
      <LineWave
        visible
        height="100"
        width="100"
        ariaLabel="loading"
        color="#b026ff"
      />
    </div>
  );
}

export default LoaderSpinner;
