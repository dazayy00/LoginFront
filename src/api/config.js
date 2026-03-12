export const getBaseURL = () => localStorage.getItem('backend_url') || "http://localhost:8080/api";

export const setBaseURL = (newUrl) => {

    localStorage.setItem('backend_url', newUrl);
    window.location.reload();
}