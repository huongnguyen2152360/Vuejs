import Home from '../views/components/Home'
import Login from '../views/components/Login.vue'

export default [
    {path: "/", component: Home, props: true},
    {path: "/login", component: Login, props: true}

]