const express = require("express");
const app = express();
const port = 3000;

let items = [];

let currentId = 1;

app.use(express.json());

app.get("/", (req, res) => {
  res.json("server conncted ");
});

app.post("/post", (req, res) => {
  try {
    const item = {
      id: currentId++,
      title: req.body.title,
      description: req.body.description,
    };
    items.push(item);
    res.status(200).json({ message: "posted successfully", items: item });
    console.log(item);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/get", (req, res) => {
  try {
    res.status(200).json(items);
    console.log(items);
  } catch (error) {
    res.status(500).json({ message: "server errror" });
  }
});

app.get("/get/:id", (req, res) => {
  try {
    const item = items.find((i) => i.id == parseInt(req.params.id));
    if (!item) {
      res.status(404).json({ message: "item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "server error", error: error });
  }
});

app.put("/update/:id", (req, res) => {
  try {
    const item = items.find((i) => i.id == parseInt(req.params.id));
    if (!item) {
      res.status(404).json({ message: "id not found" });
    }
    item.title = req.body.title || item.title;
    item.description = req.body.description || item.description;
    res.status(200).json({ message: "updated succesfully", item: item });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error });
  }
});

app.delete("/delete/:id", (req, res) => {
  try {
    const itemIndex = items.findIndex((i) => i.id == parseInt(req.params.id));
    if (itemIndex === -1) {
      res.status(404).json({ message: "id not found" });
    }
    items.splice(itemIndex, 1);
    res.status(200).json({ message: "message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

app.listen(3000, () => {
  console.log("server connected:", port);
});
