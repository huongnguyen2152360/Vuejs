import Home from '../views/components/Home'
import Login from '../views/components/Login.vue'
import Profile from '../views/components/Profile.vue'
import PostDetails from '../views/components/PostDetails.vue'

export default [
    {path: "/", component: Home, props: true},
    {path: "/login", component: Login, props: true},
    {path: "/profile", component: Profile, props: true},
    {path: "/post/:id", component: PostDetails, props: true}
]