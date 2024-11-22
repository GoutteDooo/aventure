const inventory = ["", "", "", "", "", ""];
const iventaire = document.getElementById("inventaire");
const equipement = document.getElementById("equipement");
const equipment = {
  hat: "strawhat",
  body: "farmer shirt",
  weapon: "shepherd staff",
};

console.log(equipement);

inventory.forEach(() => {
  const Item = document.createElement("div");
  Item.classList.add("item");
  inventaire.appendChild(Item);
});

for (let key in equipment) {
  // Crée dynamiquement des éléments HTML pour chaque propriété
  const element = document.createElement("div");
  element.textContent = `${key}: ${equipment[key]}`;
  element.classList.add("equip");
  equipement.appendChild(element);
}
