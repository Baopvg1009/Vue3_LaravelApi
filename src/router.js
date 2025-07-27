import {createRouter, createWebHistory} from "vue-router";
import DefaultLayout from "./components/DefaultLayout.vue";
import Home from "./pages/Home.vue";
import MyImages from "./pages/MyImages.vue";
import Login from "./pages/Login.vue";
import Register from "./pages/Register.vue";
import NotFound from "./pages/NotFound.vue";
import useUserStore from "./store/user.js"
const routes = [
    {
        path:"/",
        component: DefaultLayout,
        children: [
            {path:"/", name:'Home', component: Home},
            {path:"/images", name:'MyImages', component: MyImages},
        ],
        beforeEnter:async (to,from,next)=>{
            try {
                const userStore = useUserStore();
                await userStore.fetchUser();
                next();
            }catch (error){
                console.error('Fail to fetch data: ', error);
                next(false); // Cancel navigation if data fetching fails
            }
        }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFound
    },
]

const router= createRouter({
    history: createWebHistory(),
    routes
})

export default router;