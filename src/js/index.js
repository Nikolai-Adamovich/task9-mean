'use strict';

//import slug from 'slug';

document.addEventListener('DOMContentLoaded', () => {
  /* Register */
  const register = document.querySelector('#register');

  if (register) {
    register.addEventListener('click', async () => {
      const response = await fetch('/user', {
        method: 'POST',
        headers: new Headers({
          'Content-type': 'application/json'
        }),
        body: JSON.stringify({
          username: document.querySelector('#username').value,
          email: document.querySelector('#email').value,
          password: document.querySelector('#password').value,
          role: 'user'
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const err = await response.json();
        console.log(err);
      }
    });
  }

  /* Login */
  const loginButton = document.querySelector('#login_button');

  if (loginButton) {
    loginButton.addEventListener('click', async () => {
      const response = await fetch('/login', {
        method: 'POST',
        headers: new Headers({
          'Content-type': 'application/json'
        }),
        body: JSON.stringify({
          username: document.querySelector('#username').value,
          password: document.querySelector('#password').value
        })
      });

      if (response.ok) {
        window.location.assign('/');
      } else {
        const err = await response.json();
        console.log(err);
      }
    });
  }

  /* Header */
  const navButton = document.querySelector('.nav__button');
  const navMenu = document.querySelector('.nav__menu');

  if (navButton && navMenu) {
    navButton.addEventListener('click', () => {
      navMenu.classList.toggle('nav__menu--visible');
    });
  }

  /* Create news */
  let image;
  const createButton = document.querySelector('#create_button');

  if (createButton) {
    createButton.addEventListener('click', async () => {
      const response = await fetch('/news', {
        method: 'POST',
        headers: new Headers({
          'Content-type': 'application/json'
        }),
        body: JSON.stringify({
          title: document.querySelector('#title').value,
          slug: document.querySelector('#slug').value,
          content: document.querySelector('#content').value,
          imgUrl: image
        })
      });

      if (response.ok) {
        window.location.assign('/');
      } else {
        const err = await response.json();
        console.log(err);
      }
    });
  }

  /* Edit news */
  const editButton = document.querySelector('#edit_button');

  if (editButton && newsId) {
    editButton.addEventListener('click', async () => {
      const response = await fetch(`/news/${newsId}`, {
        method: 'PUT',
        headers: new Headers({
          'Content-type': 'application/json'
        }),
        body: JSON.stringify({
          title: document.querySelector('#title').value,
          slug: document.querySelector('#slug').value,
          content: document.querySelector('#content').value,
          imgUrl: image
        })
      });

      if (response.ok) {
        window.location.assign('/');
      } else {
        const err = await response.json();
        console.log(err);
      }
    });
  }

  /* Delete news */
  const deleteButton = document.querySelector('#delete_button');

  if (deleteButton && newsId) {
    deleteButton.addEventListener('click', async () => {
      const response = await fetch(`/news/${newsId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        window.location.assign('/');
      } else {
        const err = await response.json();
        console.log(err);
      }
    });
  }

  /* Upload image */
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  const imageInput = document.querySelector('#image');
  const imagePreview = document.querySelector('.form__image-preview');

  if (imageInput && imagePreview) {
    imageInput.addEventListener('change', async () => {
      const file = imageInput.files[0];
      
      if (imageInput.files.length) {
        image = await getBase64(file);
      } else {
        image = '';
      }

      imagePreview.classList.toggle('form__image-preview--filled', image);
      imagePreview.style.backgroundImage = `url(${image})`;
    });
  }
});