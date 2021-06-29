// Route components
const Home = () => import(/* webpackChunkName: "Home" */ '@/components/Home')
const NotFound = () => import(/* webpackChunkName: "NotFound" */ '@/components/404');
const AuthorArchive = () => import(/* webpackChunkName: "AuthorArchive" */ '@/components/AuthorArchive');
const DateArchive = () => import(/* webpackChunkName: "DateArchive" */ '@/components/DateArchive');
const CategoryArchive = () => import(/* webpackChunkName: "CategoryArchive" */ '@/components/CategoryArchive');
const TagArchive = () => import(/* webpackChunkName: "TagArchive" */ '@/components/TagArchive');
const Single = () => import(/* webpackChunkName: "Single" */ '@/components/Single');
const Page = () => import(/* webpackChunkName: "Page" */ '@/components/Page');
// Route paths as formatted in WP permalink settings
import paths from './paths'
// Route composition utilities
import {
  categorySlugFromParams,
  pageFromPath,
  slugFromPath,
} from './utils'


const { show_on_front, page_for_posts, page_on_front } = __VUE_WORDPRESS__.routing

const postsPageRoute = show_on_front === 'page' && page_for_posts ? {
  path: paths.postsPage(page_for_posts),
  component: Home,
  name: 'Posts',
  props: route => ({ page: pageFromPath(route.path) })
} : null

const rootRoute = show_on_front === 'page' && page_on_front ? {
  path: '/',
  component: Page,
  name: 'Home',
  props: () => ({ slug: page_on_front }),
} : {
  path: paths.postsPage(),
  component: Home,
  name: 'Home',
  props: route => ({ page: pageFromPath(route.path) }),
}

export default [
  rootRoute,
  postsPageRoute,
  {
    path: '/404',
    component: NotFound,
    name: '404'
  },
  {
    path: paths.authorArchive,
    component: AuthorArchive,
    name: 'AuthorArchive',
    props: route => (Object.assign(route.params, { page: pageFromPath(route.path) }))
  },
  {
    path: paths.dateArchive,
    component: DateArchive,
    name: 'DateArchive',
    props: route => (Object.assign(route.params, { page: pageFromPath(route.path) }))
  },
  {
    path: paths.categoryArchive,
    component: CategoryArchive,
    name: 'CategoryArchive',
    props: route =>  (Object.assign(route.params, { slug: categorySlugFromParams(route.params), page: pageFromPath(route.path) } ))
  },
  {
    path: paths.tagArchive,
    component: TagArchive,
    name: 'TagArchive',
    props: route => (Object.assign(route.params, { page: pageFromPath(route.path) }))
  },
  {
    path: paths.single,
    component: Single,
    name: 'Single',
    props: route => ({ slug: route.params.slug }),
  },
  /**
   * This also functions as a catch all redirecting
   * to 404 if a page isn't found with slug prop
   */
  {
    path: '/:slugs+',
    component: Page,
    name: 'Page',
    props: route => ({ slug: slugFromPath(route.path)})
  }
].filter(route => route) // Removes empty route objects
