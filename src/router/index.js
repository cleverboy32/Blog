import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/index.vue';
import routerMap from '../map.json';
// import Passage from '@/passage.vue';
// import Readme from '@/docs/readme.md';

Vue.use(Router)

let routers = [];

for (let item of routerMap) {
    let children = [];

    if (item.children) {
        for (let child of item.children) {
            children.push({
                name: child.name,
                path: child.path,
                component: (res) => {
                    require([`../docs/${child.path}.md`], res);
                }
            })
        }

        children.push({
            path: '',
            redirect: item.children[0].path
        });
    }

    routers.push({
        name: item.name,
        path: item.path,
        component: (res) => {
            require([`../components${item.path}.vue`], res);
        },
        children: children
    });
}

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        }
    ].concat(routers)
})
