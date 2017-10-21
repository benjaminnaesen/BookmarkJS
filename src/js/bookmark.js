var openTab = localStorage.getItem('tab');
// Default open the bookmarks page.
document.getElementById("defaultOpen").click();
document.getElementById(tabName).style.display = "block";
if(tab == 'bookmarkContainer'){

    openTab = openTab.slice(0, -9) + "Tabr";
    document.getElementById(openTab).click();