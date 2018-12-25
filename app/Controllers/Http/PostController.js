'use strict'



// importing the model
const Post = use('App/Models/Post');

// validator
const { validate } = use('Validator')


class PostController {

  // index for all posts
  async allPosts({ view }) {
    const posts = await Post.all();
    return view.render('posts/allposts', {
      title: 'All user posts',
      posts: posts.toJSON()
     });
  }



  // detail page for single post
  async postDetail({ params, view }) {
      const post = await Post.find(params.id);
      return view.render('posts/detail', {
        post: post.toJSON()
      });
  }



  // add a new post
  async addPost({ view }) {
    return view.render('posts/add');
  }



  // store new post in the database
  async store({ request, response, session }) {
    const validation = await validate(request.all(), {
        title: 'required|min:2|max:255',
        body: 'required'
     });

     // if (validation.fails()) {
     //   session.withErrors(validation.messages()).flashAll();
     //   return response.redirect('back');  // reload the page
     // }

    const post = new Post();
    post.Title = request.input('title');
    post.Content = request.input('content');
    await post.save();
    session.flash({ notification: 'Post successfully saved!' });
    return response.redirect('/posts');
  }


  // edit a new post
  async editPost({ params, view }) {
    const post = await Post.find(params.id);
    return view.render('posts/edit', {
      post: post.toJSON()
    });
  }


  // update post in the database
  async updatePost({ params, request, response, session }) {
    const validation = await validate(request.all(), {
        title: 'required|min:2|max:255',
        body: 'required'
     });

     // if (validation.fails()) {
     //   session.withErrors(validation.messages()).flashAll();
     //   return response.redirect('back');  // reload the page
     // }

    const post = await Post.find(params.id);
    post.Title = request.input('title');
    post.Content = request.input('content');
    await post.save();
    session.flash({ notification: 'Post successfully updated!' });
    return response.redirect('/posts');
  }


  // delete a post
  async deletePost({params, session, response}) {
    const post = await Post.find(params.id);
    await post.delete();
    session.flash({ notification: 'Post successfully deleted!' });
    return response.redirect('/posts');
  }


}


module.exports = PostController;
