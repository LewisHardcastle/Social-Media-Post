import { faker } from 'https://esm.sh/@faker-js/faker';

// User profile, pic, display name, follow button
// User caption
// commenter profile
// commenter comment, date, of comment, replies, like button
// post stats, likes, date, like button, comment button, dm button, bookmark button
// comment form, emoji button, post button

const postImage = grabEl('.post-img');
const userProfilePic = grabEl('.profile-pic');
const captionProfilePic = grabEl('.caption-profile-pic');
const captionText = grabEl('.user-caption-text');
const userName = grabEl('.username');
const userLocation = grabEl('.user-location');
const commentContainer = grabEl('.comment-container');
const commentList = grabEl('.comment-list');
const commentListItem = grabEl('.comment-list-item');
const heartIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 comment-like-button"> <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>';

// const replyButton = grabEl('.reply-button');
// const repliesList = grabEl('.replies-list');

function grabEl(selector) {
  return document.querySelector(selector);
}

function generatePerson() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const userName = faker.internet.userName({
    firstName: `${firstName}`,
    lastName: `${lastName}`,
  });

  return { userName };
}

function likesGenerator() {
  const likes = Math.round(Math.random() * 1000);
  return likes;
}

function getCurrentDate() {
  const date = new Date();
  return date;
}

function generatePost() {
  const { userName } = generatePerson();

  const postObj = {
    userName,
    location: faker.location.city(),
    profilePic: faker.image.avatarGitHub(),
    text: faker.word.words({ count: { min: 1, max: 10 } }),
    postImage: faker.image.urlLoremFlickr({
      width: 800,
      height: 1000,
    }),
    date: getCurrentDate(),
    likes: likesGenerator(),
  };
  return postObj;
}

function populateCommentListArr() {
  const userObj = generatePost();
  const commentListArr = [
    `<div class="comment"><img class="profile-pic" src="${userObj.profilePic}"/><div class="comment-text"><p>${userObj.userName} <span class='text-not-bold'>${userObj.text}</span></p>
    <div class="comment-like-button-container">${heartIcon}</div></div></div>`,
  ];
  return commentListArr;
}

function populateRepliesListArr() {
  const replyUserObj = generatePost();
  const repliesListArr = [
    `<img class="profile-pic" src="${replyUserObj.profilePic}"/><div class="replies-text"><p>${replyUserObj.userName} <span class="text-not-bold">${replyUserObj.text}</span></p></div>`,
  ];
  return repliesListArr;
}

function newCommentElement() {
  // Math.floor(Math.random() * 20)
  const numberOfComments = Math.floor(Math.random() * 10);
  const numberOfReplies = Math.floor(Math.random() * 2);

  for (let i = 0; i <= numberOfComments; i++) {
    const commentListArr = populateCommentListArr();
    const newLi = document.createElement('li');
    const newReplyUl = document.createElement('ul');
    const replyButton = document.createElement('p');

    newLi.className = 'comment-list-item';
    newLi.innerHTML = `${commentListArr[0]}`;
    newReplyUl.className = 'replies-list';
    newLi.setAttribute('id', `${i}`);
    replyButton.className = 'reply-button';
    replyButton.innerText = 'Show replies';
    replyButton.setAttribute('id', `${i}`);

    commentList.appendChild(newLi);

    for (let x = 0; x <= numberOfReplies; x++) {
      const repliesListArr = populateRepliesListArr();
      const newReplyLi = document.createElement('li');

      newReplyLi.className = 'replies-list-item';
      newReplyLi.classList.add(`reply-list-number-${i}`);
      newReplyLi.setAttribute('id', `${x}`);
      newReplyLi.innerHTML = `${repliesListArr[0]}`;

      newReplyUl.appendChild(newReplyLi);
      newReplyUl.insertBefore(replyButton, newReplyUl.firstChild);
    }
    newLi.appendChild(newReplyUl);
  }

  window.addEventListener('click', function (e) {
    const allReplyButtons = document.querySelectorAll('.reply-button');

    allReplyButtons.forEach(i => {
      if (i.id === e.target.id) {
        const releventRepliesList = document.querySelectorAll(
          `.reply-list-number-${e.target.id}`
        );
        if (e.target.innerText === 'Hide replies') {
          releventRepliesList.forEach(i => {
            i.style.display = 'none';
          });
          e.target.innerText = 'Show replies';
        } else if (e.target.innerText === 'Show replies') {
          releventRepliesList.forEach(i => {
            i.style.display = 'flex';
          });
          e.target.innerText = 'Hide replies';
        }
      } else {
        return null;
      }
    });
  });
}

function displayPost() {
  const postObj = generatePost();

  postImage.src = postObj.postImage;

  userName.innerText = postObj.userName;
  userLocation.innerText = postObj.location;
  userProfilePic.src = postObj.profilePic;

  captionProfilePic.src = postObj.profilePic;
  captionText.innerHTML = `<p class='caption-text'>${postObj.userName} <span class='text-not-bold'>${postObj.text}</span></p>`;
}

window.addEventListener('load', function () {
  displayPost();
  newCommentElement();
});
