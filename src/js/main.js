var siteNameInput = document.getElementById('siteName');
var siteURLInput = document.getElementById('siteURL');

var openTabs = localStorage.getItem('tab');
openTabs = openTabs.slice(0, -9) + "Tab";
document.getElementById(openTabs).click();

// Listen for submissions
document.getElementById('myForm').addEventListener('submit', (e) => {
    // Receive form values
    var siteName = siteNameInput.value;
    var siteURL = siteURLInput.value;
    var currentDate = new Date();
    var theDate = currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
    var boolean = true;
    var bookmark = {
        name: siteName,
        url: siteURL,
        date: theDate
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    setTimeout(colorGrey, 3000);

    if (!siteName) {
        siteNameInput.style.borderColor = 'red';
        boolean = false;
    }

    if (!siteURL) {
        siteURLInput.style.borderColor = 'red';
        boolean = false;
    }

    if (!siteURL.match(regex)) {
        siteURLInput.style.borderColor = 'red';
        clearInput(siteURLInput);
        return false;
    }

    if (boolean == false) {
        return false;
    }

    // Store bookmarks in localStorage
    if (localStorage.getItem('bookmarks') === null) {
        // Initialize array
        var bookmarks = [];

        addBookmarkToLS(bookmarks);
    } else {
        // Fetch bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        addBookmarkToLS(bookmarks);
    }

    function addBookmarkToLS(bookmarks) {
        // Add bookmark to array
        bookmarks.push(bookmark);

        // Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Reset form
    document.getElementById('myForm').reset();

    fetchBookmarks();

    // Prevent form from submitting to the page.
    e.preventDefault();
});

// Delete bookmark from localStorage
function deleteBookmark(url) {
    // Fetch bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Loop through bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            // Remove from Array
            bookmarks.splice(i, 1);
        }
    }

    // Save and re-fetch
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

function colorGrey() {
    siteNameInput.style.borderColor = '#D3D3D3';
    siteURLInput.style.borderColor = '#D3D3D3';
}

function clearInput(siteInput) {
    siteInput.value = '';
}

function fetchBookmarks() {
    colorGrey();

    // Fetch bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Show bookmarks
    var divBookmarks = document.getElementById('divBookmarks');
    var dashboardBookmarks = document.getElementById('dashboardBookmarks');

    divBookmarks.innerHTML = '';
    dashboardBookmarks.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        var date = bookmarks[i].date;
        var hr = '';

        if (i != bookmarks.length - 1) {
            hr = '<hr />';
        }

        divBookmarks.innerHTML += '<div class="row"><div class="col col-md-8">' +
            '<strong>' + name + '</strong></div>' +
            '<div class="col col-md-1 right"><a  target="_blank" href="' + url + '">Visit</a></div>' +
            '<div class="col col-md-1 red right"><a onclick="deleteBookmark(\'' + url + '\')" href="#">Delete</a></div>' +
            '<div class="col col-md-2 right">' + date + '</div></div>' + hr;

        dashboardBookmarks.innerHTML += '<div class="row">' +
           '<a href="' + url + '"/>' + name + '</a></div>';
    }

}

function openTab(evt, tabName){
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById('bookmarkContainer').style.display = "none";
    document.getElementById('listContainer').style.display = "none";
    document.getElementById('dashboardContainer').style.display = "none";
    document.getElementById('cryptoContainer').style.display = "none";
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    // Save
    localStorage.setItem('tab', tabName);
}