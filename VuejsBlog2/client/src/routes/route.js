import Home from '../views/components/Home'
import FilterGeneral from '../views/components/FilterGeneral'
import FilterLanguage from '../views/components/FilterLanguage'
import FilterSupport from '../views/components/FilterSupport'
import FilterViews from '../views/components/FilterViews'
import FilterCmts from '../views/components/FilterCmts'
import Login from '../views/components/Login.vue'
import Profile from '../views/components/Profile.vue'
import ForgotPass from '../views/components/ForgotPass.vue'
import ResetPass from '../views/components/ResetPass.vue'
import PostDetails from '../views/components/PostDetails.vue'
import UserProfile from '../views/components/UserProfile.vue'

export default [
    {path: "/", component: Home, props: true},
    {path: "/tags/general", component: FilterGeneral, props: true},
    {path: "/tags/language", component: FilterLanguage, props: true},
    {path: "/tags/support", component: FilterSupport, props: true},
    {path: "/posts/views", component: FilterViews, props: true},
    {path: "/posts/cmts", component: FilterCmts, props: true},
    {path: "/login", component: Login, props: true},
    {path: "/profile", component: Profile, props: true},
    {path: "/forgotpass", component: ForgotPass, props: true},
    {path: "/resetpass/:email", component: ResetPass, props: true},
    {path: "/post/:id", component: PostDetails, props: true},
    {path: "/user/:id", component: UserProfile, props: true}
]