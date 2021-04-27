import './App.css';
import { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';

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
  },
  secondary: {
    display: 'block'
  },
  initialName: {
    textTransform: 'capitalize',
    marginTop: '11px'
  },
  initialImg: {
    backgroundColor: '#ffea00',
    color: 'white',
    height: '50px',
    width: '50px',
    textAlign: 'center'
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '60px 1fr 10px'
  },
  viewDot: {
    backgroundColor: 'dodgerblue',
    borderRadius: '7px',
    height: '10px',
    width: '10px',
  },
  remove: {
    backgroundColor: '#ffea00',
    color: 'white',
    float: 'right',
    width: '50px',
    height: '25px'
  }
}));

function App({ store }) {
  const [data, setItems] = useState([]);
  const [itemSelected, setItemSelected] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const classes = useStyles();
  const globalState = store.getState();

  const removeItem = (index) => {
    const newItmes = data.filter((_, i) => i !== index);
    setItems(newItmes);
    setItemSelected({});
  }

  useEffect(() => {
    fetch(`https:www.reddit.com/r/subreddit/top.json?t=all`)
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
      <div className={classes.root}>
        <List
          component="nav"
          subheader={
            <div className={classes.container}>
              <div>Reddit Posts</div>
              <Button onClick={() => {setItems([]); setItemSelected({}); }} variant="contained" color="primary">
                Dismiss All
              </Button>
            </div>
          }
        >
        {
          !!data.length ? data.map(({ data }, ind) => {
            return (
              <ListItem
                key={data.id}
                divider
                button
                className={classes.item}
                onClick={(e) => {
                  e.preventDefault();
                  store.dispatch({ type: 'ITEM_OPENED', index: ind });
                  setItemSelected(data);
                }}
              >
                <ListItemText secondary={
                  <Fragment>
                    <span className={classes.secondary}>{data.author}</span>
                    <span className={classes.secondary}>{data.num_comments} comments</span>
                    <Button className={classes.remove} onClick={(e) => {;removeItem(ind)}}>remove</Button>
                  </Fragment>}
                >
                  <div className={classes.container}>
                    {
                      data.thumbnail_width ? (
                        <img className={classes.initialImg} src={data.thumbnail} alt={data.thumbnail} />
                      ) : (
                        <div className={classes.initialImg}>
                          <div className={classes.initialName}>{data.author.substring(0, 1)}</div>
                        </div>
                      )
                    }
                    <div>{data.title}</div>
                    {
                      !globalState.indexes.includes(ind) && (
                        <div className={classes.viewDot}></div>
                      )
                    }
                  </div>
                </ListItemText>
              </ListItem>
            )
          }) : "No Post"
        }
        </List>
      </div>
        {!isLoaded && '...'}
        {
          itemSelected?.id && <ItemSelected data={itemSelected} />
        }
    </div>
  );
}

export default App;
