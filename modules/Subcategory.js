export default class Subcategory {
  constructor(title, content) {
    this.title = title; // Заголовок подтемы
    this.content = content; // Текст подтемы
    this.category = null; // Тема, к которой относится подтема
    this.el = null; // Элемент подтемы
    this.contentEl = null; // Элемент текста подтемы
  }

  /**
   * Создает и добавляет элемент в DOM
   * @param {string} subcategories_el - Контейнер элементов подтем
   * @param {string} content_el - Контейнер текста подтемы
   */
  createAndAppendElement(subcategories_el, content_el) {
    // Создаем ссылочный элемент, при нажатии на который будет вызываться метод select
    const categoryEl = document.createElement("a");
    categoryEl.textContent = this.title;
    categoryEl.href = "#";
    categoryEl.onclick = () => {
      this.select();
    };

    // Создаем элемент li, который будет содержать ссылочный элемент
    const liEl = document.createElement("li");
    liEl.classList.add(`category-${this.category.id}`);
    liEl.classList.add("hidden");
    liEl.appendChild(categoryEl);

    this.el = liEl;
    subcategories_el.append(this.el);

    // Создаем элемент li, который содержит текст подтемы
    const contentEl = document.createElement("p");
    contentEl.textContent = this.content;
    contentEl.classList.add(`category-${this.category.id}`);
    contentEl.classList.add("hidden");

    this.contentEl = contentEl;
    content_el.append(this.contentEl);
  }

  /**
   * Возвращает элемент подтемы, который в настоящий момент выбран
   */
  static getSelected() {
    const selectedCategory = document.querySelector(".menu-subcategories > .selected");
    if (selectedCategory) {
      return selectedCategory;
    }
    return null;
  }

  /**
   * Возвращает true, если элемент подтемы выбран
   */
  isSelected() {
    return this.el.classList.contains("selected");
  }

  /**
   * Помечает подтему как выбранную, добавляет класс selected в элемент и делает текст видимым
   */
  select() {
    if (this.isSelected()) {
      return null;
    }

    Subcategory.getSelected()?.classList.remove("selected");
    this.category.hideSubcategoriesContent();

    this.el.classList.add("selected");
    this.contentEl.classList.remove("hidden");
  }
}