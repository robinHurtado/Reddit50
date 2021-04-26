import './App.css';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';

import ItemSelected from './Item';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '300px',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    display: 'inline-block'
  },
  item: {
    color: 'white'
  }
}));

function App() {
  const [data, setItems] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    fetch(`https:www.reddit.com/r/subreddit/top.json?t=all&count=50`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.data.children);
        },
      )
  }, [])

  return (
    <div className='App'>
      {!isLoaded && '...'}
      <div className={classes.root}>
        <List key={data.id} component="nav" subheader={<ListSubheader>Reddit Posts</ListSubheader>}>
        {
          !!data.length && data.map(({ data }) => {
            return (
              <ListItem divider button className={classes.item} onClick={() => setItemSelected(data)}>
                <ListItemText secondary={
                  <div><div>author: {data.author}</div>
                  <div>{data.num_comments} comments</div></div>}
                >
                  <div>{data.title}</div>
                </ListItemText>
              </ListItem>
            )
          })
        }
        </List>
      </div>
        {
          itemSelected?.id && <ItemSelected data={itemSelected} />
        }
    </div>
  );
}

export default App;
