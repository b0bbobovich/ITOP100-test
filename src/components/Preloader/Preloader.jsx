import './Preloader.css';

const Preloader = () => {
    return (
        <div className="preloader__container">
            <img className="preloader__spinner" src={process.env.PUBLIC_URL + "/preloaderLogo.svg"} alt="spinner"/>
        </div>
    )
}

export default Preloader