import Subcategory from "./Subcategory.js";

export default class Category {
  constructor(id, title, subcategories) {
    this.id = id; // id темы (в нашем случае индекс из массива данных)
    this.title = title; // Заголовок темы
    this.subcategories = subcategories; // Подтемы
    this.el = null; // Элемент темы
  }
  
  /**
   * Создает и добавляет элемент в DOM
   * @param {string} categories_el - Контейнер элементов меню
   */
  createAndAppendElement(categories_el) {
    // Создаем ссылочный элемент, при нажатии на который будет вызываться метод select
    const categoryEl = document.createElement("a");
    categoryEl.textContent = this.title;
    categoryEl.href = "#";
    categoryEl.onclick = () => {
      this.select();
    };

    // Создаем элемент li, который будет содержать ссылочный элемент
    const liEl = document.createElement("li");
    liEl.addEventListener("deselect", () => {
      for (const subcategory of this.subcategories) {
        // При вызове события deselect, прячем подтемы и их текст
        subcategory.el.classList.add("hidden");
        subcategory.contentEl.classList.add("hidden");
      }
    });
    liEl.appendChild(categoryEl);

    this.el = liEl;
    categories_el.append(this.el);
  }

  /**
   * Возвращает элемент темы, который в настоящий момент выбран
   */
  static getSelected() {
    const selectedCategory = document.querySelector(".menu-categories > .selected");
    if (selectedCategory) {
      return selectedCategory;
    }
    return null;
  }
  
  /**
   * Возвращает true, если элемент темы выбран
   */
  isSelected() {
    return this.el.classList.contains("selected");
  }

  /**
   * Помечает тему как выбранную, добавляет класс selected в элемент темы
   * а также делает видимыми подтемы и их текст
   */
  select() {
    if (this.isSelected()) {
      return null;
    }

    // Получаем выбранный элемент темы, убираем у него класс selected и вызываем событие deselect (чтобы сделать невидимыми подтемы и текст прошлой темы)
    const selected = Category.getSelected();
    if (selected) {
      selected.classList.remove("selected");
      selected.dispatchEvent(new CustomEvent("deselect"));
    }

    this.selected = true;
    this.el.classList.add("selected");

    for (const [index, subcategory] of this.subcategories.entries()) {
      subcategory.el.classList.remove("hidden");

      if (index === 0) {
        subcategory.select();
      }
    }
  }

  hideSubcategoriesContent() {
    for (const subcategory of this.subcategories) {
      subcategory.contentEl.classList.add("hidden");
    }
  }
}