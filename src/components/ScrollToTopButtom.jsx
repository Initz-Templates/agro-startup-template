// src/components/scrollingButton.js
import { useState, useEffect } from 'react';
import './style.css'
import StraightIcon from '@mui/icons-material/Straight';

const ScrollToTopButtom = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollFraction = scrollTop / windowHeight;
            const scrollPercent = Math.min(scrollFraction * 100, 100);

            setScrollProgress(scrollPercent);

            if (scrollTop > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="scroll-to-top">
            {isVisible &&
                <div className="scroll-to-top-container">
                    <div className="progress-circle" style={{ background: `conic-gradient(#4BAF47 ${scrollProgress}%, #ccc ${scrollProgress}%)` }}>
                        <button onClick={scrollToTop} className="scroll-to-top-button">
                            <StraightIcon/>
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};

export default ScrollToTopButtom;
