// Import stylesheets
import "./style.css";

// Write Javascript code
var submitBtn = document.getElementById("submit");
var convertBtn = document.getElementById("convert");

submitBtn.addEventListener("click", async function(e) {
  var file = document.querySelector("input").files[0];
  console.log(file);
  console.log(await toBase64(file));
  localStorage.setItem("csv", await toBase64(file));
});

const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

convertBtn.addEventListener("click", function() {
  const url = localStorage.getItem("csv");
  fetch(url)
    .then(res => res.blob())
    .then(blob => {
      const file = new File([blob], "xyz", { type: "text/csv" });
      console.log(file.name);
    });
});
