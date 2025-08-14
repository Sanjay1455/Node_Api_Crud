module.exports = (req, res) => {
  let baseUrl = req.url.split("/").slice(0, 3).join("/") + "/";
  let id = req.url.split("/")[3];
  const regexV4 = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

  if (req.url === "/api/books") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.books));

  } else if (baseUrl === "/api/books/" && id) {
    if (!regexV4.test(id)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        title: "Validation Failed",
        message: "UUID is not valid"
      }));
      return;
    }

    let filteredBook = req.books.filter(book => book.id === id);
    if (filteredBook.length > 0) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(filteredBook));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({
        title: "Not Found",
        message: "Book not found"
      }));
    }

  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      title: "Not Found",
      message: "Route not found"
    }
));
  }
};
