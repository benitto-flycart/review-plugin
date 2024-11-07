export function masonryLayout(shadowRoot: ShadowRoot) {
  const elem = shadowRoot.querySelector(
    ".r_pw_g_all_reviews_container",
  ) as HTMLElement;

  if (!elem) {
    console.error("Container not found");
    return;
  }

  const images = elem.querySelectorAll("img");
  let loadedImagesCount = 0;

  // Function to check if all images have loaded
  const checkAllImagesLoaded = () => {
    loadedImagesCount++;
    if (loadedImagesCount === images.length) {
      console.log("All images are loaded");

      // Initialize Masonry after all images have loaded
      //@ts-ignore
      const msnry = new Masonry(elem, {
        itemSelector: ".r_pw_r_g_container",
        percentPosition: true,
        gutter: 15,
      });

      // Set the container opacity to 1 (if you want a fade-in effect)
      elem.style.opacity = "1";
    }
  };

  // If there are images, set initial opacity and wait for them to load
  if (images.length > 0) {
    // Set initial opacity to 0 (for fade-in after loading)
    elem.style.opacity = "0.2";

    // Attach load event listener to each image
    images.forEach((img) => {
      if (img.complete) {
        // If the image is already cached and loaded, increment the counter
        checkAllImagesLoaded();
      } else {
        // If the image is not yet loaded, listen for the load event
        img.addEventListener("load", checkAllImagesLoaded);
        img.addEventListener("error", checkAllImagesLoaded); // Handle errors gracefully
      }
    });
  } else {
    // If no images, initialize Masonry immediately
    //@ts-ignore
    const msnry = new Masonry(elem, {
      itemSelector: ".r_pw_r_g_container",
      percentPosition: true,
      gutter: 15,
    });

    // Set the container opacity to 1 immediately
    elem.style.opacity = "1";
  }
}

export function mosaicLayout(shadowRoot: ShadowRoot) {
  const elem = shadowRoot.querySelector(
    ".r_pw_r_m_all_reviews_container",
  ) as HTMLElement;

  if (!elem) {
    console.error("Container not found");
    return;
  }

  const images = elem.querySelectorAll("img");
  let loadedImagesCount = 0;

  // Function to check if all images have loaded
  const checkAllImagesLoaded = () => {
    loadedImagesCount++;
    if (loadedImagesCount === images.length) {
      // Initialize Masonry after all images have loaded
      //@ts-ignore
      const msnry = new Masonry(elem, {
        itemSelector: ".r_pw_r_m_container",
        percentPosition: true,
        gutter: 15,
      });

      // Set the container opacity to 1 (if you want a fade-in effect)
      elem.style.opacity = "1";
    }
  };

  // If there are images, set initial opacity and wait for them to load
  if (images.length > 0) {
    // Set initial opacity to 0 (for fade-in after loading)
    elem.style.opacity = "0.2";

    // Attach load event listener to each image
    images.forEach((img) => {
      if (img.complete) {
        // If the image is already cached and loaded, increment the counter
        checkAllImagesLoaded();
      } else {
        // If the image is not yet loaded, listen for the load event
        img.addEventListener("load", checkAllImagesLoaded);
        img.addEventListener("error", checkAllImagesLoaded); // Handle errors gracefully
      }
    });
  } else {
    // If no images, initialize Masonry immediately
    //@ts-ignore
    const msnry = new Masonry(elem, {
      itemSelector: ".r_pw_r_m_container",
      percentPosition: true,
      gutter: 15,
    });

    // Set the container opacity to 1 immediately
    elem.style.opacity = "1";
  }
}
