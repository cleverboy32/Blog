import React, { useRef } from "react";
import logo from 'assets/lion.jpeg';

import './index.scss';
import { Link } from "react-router-dom";


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
                <span><Link to="/play" >play</Link></span>
            </div>
        </div>
    )
}


export default Header