import { BeatLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className="relative z-10 h-screen bg-black/40">
      <BeatLoader
        color="#c2410c"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default Spinner;
