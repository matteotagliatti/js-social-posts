const posts = [
  {
    id: 1,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/300?image=171",
    author: {
      name: "Phil Mangione",
      image: "https://unsplash.it/300/300?image=15",
    },
    likes: 80,
    created: "2021-06-25",
  },
  {
    id: 2,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=112",
    author: {
      name: "Sofia Perlari",
      image: "https://unsplash.it/300/300?image=10",
    },
    likes: 120,
    created: "2021-09-03",
  },
  {
    id: 3,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=234",
    author: {
      name: "Chiara Passaro",
      image: "https://unsplash.it/300/300?image=20",
    },
    likes: 78,
    created: "2021-05-15",
  },
  {
    id: 4,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=24",
    author: {
      name: "Luca Formicola",
      image: null,
    },
    likes: 56,
    created: "2021-04-03",
  },
  {
    id: 5,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=534",
    author: {
      name: "Alessandro Sainato",
      image: "https://unsplash.it/300/300?image=29",
    },
    likes: 111,
    created: "2021-03-05",
  },
  {
    id: 6,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=111",
    author: {
      name: "Matteo Tagliatti",
      image: "https://unsplash.it/300/300?image=19",
    },
    likes: 23,
    created: "2021-03-04",
  },
  {
    id: 7,
    content:
      "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
    media: "https://unsplash.it/600/400?image=110",
    author: {
      name: "Giovanni Sperti",
      image: null,
    },
    likes: 45,
    created: "2021-03-04",
  },
];

const outputContainer = document.getElementById("container");

// Generate all the DOM elements with posts objects
posts.forEach((element) => {
  // European format date
  const europeanDate = element.created.split("-");
  element.created = `${europeanDate[2]}-${europeanDate[1]}-${europeanDate[0]}`;

  // If there is no image name initials as image
  if (element.author.image === null) {
    const arrayName = element.author.name.split(" ");
    const arrayInitials = [];
    for (let i = 0; i < arrayName.length; i++) {
      const firstLetter = arrayName[i].charAt(0);
      arrayInitials.push(firstLetter);
    }
    element.author.initials = arrayInitials.join("");

    element.meta = `<div class="profile-pic-default"><span>${element.author.initials}</span></div>`;
  } else {
    element.meta = `<img class="profile-pic" src="${element.author.image}" alt="${element.author.name}">`;
  }

  outputContainer.innerHTML += `
    <div id="${element.id}" class="post">
            <div class="post__header">
                <div class="post-meta">
                    <div class="post-meta__icon">
                        ${element.meta}
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${element.author.name}</div>
                        <div class="post-meta__time">${element.created}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">${element.content}</div>
            <div class="post__image">
                <img src="${element.media}" alt="">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button js-like-button" href="#${element.id}" data-postid="1">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${element.id}" class="js-likes-counter">${element.likes}</b> persone
                    </div>
                </div> 
            </div>            
        </div>
    `;
});

// Select DOM elements
const buttons = document.querySelectorAll(".js-like-button");
const likesCounter = document.querySelectorAll(".js-likes-counter");
const postsId = document.querySelectorAll(".post");
const likedPosts = []; // init liked posts array

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function (event) {
    event.preventDefault(); // prevent href

    // add 1 like every click
    let likes = likesCounter[i].innerHTML;

    if (buttons[i].classList.contains("like-button--liked")) {
      // if element already in array
      likes = parseInt(likes) - 1;
      this.classList.remove("like-button--liked"); // remove CSS class
      likedPosts.splice(0); // remove element from array
    } else {
      // if element is not in the array
      likes = parseInt(likes) + 1;
      this.classList.add("like-button--liked"); // add CSS class
      likedPosts.push(postsId[i]); // add element to array
    }

    likesCounter[i].innerHTML = likes;
  });
}
