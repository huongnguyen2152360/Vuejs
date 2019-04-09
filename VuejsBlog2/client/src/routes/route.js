import Home from '../views/components/Home'
import Login from '../views/components/Login.vue'
import Profile from '../views/components/Profile.vue'
import ForgotPass from '../views/components/ForgotPass.vue'
import ResetPass from '../views/components/ResetPass.vue'

export default [
    {path: "/", component: Home, props: true},
    {path: "/login", component: Login, props: true},
    {path: "/profile", component: Profile, props: true},
    {path: "/forgotpass", component: ForgotPass, props: true},
    {path: "/resetpass", component: ResetPass, props: true}


]