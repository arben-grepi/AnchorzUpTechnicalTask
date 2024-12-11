const ListOfShortLinks = ({ urls, divId }) => {
  const shortlinksDiv = document.getElementById(divId); // Use the dynamic divId
  shortlinksDiv.innerHTML = ""; // Clear the current content

  // Create a <ul> to hold the links and add a class for styling
  const ul = document.createElement("ul");
  ul.classList.add("shortlink-list"); // Add a class to the <ul> element

  urls.forEach((url) => {
    const li = document.createElement("li"); // Create a list item for each link
    const a = document.createElement("a");
    a.href = url.originalUrl;
    a.textContent = `https://short.link/${url.shortId}`;
    a.target = "_blank";
    a.classList.add("shortlink-text"); // Add the class to the <a> element

    // Create the dumpster icon and add it to the right of the link
    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-trash"); // Add Font Awesome classes for the trash icon

    // Calculate margin based on text length
    const textLength = a.textContent.length;
    const marginLeft = Math.min(20, textLength * 2); // Adjust the multiplier and max value as needed
    icon.style.marginLeft = `${marginLeft}px`;

    li.appendChild(a); // Append the anchor tag to the list item
    li.appendChild(icon); // Append the icon to the list item
    ul.appendChild(li); // Append the list item to the unordered list
  });

  shortlinksDiv.appendChild(ul); // Append the <ul> to the shortlinksDiv
};

export { ListOfShortLinks };
