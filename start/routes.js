'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('home');

Route.get('/posts', 'PostController.allPosts');

Route.post('/posts', 'PostController.store');  // creates and saves new post to the database

Route.get('/posts/new', 'PostController.addPost');  // renders new post form

Route.get('/posts/edit/:id', 'PostController.editPost');   // loads the form to edit a post

Route.get('/posts/:id', 'PostController.postDetail');   // detail of single post

Route.put('/posts/:id', 'PostController.updatePost');   // update single post

Route.delete('/posts/:id', 'PostController.deletePost');   // delete a post 




// Route.get('/app', () => 'This is the app route!');

// Route.get('/app/:id', ({params}) => `This is the app route with id ${params.id}!`);
