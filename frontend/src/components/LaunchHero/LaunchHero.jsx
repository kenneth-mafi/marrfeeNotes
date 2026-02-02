import './launchHero.css';

const LaunchHero = ({ src, alt = "", text, footnote}) => {
    return (
        <div className={`launch-hero-contr`}>
            <div className={`hero-text-contr`}>
                <h1 className={`hero-text`} >{text}</h1>
            </div>        
            <div className={`hero-image-contr`}>
                <img src={src} alt={alt ?? "hero image"} className={`hero-image`}/>
            </div>        
            <div className={`hero-loader-contr`} />
            <p className={`footnote`}>{footnote}</p>
        </div>
    )
}

export default LaunchHero;