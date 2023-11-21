// Exécute le code suivant une fois que le document est complètement chargé
let formSelected;
function findForm() {
  let targetEl = $('[lb-form-solution="form"]');
  // Sélectionne un formulaire ayant l'attribut 'lb-form-solution' égal à 'form'
  if (targetEl.is("form")) {
    formSelected = targetEl;
    console.log("c'est un form");
  } else {
    formSelected = targetEl.find("form");
  }
  return formSelected;
}

function querySearch() {
  // Déclare la fonction 'querySearch'
  function getParameterFromUrl(name, url) {
    // Déclare une fonction interne pour obtenir des paramètres à partir de l'URL
    if (!url) url = window.location.href;
    // Si aucune URL n'est fournie, utilise l'URL de la page actuelle
    name = name.replace(/[\[\]]/g, "\\$&");
    // Échappe les caractères spéciaux dans le nom du paramètre pour la regex
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      // Crée une expression régulière pour trouver le paramètre dans l'URL
      results = regex.exec(url);
    // Exécute la regex sur l'URL et stocke les résultats
    if (!results) return null;
    // Si aucun résultat n'est trouvé, renvoie null
    if (!results[2]) return "";
    // Si le paramètre est trouvé sans valeur, renvoie une chaîne vide
    return decodeURIComponent(results[2].replace(/\+/g, " "));
    // Décode la valeur du paramètre et la renvoie
  }

  let searchInput = formSelected.find("input[lb-search-query]");

  searchInput.each(function () {
    // Pour chaque élément input ayant l'attribut 'lb-search-query'
    var querySearch = encodeURIComponent($(this).attr("lb-search-query"));
    // Obtient la valeur de l'attribut 'lb-search-query' pour cet élément et le met en format URL
    if (querySearch) {
      // Si l'attribut 'lb-search-query' est défini et différent de 'false'
      var paramValue = getParameterFromUrl(querySearch);
      // Appelle la fonction 'getParameterFromUrl' pour obtenir la valeur du paramètre correspondant
      if (paramValue) {
        $(this).val(paramValue);
        $(this).attr("value", paramValue);
        // Si une valeur de paramètre est trouvée, la définit comme valeur de l'élément input
      }
    }
  });
}
$(document).ready(function () {
  findForm();
  querySearch();
});
