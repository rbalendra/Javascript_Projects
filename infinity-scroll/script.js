const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];




// UNSPLASH API
const count = 30;
const apiKey = '7-c7JGnpYmgTorykKTxcIO0dQ5KyKhBzrqdhJq6fgH8'; //PERSONAL KEY (USE YOUR OWN KEY)
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;  


// Check if all images were loaded
function imageLoaded(){
  imagesLoaded++;
  if (imagesLoaded === totalImages){
    ready = true;
    loader.hidden = true;
  }
}



// Helper function to setAttributes on DOM elements
function setAttributes(element, attributes){
  for(const key in attributes){
    element.setAttribute(key, attributes[key]);
  } 
}




//CREATE ELEMENTS for LINKS & PHOTOS, ADD TO DOM
function displayPhotos(){
  imagesLoaded = 0;
  totalImages = photosArray.length;
  // run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);   //USED WITHOUT HELPER FUNCTIONS
    // item.setAttribute('target','_blank');          //USED WITHOUT HELPER FUNCTIONS
    setAttributes(item,{
      href: photo.links.html,
      target: '_blank',
    });

    // Create <img> for photo
    const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);               //USED WITHOUT HELPER FUNCTIONS
    // img.setAttribute('alt', photo.alt_description);            //USED WITHOUT HELPER FUNCTIONS
    // img.setAttribute('title', photo.alt_description);          //USED WITHOUT HELPER FUNCTIONS
    setAttributes(img,{
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);


    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}





// Get Photos from Unsplash API
async function getPhotos(){
  try{
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error){
    // Catch error here
  }
}

// Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll', ()=>{
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
  {
    ready = false;
    getPhotos();
  }
});




// ON LOAD
getPhotos();