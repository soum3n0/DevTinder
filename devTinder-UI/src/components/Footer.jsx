import React from "react";

const Footer = () => {
    return (
        <footer className="footer footer-center bg-base-300 text-base-content p-4 relative">
            <aside>
                <p>
                    Copyright © {new Date().getFullYear()} - All right reserved
                    by DevTinder
                </p>
            </aside>
        </footer>
    );
};

export default Footer;
