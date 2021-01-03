import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home'
import DcHeroes from './pages/DcHeroes'
import Calendar from './pages/Calendar'
import Markdown from './pages/Markdown'
import Slider from './pages/Slider'
import Calculator from './pages/Calculator'
import ReusableModal from './pages/ReusableModal'
import Chat from './pages/Chat'

const routes = [
    {path: '/', component: Home},
    {path: '/dc-heroes', component: DcHeroes},
    {path: '/calendar', component: Calendar},
    {path: '/markdown', component: Markdown},
    {path: '/slider-carousel', component: Slider},
    {path: '/calculator', component: Calculator},
    {path: '/modal', component: ReusableModal},
    {path: '/chat', component: Chat}
]

const router = createRouter({
    history: createWebHistory(),
    routes // short for `routes: routes`
  })

export default router