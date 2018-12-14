import AppMain from '../views/AppMain'
import Login from '../views/components/Login.vue'

export default [
    {path: "/", component: AppMain, props: true},
    {path: "/login", component: Login, props: true}

]