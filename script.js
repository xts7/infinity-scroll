const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
let count = 5;
const apiKey = '_of0TERN6MpQNCf7xdxSBElAR6I1pC4AxMnee9zyvEU';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
        const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
    }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Get elements and links from photos, add to dom
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // run function for each object in photos array 
    photosArray.forEach((photo) => {
        // create <a> to link unsplash 
        const item = document.createElement('a');
         setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // create img for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        // put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}


// Get photos from unsplash API 
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // catch error here
    }
}

// check to see if scrolling near bottom of page, load more photos from
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

// on load
getPhotos();