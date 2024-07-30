const { error, log } = require("console");
const http = require("http");
const path = require("path");
const url = require("url");

const PORT = 4000;
const DATABASE = [
  {
    id: 1,
    name: "Bhilai",
    adventurePlace: 0,
  },
  {
    id: 2,
    name: "Mumbai",
    adventurePlace: 10,
  },
  {
    id: 3,
    name: "Delhi",
    adventurePlace: 0,
  },
];

const serverHandler = (request, response) => {
  const { url: request_url, method } = request;

  // console.log("URL : ", url);
  // console.log("Method : ", method);

  const { pathname, query } = url.parse(request_url, true);
  console.log(request_url, pathname, query);
  if (pathname == "/cities" && method == "GET") {
    response.writeHead(200, { "Content-Type": "application/json" });
    const result = {
      succes: true,
      message: DATABASE,
    };

    response.end(JSON.stringify(result));

    response.end();
  } else if (pathname === "/cities/add" && method === "POST") {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });

    request.on("end", () => {
      const REQUEST_PAYLOAD = JSON.parse(body);

      console.log(REQUEST_PAYLOAD);
      const { name, adventurePlace } = REQUEST_PAYLOAD;
      DATABASE.push({
        id: DATABASE.length + 1,
        name,
        adventurePlace,
      });

      response.writeHead(200, { "Content-Type": "application/json" });

      response.end();
    });
  } else if (pathname == "/cities/update" && method == "PUT") {
    const { id } = query;
    if (!id) {
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(
        JSON.stringify({
          succes: false,
          message: "id is missing",
        })
      );
    }
    let body = "";
    request.on("data", (chunk) => {
      body += chunk.toString();
    });
    request.on("end", () => {
      const REQUEST_PAYLOAD = JSON.parse(body);
      const { name, adventurePlace } = REQUEST_PAYLOAD;

      console.log(name, adventurePlace);

      const index = DATABASE.findIndex((city) => {
        return city.id == id;
      });

      const citydata = JSON.parse(JSON.stringify(DATABASE[index]));

      if (name) {
        citydata.name = name;
      }
      if (adventurePlace) {
        citydata.adventurePlace = adventurePlace;
      }

      DATABASE.splice(index, 1, citydata);
      response.writeHead(200, { Content_Type: "application/json" });
      response.end(
        JSON.stringify({
          succes: true,
          message: "data updated successfully",
        })
      );
    });
  } else if (pathname == "/cities/delete" && method == "DELETE") {
    const { id } = query;

    if (!id) {
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(
        JSON.stringify({
          succes: false,
          message: "id is missing",
        })
      );
    }

    const index = DATABASE.findIndex((Element) => {
      return Element.id == id;
    });

    DATABASE.splice(index, 1);

    response.writeHead(200, { "Content-Type": "application/json" });

    response.end(JSON.stringify({ succes: true }));
  } else {
    response.writeHead(404, { "Content-Type": "application/json" });
    const result = {
      succes: false,
      message: "API NO FOUND",
    };

    response.end(JSON.stringify(result));
  }
  response.end();
};

const server = http.createServer(serverHandler);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
