(() => {
  const MENU = [
    {
      id: "m1",
      name: "Маргарита",
      price: 9.5,
      image: "https://maksim15132.github.io/ar-shop/assets/image/margarita.jpg",
      description: "Классическая пицца Маргарита — томатный соус, моцарелла, базилик.",
      modelGlb: "https://maksim15132.github.io/ar-shop/assets/modelGlb/margarita/pizza.glb",
      modelUsdz: "https://modelviewer.dev/shared-assets/models/Pizza.usdz",
    },
    {
      id: "m2",
      name: "Пепперони",
      price: 11.0,
      image: "https://maksim15132.github.io/ar-shop/assets/image/piperoni.jpg",
      description: "Острая пепперони с хрустящей корочкой и тянущимся сыром.",
      modelGlb: "https://maksim15132.github.io/ar-shop/assets/modelGlb/piperoni/pizza.glb",
      modelUsdz: "https://maksim15132.github.io/ar-shop/assets/modelUsdz/Pepperoni_and_Spinach_Pizza.usdz",
    },
    {
      id: "s1",
      name: "Цезарь с курицей",
      price: 8.0,
      image: "https://maksim15132.github.io/ar-shop/assets/image/chiken.png",
      description: "Свежий салат Цезарь с жареной курицей и пармезаном.",
      modelGlb: "https://modelviewer.dev/shared-assets/models/Pizza.glb",
      modelUsdz: "https://modelviewer.dev/shared-assets/models/Pizza.usdz",
    },
    {
      id: "m3",
      name: "Курица",
      price: 8.0,
      image: "https://maksim15132.github.io/ar-shop/assets/image/chiken_gril.jpg",
      description: "Запечёная курица.",
      modelGlb: "https://modelviewer.dev/shared-assets/models/Pizza.glb",
      modelUsdz: "https://maksim15132.github.io/ar-shop/assets/modelUsdz/Roast_chicken.usdz",
    },
    {
      id: "f1",
      name: "Фотоаппарат Смена-8М",
      price: 20.0,
      image: "https://maksim15132.github.io/ar-shop/assets/image/smena-8m.jpg",
      description: "Фотоаппарат «Смена-8М» был одним из самых популярных в Советском Союзе. Его выпускали с 1970-х по 1990-е годы на Ленинградском оптико-механическом объединении. Простая конструкция и прочный корпус делали камеру удобной даже для начинающих фотографов. С помощью «Смены» люди снимали семейные праздники, школьные мероприятия, поездки и повседневную жизнь.",
      modelGlb: "https://maksim15132.github.io/ar-shop/assets/modelGlb/smena_8m.glb",
      modelUsdz: "https://maksim15132.github.io/ar-shop/assets/modelUsdz/Smena_8M.usdz",
    },
  ];

  // Элементы DOM
  const menuGrid = document.getElementById("menu-grid");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalPrice = document.getElementById("modal-price");
  const modalDesc = document.getElementById("modal-desc");
  const modelViewer = document.getElementById("model-viewer");
  const arLink = document.getElementById("ar-link");
  const addToCartBtn = document.getElementById("add-to-cart-btn");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const modelStatus = document.getElementById("model-status");
  const modelError = document.getElementById("model-error");

  const cartBtn = document.getElementById("cart-btn");
  const cartCount = document.getElementById("cart-count");
  const cartPreview = document.getElementById("cart-preview");
  const cartItemsCount = document.getElementById("cart-items-count");
  const cartTotal = document.getElementById("cart-total");
  const orderBtn = document.getElementById("order-btn");
  const clearCartBtn = document.getElementById("clear-cart-btn");

  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // ===== Работа с темой =====
  function setTheme(theme) {
    if (theme === "light") {
      body.classList.remove("dark");
      body.classList.add("light");
      themeToggle.textContent = "🌙 Тёмная";
    } else {
      body.classList.remove("light");
      body.classList.add("dark");
      themeToggle.textContent = "☀️ Светлая";
    }
    localStorage.setItem("ar_theme", theme);
  }

  // Инициализация темы из localStorage
  const savedTheme = localStorage.getItem("ar_theme") || "dark";
  setTheme(savedTheme);

  themeToggle.onclick = () => {
    const newTheme = body.classList.contains("light") ? "dark" : "light";
    setTheme(newTheme);
  };

  // ===== Работа с корзиной =====
  let cart = JSON.parse(localStorage.getItem("ar_cart") || "[]");

  function saveCart() {
    localStorage.setItem("ar_cart", JSON.stringify(cart));
  }

  function updateCartUI() {
    const count = cart.reduce((acc, item) => acc + item.qty, 0);
    cartCount.style.display = count > 0 ? "inline-block" : "none";
    cartCount.textContent = count;

    cartItemsCount.textContent = count + " шт";

    const total = cart.reduce((acc, item) => acc + item.qty * item.price, 0);
    cartTotal.innerHTML = `Итого: <strong>€${total.toFixed(2)}</strong>`;

    cartPreview.style.display = count > 0 ? "flex" : "none";
  }

  function addToCart(dish, qty = 1) {
    const found = cart.find((item) => item.id === dish.id);
    if (found) {
      found.qty += qty;
    } else {
      cart.push({ ...dish, qty });
    }
    saveCart();
    updateCartUI();
  }

  function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
  }

  orderBtn.onclick = () => {
    alert("Оформление заказа пока не реализовано (демо).");
  };

  clearCartBtn.onclick = () => {
    clearCart();
  };

  cartBtn.onclick = () => {
    alert("Откройте карточку блюда, чтобы добавить в корзину.");
  };

  updateCartUI();

  // ===== Заполнение меню =====
  function createDishCard(dish) {
    const article = document.createElement("article");
    article.className = "card";

    const img = document.createElement("img");
    img.src = dish.image;
    img.alt = dish.name;
    article.appendChild(img);

    const meta = document.createElement("div");
    meta.style.marginTop = "10px";

    const flex = document.createElement("div");
    flex.style.display = "flex";
    flex.style.justifyContent = "space-between";
    flex.style.alignItems = "center";

    const nameDiv = document.createElement("div");
    nameDiv.style.fontWeight = "800";
    nameDiv.textContent = dish.name;
    flex.appendChild(nameDiv);

    const priceDiv = document.createElement("div");
    priceDiv.className = "price";
    priceDiv.textContent = `€${dish.price.toFixed(2)}`;
    flex.appendChild(priceDiv);

    meta.appendChild(flex);

    const desc = document.createElement("p");
    desc.style.color = "var(--muted)";
    desc.style.marginTop = "8px";
    desc.style.fontSize = "14px";
    desc.textContent = dish.description;
    meta.appendChild(desc);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.style.marginTop = "12px";
    buttonsDiv.style.display = "flex";
    buttonsDiv.style.gap = "8px";

    const detailsBtn = document.createElement("button");
    detailsBtn.className = "btn btn-primary";
    detailsBtn.textContent = "Подробнее";
    detailsBtn.onclick = () => openModal(dish);
    buttonsDiv.appendChild(detailsBtn);

    const addBtn = document.createElement("button");
    addBtn.className = "btn btn-ghost";
    addBtn.textContent = "В корзину";
    addBtn.onclick = () => {
      addToCart(dish, 1);
      alert("Добавлено в корзину");
    };
    buttonsDiv.appendChild(addBtn);

    meta.appendChild(buttonsDiv);

    article.appendChild(meta);

    return article;
  }

  function renderMenu() {
    menuGrid.innerHTML = "";
    for (const dish of MENU) {
      menuGrid.appendChild(createDishCard(dish));
    }
  }

  renderMenu();

  // ===== Модальное окно =====
  let currentDish = null;

  function openModal(dish) {
    currentDish = dish;
    modal.style.display = "flex";

    modalImg.src = dish.image;
    modalImg.alt = dish.name;
    modalTitle.textContent = dish.name;
    modalPrice.textContent = `Цена: €${dish.price.toFixed(2)}`;
    modalDesc.textContent = dish.description;

    modelViewer.src = dish.modelGlb;
    modelViewer.poster = dish.image;
    modelViewer.alt = dish.name;

    // Для iPhone AR quick look нужно ссылку на usdz
    arLink.href = dish.modelUsdz;
    arLink.style.display = dish.modelUsdz ? "inline-block" : "none";

    modelError.style.display = "none";
    modelStatus.textContent = "Статус 3D: загрузка...";

    // Подписываемся на события model-viewer
    modelViewer.addEventListener("load", onModelLoaded);
    modelViewer.addEventListener("error", onModelError);
  }

  function closeModal() {
    modal.style.display = "none";
    modelViewer.removeEventListener("load", onModelLoaded);
    modelViewer.removeEventListener("error", onModelError);
    currentDish = null;
  }

  closeModalBtn.onclick = closeModal;
  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };

  addToCartBtn.onclick = () => {
    if (currentDish) {
      addToCart(currentDish, 1);
      alert("Добавлено в корзину");
    }
  };

  function onModelLoaded() {
    modelStatus.textContent = "Статус 3D: модель загружена";
    modelError.style.display = "none";
  }
  function onModelError() {
    modelStatus.textContent = "Статус 3D: ошибка загрузки";
    modelError.style.display = "block";
  }
})();