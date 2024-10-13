function checkUserInList(mellicode) {
  // بارگذاری users از localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // بررسی وجود mellicode در لیست کاربران
  const userExists = users.some((user) => user.mellicode === mellicode);

  if (userExists) {
    return true;//کاربری با این کد ملی وجود دارد
  } else {
    return false; // به این معنی که کاربر با این mellicode وجود ندارد
  }
}

export default checkUserInList;
