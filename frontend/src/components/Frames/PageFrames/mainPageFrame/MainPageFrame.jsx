import { useLocation } from 'react-router-dom';
import './mainPageFrame.css';
import { motion } from 'framer-motion';
import { pageEffects } from '../pageEffects.js';
import NotificationCard from '../../../notificationCard/NotificationCard.jsx';
import { useNoteContext } from '../../../../hooks/useContext.js';

function MainPageFrame({ components, effect="zoomIn", className="" }) {
  
  const location = useLocation();
  const { showAlert, alertInfo } = useNoteContext()

  return (
        <motion.div 
            className={`main-page-frame-contr ${className}`}
            key={location.pathname}
            { ...pageEffects[effect] }
        >
          <NotificationCard show={showAlert} {...alertInfo} />
    
          {components.map((component, index) => {
            const PageComponent = component.Component;
            if (!PageComponent) return null;
            
            return <PageComponent key={component.id || index} {...component.props} />
          })}

        </motion.div>
  );
}

export default MainPageFrame;
