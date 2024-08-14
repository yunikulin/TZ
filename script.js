import Category from "./modules/Category.js";
import Subcategory from "./modules/Subcategory.js";

// Загружаем данные из файла data.json
fetch("data.json")
  .then(response => response.json())
  .then(json => parseData(json));

function parseData(data) {
  // Находим элементы, в которые будут элементы меню
  const categoriesEl = document.getElementsByClassName('menu-categories')[0];
  const subCategoriesEl = document.getElementsByClassName('menu-subcategories')[0];
  const contentEl = document.getElementsByClassName('menu-content')[0];

  for (let [index, category] of data.categories.entries()) {
    // Создаем экземпляр класса Category для каждого элемента меню
    category = new Category(index, category.title, category.subcategories);
    category.createAndAppendElement(categoriesEl);

    for (const [index, subcategory] of category.subcategories.entries()) {
      // Создаем экземпляр класса Subcategory для каждого элемента списка
      const newSubcategory = new Subcategory(subcategory.title, subcategory.content);
      newSubcategory.category = category;
      newSubcategory.createAndAppendElement(subCategoriesEl, contentEl);
      category.subcategories[index] = newSubcategory;
    }

    // Автоматически выбираем первый элемент меню
    if (index === 0) {
      category.select();
    }
  }
}