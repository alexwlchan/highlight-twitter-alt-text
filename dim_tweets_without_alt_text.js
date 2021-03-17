// This function

function hideInaccessibleTweets() {
  var articles = document.getElementsByTagName("article");
  for (i = 0; i < articles.length; i++) {
    var art = articles[i];
    var isMissingAltText = false;

    // Is this a retweet?  Crude but simple heuristic.
    //
    // Note: this is probably expensive; don't use it if you don't need it.
    // You might use this if you only wanted to dim retweets.
    // var isRetweet = art.outerHTML.includes("Retweeted");
    // console.log(isRetweet)

    var images = art.getElementsByTagName("img");
    for (j = 0; j < images.length; j++) {
      var img = images[j];

      // Emoji are rendered as custom images, which always get alt text
      // and aren't interesting for this script.  e.g.
      //
      //    <img alt="🌟" draggable="false" src="https://abs-0.twimg.com/emoji/v2/svg/1f31f.svg" class="css-9pa8cd">
      //
      // Skip them.
      if (img.getAttribute("src").startsWith("https://abs-0.twimg.com/emoji")) {
        continue
      }

      // Profile pictures are rendered as images without alt text.
      // If we hid those, we wouldn't see any tweets!  e.g.
      //
      //     <img alt="" draggable="true" src="https://pbs.twimg.com/profile_images/123456789/IngoS3dh_x96.jpg" class="css-9pa8cd">
      //
      // Skip them.
      if (img.getAttribute("src").startsWith("https://pbs.twimg.com/profile_images")) {
        continue
      }

      // JavaScript types are finnicky; I don't know if I've caught all
      // of the "undefined" alt text values here.
      var altText = img.getAttribute("alt")

      if (altText === "Image") {
        isMissingAltText = true
        break
      }
    }

    // Change the style of the tweet to reflect the fact that it
    // includes inaccessible media.  Here I'm dimming the opacity --
    // you could also add a red border, or a warning, or hide it entirely.
    if (isMissingAltText) {
      art.style.opacity = 0.1
    }
  }
}
