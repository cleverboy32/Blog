import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import Index from '@/index.vue';
import Passage from '@/passage.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/hello',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/passage',
            name: 'passage',
            component: Passage
        }
    ]
})
