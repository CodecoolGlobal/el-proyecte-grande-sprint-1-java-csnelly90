import React from "react";
import "../Footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

function FooterBrand() {
    return (
        <div className="col">
            <h2 className="footer-brand-name">IMDb</h2>
            <p className="company-intro">
                IMDb (Internet Music Database) is an online database of information related to music.
            </p>
        </div>
    );
}

function FooterLinks() {
    return (
        <div className="col">
            <h4>USEFUL LINKS</h4>
            <ul className="list-unstyled">
                <li>Link One</li>
                <li>Link Two</li>
                <li>Link Three</li>
            </ul>
        </div>
    );
}

function FooterSocial() {
    const facebookIcon = <FontAwesomeIcon icon={faFacebook} />
    const twitterIcon = <FontAwesomeIcon icon={faTwitter} />
    const youtubeIcon = <FontAwesomeIcon icon={faYoutube} />
    const instagramIcon = <FontAwesomeIcon icon={faInstagram} />

    return (
        <div className="col social">
            <h4>SOCIAL</h4>
            <ul className="list-unstyled">
                <li><span>{facebookIcon}</span><span>Facebook</span></li>
                <li><span>{twitterIcon}</span><span>Twitter</span></li>
                <li><span>{youtubeIcon}</span><span>Youtube</span></li>
                <li><span>{instagramIcon}</span><span>Instagram</span></li>
            </ul>
        </div>
    );
}

function Footer() {
    return (
        <div className="main-footer">
            <div className="container">
                <div className="row">
                    <FooterBrand />
                    <FooterLinks />
                    <FooterSocial />
                </div>
                <div>
                    <p className="footer-company">
                        &copy; {new Date().getFullYear()} Pohl & Co.
                    </p>
                </div>
            </div>
        </div>);
}

export default Footer;