export function toast(text, type, duration = 3000) {
  const options = {
    text,
    duration,
    style: {},
  };

  switch (type) {
    case "success":
      options.style.background = "linear-gradient(45deg, #16a34a, #4ade80)";
      break;
    case "warning":
      options.style.background = "linear-gradient(45deg, #ca8a04, #facc15)";
      break;
    case "danger":
      options.style.background = "linear-gradient(45deg, #e11d48, #fb7185)";
      break;
  }

  Toastify(options).showToast();
}
