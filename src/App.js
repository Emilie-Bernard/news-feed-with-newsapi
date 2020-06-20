import React, { useState } from 'react';
import NewsAPI from 'newsapi';
const newsapi = new NewsAPI('fe6ec1aeff0f4fd29deaf881c920de9a');

function App() {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);

  const search = async evt => {
    if (evt.key === "Enter") {
      try {
        await newsapi.v2.everything({
          q: query
        })
          .then(response => {
            console.log(response);
            setArticles(Array.from(response.articles));
          })
          .catch(error => {
            console.error(error);
          });
      } catch (e) {
        console.log(`Failed to fetch articles: ${e.message}`, e);
        return;
      }
    }
  }

  return (
    <div className="app">
      <div>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
      </div>
      <ul className="card-place">
        {articles.map(function (item, index) {
          return (
            <div key={index} className="card">
              <a className="card-href" href={item.url}>
                <div className="column">
                  {item.urlToImage ? <center><img className="card-image" src={item.urlToImage} alt={item.urlToImage}></img></center> : ''}
                </div>
                <div className="column">
                  <h1 className="card-title">{item.title}</h1>
                  <p className="card-texte">{item.content ? item.content : item.description}</p>
                  {item.author ? <p className="card-author">Auteur : <b>{item.author}</b></p> : ''}
                </div>
              </a>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default App;