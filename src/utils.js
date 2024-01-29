export async function loadSnackData() {
  const res = await window.fetch('/snack.json');
  if (!res.ok) {
    throw new Error('API failed');
  }

  const data = await res.json();
  return data;
}
