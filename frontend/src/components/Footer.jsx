import { Link } from "react-router-dom";
import { Facebook, Phone, Mail, MapPin } from "lucide-react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <div className="footer__grid">
                    <div>
                        <p className="footer__eyebrow">3S Bobil & Caravan</p>

                        <h3 className="footer__title">
                            Trygt salg av bobil
                        </h3>

                        <p className="footer__description">
                            Vi hjelper deg gjennom hele prosessen, enten du skal kjøpe,
                            selge eller trenger rådgivning.
                        </p>
                    </div>

                    <div>
                        <h4 className="footer__heading">Navigasjon</h4>

                        <ul className="footer__nav">
                            <li>
                                <Link to="/">Hjem</Link>
                            </li>
                            <li>
                                <Link to="/about">Om oss</Link>
                            </li>
                            <li>
                                <Link to="/sales-process">Kjøp- & Salgsprosess</Link>
                            </li>
                            <li>
                                <Link to="/contact">Kontakt</Link>
                            </li>
                            <li>
                                <Link to="/complaints">Reklamasjon</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="footer__heading">Kontakt oss</h4>

                        <div className="footer__contact">
                            <div className="footer__contact-item">
                                <Phone />
                                <a href="tel:+4740828494">+47 408 28 494</a>
                            </div>

                            <div className="footer__contact-item">
                                <Mail />
                                <a href="mailto:tommy@3sbc.no">tommy@3sbc.no</a>
                            </div>

                            <div className="footer__contact-item">
                                <MapPin />
                                <span>Siriusveien 29, 1407 Vinterbro</span>
                            </div>
                        </div>

                        <div className="footer__socials">
                            <a
                                href="https://www.facebook.com/profile.php?id=61590428497070&locale=nb_NO"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer__social-link"
                                aria-label="Facebook"
                            >
                                <Facebook />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="footer__bottom">
                    <span>© {new Date().getFullYear()} 3S Bobil & Caravan</span>

                    <Link
                        to="/admin"
                        aria-label="Admin"
                    >
                        Admin
                    </Link>

                    <span>
                        Utviklet av{" "}
                        <p
                            href="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer__developer-link"
                        >
                            Ehlma Consulting AS
                        </p>
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;