import Index from 'pages/index.vue';
import Passage from 'pages/passage.vue'
import routerMap from 'blogs/blog-route.json';
import type { RouteRecordRaw, RouteRecordSingleView } from 'vue-router';


const routers: RouteRecordRaw[] = [{
    path: '/',
    name: 'home',
    component: Index
}];

for (const item of routerMap) {
    const children: RouteRecordSingleView[] = [];

    if (item.children) {
        for (const child of item.children) {
            const blog = import(`blogs/markdown/${child.path}.md`);
            children.push({
                name: child.name,
                path: child.path,
                component: () => blog.then((_) => { console.log('loaded done!'); return _})
            })
        }


        children.push({
            path: '',
            component: children[0].component,
        });
    }

    routers.push({
        name: 'passage',
        path: '/passage',
        component: Passage,
        children: children
    });
}


export default routers;
