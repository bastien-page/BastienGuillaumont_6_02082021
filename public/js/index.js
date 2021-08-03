/* *******************************
 *     RECUPERATION DE LA DATA   *
 ****************************** */

// On recupère la data
let fetchUser = async () => {
  const response = await fetch("FishEyeData.json");
  const data = await response.json();
  return data;
};

// On traite la Data
let photographers;
let media;
fetchUser().then((data) => {
  photographers = data.photographers;
  media = data.media;
  console.log(photographers);
  console.log(media);
});
