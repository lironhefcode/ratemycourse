let url;

if (process.env.NODE_ENV === "development") {
  url = "http://localhost:3000";
} else {
  url = "https://ratemycourse-0jno.onrender.com";
}
export default url;
