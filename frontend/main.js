const baseURL = "http://localhost:4000/users";

const btn = document.querySelector(".btn");
const msg = document.querySelector(".msg");
const itemList = document.querySelector("#users");

const showUserOutput = (data) => {
  const { id, name, email, phone } = data;
  const li = document.createElement("li");
  li.className = "item";
  li.id = id;

  li.innerHTML = `
    <span class="name">${name}</span>
    <span class="email">${email}</span>
    <span class="phone">${phone}</span>
    <button class="delete">Delete</button>
    <button class="edit">Edit</button>
  `;

  li.querySelector(".delete").addEventListener("click", removeUser);
  li.querySelector(".edit").addEventListener("click", editUser);

  itemList.appendChild(li);
};

const getUsers = async () => {
  itemList.innerHTML = "";
  try {
    const res = await axios.get(baseURL);
    res.data.forEach(showUserOutput);
  } catch (err) {
    msg.innerHTML = `Error: ${err.message}`;
    msg.classList.add("error");
  }
};

const submitHandler = async (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  if (!name || !email || !phone) {
    msg.textContent = "Please fill out all fields";
    msg.classList.add("error");
    return;
  }

  const user = { name, email, phone };
  const uid = btn.dataset.id;

  try {
    if (uid) {
      await axios.post(`${baseURL}/edit-user/${uid}`, user);
      btn.value = "Submit";
      delete btn.dataset.id;
    } else {
      const res = await axios.post(`${baseURL}/add-user`, user);
      showUserOutput(res.data);
    }

    msg.textContent = "User saved successfully!";
    msg.classList.add("success");
  } catch (err) {
    msg.textContent = `Error: ${err.message}`;
    msg.classList.add("error");
  } finally {
    setTimeout(() => msg.classList.remove("error", "success"), 3000);
    document.getElementById("my-form").reset();
    getUsers();
  }
};

const removeUser = async (event) => {
  const li = event.target.closest("li");
  const uid = li.id;

  try {
    await axios.delete(`${baseURL}/delete-user/${uid}`);
    li.remove();
    msg.textContent = "User deleted!";
    msg.classList.add("success");
  } catch (err) {
    msg.textContent = `Error: ${err.message}`;
    msg.classList.add("error");
  } finally {
    setTimeout(() => msg.classList.remove("error", "success"), 3000);
  }
};

const editUser = (event) => {
  const li = event.target.closest("li");
  const uid = li.id;

  const name = li.querySelector(".name").textContent;
  const email = li.querySelector(".email").textContent;
  const phone = li.querySelector(".phone").textContent;

  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("phone").value = phone;

  btn.value = "Update";
  btn.dataset.id = uid;
};

document.addEventListener("DOMContentLoaded", getUsers);
