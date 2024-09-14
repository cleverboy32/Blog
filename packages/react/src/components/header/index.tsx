import React, { useRef } from "react";
import logo from 'assets/lion.jpeg';

import './index.scss';


const Header = () => {

    const navRef = useRef<HTMLDivElement>(null);

    const stopAnimate = () => {
        const span = navRef.current?.querySelectorAll('span');
        span?.forEach((item) => {
            item.style.animationPlayState = 'paused';
        });
    }

    const playAnimate = () => {
        const span = navRef.current?.querySelectorAll('span');
        span?.forEach((item) => {
            item.style.animationPlayState = 'running';
        });
    }
    

    return (
        <div className="header">
            <div className="title">
                <img src={logo} />
                <div>cleverboy blog</div>
            </div>
            <div ref={navRef} className="nav" onMouseOver={stopAnimate} onMouseOut={playAnimate}>
                <span>blog</span>
                <span><a href="https://github.com/cleverboy32">github</a></span>
                <span>play</span>
            </div>
        </div>
    )
}


export default Header