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

function grabEl(selector) {
  return document.querySelector(selector);
}

function generatePerson() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const displayName = faker.internet.displayName({
    firstName: `${firstName}`,
    lastName: `${lastName}`,
  });

  const userName = faker.internet.userName({
    firstName: `${firstName}`,
    lastName: `${lastName}`,
  });

  return { displayName, userName };
}

// function generateText() {
//   const text = faker.word.words({ count: { min: 1, max: 80 } });
//   return text;
// }

function trueOrFalse() {
  const value = Math.round(Math.random() * 2);
  if (value === 0) {
    return false;
  } else {
    return true;
  }
}

function generatePicture() {
  const picOrNoPic = trueOrFalse();
  if (picOrNoPic) {
    return faker.image.url();
  } else {
    return null;
  }
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
  const { displayName, userName } = generatePerson();

  const postObj = {
    userName,
    location: faker.location.city(),
    profilePic: faker.image.avatarGitHub(),
    text: faker.word.words({ count: { min: 1, max: 20 } }),
    postImage: faker.image.urlLoremFlickr({
      width: 800,
      height: 1000,
    }),
    date: getCurrentDate(),
    likes: likesGenerator(),
  };
  return postObj;
}

// const commentListArr = [
//   '<img class="profile-pic" src="./profile-pic.jpg"/><div class="comment-text"><p>Username + comment</p></div>',
// ];

function populateCommentListArr() {
  const userObj = generatePost();

  const commentListArr = [
    `<img class="profile-pic" src="${userObj.profilePic}"/><div class="comment-text"><p>${userObj.userName} <span class='text-not-bold'>${userObj.text}</span></p></div>`,
  ];

  return commentListArr;
}

function newCommentElement() {
  // Math.floor(Math.random() * 20)
  const numberOfComments = 1;

  for (let i = 0; i <= numberOfComments; i++) {
    const commentListArr = populateCommentListArr();

    const newLi = document.createElement('li');
    newLi.className = 'comment-list-item';
    newLi.innerHTML = `${commentListArr[0]}`;
    commentContainer.appendChild(newLi);
    console.log(newLi.innerHTML);
  }
}

function displayUser() {
  const postObj = generatePost();
  userName.innerText = postObj.userName;
  userLocation.innerText = postObj.location;
  postImage.src = postObj.postImage;
  userProfilePic.src = postObj.profilePic;

  captionProfilePic.src = postObj.profilePic;
  captionText.innerHTML = `<p class='caption-text'>${postObj.userName} <span class='text-not-bold'>${postObj.text}</span></p>`;
}

window.addEventListener('load', function () {
  displayUser();
  newCommentElement();
});

// window.addEventListener('click', function () {
//   console.log('clicked');
//   newCommentElement();
// });
