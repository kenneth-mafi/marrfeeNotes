import { Link } from 'react-router-dom';
import './label.css';

function Label({title, link, to}) {
   return (
     <div className="digId-label-contr">
        <p className={`digId-p-small`}>{title}</p>
        <Link to={to} className='digId-p-link'>{link}</Link >
     </div>
   )
}

export default Label;