import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline-block',
        position: 'absolute'
    },
}));

const ItemSelected = ({ data }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {data.title}
        </div>
    )
}

export default ItemSelected;