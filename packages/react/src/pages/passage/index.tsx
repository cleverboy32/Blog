import { Link, Outlet } from "react-router-dom";
import PageHeader from 'components/header';

import RouterConfig from 'blogs/blog-route.json';
import React from "react";

import './index.scss'

const Passage = () => {
    return (
        <div className="passage">
            <PageHeader />
            <div className="content">
                <div className="nav">
                    {
                        RouterConfig.map((item, index) => (
                            <ul key={index}>
                                {
                                    item.children.map((blog) => (
                                        <li className="nav__item__title" key={blog.name}>
                                            <Link to={blog.path} >{blog.name}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        ))
                    }
                </div>
                <div className="blog">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Passage;

