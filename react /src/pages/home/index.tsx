import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Mouth from 'components/mouth';
import { createSpot } from '../../utils';

import './index.scss';

const Home = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const loinRef = useRef<HTMLDivElement>(null);


    const head = createSpot(232);
    const body = createSpot(300);
    const foot = createSpot(108);
    const tail = createSpot(12);

    const text = 'cleverboy world'.split('');

    const drawLion = () => {
        const lion = containerRef.current;
        const spots = lion?.querySelectorAll('span') ?? [];
        spots.forEach((item, i) => {
            let cricleNums = 0;
            let cricleLevel = 0;
            if (i < 12) {
                roundPosition((i * Math.PI) / 6, 100, item, 200, 100);
            }
            if (i < 24 && i >= 12) {
                roundPosition((i * Math.PI) / 6, 90, item, 200, 100);
            }
            if (i >= 24 && i < 232) {
                const cricleNum = 36 - cricleLevel * 6;
                cricleNums += cricleNum;
                cricleLevel = Math.floor((i - cricleNums - 24) / cricleNum);
                roundPosition((2 * i * Math.PI) / cricleNum, 80 - 10 * cricleLevel, item, 200, 100);
            }
            if (i >= 232 && i < 532) {
                const y = Math.floor((i - 232) / 15) * 11 + 160;
                const xr = (i - 232) % 15;
                linePosition(130, y, item, xr * 10);
            }
            if (i >= 532 && i < 574) {
                cricleLevel = 0;
                cricleNums = 0;
                const cricleNum = 14 - cricleLevel * 10;
                cricleNums += cricleNum;
                cricleLevel = Math.floor((i - cricleNums - 532) / cricleNum);
                roundPosition((2 * i * Math.PI) / cricleNum, 14 - 4 * cricleLevel, item, 120, 350);
            }
            if (i >= 574 && i < 616) {
                cricleLevel = 0;
                cricleNums = 0;
                const cricleNum = 14 - cricleLevel * 10;
                cricleNums += cricleNum;
                cricleLevel = Math.floor((i - cricleNums - 574) / cricleNum);
                roundPosition((2 * i * Math.PI) / cricleNum, 14 - 4 * cricleLevel, item, 285, 350);
            }
            if (i >= 616 && i < 624) {
                roundPosition((i * Math.PI) / 4, 6, item, 130, 370);
            }
            if (i >= 624 && i < 628) {
                roundPosition((i * Math.PI) / 2, 3, item, 130, 370);
            }
            if (i >= 628 && i < 636) {
                roundPosition((i * Math.PI) / 4, 6, item, 280, 370);
            }
            if (i >= 636 && i < 640) {
                roundPosition((i * Math.PI) / 2, 3, item, 280, 370);
            }
            if (i >= 640 && i < 648) {
                roundPosition(((i - 33) * Math.PI) / 40, 120, item, 185, 200);
            }
            if (i >= 648 && i < 652) {
                roundPosition((i * Math.PI) / 2, 8, item, 75, 235);
            }
        });
    };

    const roundPosition = (rad: number, radius: number, item: HTMLElement, centerX: number, centerY: number) => {
        const x = centerX + Math.sin(rad) * radius;
        const y = centerY - Math.cos(rad) * radius;
        item.style.left = x + 'px';
        item.style.top = y + 'px';
    };
    const linePosition = (centerX: number, centerY: number, item: HTMLElement, r: number) => {
        const x = centerX + r;
        item.style.left = x + 'px';
        item.style.top = centerY + 'px';
    };

    useEffect(() => {
        const p = textRef.current?.querySelectorAll('p');
        p?.forEach((item, i) => {
            const num = p.length;
            roundPosition(((i - num / 2) * Math.PI) / num / 2, 210, item, 0, 200);
            item.style.transform = `rotateZ(${((i - num / 2) * 90) / num}deg)`;
        });
        drawLion();
    }, []);

    return (
        <>
            <div ref={containerRef} className="lion">
                <Mouth />
                <div ref={textRef} className="text">
                    {text.map((value, index) => (
                        <p key={index}>{value}</p>
                    ))}
                </div>
                <div ref={loinRef} className="lions">
                    <div className="lion-head">
                        <div className="lion-eye left" />
                        <div className="lion-eye right" />
                        <div className="lion-mouse" />

                        {head.map((_, index) => (
                            <span key={index} />
                        ))}
                    </div>
                    <div className="lion-body">
                        {body.map((_, index) => (
                            <span key={index} />
                        ))}
                    </div>
                    <div className="lion-foot">
                        {foot.map((_, index) => (
                            <span key={index} />
                        ))}
                    </div>
                    <div className="lion-tail">
                        {tail.map((_, index) => (
                            <span key={index} />
                        ))}
                    </div>
                </div>
                <Link className="door" to="/passage">
                    enter
                </Link>
            </div>
        </>
    );
};

export default Home;
