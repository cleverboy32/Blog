import React from 'react';
import routerMap from 'blogs/blog-route.json';
import Home from 'pages/home';
import Passage from 'pages/passage';
import Play from 'pages/markdownToPdf';
import { marked } from 'utils/markdown';


import { createHashRouter, RouteObject } from 'react-router-dom';

const children: RouteObject[] = [];

for (const item of routerMap) {
    if (item.children) {
        for (const child of item.children) {
            children.push({
                path: child.path,
                lazy: async () => {
                    const mdContent = await import(`blogs/markdown/${child.path}.md`).then(res => res.default);
                    const htmlContent = await marked.parse(mdContent);
                    return {
                        path: child.path,
                        element: <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    }
                },
            });
        }

        children.push({
            path: '',
            lazy: children[0].lazy,
        });
    }
}

export default createHashRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/passage',
        element: <Passage />,
        children,
    },
    {
        path: '/play',
        element: <Play />
    }
]);
