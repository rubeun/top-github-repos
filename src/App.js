import { useState, useEffect } from 'react';
import './App.css';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { BsGithub } from 'react-icons/bs';

import { getTopRepos } from './api/github';
import { convertDate } from './util/dates';
import { sortArrByDate } from './util/sort';

const App = () => {
  const [language, setLanguage] = useState("html"); // TODO: allow changing language
  const [dateOrder, setDateOrder] = useState("desc"); // TODO: allow changing order by ascending or descending dates
  const [repos, setRepos] = useState([]);

  useEffect(language => {
    getTopRepos(language).then(data => {
      return sortArrByDate(data, dateOrder);
    }).then(sortedArr => {
      setRepos(sortedArr);
    }).catch(err => {
      throw(err);
    });
  },[language, dateOrder]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Top Github Repos Timeline</h1>
        <VerticalTimeline
          layout='2-columns'
        >
          {
            repos.length > 0 ?
              repos.map((repo, index) => {
                return(
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    date={convertDate(repo.created_at)}
                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    icon={<BsGithub />}
                    key={index}
                  >
                    <h3 className="vertical-timeline-element-title">{repo.name}</h3>
                    <p>Created on: {convertDate(repo.created_at)}</p>
                    <p>Last update: {convertDate(repo.updated_at)}</p>
                    <p>Language: {repo.language}</p>
                    <p>by: <a href={repo.owner.html_url}>{repo.owner.login}</a></p>
                    <p>stars: {repo.stargazers_count}</p>
                    <p>
                      {repo.description}
                    </p>
                    <p>Topics: {repo.topics.map(topic => (`${topic} `))}</p>
                    <p><a href={repo.html_url} target="_blank" rel="noreferrer"><BsGithub /> Go to Repo <BsGithub /></a></p>
                  </VerticalTimelineElement>  
                )
              })
              :
              <p>Loading...</p>
          }
        </VerticalTimeline>
      </header>
    </div>
  );
}

export default App;
