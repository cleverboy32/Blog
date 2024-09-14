import React from "react";
import './index.scss';

const Mouth = () => {

    return (
        <div className="bg-page">
            <div className="bg-page__mouse">
            <div className="bg-page__halfmouse top">
                <div className="bg-page__teeth" />
                <div className="bg-page__teeth" />
                <div className="bg-page__teeth" />
                <div className="bg-page__bigteeth" />
                <div className="bg-page__lips" />
            </div>
            <div className="bg-page__halfmouse bottom">
                <div className="bg-page__teeth" />
                <div className="bg-page__teeth" />
                <div className="bg-page__teeth" />
                <div className="bg-page__bigteeth" />
                <div />
                <div className="bg-page__lips" />
            </div>
            </div>
            <div className="bg-page__teethbrush" />
        </div>
    )
}

export default Mouth