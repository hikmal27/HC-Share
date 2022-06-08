const requireAuth = (to, from, next) => {
  let id = sessionStorage.getItem('access_token')
  if(id === null) {
    next('/login')
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: requireAuth,
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/home', component: () => import('pages/home.vue'), name: 'Home' },
      { path: '/foods', component: () => import('pages/foods.vue') },
      { path: '/forms', component: () => import('pages/forms.vue') },

      // Menus
      { path: '/managements/menus', component: () => import('pages/Menus/Index.vue'), name: 'index-menu' },
      { path: '/managements/menus/create', component: () => import('pages/Menus/Create.vue'), name: 'create-menu' },
      { path: '/managements/menus/:id', component: () => import('pages/Menus/Detail.vue'), name: 'detail-menu' },

      // Users
      { path: '/managements/users', component: () => import('pages/Users/Index.vue'), name: 'index-user'},
      { path: '/managements/users/create', component: () => import('pages/Users/Create.vue'), name: 'create-user' },
      { path: '/managements/users/:id', component: () => import('pages/Users/Detail.vue'), name: 'detail-user' },

      // Roles
      { path: '/managements/roles', component: () => import('pages/Roles/Index.vue'), name: 'index-role' },
      { path: '/managements/roles/create', component: () => import('pages/Roles/Create.vue'), name: 'create-role' },
      { path: '/managements/roles/:id', component: () => import('pages/Roles/Detail.vue'), name: 'detail-role' },

      // Permissions
      { path: '/setting/permission', component: () => import('pages/Permission.vue'), name: 'permission' },
      { path: '/setting/permission/create', component: () => import('pages/CreatePermission.vue'), name: 'create-permission' },
      { path: '/setting/permissions/:id', component: () => import('pages/DetailPermission.vue'), name: 'detail-permission' },
    ]
  },
  { path: '/login', component: () => import('pages/auth/login.vue'), name: 'Login' },
  { path: '/foods', component: () => import('pages/foods.vue') },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
