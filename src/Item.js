import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'inline-block',
        position: 'absolute'
    },
}));

const ItemSelected = ({ data }) => {
    const classes = useStyles();
    if (!data.title) {
        return null;
    }

    return (
        <div className={classes.root}>
            {data.thumbnail_width && <img src={data.thumbnail} width={data.thumbnail_width} height={data.thumbnail_height} alt={data.thumbnail} />}
            {data.title}
        </div>
    )
}

export default ItemSelected;