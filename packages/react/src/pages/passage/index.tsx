import { Link, Outlet, useLocation } from "react-router-dom";
import PageHeader from 'components/header';


import RouterConfig from 'blogs/blog-route.json';
import React from "react";

import './index.scss'

const Passage = () => {

    const { pathname } = useLocation()

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
                                        <div className={`nav__item__title ${pathname === `/passage/${blog.path}` ? 'active' : ''}`} key={blog.name} >
                                            <Link to={blog.path} >{blog.name}</Link>
                                        </div>
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

