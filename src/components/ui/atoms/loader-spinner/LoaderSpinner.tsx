import { LineWave } from "react-loader-spinner";

interface LoaderSpinnerProps {
  height?: string;
  width?: string;
}

function LoaderSpinner({height, width}: LoaderSpinnerProps) {
  
  return (
    <LineWave
      visible
      height={height || 100}
      width={width || 100}
      ariaLabel="loading"
      color="#b026ff"
    />
  );
}

export default LoaderSpinner;
