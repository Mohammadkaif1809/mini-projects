const form = document.querySelector('#userForm');

const nameInput = document.querySelector('input[name="name"]');
const roleInput = document.querySelector('input[name="role"]');
const bioInput = document.querySelector('input[name="bio"]');
const urlInput = document.querySelector('input[name="profileUrl"]');
const addressInput = document.querySelector('input[name="address"]');

const rightSide = document.querySelector('#rightSide');

const usersContainer = document.querySelector('#usersContainer');

let userManager = {
  users: [],

  init: function () {
    const saved = JSON.parse(localStorage.getItem('users')) || [];
    this.users = saved;
    this.users.forEach((val) => this.renderUser(val));
    form.addEventListener('submit', this.submitHander.bind(this));
  },

  submitHander: function (e) {
    e.preventDefault();
    this.add();

    let addMsg = document.createElement('p');
    addMsg.textContent = "Profile Added";
    addMsg.className =
      "fixed top-5 left-5 bg-green-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg opacity-100 transition-opacity duration-300 ease-in-out";

    document.body.appendChild(addMsg);

    setTimeout(() => {
      addMsg.remove();
    }, 1700);
  },

  add: function () {
    this.users.push({
      username: nameInput.value,
      role: roleInput.value,
      Bio: bioInput.value,
      address: addressInput.value,
      url: urlInput.value
    });

    localStorage.setItem('users', JSON.stringify(this.users));

    let card = document.createElement('div');
    card.className =
      "relative w-[300px] min-h-[190px] bg-white/90 backdrop-blur rounded-xl shadow-md ring-1 ring-slate-200/60 p-5 hover:shadow-lg transition";

    let btn = document.createElement('button');
    btn.className =
      "delete-btn absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur shadow-sm text-slate-500 hover:text-red-600 hover:bg-red-50 transition";

    let icon = document.createElement('i');
    icon.className = "fa-solid fa-trash text-xs";

    let profileimg = document.createElement('img');
    profileimg.className =
      "w-16 h-16 rounded-full object-cover mb-3";
    profileimg.src = urlInput.value;

    let user = document.createElement('h3');
    user.textContent = nameInput.value;
    user.className = "text-base font-semibold text-gray-800";

    let role = document.createElement('p');
    role.textContent = roleInput.value;
    role.className =
      "text-sm text-indigo-600 font-medium mb-1";

    let bio = document.createElement('p');
    bio.textContent = bioInput.value;
    bio.className =
      "text-sm text-gray-500 leading-relaxed";

    let address = document.createElement('p');
    address.textContent = addressInput.value;
    address.className = "text-xs text-gray-400 mt-1";

    btn.appendChild(icon);
    card.appendChild(btn);
    card.appendChild(profileimg);
    card.appendChild(user);
    card.appendChild(role);
    card.appendChild(bio);
    card.appendChild(address);

    usersContainer.appendChild(card);

    btn.addEventListener('click', (e) => {
      card.remove();

      this.users = this.users.filter((u) => {
        return u.username !== user.textContent;
      });

      localStorage.setItem('users', JSON.stringify(this.users));

      let deletedMsg = document.createElement('p');
      deletedMsg.textContent = "Profile Removed";
      deletedMsg.className =
        "fixed top-5 left-5 bg-red-500 text-white text-sm px-4 py-2 rounded-lg shadow-lg transition-opacity";

      document.body.appendChild(deletedMsg);

      setTimeout(() => {
        deletedMsg.remove();
      }, 1800);
    });

    form.reset();
  },

  renderUser: function (data) {
    let card = document.createElement('div');
    card.className =
      "relative w-[300px] min-h-[190px] bg-white/90 backdrop-blur rounded-xl shadow-md ring-1 ring-slate-200/60 p-5 hover:shadow-lg transition";

    let btn = document.createElement('button');
    btn.className =
      "delete-btn absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur shadow-sm text-slate-500 hover:text-red-600 hover:bg-red-50 transition";

    let icon = document.createElement('i');
    icon.className = "fa-solid fa-trash text-xs";

    let profileimg = document.createElement('img');
    profileimg.className =
      "w-16 h-16 rounded-full object-cover mb-3";
    profileimg.src =
      data.url || "https://i.pravatar.cc/100?img=12";

    let user = document.createElement('h3');
    user.textContent = data.username;
    user.className = "text-base font-semibold text-gray-800";

    let role = document.createElement('p');
    role.textContent = data.role;
    role.className =
      "text-sm text-indigo-600 font-medium mb-1";

    let bio = document.createElement('p');
    bio.textContent = data.Bio;
    bio.className =
      "text-sm text-gray-500 leading-relaxed";

    let address = document.createElement('p');
    address.textContent = data.address || "";
    address.className = "text-xs text-gray-400 mt-1";

    btn.appendChild(icon);
    card.append(btn, profileimg, user, role, bio,address);
    usersContainer.appendChild(card);

    btn.addEventListener('click', () => {
      card.remove();

      this.users = this.users.filter(
        (u) => u.username !== data.username
      );

      localStorage.setItem('users', JSON.stringify(this.users));
    });
  },

  remove: function () {}
};

userManager.init();

