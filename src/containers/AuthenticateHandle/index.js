export default function AuthenticateHandle() {
  const url = new URL(window.location.href);
  const token = url.searchParams.get("code");
  if (token) {
    window.localStorage.setItem("tracker_token", token);
  }
  window.close();
  return null;
}
