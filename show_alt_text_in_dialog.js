javascript:divs = document.querySelectorAll('div[data-testid="tweetPhoto"], div[data-testid="previewInterstitial"]');

lines = ["Alt text:"];

for (i = 1; i <= divs.length; i++) {
  altText = divs[i - 1].attributes["aria-label"].value;

  if (altText === "Image") {
    altText = "(no alt text)";
  }

  lines.push("Image " + i + ":\n" + altText);
};

alert(lines.join("\n\n"));
