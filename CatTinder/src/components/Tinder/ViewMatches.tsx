import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { getMatches } from '../../api/SearchPets';
import CatProfile from '../CatProfile';
import CatInfo from '../../models/CatInfo';
import { API_URL } from '../Auth/config';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    padding: '20px',
  },
  card: {
    maxWidth: 345,
    margin: 'auto',
    position: 'relative',
    borderRadius: '15px', 
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
    border: '1px solid #e0e0e0',
  },
  media: {
    height: 200,
    borderTopLeftRadius: '15px', 
    borderTopRightRadius: '15px',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '50px',
  },
  button: {
    flexShrink: 0,
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    color: '#fff',
    fontSize: '18px',
    backgroundColor: '#9198e5',
    transition: '200ms',
    margin: '10px',
    fontWeight: 'bolder',
    width: '160px',
    boxShadow: '0px 0px 30px 0px rgba(0,0,0,0.10)',
  },
});

interface ViewMatchesProps {
  userNum: string;
  limit?: number;
  returnToMatching: () => void;
}

interface Match {
  _id: string;
  userNum: string;
  catInfo: CatInfo;
  timestamp: string;
}

const ViewMatches: React.FC<ViewMatchesProps> = (props: ViewMatchesProps) => {
  const classes = useStyles();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState<Match | null>(null);

  const handleCatInfoClick = (match: Match) => {
    if (selectedCat === match) {
      setSelectedCat(null);
    } else {
      setSelectedCat(match);
    }
  };

  const handleCloseProfile = () => {
    setSelectedCat(null);
  };

  const handleDeleteMatch = async (matchId: string) => {
    try {
      const response = await fetch(`${API_URL}/api/swipes/${matchId}`, {
        method: 'DELETE',
      });
      console.log('Response:', response);
      setMatches(matches.filter((match) => match._id !== matchId));
    } catch (error) {
      console.error('Error deleting match:', error);
    }
  };

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await getMatches(props.userNum, props.limit || 20);
        setMatches(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching matches:', error);
        setLoading(false);
      }
    };

    fetchMatches();
  }, [props.userNum, props.limit]);

  const decodeHtml = (html: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const defaultMissingCatPictureURL = "https://cdn.discordapp.com/attachments/786109228267601920/1294837546911535134/a8117bbcdb409915a733bec10b3ad118.png?ex=670c76f0&is=670b2570&hm=da91d1ff4fb5c18909eb5078c9ce34f1ded7f961d344b7c7ab85486e8e7d1d58&";
  

  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        onClick={props.returnToMatching}
        className={classes.button}
      >
        Return to Cat Tinder
      </Button>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <div>
          <Grid container spacing={3} className={classes.cardContainer}>
            {matches.map((match) => (
              match.catInfo && <Grid item xs={12} sm={6} md={4} key={match._id}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.media}
                    image={match.catInfo.imageUrl || defaultMissingCatPictureURL }
                    title={match.catInfo.name || "Unknown"}
                  />
                  <CardContent>
                    <Typography variant="h5" color="textSecondary" component="p">
                      {match.catInfo.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Age: {match.catInfo.age}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Sex: {match.catInfo.sex}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Breed: {match.catInfo.breedString}
                    </Typography>
                    {match.catInfo.summary && (
                      <Typography variant="body2" color="textSecondary" component="p">
                        {decodeHtml(match.catInfo.summary.substring(0, 100))}...
                      </Typography>
                    )}
                    <IconButton
                      aria-label="info"
                      onClick={() => handleCatInfoClick(match)}
                      style={{ position: 'absolute', top: 10, right: 10 }}
                    >
                      <InfoIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeleteMatch(match._id)}
                      style={{ position: 'absolute', top: 10, left: 10 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <CatProfile
            cat={selectedCat ? selectedCat.catInfo : null}
            isOpen={!!selectedCat}
            onClose={handleCloseProfile}
          />
        </div>
      )}
    </div>
  );
};

export default ViewMatches;