import { Link } from 'react-router-dom';
import './label.css';

function Label({title, link, to}) {
   return (
     <div className="label-contr">
        <p className={`p-small`}>{title}</p>
        <Link to={to} className='p-link'>{link}</Link >
     </div>
   )
}

export default Label;
