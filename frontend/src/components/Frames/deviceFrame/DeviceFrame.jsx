import { AnimatePresence } from 'framer-motion';
import './device-frame.css';
import './device-screen.css';


const DeviceFrame = ({ children }) => {

  return (
    <div className={`device-frame`}>
      <div className={`device-border`}>
        <div className="camera-container"></div>
        <div className={`screen`}>
          <AnimatePresence mode='wait'>
              {children}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DeviceFrame;
