import { createRouter, createWebHistory } from 'vue-router';

import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/teams' },
        {
            name: 'team', path: '/teams', components: {
                default: TeamsList, footer: TeamsFooter
            }, children: [
                { name: 'team-members', path: '/teams/:teamId', component: TeamMembers, props: true }
            ]
        },      //our-domain/teams   => TeamsList component
        { path: '/users', components: {
            default: UsersList, footer: UsersFooter
                },
            beforeEnter(to, from, next) {
                console.log(to, from);
                next();
            }
        },      //our-domain/users   => UsersList component

    ],
    linkActiveClass: 'active',
    scrollBehavior(to, from, savedPosition) {
        // to and from are router objects, savedPostion stores previous location
        // so you can do something like this:
        console.log(to, from, savedPosition);
        if (savedPosition){
            return savedPosition;   // scrolls to previous position
        }
        return {left: 0, top: 0};   // scroll to top.
    }
});

router.beforeEach(function(to, from, next) {
    console.log(to, from);
    if(to.name=='team-members'){
        next();
    }
    else {
        next({name: 'team-members', params: { teamId: 't2'}});
    }
    next();   // call next(false) to cancel the navigation
});

export default router;