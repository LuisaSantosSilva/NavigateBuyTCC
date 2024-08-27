export const enableInput = (inputId: string) => {
    const input = document.getElementById(inputId);
    if (input) {
      input.removeAttribute ('disabled');
      input.focus();
    }
  }