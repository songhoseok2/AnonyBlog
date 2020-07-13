import React from 'react';
import ReactDOM from 'react-dom';
//import * as serviceWorker from './serviceWorker';
class BlogPosts extends React.Component
{
  render()
  {
    var posts_string = this.props.posts.posts.toString();
    posts_string = posts_string.replace(/\'/g, "\"");
    const listItems = JSON.parse(posts_string).map((post) =>
    {
      return(
        <article class="media content-section">
          <div class="media-body">
              <div class="article-metadata">
                  <a class="mr-2" href="#">{ post.author }</a>
                  <small class="text-muted">{ post.date_posted }</small>
              </div>
              <h2><a class="article-title" href="#">{ post.title }</a></h2>
              <p class="article-content">{ post.content }</p>
          </div>
        </article>
      );
    });
    return listItems;
  }
}

var blog_posts_div = document.getElementById("blog_posts_id");
if(blog_posts_div)
{
  var posts = {...(blog_posts_div.dataset)};
  ReactDOM.render(<BlogPosts posts={posts} />, blog_posts_div);
}





// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
