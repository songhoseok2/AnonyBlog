import React from 'react';
import ReactDOM from 'react-dom';



export class TopNavBar extends React.Component
{
  render()
  {
    return (
      <div>
        <header class="site-header">
          <nav class="navbar navbar-expand-md navbar-dark bg-steel fixed-top">
            <div class="container">
              <a class="navbar-brand mr-4" href="/">Annony Blog</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarToggle">
                <div class="navbar-nav mr-auto">
                  <a class="nav-item nav-link" href="/post/new">New post</a>
                  {this.props.current_user_username != "Guest" && this.props.current_user_username != '' && 
                  (
                    <div class="navbar-nav">
                      <a class="nav-item nav-link" href={"/user/" + this.props.current_user_username}>My posts</a>
                    </div>
                  )}
                </div>
                {this.props.current_user_username != "Guest" && this.props.current_user_username != '' ? 
                (
                  <div class="navbar-nav">
                    <img class="rounded-circle welcome-img" src={"/static/profile_pics/" + profile_pic_name}></img>
                    <a class="nav-link disabled">
                      Welcome, {current_user_username}.
                    </a>
                    <a class="nav-item nav-link" href="/account">Account</a>
                    <a class="nav-item nav-link" href="/logout">Log out</a>
                  </div>
                ) : 
                ( 
                  <div class="navbar-nav">
                    <a class="nav-item nav-link" href="/login">Login</a>
                    <a class="nav-item nav-link" href="/register">Register</a>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}


export class SideNavBar extends React.Component
{
  render()
  {
    return (
      <div>
        <div class="content-section side_navbar">
          <h3>Identity</h3>
            <div>
              <p id="identity_intro_id" class="text-muted">This is the identity you will be shown as to the public.</p>
                <div >
                  <form action={"/" + current_user_user_id + "/0/identity_change"} method="POST">
                    <div class="list-group">
                      <button id="reveal_button_id" class="list-group-item list-group-item-light btn reveal_button" type="submit"><span>Revealed</span></button>
                    </div>
                  </form>
                  <form action={"/" + current_user_user_id + "/1/identity_change"} method="POST">
                    <div class="list-group">
                      <button id="anonymous_button_id" class="list-group-item list-group-item-light btn anonymous_button" type="submit"><span>Anonymous</span></button>
                    </div>
                  </form>
                </div>
            </div>
        </div>
      </div>
    );
  }
}

var top_navbar_div = document.getElementById("top_navbar_id");
var side_navbar_div = document.getElementById("side_navbar_id");
var current_user_username = top_navbar_div.getAttribute("current_user_username");
var current_user_user_id = top_navbar_div.getAttribute("current_user_user_id");
var profile_pic_name = top_navbar_div.getAttribute("profile_pic_name");


if (top_navbar_div) ReactDOM.render(<TopNavBar current_user_username={current_user_username} current_user_user_id={current_user_user_id} />, top_navbar_div);
if (side_navbar_div) ReactDOM.render(<SideNavBar />, side_navbar_div);







