import { BeatLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className="absolute z-10 w-full min-h-full bg-black/40 flex justify-center items-center">
      <BeatLoader color="#c2410c" />
    </div>
  );
};

export default Spinner;
