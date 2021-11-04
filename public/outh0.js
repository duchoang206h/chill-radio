
async function addtoplaylist() {
  // check author
  if (decodeURIComponent(document.cookie)) {
    $("#search").css("display", "block");
  } else {
    console.log("not login");
    document.getElementById("login").style.display = "block";
  }
}
