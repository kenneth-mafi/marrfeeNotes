import './pageTitle.css';

const PageTitle = ({ title, subtitle }) => {
    return( 
        <>
            <h1 className='page-title' >{title}</h1>
            <p className="page-subtitle">{subtitle}</p>
        </>
    )
}
export default PageTitle;