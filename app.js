const express = require("express");
const postBank = require("./postBank")
const app = express();

app.get("/", (req, res) => res.send("Hello World!"));


app.get('/posts/:id', (req, res) => {
  const id = req.params.id
  const post = postBank.find(id)
   if (!post.id) {
      // If the post wasn't found, just throw an error
      throw new Error('Not Found')
    }
    // ... Otherwise, send the regular post detail HTML

  const html7 = `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${postBank.list().map(post => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>${post.title}
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
      ).join('')}
    </div>
  </body>
</html>`

  res.send(html7);
});


const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
