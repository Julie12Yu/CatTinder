import React from 'react';
import CatInfo from "../models/CatInfo";
import he from 'he';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

interface CatProfileProps {
  cat: CatInfo;
  isOpen: boolean;
  onClose: () => void;
}

const CatProfile: React.FC<CatProfileProps> = ({ cat, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }
  let googleMapsLink = ""
  if (cat && cat.org && cat.org.orgAddress) {
    googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cat.org.orgAddress)}`;
  }

  const formatUrl = (url: string) => {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `http://${url}`;
    }
    return url;
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{cat.name}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">Age: {cat.age}</Typography>
        <Typography variant="body1">Sex: {cat.sex}</Typography>
        <Typography variant="body1">Breed: {cat.breedString}</Typography>
        <Typography variant="body1">{he.decode(cat.summary)}</Typography>
        {cat.org ? (
          <>
            <Typography variant="h6" gutterBottom>Organization Info</Typography>
            <Typography variant="body1">Name: {cat.org.name || 'null'}</Typography>
            <Typography variant="body1">
              Address: {cat.org.orgAddress ? (
                <Link href={googleMapsLink} target="_blank" rel="noopener">
                  {cat.org.orgAddress}
                </Link>
              ) : 'null'}
            </Typography>
            <Typography variant="body1">Phone: {cat.org.orgPhone || 'null'}</Typography>
            <Typography variant="body1">
              Email: {cat.org.orgEmail !== "Unknown" ? (
                <Link href={`mailto:${cat.org.orgEmail}`} target="_blank" rel="noopener">
                  {cat.org.orgEmail}
                </Link>
              ) : 'Does not exist.'}
            </Typography>
            <Typography variant="body1">
              URL: {cat.org.orgUrl && cat.org.orgUrl !== "Unknown" ? (
                <Link href={formatUrl(cat.org.orgUrl)} target="_blank" rel="noopener">
                  {cat.org.orgUrl}
                </Link>
              ) : 'Does not exist.'}
            </Typography>
          </>
        ) : (
          <Typography variant="body1">Organization Info does not exist for this cat.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CatProfile;